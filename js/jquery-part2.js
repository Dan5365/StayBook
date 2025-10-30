// jquery-part2.js
$(function () {
  console.log("jQuery Part 2 ready!");

  /* =========================
     Task 4: Scroll Progress Bar
     ========================= */
  function updateScrollProgress() {
    var docH = $(document).height();
    var winH = $(window).height();
    var scrolled = $(window).scrollTop();
    var percent = 0;
    if (docH > winH) {
      percent = Math.min(100, Math.max(0, (scrolled / (docH - winH)) * 100));
    }
    $('#scrollProgress .bar').css('width', percent + '%');
  }
  $(window).on('scroll resize', updateScrollProgress);
  updateScrollProgress(); 

  /* =========================
     Task 5: Animated Number Counter
     - Runs once when the #stats section comes into view
     ========================= */
  var countersStarted = false;
  function inView($el) {
    if (!$el.length) return false;
    var top = $el.offset().top;
    var bottom = top + $el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return bottom > viewportTop && top < viewportBottom;
  }

  function startCounters() {
    if (countersStarted) return;
    if (!inView($('#stats'))) return;

    countersStarted = true;
    $('.stat .num').each(function () {
      var $num = $(this);
      var target = parseInt($num.data('target'), 10) || 0;
      var duration = 1200;          
      var steps = 40;                 
      var stepTime = Math.floor(duration / steps);
      var current = 0;
      var increment = Math.ceil(target / steps);

      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        $num.text(current);
      }, stepTime);
    });
  }

  $(window).on('scroll resize', startCounters);
  startCounters(); 

  /* =========================
     Task 6: Loading spinner on Submit
     - Add class .js-simulate-submit to any form you want this on
     ========================= */
  $('form.js-simulate-submit').on('submit', function (e) {
    e.preventDefault(); // simulate server call
    var $form = $(this);
    var $btn = $form.find('button[type="submit"], input[type="submit"]');
    var $spinner = $btn.find('.spinner');
    var $text = $btn.find('.btn-text');

    $btn.prop('disabled', true).addClass('is-loading');
    if ($spinner.length) $spinner.removeClass('hidden');
    if ($text.length) $text.text('Please wait...');

    setTimeout(function () {
      
      $btn.prop('disabled', false).removeClass('is-loading');
      if ($spinner.length) $spinner.addClass('hidden');
      if ($text.length) $text.text('Submit');

      

      
      var $note = $('<div class="mini-toast">Form submitted (simulated)</div>');
      $('body').append($note);
      setTimeout(function () { $note.fadeOut(300, function(){ $(this).remove(); }); }, 1000);
    }, 1200); 
  });
});
