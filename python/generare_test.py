from PIL import Image, ImageDraw, ImageFont

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

# Exemplu de utilizare
num_questions = 20 #max 20
num_choices = 5 #max 5
grading_template = generate_grading_template(num_questions, num_choices)
grading_template.save("grading_template.png")
