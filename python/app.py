import cv2
import numpy as np
import utils
from PIL import Image, ImageDraw, ImageFont
from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    image_data = data['image'].split(',')[1]  # Scoatem partea de 'data:image/png;base64,'
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))  # Acum imaginea este stocată în variabila 'image'

    inputs = data['inputs']  # Acum inputurile sunt stocate în array-ul 'inputs'
    numarIntrebari = data['numarIntrebari']
    print(inputs)

    lista_str = inputs
    ans = list(map(str, lista_str))
    image.convert("RGB").save("Images/primita.jpg", "JPEG") 
    print(numarIntrebari)
    path = "Images/primita.jpg"
    widthImg = 1400
    heightImg = 2700
    questions = int(numarIntrebari)
    choices = 5
    #===================================================================


    img = cv2.imread(path)

    # ===========Preprocessing==================
    img = cv2.resize(img,(widthImg, heightImg))
    imgContours = img.copy()
    imgFinal = img.copy()
    imgBiggestContours = img.copy()
    imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray,(5,5),3)
    imgCanny = cv2.Canny(imgBlur,10,50)


    # ===========Finding all Contours==================
    contours, hierarchy = cv2.findContours(imgCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    cv2.drawContours(imgContours,contours,-1,(255,0,255),7)


    # =================Find Rectangles===================
    rectCont = utils.rectContour(contours)

    biggestContour = utils.getCornerPoints(rectCont[0]) # First Biggest area
    gradePoints = utils.getCornerPoints(rectCont[1])    # second biggest for grading

    if len(biggestContour)!=0 and len(gradePoints!=0):
        cv2.drawContours(imgBiggestContours,biggestContour,-1,(0,0,255),15)
        cv2.drawContours(imgBiggestContours,gradePoints,-1,(255,0,0),15)

        # Reorder points for our bird view
        biggestContour = utils.reorder(biggestContour)
        gradePoints = utils.reorder(gradePoints)
        

        # ====================== Bird View for Biggest Rectangle (OMR)============================
        pt1 = np.float32(biggestContour)
        pt2 = np.float32([[0, 0],[widthImg, 0], [0, heightImg],[widthImg, heightImg]])
        matrix = cv2.getPerspectiveTransform(pt1,pt2)
        imgWarpColored = cv2.warpPerspective(img, matrix, (widthImg, heightImg))

        # ============= Bird View for Second Biggest Rectangle (Grading) ============================
        ptsG1 = np.float32(gradePoints)  
        ptsG2 = np.float32([[0, 0], [325, 0], [0, 150], [325, 150]])  
        matrixG = cv2.getPerspectiveTransform(ptsG1, ptsG2)
        imgGradeDisplay = cv2.warpPerspective(img, matrixG, (325, 150)) 
        #cv2.imshow("grade",imgGradeDisplay)


        # ======================== Apply Threshold ==================================
        imgWarpGray = cv2.cvtColor(imgWarpColored,cv2.COLOR_BGR2GRAY)
        imgThresh = cv2.threshold(imgWarpGray, 170, 255,cv2.THRESH_BINARY_INV)[1]


        # =================== Split our omr sheet into 25 images(this case) ===================
        boxes = utils.splitBoxes(imgThresh,questions,choices)
        #cv2.imshow("split",boxes[0])


        # ====================== Store non zero pixels for each 25 images(this case) =======================
        countR=0
        countC=0
        myPixelVal = np.zeros((questions,choices)) 
        for image in boxes:
            totalPixels = cv2.countNonZero(image)
            myPixelVal[countR][countC]= totalPixels
            countC += 1
            if (countC == choices):
                countC = 0
                countR += 1

        #print(myPixelVal)

        # ================ Store index of max value of non zero pixels (answers) for each question in a list =================
        myIndex = []
        for x in myPixelVal:
            myIndex.append(np.where(x == np.amax(x))[0][0])
        #print(myIndex)


        # ====================== Grading =============================
        grading = []
        print(myIndex)
        bifate = []
        for x in range(questions):
            if myIndex[x] == 0:
                bifate.append("a")
            if myIndex[x] == 1:
                bifate.append("b")
            if myIndex[x] == 2:
                bifate.append("c")
            if myIndex[x] == 3:
                bifate.append("d")
            if myIndex[x] == 4:
                bifate.append("e")
        print(bifate)
        for x in range(questions):
            if ans[x] == bifate[x]:
                grading.append(1)
            else:
                grading.append(0)
        score = (sum(grading)/questions)*100
        #cv2.putText(imgGradeDisplay,str(int(score)) + " % ", (50,50), cv2.FONT_ITALIC, 1.5, (0,255,0),2)
        #cv2.imshow("grade",imgGradeDisplay)


        # =============================== Show Answers ===========================
        imgResult = imgWarpColored.copy()
        imgResult = utils.showAnswers(imgResult,myIndex,grading,ans,questions,choices)
        
        # create new blank image like warped image and put its inverse perspective on original image
        imgRawDrawings = np.zeros_like(imgWarpColored) 
        imgRawDrawings = utils.showAnswers(imgRawDrawings,myIndex,grading,ans,questions,choices)

        # ============== Inverse Perspective of Biggest rectangle(OMR)==========================
        invmatrix = cv2.getPerspectiveTransform(pt2,pt1)
        imgInvWarp = cv2.warpPerspective(imgRawDrawings, invmatrix, (widthImg, heightImg))

        # ============== Inverse Perspective of Seccond Biggest rectangle(Grade)==========================
        imgRawGrade = np.zeros_like(imgGradeDisplay)
        cv2.putText(imgRawGrade,str(int(score)) + "%", (50,100), cv2.FONT_ITALIC, 3, (0,0,255), 5)
        #cv2.imshow("grade",imgRawGrade)

        invmatrixG = cv2.getPerspectiveTransform(ptsG2, ptsG1)
        imgInvGradeDisplay = cv2.warpPerspective(imgRawGrade, invmatrixG, (widthImg, heightImg))
        #cv2.imshow("Inv grade",imgInvGradeDisplay)

        imgFinal = cv2.addWeighted(imgFinal,0.75,imgInvWarp,1,0)
        imgFinal = cv2.addWeighted(imgFinal,0.75,imgInvGradeDisplay,1,0)
        #cv2.imshow("Final Img", imgFinal)



    lables = [  ["Original", "Gray", "Blur", "Canny"],
                ["Contours", "Biggest Contour", "Warpped", "Threshold"],
                ["Result", "Raw Drawing", "Inverse Warp", "Final"]  
            ]

    blank_img = np.zeros_like(img)
    imgArray = ([img, imgGray, imgBlur, imgCanny],          
                [imgContours,imgBiggestContours,imgWarpColored,imgThresh],
                [imgResult, imgRawDrawings, imgInvWarp, imgFinal])

    imageStacked = utils.stackImages(imgArray, 0.32)


    cv2.imshow("Stacked Img", imageStacked)
    cv2.waitKey(0)
    print(bifate)
    print(ans)
    print(score)
    return jsonify(result={"scor":str(score), "corecte":ans, "bifate":bifate})












def generate_grading_template(num_questions, num_choices):
    # Dimensiuni și margine
    page_width = 1400
    page_height = 2700
    margin = 100

    # Dimensiuni întrebări și răspunsuri
    question_width = 100
    question_height = 100
    choice_diameter = 100

    # Spațiu orizontal și vertical între întrebări
    question_spacing_x = 200
    question_spacing_y = 20

    # Spațiu orizontal între cercurile de răspunsuri
    choice_spacing = 20

    # Calcularea numărului de rânduri și coloane pe pagină
    rows = num_questions
    columns = 2

    # Calcularea dimensiunilor reale ale întrebării și paginii
    actual_question_width = question_width
    actual_question_height = question_height
    actual_page_width = margin + columns * (actual_question_width + question_spacing_x) + margin
    actual_page_height = margin + rows * (actual_question_height + question_spacing_y) + margin

    # Crearea unei imagini noi pentru pagină
    page_image = Image.new("RGB", (page_width, page_height), "white")
    draw = ImageDraw.Draw(page_image)

    # Calcularea poziției de start pentru întrebare
    start_x = (page_width - actual_page_width) // 2
    start_y = (page_height - actual_page_height) // 2

    # Setarea fontului pentru textul întrebărilor și răspunsurilor
    question_font = ImageFont.truetype("arial.ttf", 50)
    choice_font = ImageFont.truetype("arial.ttf", 40)

    # Generarea fiecărei întrebări și a numerelor de întrebări
    for i in range(num_questions):
        # Calcularea poziției întrebării curente
        question_x = start_x
        question_y = start_y + i * (actual_question_height + question_spacing_y)

        # Desenarea chenarului între numerele de întrebări
        border_x1 = question_x - 10
        border_y1 = question_y - 10
        border_x2 = question_x + actual_question_width + 10
        border_y2 = question_y + actual_question_height + 10
        draw.rectangle(
            [(border_x1, border_y1), (border_x2, border_y2)],
            outline="black",
            width=4,
        )

        # Desenarea întrebării (numărul întrebării)
        question_text = str(i + 1)
        question_text_width, question_text_height = draw.textsize(question_text)
        question_text_x = question_x + (actual_question_width - question_text_width) // 2
        question_text_y = question_y + (actual_question_height - question_text_height) // 2
        draw.text(
            (question_text_x, question_text_y),
            question_text,
            font=question_font,
            fill="black",
        )

    # Calcularea poziției întrebărilor pentru cercurile răspunsurilor
    question_x = start_x + actual_question_width + question_spacing_x
    question_y = start_y

    # Desenarea chenarului între cercurile răspunsurilor
    border_x1 = question_x - choice_spacing - 90
    border_y1 = question_y - 10
    border_x2 = question_x + num_choices * (choice_diameter + choice_spacing) + choice_spacing
    border_y2 = start_y + num_questions * (actual_question_height + question_spacing_y) + 10
    draw.rectangle(
        [(border_x1, border_y1), (border_x2, border_y2)],
        outline="black",
        width=4,
    )

    # Desenarea cercurilor răspunsurilor
    for i in range(num_questions):
        for j in range(num_choices):
            circle_x = question_x + j * (choice_diameter + choice_spacing)
            circle_y = question_y + i * (actual_question_height + question_spacing_y) + actual_question_height / 2
            circle_radius = choice_diameter / 2
            choice_text = chr(ord("A") + j)
            draw.text(
                (circle_x - 6, circle_y - 8),
                choice_text,
                font=choice_font,
                fill="black",
            )
            draw.ellipse(
                [
                    (circle_x - circle_radius, circle_y - circle_radius),
                    (circle_x + circle_radius, circle_y + circle_radius)
                ],
                outline="black",
                width=2,
            )

    return page_image




@app.route('/generare_test', methods=['POST'])
def generare_test():
    # obținem datele din request
    data = request.get_json()

    # extragem numărul de întrebări și variante
    num_questions = int(data['nr_questions'])
    num_choices = int(data['nr_variante'])

    # generăm șablonul de notare
    grading_template = generate_grading_template(num_questions, num_choices)

    # salvăm șablonul într-un fișier
    grading_template.save("../public/grading_template.png")

    # răspundem cu succes
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}










