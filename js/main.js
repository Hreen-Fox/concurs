window.onload = function () {
    $('#preload').hide("fade");
};
let slideIndex = 1; // СЛАЙДЕР
let selectSlider;
let selectSliderOld;
let firstload = true;
let intSelectSledi = 1;
let intSelectSlediOld = 1;
// СМЕНА БЛОКОВ
let blocks = [document.getElementById('block1'),document.getElementById('block2'),document.getElementById('block3')];
let selectBlock = 0;
let oldSelectBlock = 0;
let switchBlock = true;

for(g in blocks){
    $(g).css('opacity', 0);
}
$(blocks[0]).css('opacity',1);

$('#btnMenu').on('click',e=>{
    /*$('#menuPanel').css('display','block').animate({
        opacity: '1'
    }, 500);*/
    $('#menuPanel').show('slide',500);
    $('#btnMenu').hide('fade',500);
});
$('#closeMenu').on('click',e=>{
    /*$('#menuPanel').animate({
        opacity: '0'
    }, 500,()=>{$('#menuPanel').css('display','none')});*/
    $('#menuPanel').hide('slide',500);
    $('#btnMenu').show('fade',500);
});
// ПЕРВЫЙ БЛОК
$('#arrowBlock1').on('click', e=>{
    $(blocks[0]).animate({
        top: '-100vh'
    }, 1000, function () {
        // Animation complete.
    });
    $(blocks[1]).animate({
        top: '0'
    }, 1000, function () {
        // Animation complete.
    });
    selectBlock += 1;
})
// СЛАЙДЕР
showSlides(slideIndex);
function plusSlides(n) {
    intSelectSlediOld = intSelectSledi;
    intSelectSledi += n;
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    intSelectSlediOld = intSelectSledi;
    intSelectSledi = n;
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length){
        slideIndex = 1;
        intSelectSlediOld = intSelectSledi;
        intSelectSledi = 1;
    }
    if (n < 1){
        intSelectSlediOld = intSelectSledi;
        intSelectSledi = slides.length;
        slideIndex = slides.length;
    } 
    $('#countInt').text(intSelectSledi);
    $('#countName').text(intSelectSledi);
    if(firstload){
        for (i = 0; i < slides.length; i++) {
            slides[i].style.top = (-100 * i) + '%';
            slides[i].style.right = '-100%';
        }
        slides[0].style.right = '0';
    }

    selectSliderOld = selectSlider
    selectSlider = slides[slideIndex - 1];

    if(firstload == false){
        $(selectSlider).animate({
            right: '0%'
        },1000,e=>{});
        if(intSelectSledi > intSelectSlediOld)
            $(selectSliderOld).animate({
                right: '100%'
            },1000,e=>{});
        else
            $(selectSliderOld).animate({
                right: '-100%'
            },1000,e=>{});
    }else firstload = false;
    

}
// СМЕНА БЛОКОВ
function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", handler);
        } else {
            // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
            elem.addEventListener("MozMousePixelScroll", handler);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", handler);
    }
}
addOnWheel(document.getElementById('body'), function (e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;
    oldSelectBlock = selectBlock;
    if (delta > 0) selectBlock += 1;
    else selectBlock -= 1;
    if(selectBlock < 0) {
        selectBlock = 0;
        return;
    }
    if(selectBlock > (blocks.length - 1)) {
        selectBlock = (blocks.length - 1);
        return;
    }

    $(blocks[oldSelectBlock]).animate({
        'opacity':'0'
    }, 500,e=>{
        $(blocks[oldSelectBlock]).css('display','none')
    });
    $(blocks[selectBlock]).css('display','flex').animate({
        'opacity':'1'
    }, 500);
});