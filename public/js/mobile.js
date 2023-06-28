setTimeout(mobile, 100);

function mobile(){
    var x = window.matchMedia("(max-width: 750px)");
    if(x.matches){
        console.log("sunt pe mobil");

    }
}

$(document).ready(function() {
    $(document).on('click', '.fa-arrow-left', function() {
        
        var x = window.matchMedia("(max-width: 750px)");
        if(x.matches){

            $(".left").css("display", "inline");
            $(".right").css("display", "none");
            $(".fa-arrow-left").css("display", "none");
        }
    });
});

$(document).ready(function() {
    $('.chat-list').on('click', '.lom', function() {
        
        var x = window.matchMedia("(max-width: 750px)");
        if(x.matches){

            $(".left").css("display", "none");
            $(".right").css("display", "inline");
            $(".fa-arrow-left").css("display", "inline");
        }
    });
});



$(document).ready(function() {
    $(document).on('click', '.lgrup', function() {

        var x = window.matchMedia("(max-width: 750px)");
        if(x.matches){

            $(".left").css("display", "none");
            $(".right").css("display", "inline");
            $(".fa-arrow-left").css("display", "inline");
            $(".people").css("right", "10%");
        }

    });
    
});