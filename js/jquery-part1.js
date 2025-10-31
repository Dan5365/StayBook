// jquery-part1.js
// Task 0: jQuery ready check, menu search
$(function () {
  console.log("jQuery is ready! (Dining page)");

  
  var items = [];
  
  $('.amenities#menu .card h3').each(function () {
    items.push($(this).text().trim());
  });

  // --- Helpers ---

  
  function showSuggestions(q) {
    var $list = $('#menuSuggestions').empty();
    if (!q) { $list.hide(); return; }

    var lower = q.toLowerCase();
    var matches = items
      .filter(function (name) { return name.toLowerCase().indexOf(lower) === 0; })
      .slice(0, 5);

    if (matches.length) {
      matches.forEach(function (name) {
        $('<li></li>').text(name).appendTo($list);
      });
      $list.show();
    } else {
      $list.hide();
    }
  }

  
  function clearHighlights() {
    $('.amenities#menu .card').each(function () {
      var $h3 = $(this).find('h3');
      var $p = $(this).find('p');
      $h3.html($h3.text()); 
      $p.html($p.text());
    });
  }

  
  function highlight(q) {
    if (!q) return;
    
    var safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('(' + safe + ')', 'ig');

    $('.amenities#menu .card').each(function () {
      var $h3 = $(this).find('h3');
      var $p = $(this).find('p');

      $h3.html($h3.text().replace(regex, '<mark>$1</mark>'));
      $p.html($p.text().replace(regex, '<mark>$1</mark>'));
    });
  }

  // --- Events ---

  // Task 1: Real-time search & live filter (keyup/input)
  $('#menuSearchInput').on('keyup input', function () {
    var q = $(this).val().trim().toLowerCase();

    
    $('.amenities#menu .card').each(function () {
      var text = $(this).text().toLowerCase();
      $(this).toggle(text.indexOf(q) !== -1);
    });

    // Task 2: Autocomplete suggestions
    showSuggestions(q);

    // Task 3: Search highlighting
    clearHighlights();
    if (q) highlight(q);
  });

  
  $('#menuSuggestions').on('click', 'li', function () {
    var text = $(this).text();
    $('#menuSearchInput').val(text).trigger('input');
    $('#menuSuggestions').hide();
  });

  
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#menu-search').length) {
      $('#menuSuggestions').hide();
    }
  });
});
