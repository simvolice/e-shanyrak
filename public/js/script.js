/*  Table of Contents 
01. MENU ACTIVATION
02. MOBILE NAVIGATION ACTIVATION
03. FLEXSLIDER LANDING PAGE
04. SCROLL TO TOP BUTTON
05. Registration Page On/Off Clickable Items
*/

jQuery(document).ready(function($) {
	 'use strict';


    var web3 = new Web3('http://localhost:8545');








    /*
    =============================================== 01. MENU ACTIVATION  ===============================================
    */
	 jQuery('nav#site-navigation-pro ul.sf-menu, nav#sidebar-nav ul.sf-menu').superfish({
			 	popUpSelector: 'ul.sub-menu, .sf-mega', 	// within menu context
	 			delay:      	200,                	// one second delay on mouseout
	 			speed:      	0,               		// faster \ speed
		 		speedOut:    	200,             		// speed of the closing animation
				animation: 		{opacity: 'show'},		// animation out
				animationOut: 	{opacity: 'hide'},		// adnimation in
		 		cssArrows:     	true,              		// set to false
			 	autoArrows:  	true,                    // disable generation of arrow mark-up
		 		disableHI:      true,
	 }).supposition();
	 
	 
	 
	 /* Sticky Landing Page Header */
	 $('header.sticky-header').scrollToFixed({
		 minWidth:768
	 });
	 
	 
	 /* Remove Fixed Heading on Mobile */
 	$(window).resize(function() {
 	   var width_progression = $(document).width();
 	      if (width_progression < 768) {
			  $('header.sticky-header').trigger('detach.ScrollToFixed');
		  }
 	}).resize();
	 
	 /* Sitcky Video Sidebar */
	 $('nav#sidebar-nav.sticky-sidebar-js').hcSticky({
		 top:0
	 });
	 
	 
	 
/*
=============================================== 02. MOBILE NAVIGATION ACTIVATION  ===============================================
*/
 	$('#mobile-bars-icon-pro').click(function(e){
 		e.preventDefault();
 		$('#mobile-navigation-pro').slideToggle(350);
 		$("header#masthead-pro").toggleClass("active-mobile-icon-pro");
		$("header#videohead-pro").toggleClass("active-mobile-icon-pro");
 	});
	
	
   	$('ul#mobile-menu-pro').slimmenu({
   	    resizeWidth: '90000',
   	    collapserTitle: 'Menu',
   	    easingEffect:'easeInOutQuint',
   	    animSpeed:350,
   	    indentChildren: false,
   		childrenIndenter: '- '
   	});
	 
/*
=============================================== 03. FLEXSLIDER LANDING PAGE  ===============================================
*/

	 	 
/*
=============================================== 04. SCROLL TO TOP BUTTON  ===============================================
*/
	 
   	// browser window scroll (in pixels) after which the "back to top" link is shown
   	var offset = 150,
  	
 	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
   	offset_opacity = 1200,
  	
 	//duration of the top scrolling animation (in ms)
   	scroll_top_duration = 700,
  	
 	//grab the "back to top" link
   	$back_to_top = $('#pro-scroll-top');

 	//hide or show the "back to top" link
 	$(window).scroll(function(){
   		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
   		if( $(this).scrollTop() > offset_opacity ) { 
   			$back_to_top.addClass('cd-fade-out');
   		}
   	});

 	//smooth scroll to top
 	$back_to_top.on('click', function(event){
 		event.preventDefault();
 		$('body,html').animate({ scrollTop: 0 , }, scroll_top_duration
 	);
 	});


/*
=============================================== 05. Registration Page On/Off Clickable Items  ===============================================
*/
	
	$("ul.registration-invite-friends-list li").click(function() { 
	    $(this).closest("ul.registration-invite-friends-list li").toggleClass("active");
	});
	
	$("ul.registration-genres-choice li").click(function() { 
	    $(this).closest("ul.registration-genres-choice li").toggleClass("active");
	});


    $("#regBtn").on("click", function () {


        web3.eth.personal.newAccount($("#passwordreg").val())
            .then(sendRegDataToAPI);


    });


	function sendRegDataToAPI(address) {
        $.ajax({
            url: '/adduser',
            method: 'POST',
            data: {email: $("#emailreg").val(), fio: $("#full-name").val(), pass: $("#passwordreg").val(), address: address},
            // data: JSON.stringify({var:'val'}), // send data in the request body
            // contentType: "application/json; charset=utf-8",  // if sending in the request body
            dataType: 'json'
        }).done(function(data, textStatus, jqXHR) {
            if (data.code === 0) {



            	$("#regForm").css("display", "none");


			}
        });


    }


    $("#enterBtn").on("click", function () {


        $.ajax({
            url: '/auth',
            method: 'POST',
            data: {email: $("#email").val(), pass: $("#password").val()},
            // data: JSON.stringify({var:'val'}), // send data in the request body
            // contentType: "application/json; charset=utf-8",  // if sending in the request body
            dataType: 'json'
        }).done(function(data, textStatus, jqXHR) {

        	if (data.code === 0) {

        		localStorage.setItem("sessionToken", data.sessionToken);
        		localStorage.setItem("address", data.address);
        		localStorage.setItem("fio", data.fio);
        		localStorage.setItem("role", data.role);



        		if (data.role === "gos") {


                    window.location.replace("/portal/#!/maingos");

				} else if (data.role === "cms") {


                    window.location.replace("/portal/#!/maincms");


                } else if (data.role === "user"){

                    window.location.replace("/portal/#!/home");

				}else if (data.role === "ksk"){

                    window.location.replace("/portal/#!/mainksk");

                }else if (data.role === "sem"){

                    window.location.replace("/portal/#!/mainsem");

                }





			} else  {

        		$("#passerr").css("color", "red");
        		$("#passerr").text("Не удается войти.\n" +
                    "Пожалуйста, проверьте правильность написания логина и пароля.");

			}




        });


    });
	 	 
});