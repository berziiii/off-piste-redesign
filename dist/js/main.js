//===============ROTATE WORDS================//

var html = '';
var words = [
  {Title: ' Web Designer.'},
  {Title: ' Ski Coach.'},
  {Title: ' Longboarder.'},
  {Title: ' Problem-Solver.'},
  {Title: ' Baltimorean.'},
  {Title: ' Do-It-Yourselfer.'},
  {Title: ' Innovator.'},
  {Title: ' Technologist.'}
  ];

function rotateWord(word) {

  var ret = '';

  ret += '<span id="animateWord" class="rotating-word">' + word.Title + '</span>';
  return ret;
}

  for (var i = 0; i < words.length; i++) {
    html += rotateWord(words[i]);
  }

  $('#rotateWord').html(html);


$(document).ready(function() {
  $('#rotateWord span:nth-child(1)').addClass('active-word');
  $('#rotateWord span:nth-child(1)').removeClass('rotating-word');

});

setInterval(function() {

    var active = $('.active-word');
    var lastChild = $('.active-word').is('#animateWord:last-child');

    if (lastChild) {

        active.removeClass('active-word');
        active.addClass('rotating-word');
        $('#animateWord:first-child').addClass('active-word');
        $('#animateWord:first-child').removeClass('rotating-word');
        return true;

    } else {

        active.removeClass('active-word');
        active.addClass('rotating-word');
        active.next().removeClass('rotating-word');
        active.next().addClass('active-word');
        return true;
    }

  }, 3500);

//============Easy Scroll=============//

$('a[href*=#]:not([href=#])').click(function() {

  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 112
      }, 1000);
      return false;
    }
  }
});


$('#tastyr').on('click', function() {
  $('#tastyr-modal').openModal();
});

$(document).ready(function(){
  $('.slider').slider({full_width: true});
});
