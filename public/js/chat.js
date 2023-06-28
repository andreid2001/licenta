

$(".fa-times").hide();
$(".fa-check").hide();
user_name = get_username();
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
$(".myusername-container").append(`<div class="username">Hello ${user_name}</div>`);






$(document).ready(function () {



    // bootstrap
    var inputRow = document.querySelector("#inputrow").cloneNode(true);
    var valRow = document.querySelector("#valrow").cloneNode(true);

    $("[data-input]").append(inputRow.innerHTML);

    $("[data-hidden]").append(valRow.innerHTML);

    function setContentEditable() {
        $('tr[data-input="true"] > td.ce').attr("contenteditable", "true");
        $("td.ce span.placeholder").attr("contenteditable", "false");
        return;
    }

    // Set appended row editable
    setContentEditable();

    // Bind each content cell to (hidden) cell
    $("[data-input] td").each(function (i, el) {
        var ph = $(".placeholder")[i];
        $(el).on("input", function (e) {
            console.log(ph, i);
            var bindText = text => {
                let cell = $("[data-hidden] td")[i];
                $(cell).text(text);
            };
            $(ph).detach();
            bindText(e.target.innerText);
        });
    });

    // Add new row
    $("button[data-save]").on("click", function (e) {
        $("[data-hidden] td").each(function (i, el) {
            if ($(el).text() === "") {
                $(el).text("null");
            }
        });

        var prenume = $('.prenume').text();
        var nume = $('.nume').text();
        var middle = $('.middle').text();
        var cnp = $('.cnp').text();
        var type = $('.type').text();
        var materie = $('.materie').text();
        var grupa = $('.grupa').text();

        $("[data-hidden]").removeAttr("data-hidden");
        $("[data-input]").html("");
        var html = $("#inputrow").html();
        $("[data-input]").html(html);
        $("<tr data-hidden></tr>").
            insertBefore("[data-input]").
            append(valRow.innerHTML);
        setContentEditable();


        parola=prenume+cnp.slice(-4)
    

        $.ajax({
            url: "/regadd",
            type: "POST",
            dataType: 'text',
            data: {add:1,prenume:prenume, nume:nume, middle:middle, parola:parola, cnp:cnp, type:type, materie:materie, grupa:grupa},
            success: function (res){

            }
        });

        


        
        

    });

});
