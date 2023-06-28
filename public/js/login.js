//animations

$(document).ready(function() {
    $('.message .create').click(function(){
        $('.register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    
    $('.message .login').click(function(){
        $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    
    $('.message .change').click(function(){
        $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.changepass-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    
    $('.message .clogin').click(function(){
        $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.changepass-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

});



//REGISTER

function checkReg() {
    var regform = $('.register-form');
    if(regform[0].checkValidity()) {
        var username = $('.reg_username').val();
        var password = $('.reg_password').val();
        var question = $('.reg_question').val();
        var answer = $('.reg_answer').val();

        $.ajax({
            url: "/regverify",
            type: "POST",
            dataType: 'text',
            data: {username:username, password:password, answer:answer},
            success: function (res){
                        if (res==0){
                            $(".attention").css("color", "red");
                            atentionare("You're using forbidden characters");
                        } else if (res==1){
                            $(".attention").css("color", "red");
                            atentionare("Username don't have enough characters");
                        } else if (res==2){
                            $(".attention").css("color", "red");
                            atentionare("Username has too many characters");
                        } else if (res==3){
                            $(".attention").css("color", "red");
                            atentionare("Password don't have enough characters");
                        } else if (res==4){
                            $(".attention").css("color", "red");
                            atentionare("Username has too many characters");
                        } else if (res==5){
                            $(".attention").css("color", "red");
                            atentionare("The answer don't have enough characters");
                        } else if (res==6){
                            $(".attention").css("color", "red");
                            atentionare("The answer has too many characters");
                        }
                        else if(res==7){
                            $.ajax({
                                url: "/reg",
                                type: "POST",
                                dataType: 'text',
                                data: {username:username},
                                success: function (res){
                                    
                                    if(res=="succes"){
                
                                            $.ajax({
                                                url: "/regadd",
                                                type: "POST",
                                                dataType: 'text',
                                                data: {add:1,username:username, password:password, question:question, answer:answer},
                                                success: function (res){
                                            
                                                }
                                            });
                                        
                                            $('.register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                                            $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                                            $(".attention").css("color", "green");
                                            atentionare("Account created");
                                        
                                    }
                                    else{
                                        $(".attention").css("color", "red");
                                        $(".reg_username").val("");
                                        atentionare("Username already taken");
                                    }
                
                                }
                            });
                        }
            }
        });
        
    }else{
        if ($('.register-form').is(':visible')){
            $(".attention").css("color", "red");
            atentionare("Fill up all the fields");
        };
    };
};
//REGISTER END



//LOGIN 
var usr;
function loginacc() {
    
    var user = $('.login_username').val();
    var pass = $('.login_password').val();
    usr = user;
    $.ajax({
        url: "/login",
        type: "POST",
        dataType: 'text',
        data: {username:user, password:pass},
        success: function (res){
            if(res == "not_exist"){
                $(".attention").css("color", "red");
                atentionare("User does not exist");
                $(".login_username").val("");
            } else if (res == "pass_incorrect") {
                $(".attention").css("color", "red");
                atentionare("Incorrect password");
                $(".login_password").val("");
            }else{
                location.reload();
            }
            
        }
    });
    
}
//LOGIN END





function checkChpas(){
    var regform2 = $('.changepass-form');
    if(regform2[0].checkValidity()) {
        var user = $('.Cpass_username').val();
        var cnpu = $('.cnp_answer').val();
        
        console.log(cnpu)
        var newpass = $('.Cpass_newpass').val();
        $.ajax({
            url: "/changepass",
            type: "POST",
            dataType: 'text',
            data: {username:user, cnpu:cnpu},
            success: function (res){
                if(res == "not_exist"){
                    atentionare("User does not exist");
                    $(".attention").css("color", "red");
                    $(".Cpass_username").val("");
            
                } else if (res == "answer_incorrect") {
                    $(".attention").css("color", "red");
                    atentionare("CNP incorrect");
                    $(".cnp_answer").val("");
                }else if (res == "succes") {
                    $.ajax({
                        url: "/changepasdatabase",
                        type: "POST",
                        dataType: 'text',
                        data: {username:user, password:newpass},
                        success: function (res){
                            if(res == "tooshort"){
                                $(".attention").css("color", "red");
                                atentionare("Password don't have enough characters");
                            } else{
                                $('.changepass-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                                $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                                $(".attention").css("color", "green");
                                atentionare("Password succesfully changed");
                            }
                            
                            
                            
                        }
                    });
                    
                }

            }
        });

    }else{
        if ($('.changepass-form').is(':visible')){
            $(".attention").css("color", "red");
            atentionare("Fill up all the fields");
        };
    };
};

// $(document).ready(function() {
//     checkReg();
//     checkChpas();
//     loginacc();
// });


//account created/ passowrd changed pe formul de login dupa ce se completeaza formurile
function atentionare(care) {
    $('.attention').text(`${care}`);
    $('.attention').animate({height: "toggle", opacity: "toggle"}, "fast");
    setTimeout('hide()',3000);
  
};
function hide(){
    $('.attention').animate({height: "toggle", opacity: "toggle"}, "fast");
};

