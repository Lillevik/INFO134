/**
 * Skrevet av kanditat 141.
 */

function show_menu(){
    var mobile_nav = $(".menu-list");
    if(mobile_nav.hasClass('open')){
        mobile_nav.removeClass('open');
        mobile_nav.css('right','-200px');
    }else{
        mobile_nav.addClass('open');
        mobile_nav.css('right','0');
    }
}


