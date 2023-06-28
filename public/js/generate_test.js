$(document).ready(function(){
    $(".creare_test").click(function(){
        var nrQuestions = $(".nr_questions").val();
        var nrVariante = $(".nr_variante").val();
        fetch('http://localhost:5000/generare_test', {
                method: 'POST',
                body: JSON.stringify({ 'nr_questions': nrQuestions, 'nr_variante': nrVariante }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).catch(error => {
                console.error('Error:', error);
            });



    });
});


