/**
 * Created by goat on 24/01/17.
 */


function show_menu(){
    var mobile_nav = $(".mobile-navigation");
    if(mobile_nav.hasClass('open')){
        mobile_nav.removeClass('open');
    }else{
        mobile_nav.addClass('open');
    }

}