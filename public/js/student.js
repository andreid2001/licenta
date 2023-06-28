

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

// function populate_friends() {
//     $.ajax({
//         url: "/populate_friends",
//         type: "POST",
//         dataType: 'text',
//         data: { user: user_name },
//         success: function (res) {
//             res = JSON.parse(res);
//             for (var i = 0; i < res.length; i++) {
//                 var friend = `<li class="lom"><span class="name">${res[i]}</span><div class="fas fa-envelope"></div><div class="status"><div class="fas fa-circle"><div class="on-off">offline</div></div></div></li>`;
//                 $(".chat-list").prepend(friend);
//             }
//         }
//     });
// }
// populate_friends();

// function populate_groups() {
//     $.ajax({
//         url: "/populate_groups",
//         type: "POST",
//         dataType: 'text',
//         data: { user: user_name },
//         success: function (res) {
//             // console.log(res);
//             res = JSON.parse(res);
//             for (var i = 0; i < res.length; i++) {
//                 var group = `<li class="lgrup">${res[i]}<div class="status"><div class="fas fa-envelope"></div></div></li>`;
//                 $(".group-list").prepend(group);
//             }
//         }
//     });
// }
// populate_groups();

// function online_status() {
//     var obj = [];
//     var lnx = $('.chat-list .lom .name');
//     for (let i = 0; i < lnx.length; i++) {
//         obj.push({ [lnx[i].textContent.slice(1)]: 0 });
//     }
//     socket.emit("onoff", [user_name, obj]);
//     setTimeout(online_status, 5000);
// }
// setTimeout(online_status, 500);

// function seen_status() {
//     var obj = [];
//     var lnx = $('.chat-list .lom .name');
//     for (let i = 0; i < lnx.length; i++) {
//         obj.push({ [lnx[i].textContent.slice(1)]: 0 });
//     }
//     socket.emit("update_seen", [user_name, obj]);
//     // console.log([user_name, obj]);
//     setTimeout(seen_status, 5000);
// }

// setTimeout(seen_status, 500);

// function seen_status_group() {
//     var obj = []
//     var lnx = $('.group-list .lgrup');
//     for (let i = 0; i < lnx.length; i++) {
//         // console.log(lnx[i].textContent);
//         obj.push({ [lnx[i].textContent]: 0 });
//     }
//     // console.log(obj);
//     socket.emit("update_seen_group", [user_name, obj]);
//     setTimeout(seen_status_group, 5000);
// }
// setTimeout(seen_status_group, 500);



// // 5.15.137.48:44444/
// //conect to server socket
// var socket = io.connect("http://localhost/");
// socket.emit("set_online", user_name);







// // functie care deschide window-ul create group la apasarea butonului
// $(document).ready(function () {
//     $('.create-group').click(function () {

//         $('.creategroup-window').animate({ opacity: "toggle" }, "slow");

//     });
// });

// //buton chat-group message

// $(document).ready(function () {
//     $('.toggle-body').click(function () {
//         $(".toggle-body").toggleClass("toggle-body--on");
//         $(".toggle-btn").toggleClass("toggle-btn--on");
//         $(".frec_chat").toggleClass("change-color-grey");
//         $(".frec_groups").toggleClass("change-color-white");
//         $('.chat-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         $('.group-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         $('.create-group').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         $(".creategroup-window").hide();
//     });
// });

// //group button
// $(document).ready(function () {
//     $('.frec_groups').click(function () {
//         if ($('.group-list').is(':visible')) {

//         } else {
//             $(".toggle-body").toggleClass("toggle-body--on");
//             $(".toggle-btn").toggleClass("toggle-btn--on");
//             $(".frec_chat").toggleClass("change-color-grey");
//             $(".frec_groups").toggleClass("change-color-white");
//             $('.chat-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.group-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.create-group').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         }

//     });
// });

// //chat button
// $(document).ready(function () {
//     $('.frec_chat').click(function () {
//         if ($('.chat-list').is(':visible')) {

//         } else {
//             $(".toggle-body").toggleClass("toggle-body--on");
//             $(".toggle-btn").toggleClass("toggle-btn--on");
//             $(".frec_chat").toggleClass("change-color-grey");
//             $(".frec_groups").toggleClass("change-color-white");
//             $('.chat-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.group-list').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.create-group').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $(".creategroup-window").hide();
//         }

//     });
// });



// function atentionare(care) {
//     $('.attention').text(`${care}`);
//     $('.attention').animate({ height: "toggle", opacity: "toggle" }, "fast");
//     setTimeout('hide()', 3000);

// };
// function hide() {
//     $('.attention').animate({ height: "toggle", opacity: "toggle" }, "fast");
// };



// //add group to group-list when creating group
// function add_group_to_list() {
//     var regform3 = $(".creategroup-form");
//     if (regform3[0].checkValidity()) {
//         var gname = $('.creategroup-name').val();
//         // console.log(gname);
//         var users = $('.creategroup-users').val();
//         var array = users.split(' ');

//         var friends = [];
//         var lnx = $('.chat-list .lom .name');
//         for (let i = 0; i < lnx.length; i++) {
//             friends.push(lnx[i].textContent.slice(1));
//         }
//         var include = 1;
//         for (var i in array) {
//             if (array.includes(user_name)) {
//                 include = 2;
//             }
//             if (!friends.includes(array[i])) {
//                 include = 0;
//             }
//         }
//         group_users_ul = [];
//         group_users_ul.push(user_name);
//         for (var i in array) {
//             group_users_ul.push(array[i]);
//         }

//         if (include == 0) {
//             atentionare("You have to be friends with all added users");
//         } else if (include == 2) {
//             atentionare("You already are in the group, don't add yourself");
//         }
//         else {

//             $.ajax({
//                 url: "/create_group",
//                 type: "POST",
//                 dataType: 'text',
//                 data: { group_n: gname, users: users, from: user_name },
//                 success: function (res) {
//                     // console.log(res);
//                     if (res == "exists") {
//                         atentionare("Group name already exists");
//                     } else if (res == "created") {
//                         var gdiv = `<li class="lgrup">${gname}<div class="status"><div class="fas fa-envelope"></div></div></li>`;
//                         $(".group-list").prepend(gdiv);

//                         $(".attention").css("color", "green");
//                         atentionare("Group created");
//                         setTimeout(hide_create_group_winrow, 3000);




//                     }



//                 }
//             });

//         }

//     };

// };

// function hide_create_group_winrow() {
//     $(".creategroup-window").hide();
//     $(".attention").css("color", "red");
// }

// $(document).ready(function () {
//     add_group_to_list();
// });


// function scrolltobottom() {
//     $(".chat").scrollTop($(".chat")[0].scrollHeight);
// }

// //add name to chat when you click on li

// $(document).ready(function () {
//     $('.chat-list').on('click', '.lom', function () {
//         var username = $(this).find('.name').text();
//         $('.om').remove();
//         $('.grup').remove();
//         var omdiv = `<div class="om">${username}</div>`;
//         $(".people").append(omdiv);
//         $('.people').css('padding-right', '2%');
//         $('.people').css('background', '#5154638c');
//         $('.people_menu').hide();
//         $('.people').show();
//         if ($('.begin').is(':visible')) {
//             $('.begin').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.right').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         };


//         if ($(this).find('.fa-envelope').css("color") == "rgb(1, 191, 191)") {
//             $(this).find('.fa-envelope').css("color", "#01bfbf1a");


//             socket.emit("remove_seen", { from: user_name, to: username.slice(1) });
//         }
//         $('.chat').empty();
//         socket.emit("update_chat", { from: user_name, to: username.slice(1) });
//         sametime();
//         // setTimeout(scrolltobottom, 100);

//     });
// });

// //add group to chat when you click on li

// $(document).ready(function () {
//     $(document).on('click', '.lgrup', function () {
//         var groupname = $(this).text();
//         $('.om').remove();
//         $('.grup').remove();
//         var grupdiv = `<div class="grup">${groupname}</div>`;
//         $(".people").append(grupdiv);
//         $('.people').css('padding-right', '5%');
//         $('.people').css('background', '#5154638c');
//         $('.people_menu').show();
//         $('.people').show();
//         if ($('.begin').is(':visible')) {
//             $('.begin').animate({ height: "toggle", opacity: "toggle" }, "slow");
//             $('.right').animate({ height: "toggle", opacity: "toggle" }, "slow");
//         };
//         $('.chat').empty();
//         $(".group_users").empty();


//         $.ajax({
//             url: "/group_users",
//             type: "POST",
//             dataType: 'text',
//             data: { group_n: groupname },
//             success: function (res) {
//                 res = JSON.parse(res);
//                 // res = res.reverse()
//                 for (i in res) {
//                     // console.log(res[i]);
//                     var v = `<li class="group_usr">@${res[i]}<i class="far fa-times-circle"></i></li>`
//                     $(".group_users").append(v);
//                 }
//                 var add = `<i class="fas fa-user-plus"></i>`;
//                 $(".group_users").append(add);



//             }
//         });

//         if ($(this).find('.fa-envelope').css("color") == "rgb(1, 191, 191)") {
//             $(this).find('.fa-envelope').css("color", "#01bfbf1a");


//             socket.emit("remove_seen_group", { from: user_name, to: $(".grup").text() });

//         }

//         socket.emit("update_group", { group_n: groupname, from: user_name });

//         sametime();

//     });

// });

// //emojiuri
// $(document).ready(function () {
//     $('.fa-smile-beam').click(function () {
//         // $(".smileys").css("display","grid");
//         // $(".fa-smile-beam").css("color", "#02e7e7");

//         $(".smileys").toggleClass("smiles-active");
//         $(".fa-smile-beam").toggleClass("smile_icon_active");
//     });

//     // $('').click(function(){
//     $('.chat-page').on('click', '.lom, .lgrup, .search, .background_pattern, .group-list, .fa-paper-plane', function () {

//         if ($('.smileys').is(':visible')) {
//             $(".smileys").removeClass("smiles-active");
//             $(".fa-smile-beam").removeClass("smile_icon_active");
//         }

//         if ($('.smiles-active').is(':visible')) {
//             $(".smileys").removeClass("smiles-active");
//             $(".fa-smile-beam").removeClass("smile_icon_active");
//         }

//         if ($('.add_usr').parent().is(':visible')) {
//             $(".add_usr").parent().remove();
//         }
//     });



//     $('.smileys').on('click', '.emoji', function () {
//         // console.log($(this).text());
//         // $('.sendmsg_input').val('') += $(this).text();
//         $('.sendmsg_input').val($('.sendmsg_input').val() + $(this).text());

//     });
// });

// const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
// function fulltime(d) {
//     function pad(n) { return n < 10 ? '0' + n : n }
//     return d.getUTCFullYear() + '-'
//         + pad(months[d.getMonth()]) + '-'
//         + pad(d.getUTCDate()) + ' '
//         + pad((d.getUTCHours() + 3) % 24) + ':'
//         + pad(d.getUTCMinutes())
// }
// function time(d) {
//     function pad(n) { return n < 10 ? '0' + n : n }
//     return pad((d.getUTCHours() + 3) % 24) + ':'
//         + pad(d.getUTCMinutes())
// }

// //compreseaza mesajele care au acelas timp de trimitre
// function sametime() {
//     var lnx = $('.chat .left_msg .ul');
//     // console.log(lnx);
//     if (typeof lnx[0] != "undefined") {
//         var s = lnx[0].outerHTML;
//         var reg = /.[0-9]:[0-9]./g;
//         var pasttime = s.match(reg);

//         for (var i in lnx) {

//             if (typeof lnx[i - 1] != 'undefined') {

//                 var s = lnx[i].outerHTML;
//                 var reg = /.[0-9]:[0-9]./g;
//                 mat = s.match(reg);

//                 if (pasttime[0] == mat[0]) {
//                     $('.chat .left_msg:eq(' + i + ') .ul').css("display", "none");

//                     var x = window.matchMedia("(max-width: 750px)");
//                     if (x.matches) {
//                         $('.chat .left_msg:eq(' + i + ')').css("margin-top", "1.5%");
//                     } else {
//                         $('.chat .left_msg:eq(' + i + ')').css("margin-top", "0.5%");
//                     }

//                 }
//                 pasttime = mat;
//             }
//         }
//     }


//     //rigth side
//     var lnxr = $('.chat .right_msg .ul');
//     if (typeof lnxr[0] != "undefined") {
//         var ss = lnxr[0].outerHTML;
//         var regg = /.[0-9]:[0-9]./g;
//         var pasttimer = ss.match(regg);

//         for (var j in lnxr) {

//             if (typeof lnxr[j - 1] != 'undefined') {

//                 var ss = lnxr[j].outerHTML;
//                 var regg = /.[0-9]:[0-9]./g;
//                 matt = ss.match(regg);

//                 if (pasttimer[0] == matt[0]) {
//                     $('.chat .right_msg:eq(' + j + ') .ul').css("display", "none");


//                     var x = window.matchMedia("(max-width: 750px)");
//                     if (x.matches) {
//                         $('.chat .right_msg:eq(' + j + ')').css("margin-top", "1.5%");
//                     } else {
//                         $('.chat .right_msg:eq(' + j + ')').css("margin-top", "0.5%");
//                     }

//                 }
//                 pasttimer = matt;
//             }
//         }
//     }


// }

// //functie insert mesage
// function insert_message() {
//     if ($(".sendmsg_input").val().length > 0 && $(".sendmsg_input").val() != " " && $(".sendmsg_input").val() != "  " && $(".sendmsg_input").val() != "   " && $(".sendmsg_input").val() != "    " && $(".sendmsg_input").val() != "     ") {

//         // console.log(to_person);
//         var mesaj = $(".sendmsg_input").val();
//         var fullt = fulltime(new Date());
//         var t = time(new Date());
//         $('.sendmsg_input').val('');



//         if ($('.om').is(':visible')) {
//             var este = 0;
//             var to_person = $(".om").text().slice(1);

//             var limesaj = `<li class="left_msg"><div class="ul" style="left:2%;">${t}</div><div class="msg">${mesaj}</div></li>`;



//             var lnx = $('.chat-list .lom .name');  //verifica daca userul este in lista de frecventi
//             for (let i = 0; i < lnx.length; i++) {
//                 var txt = lnx[i].textContent;
//                 if (txt == $(".om").text()) {
//                     este = 1;
//                 }
//             }


//             if (este == 0) {    //il adauga in lista de frecventi daca nu este
//                 var om = $(".om").text();
//                 var a = `<li class="lom"><span class="name">${om}</span><div class="fas fa-envelope"></div><div class="status"><div class="fas fa-circle"><div class="on-off">offline</div></div></div></li>`
//                 $(".chat-list").prepend(a);

//                 socket.emit("add_friends_list", [om.slice(1), user_name]);
//                 socket.emit("message_chat_first", { from: user_name, to: to_person, user1_seen: 0, user2_seen: 0, mesg: { author: user_name, date: fullt, m: mesaj } })
//                 var first_limesaj = `<li class="left_msg"><div class="ul" style="left:2%;">${fullt}</div><div class="msg">${mesaj}</div></li>`;
//                 $(".chat").append(first_limesaj);
//             } else if (este == 1) {

//                 socket.emit("message_chat", { from: user_name, to: to_person, user1_seen: 0, user2_seen: 0, mesg: { author: user_name, date: fullt, m: mesaj } })
//                 $(".chat").append(limesaj);
//                 sametime();
//             }
//         }


//         if ($('.grup').is(':visible')) {
//             group_users = [];
//             var lnx = $('.group_users .group_usr');  //ia lista cu group members
//             for (let i = 0; i < lnx.length; i++) {
//                 var txt = lnx[i].textContent.slice(1);
//                 group_users.push(txt);
//             }
//             // console.log(group_users);
//             var gr = $(".grup").text();
//             // console.log(gr);
//             var limesaj = `<li class="left_msg"><div class="ul" style="left:2%;">You ${t}</div><div class="msg">${mesaj}</div></li>`;
//             $(".chat").append(limesaj);

//             socket.emit("group_chat", { gr_name: gr, from: user_name, group_memb: group_users, mesg: { author: user_name, date: fullt, m: mesaj } });
//             sametime();
//             //group chat
//         }



//         scrolltobottom();
//         if ($('.smileys').is(':visible')) {
//             $(".smileys").removeClass("smiles-active");
//             $(".fa-smile-beam").removeClass("smile_icon_active");
//         }
//     };
// }

// //send message enter
// $(document).ready(function () {
//     $('.sendmsg_input').on('keypress', function (e) {
//         if (e.which === 13) {
//             insert_message();
//         }
//     });
// });

// //send message sageata
// $(document).ready(function () {
//     $('.fa-paper-plane').click(function () {
//         insert_message();
//     });
// });



// //people menu

// $(document).ready(function () {
//     $('.people_menu').click(function () {
//         $(".fa-chevron-down").toggleClass("toggle-arrow");
//         $('.group_users').animate({ opacity: "toggle" }, "slow");

//     });
// });

// // se ascund windowurile
// $(document).ready(function () {

//     $('.chat-page').on('click', '.sendmsg_input, .lgrup, .lom, .search, .background_pattern, .group-list', function () {

//         if ($('.group_users').is(':visible')) {
//             $(".fa-chevron-down").removeClass("toggle-arrow");
//             $('.group_users').hide();

//             // $(".smileys").css("display","none");
//             // $(".fa-smile-beam").css("color", "white");
//         }
//         if ($('.creategroup-window').is(':visible')) {
//             // $(".creategroup-window").hide();
//             $('.creategroup-window').animate({ opacity: "toggle" }, "slow");
//         }
//     });
// });



// //functie schimbare status online offline new msg
// function status_onoff(person, on) {   // (%person, 1/0)
//     if (on == 1) {
//         for (var i = 0; i < $(".lom").length; i++) {
//             if ($($(".lom")[i]).find(".name").text().slice(1) == person) {
//                 $($(".lom")[i]).find(".on-off").text('online');
//                 $($(".lom")[i]).find(".fa-circle").css("color", "#43A047");
//             }
//         }
//     }
//     else {
//         for (var i = 0; i < $(".lom").length; i++) {
//             if ($($(".lom")[i]).find(".name").text().slice(1) == person) {
//                 $($(".lom")[i]).find(".on-off").text('offline');
//                 $($(".lom")[i]).find(".fa-circle").css("color", "#8d8d8d");
//             }
//         }
//     }

// }
// function status_newmsg(person, newmsg) {  // (%person, 1/0)

//     if (newmsg == 1) {
//         for (var i = 0; i < $(".lom").length; i++) {
//             if ($($(".lom")[i]).find(".name").text().slice(1) == person) {
//                 $($(".lom")[i]).find(".fa-envelope").css("color", "#01bfbf");

//             }
//         }
//     }
//     else {
//         for (var i = 0; i < $(".lom").length; i++) {
//             if ($($(".lom")[i]).find(".name").text().slice(1) == person) {
//                 $($(".lom")[i]).find(".fa-envelope").css("color", "#01bfbf1a");

//             }
//         }
//     }
// };
// function status_newmsg_group(person, newmsg) {  // (%person, 1/0)

//     if (newmsg == 1) {
//         for (var i = 0; i < $(".lgrup").length; i++) {
//             if ($($(".lgrup")[i]).text() == person) {
//                 $($(".lgrup")[i]).find(".fa-envelope").css("color", "#01bfbf");

//             }
//         }
//     }
//     else {
//         for (var i = 0; i < $(".lgrup").length; i++) {
//             if ($($(".lgrup")[i]).text() == person) {
//                 $($(".lgrup")[i]).find(".fa-envelope").css("color", "#01bfbf1a");

//             }
//         }
//     }
// };
//exemple de adaugare online si new message


//logout

$(document).ready(function () {
    $('.logout').click(function () {
        $.ajax({
            url: "/logout",
            type: "GET",
            dataType: 'text'
        });

        setTimeout(
            function () {
                location.reload();
            }, 500);
    });
});


// //search input send ajax 1 second after stop typing 

// var typingTimer;
// var doneTypingInterval = 1000;
// $('.search').on('keyup', function () {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(doneTyping, doneTypingInterval);
// });

// $('.search').on('keydown', function () {
//     clearTimeout(typingTimer);
// });

// function doneTyping() {
//     var src_usr = $('.search').val();

//     var obj = [];
//     var lnx = $('.chat-list .lom .name');
//     for (let i = 0; i < lnx.length; i++) {
//         obj.push(lnx[i].textContent.slice(1));
//     }
//     if (obj.includes(src_usr)) {

//         var lnx = $('.chat-list .lom .name');
//         for (let i = 0; i < lnx.length; i++) {
//             if (lnx[i].textContent.slice(1) == src_usr) {
//                 lnx[i].click();
//             }
//         }
//     } else {
//         $.ajax({
//             url: "/searchuser",
//             type: "POST",
//             dataType: 'text',
//             data: { src_usr: src_usr },
//             success: function (res) {
//                 if (res == "not_exists" || src_usr == user_name) {
//                     $(".fa-times").show().delay(1000).fadeOut();
//                 } else {
//                     $(".fa-check").show().delay(1000).fadeOut();
//                     $(".search").val("");

//                     $('.chat').empty();
//                     $('.om').remove();
//                     $('.grup').remove();
//                     var omdiv = `<div class="om">@${src_usr}</div>`;
//                     $(".people").append(omdiv);
//                     $('.people').css('padding-right', '2%');
//                     $('.people').css('background', '#5154638c');
//                     $('.people_menu').hide();
//                     $('.people').show();
//                     if ($('.begin').is(':visible')) {
//                         $('.begin').animate({ height: "toggle", opacity: "toggle" }, "slow");
//                         $('.right').animate({ height: "toggle", opacity: "toggle" }, "slow");
//                     };

//                     var x = window.matchMedia("(max-width: 750px)");
//                     if (x.matches) {

//                         $(".left").css("display", "none");
//                         $(".right").css("display", "inline");
//                         $(".fa-arrow-left").css("display", "inline");
//                     }
//                 }
//             }
//         });
//     }

// }


// //add new member to group

// $(document).ready(function () {
//     $(document).on('click', '.fa-user-plus', function () {
//         if ($('.add_usr').parent().is(':visible')) {
//             $(".add_usr").parent().remove();
//         } else {

//             var add = `<li class="group_usr"><input class="add_usr" type="text" placeholder="Add username"><i class="fas fa-plus"></i></li>`;
//             $(".group_users").prepend(add);
//         }
//     });



//     $(document).on('click', '.fa-plus', function () {

//         var new_user = $(".add_usr").val();
//         var gn = $(".grup").text();
//         var len = $(".group_usr").length;
//         if ($('.add_usr').is(':visible')) {
//             len = len - 1;
//         }

//         var friends = [];
//         var lnx = $('.chat-list .lom .name');
//         for (let i = 0; i < lnx.length; i++) {
//             friends.push(lnx[i].textContent.slice(1));
//         }

//         var g_users = [];
//         var lnxx = $('.group_users .group_usr');
//         for (let i = 0; i < lnxx.length; i++) {
//             g_users.push(lnxx[i].textContent.slice(1));
//         }
//         var include = 0;

//         if (friends.includes(new_user)) {
//             include = 1;
//         }

//         if (g_users.includes(new_user)) {
//             include = 0;
//         }

//         if (include == 1) {

//             $.ajax({
//                 url: "/add_member_to_group",
//                 type: "POST",
//                 dataType: 'text',
//                 data: { new_memb: new_user, group_name: gn, len: len },
//                 success: function (res) {

//                 }
//             });

//             $(".add_usr").parent().remove();
//             var add = `<li class="group_usr">@${new_user}<i class="far fa-times-circle"></i></li>`;
//             $(".group_users").prepend(add);
//         }
//         else {
//             $(".fa-plus").toggleClass("fa-plus-red");
//             setTimeout(() => {
//                 $(".fa-plus").removeClass("fa-plus-red");
//             }, 2000);
//         }

//     });
// });

// //delete member from group

// $(document).on('click', '.fa-times-circle', function () {
//     var om = $(this).parent().text().slice(1);
//     var gr = $(".grup").text();
//     var len = $(".group_usr").length;
//     if ($('.add_usr').is(':visible')) {
//         len = len - 1;
//     }


//     $.ajax({
//         url: "/delete_member_from_group",
//         type: "POST",
//         dataType: 'text',
//         data: { gr: gr, om: om, len: len },
//         success: function (res) {

//         }
//     });
//     $(this).parent().remove();


// });



// //listen for add to friends list

// socket.on('add_friend_to_list', (data) => {
//     var new_friend = `<li class="lom"><span class="name">@${data}</span><div class="fas fa-envelope"></div><div class="status"><div class="fas fa-circle"><div class="on-off">offline</div></div></div></li>`;
//     $(".chat-list").prepend(new_friend);
//     status_newmsg(data, 1);
//     status_onoff(data, 1);
// });

// //listen for onoff

// socket.on('onoff_client', (data) => {//status online offline users
//     for (i in data) {

//         for (var j in data[i]) {
//             status_onoff(j, data[i][j]);
//             // console.log(j +" " +data[i][j]);
//         }
//     }
// });


// //populate chat messages when open a chat with a user
// socket.on('populate_msgs', (data) => {
//     // console.log(data);

//     for (var i in data) {
//         if (typeof data[i - 1] === 'undefined') {
//             if (data[i].author == user_name) {
//                 var p = `<li class="left_msg"><div class="ul" style="left:2%;">${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                 $('.chat').append(p);

//             } else {
//                 var p = `<li class="right_msg"><div class="ul" style="right:2%;">${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                 $('.chat').append(p);

//             }
//         }
//         else {
//             if (data[i - 1].date.substr(0, data[i - 1].date.indexOf(' ')) == data[i].date.substr(0, data[i - 1].date.indexOf(' '))) {
//                 if (data[i].author == user_name) {
//                     var p = `<li class="left_msg"><div class="ul" style="left:2%;">${data[i].date.substr(data[i].date.indexOf(' ') + 1)}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 } else {
//                     var p = `<li class="right_msg"><div class="ul" style="right:2%;">${data[i].date.substr(data[i].date.indexOf(' ') + 1)}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 }
//             } else {
//                 if (data[i].author == user_name) {
//                     var p = `<li class="left_msg"><div class="ul" style="left:2%;">${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 } else {
//                     var p = `<li class="right_msg"><div class="ul" style="right:2%;">${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 }
//             }

//         }

//     }
//     scrolltobottom();
//     sametime();
// });

//listen for message real time
// socket.on('message_client', (data) => {
//     // console.log(data);
//     if ($('.people').is(':visible')) {
//         if ($(".om").text().slice(1) == data.author) {

//             var p = `<li class="right_msg"><div class="ul" style="right:2%;">${data.date.substr(data.date.indexOf(' ') + 1)}</div><div class="msg">${data.m}</div></li>`
//             $('.chat').append(p);
//             sametime();

//         } else {
//             status_newmsg(data.author, 1);
//         }
//     } else {
//         status_newmsg(data.author, 1);
//     }
//     scrolltobottom();
// });


// socket.on('seen_client', (data) => {//seen status update
//     for (var i in data) {
//         if ($('.people').is(':visible')) {
//             if ($(".om").text().slice(1) == Object.keys(data)[0]) {

//                 socket.emit("remove_seen", { from: user_name, to: $(".om").text().slice(1) });

//             } else {
//                 status_newmsg(Object.keys(data)[0], data[i]);
//             }
//         } else {
//             status_newmsg(Object.keys(data)[0], data[i]);
//         }

//     }

// });



// socket.on('add_group', (data) => {//status online offline users
//     var gdiv = `<li class="lgrup">${data}<div class="status"><div class="fas fa-envelope"></div></div></li>`;
//     $(".group-list").prepend(gdiv);
// });

// socket.on('remove_group', (data) => {//status online offline users
//     console.log(data);
//     $(`.lgrup:contains(${data})`).remove();

//     if ($('.grup').is(':visible')) {
//         if ($(".grup").text() == data) {
//             $(".grup").remove();
//             $(".begin").css("display", "block");
//             $(".right").css("display", "none");
//         }
//     };
//     // var gdiv = `<li class="lgrup">${data}<div class="status"><div class="fas fa-envelope"></div></div></li>`;
//     // $(".group-list").prepend(gdiv);
// });

// socket.on('populate_group', (data) => {//populate group
//     for (var i in data) {
//         if (typeof data[i - 1] === 'undefined') {
//             if (data[i].author == user_name) {
//                 var p = `<li class="left_msg"><div class="ul" style="left:2%;">You ${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                 $('.chat').append(p);

//             } else {
//                 var p = `<li class="right_msg"><div class="ul" style="right:2%;">@${data[i].author} ${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                 $('.chat').append(p);

//             }
//         }
//         else {
//             if (data[i - 1].date.substr(0, data[i - 1].date.indexOf(' ')) == data[i].date.substr(0, data[i - 1].date.indexOf(' '))) {
//                 if (data[i].author == user_name) {
//                     var p = `<li class="left_msg"><div class="ul" style="left:2%;">You ${data[i].date.substr(data[i].date.indexOf(' ') + 1)}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 } else {
//                     var p = `<li class="right_msg"><div class="ul" style="right:2%;">@${data[i].author} ${data[i].date.substr(data[i].date.indexOf(' ') + 1)}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 }
//             } else {
//                 if (data[i].author == user_name) {
//                     var p = `<li class="left_msg"><div class="ul" style="left:2%;">You ${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 } else {
//                     var p = `<li class="right_msg"><div class="ul" style="right:2%;">@${data[i].author} ${data[i].date}</div><div class="msg">${data[i].m}</div></li>`
//                     $('.chat').append(p);
//                 }
//             }

//         }

//     }
//     scrolltobottom();
//     sametime();

// });


// socket.on('seen_client_group', (data) => {//seen status update
//     // console.log(data);
//     for (var i in data) {
//         if ($('.people').is(':visible')) {
//             if ($(".grup").text() == Object.keys(data)[0]) {

//                 socket.emit("remove_seen_group", { from: user_name, to: $(".grup").text() });

//             } else {
//                 status_newmsg_group(Object.keys(data)[0], data[i]);
//             }
//         } else {
//             status_newmsg_group(Object.keys(data)[0], data[i]);
//         }

//     }

// });


// //listen for group message real time
// socket.on('group_message_client', (data) => {
//     // console.log(data);
//     if ($('.people').is(':visible')) {
//         if ($(".grup").text() == data[0]) {

//             var p = `<li class="right_msg"><div class="ul" style="right:2%;">${data[1].author} ${data[1].date.substr(data[1].date.indexOf(' ') + 1)}</div><div class="msg">${data[1].m}</div></li>`
//             $('.chat').append(p);
//             sametime();

//         } else {
//             status_newmsg_group(data[0], 1);
//         }
//     } else {
//         status_newmsg_group(data[0], 1);
//     }
//     scrolltobottom();
// });


























































$(document).ready(function () {



    // // bootstrap
    // var inputRow = document.querySelector("#inputrow").cloneNode(true);
    // var valRow = document.querySelector("#valrow").cloneNode(true);

    // $("[data-input]").append(inputRow.innerHTML);

    // $("[data-hidden]").append(valRow.innerHTML);

    // function setContentEditable() {
    //     $('tr[data-input="true"] > td.ce').attr("contenteditable", "true");
    //     $("td.ce span.placeholder").attr("contenteditable", "false");
    //     return;
    // }

    // // Set appended row editable
    // setContentEditable();

    // // Bind each content cell to (hidden) cell
    // $("[data-input] td").each(function (i, el) {
    //     var ph = $(".placeholder")[i];
    //     $(el).on("input", function (e) {
    //         console.log(ph, i);
    //         var bindText = text => {
    //             let cell = $("[data-hidden] td")[i];
    //             $(cell).text(text);
    //         };
    //         $(ph).detach();
    //         bindText(e.target.innerText);
    //     });
    // });

    // // Add new row
    // $("button[data-save]").on("click", function (e) {
    //     $("[data-hidden] td").each(function (i, el) {
    //         if ($(el).text() === "") {
    //             $(el).text("null");
    //         }
    //     });

    //     var prenume = $('.prenume').text();
    //     var nume = $('.nume').text();
    //     var middle = $('.middle').text();
    //     var cnp = $('.cnp').text();
    //     var type = $('.type').text();
    //     var materie = $('.materie').text();
    //     var grupa = $('.grupa').text();

    //     $("[data-hidden]").removeAttr("data-hidden");
    //     $("[data-input]").html("");
    //     var html = $("#inputrow").html();
    //     $("[data-input]").html(html);
    //     $("<tr data-hidden></tr>").
    //         insertBefore("[data-input]").
    //         append(valRow.innerHTML);
    //     setContentEditable();


    //     parola = prenume + cnp.slice(-4)


    //     $.ajax({
    //         url: "/regadd",
    //         type: "POST",
    //         dataType: 'text',
    //         data: { add: 1, prenume: prenume, nume: nume, middle: middle, parola: parola, cnp: cnp, type: type, materie: materie, grupa: grupa },
    //         success: function (res) {

    //         }
    //     });


    // });






    function populate_note() {


        profesori = {}


        $.ajax({
            url: "/populate_note",
            type: "POST",
            dataType: 'text',
            data: { username: user_name },
            success: function (res) {


                materie = JSON.parse(res)[0].materie

                $.ajax({
                    url: "/ia_profesori",
                    type: "POST",
                    dataType: 'text',
                    data: {},
                    success: function (ress) {
                        index = 1
                        // console.log(JSON.parse(ress).length)
                        for (var i = 0; i < JSON.parse(ress).length; i++) {
                            mat = JSON.parse(ress)[i].materie
                            // console.log(mat)
                            real_mat = ""
                            // console.log("aaaa"+JSON.parse(res)[0].materie.length)
                            h = 0
                            for (var j = 0; j < JSON.parse(res)[0].materie.length; j++){
                                // console.log(Object.keys(JSON.parse(res)[0].materie[i])[0]+ " " + mat)
                                if (Object.keys(JSON.parse(res)[0].materie[j]) == mat){
                                    real_mat = JSON.parse(res)[0].materie[j]
                                    h = j
                                    break;
                                    console.log("aici")
                                    console.log(real_mat)
                                    
                                }

                            }
                            // console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
                            // console.log(Object.values(JSON.parse(res)[0].materie[h])[0])
                            var ora = `<tr><td>${index}</td><td contenteditable="false">${JSON.parse(ress)[i].materie}<td contenteditable="false">${JSON.parse(ress)[i].prenume + " " + JSON.parse(ress)[i].nume}</td><td contenteditable="false">${JSON.parse(ress)[i].username}</td><td contenteditable="false" class="note_student">${Object.values(JSON.parse(res)[0].materie[h])[0]}</td></tr>`;

                            $(".tabeleditabil").append(ora);
                            index = index + 1

                        }
                        // console.log(JSON.parse(res)[0].materie)
                        //   materie = JSON.parse(res)[0].materie





                            // console.log(JSON.parse(ress)[i].materie)
                            // console.log(JSON.parse(ress)[i].nume)
                            // console.log(JSON.parse(ress)[i].prenume)
                            // console.log(JSON.parse(ress)[i].username)



                    }
                });


            }
        });








    }
    populate_note()







});
