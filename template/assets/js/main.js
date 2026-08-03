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

  $('.body-section-02__action').on('click', function () {
    var $button = $(this);
    var selected = !$button.hasClass('is-selected');
    $button.toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false');
    $('.body-section-02__status').text($button.data('product') + (selected ? ' added to bag.' : ' removed from bag.'));
  });

  (function () {
    var campaigns = ['Tonal riot', 'Quiet structure', 'Modern heritage'];
    var current = 0;
    $('.body-section-04__ticker button').on('click', function () {
      current = (current + ($(this).data('direction') === 'next' ? 1 : -1) + campaigns.length) % campaigns.length;
      $('.body-section-04__ticker strong').text(campaigns[current]);
      $('.body-section-04__status').text(campaigns[current] + ' campaign selected.');
    });
  })();

  $('.body-section-08__category-list button').on('click', function () {
    var $button = $(this);
    var category = $button.data('category');
    var image = $button.data('image');
    var $buttons = $('.body-section-08__category-list button');
    $buttons.removeClass('is-active').attr('aria-pressed', 'false');
    $button.addClass('is-active').attr('aria-pressed', 'true');
    $('.body-section-08__category-preview img')
      .attr('src', 'assets/images/' + image)
      .attr('alt', category + ' selection');
    $('.body-section-08__status').text(category + ' category selected.');
  });
  $('.body-section-11__details button').on('click', function () {
    var $button = $(this);
    var selected = !$button.hasClass('is-selected');
    $button.toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false');
    $('.body-section-11__status').text('Costume Luis ' + (selected ? 'saved.' : 'removed from saved items.'));
  });
  $('.body-section-12__qty button').on('click', function () {
    var $button = $(this);
    var $row = $button.closest('.body-section-12__cart-row');
    var $value = $row.find('.body-section-12__qty span');
    var quantity = Math.max(1, Number($value.text()) + Number($button.data('step')));
    $value.text(quantity);
    var total = 0;
    $('.body-section-12__cart-row').each(function () {
      total += Number($(this).data('price')) * Number($(this).find('.body-section-12__qty span').text());
    });
    $('.body-section-12__subtotal strong').text(total.toLocaleString('en-US').replace(/,/g, ' ') + ' ₽');
    $('.body-section-12__status').text('Cart subtotal updated to ' + total.toLocaleString('en-US') + ' rubles.');
  });

  $('.body-section-12__phone--checkout form button').on('click', function () {
    $('.body-section-12__status').text('Checkout details confirmed.');
  });})(jQuery);
