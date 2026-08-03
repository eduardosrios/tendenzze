(function ($) {
  'use strict';

  var $searchButton = $('.catalogue-panel__search');
  var $searchForm = $('.catalogue-panel__search-form');
  var $searchInput = $('#catalogue-search-input');

  function closeSearch() {
    $searchForm.attr('hidden', true);
    $searchButton.attr('aria-expanded', 'false').trigger('focus');
  }

  $searchButton.on('click', function () {
    $searchForm.removeAttr('hidden');
    $searchButton.attr('aria-expanded', 'true');
    window.setTimeout(function () {
      $searchInput.trigger('focus');
    }, 20);
  });

  $('.catalogue-panel__search-close').on('click', closeSearch);

  $searchForm.on('submit', function (event) {
    event.preventDefault();
    var query = String($searchInput.val() || '').trim();
    $('#catalogue-status').text(query ? 'Search prepared for ' + query + '.' : 'Enter a catalogue search term.');
    if (query) {
      closeSearch();
    }
  });

  $('.catalogue-panel__view').on('click', function () {
    var $button = $(this);
    $('.catalogue-panel__view').removeClass('is-selected');
    $button.addClass('is-selected');
    $('#catalogue-status').text($button.data('product') + ' selected.');
  });

  $('.hero-section-2 .hero-section-2__product-card button').on('click', function () {
    var $button = $(this);
    var name = $button.closest('.hero-section-2__product-card').find('p').first().text();
    $('.hero-section-2 .hero-section-2__product-card button').removeClass('is-selected');
    $button.addClass('is-selected');
    $('.hero-section-2 .hero-section-2__status').text(name + ' selected from Edition 01.');
  });
})(jQuery);
