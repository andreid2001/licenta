
user_name = get_username();
materie_global = "null"
// console.log(user_name);
function get_username() {
  var usr = "";
  $.ajax({
    url: "/getusername",
    type: "POST",
    'async': false,
    dataType: 'text',
    success: function (res) {
      usr = res;

    }
  });
  return usr;
}


$.ajax({
  url: "/populate_materie",
  type: "POST",
  dataType: 'text',
  data: { username: user_name },
  success: function (res) {

    res = JSON.parse(res);
    for (var i = 0; i < res.length; i++) {
      materie_global = res[i].materie

    }
  }
});


        const video = document.getElementById('webcam');
        const canvas = document.getElementById('canvas');
        const captureButton = document.getElementById('capture');
        const uploadButton = document.getElementById('upload');
        const submitButton = document.getElementById('submit');
        const modal = document.getElementById('modal');
        const openModalButton = document.getElementById('open-modal');
        const closeModalButton = document.getElementById('close-modal');
        // Generăm dinamic inputurile când se apasă butonul
        const buttonGenerare = document.getElementById('generareInputuri');
        const numarIntrebari = document.getElementById('numarIntrebari').value;
        
        buttonGenerare.addEventListener('click', () => {
            const numarIntrebari = document.getElementById('numarIntrebari').value;
            const inputContainer = document.getElementById('inputContainer');
            inputContainer.innerHTML = '';
            const table = document.createElement('table');
            let tr;
            for (let i = 0; i < numarIntrebari; i++) {
                if (i % 4 == 0) { // Creează un rând nou după fiecare a patra celulă
                    tr = document.createElement('tr');
                    table.appendChild(tr);
                }
                const td = document.createElement('td');
                td.textContent = `${i+1}.`; // Adaugă numărul
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'inputDinamic';
                input.id = `inputDinamic${i+1}`;
                td.appendChild(input); // Adaugă inputul în celula de tabel
                tr.appendChild(td); // Adaugă celula în rând
            }
            inputContainer.appendChild(table); // Adaugă tabelul în containerul de inputuri
        });


        openModalButton.addEventListener('click', () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                });
            modal.style.display = "flex";
        });

        closeModalButton.addEventListener('click', () => {
            video.srcObject.getTracks().forEach(track => track.stop());
            modal.style.display = "none";
        });

        let data; // Define this at a higher scope if you want to use it elsewhere

        captureButton.addEventListener('click', () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
                // Save the image data to the data variable
                data = canvas.toDataURL('image/png');
            }

            // Colectăm datele de intrare
            const inputs = [];
            const numarIntrebari = document.getElementById('numarIntrebari').value;
            for (let i = 0; i < numarIntrebari; i++) {
                const valoareInput = document.getElementById(`inputDinamic${i+1}`).value;
                inputs.push(valoareInput);
            }

            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: JSON.stringify({ image: data, inputs: inputs, numarIntrebari:numarIntrebari}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                $("#modal").append(`<div class="rezultat">Rezultat ${data.result.scor}</div>`);
                setTimeout(function() {
                    $('.rezultat').remove();
                }, 5000);
                console.log('Result:', data.result);
                console.log('N:', user_name);
                console.log('N:', materie_global);
                nume_elev = $('#inputnume').val();
                console.log(nume_elev);

                $.ajax({
                    url: "/note_bazadate",
                    type: "POST",
                    dataType: 'text',
                    data: { username: user_name,result: data.result, materie: materie_global, nume_elev: nume_elev},
                    success: function (res) {
            
                    }
                });



            }).catch(error => {
                console.error('Error:', error);
            });
            
        });

        uploadButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function (e) {
                    const image = new Image();
                    image.onload = function () {
                        const context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    }
                    image.src = e.target.result;
                }
                reader.readAsDataURL(file);
            });
            input.click();
        });

        submitButton.addEventListener('click', () => {
            const data = canvas.toDataURL('image/png');

            // Colectăm datele de intrare
            const inputs = [];
            const numarIntrebari = document.getElementById('numarIntrebari').value;
            for (let i = 0; i < numarIntrebari; i++) {
                const valoareInput = document.getElementById(`inputDinamic${i+1}`).value;
                inputs.push(valoareInput);
            }

            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: JSON.stringify({ image: data, inputs: inputs, numarIntrebari:numarIntrebari }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                $("#modal").append(`<div class="rezultat">Rezultat ${data.result.scor}</div>`);
                setTimeout(function() {
                    $('.rezultat').remove();
                }, 5000);
                console.log('Result:', data.result);
                console.log('N:', user_name);
                console.log('N:', materie_global);
                nume_elev = $('#inputnume').val();
                console.log(nume_elev);

                $.ajax({
                    url: "/note_bazadate",
                    type: "POST",
                    dataType: 'text',
                    data: { username: user_name,result: data.result, materie: materie_global, nume_elev: nume_elev},
                    success: function (res) {
              
                    }
                  });



            }).catch(error => {
                console.error('Error:', error);
            });
        });