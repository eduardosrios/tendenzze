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
  });
  $('.body-section-18__add').on('click', function () {
    var $button = $(this);
    var added = !$button.hasClass('is-added');
    $button.toggleClass('is-added', added).attr('aria-pressed', added ? 'true' : 'false').text(added ? 'Added' : 'Add to cart');
    $('.body-section-18__status').text(added ? 'Skinny Double-Wrap Belt added to cart.' : 'Skinny Double-Wrap Belt removed from cart.');
  });
  $('.body-section-19__play').on('click', function () {
    var $button = $(this);
    var playing = !$button.hasClass('is-playing');
    $button.toggleClass('is-playing', playing).attr('aria-pressed', playing ? 'true' : 'false').attr('aria-label', playing ? 'Pause campaign film' : 'Play campaign film');
    $button.find('i').toggleClass('fa-play', !playing).toggleClass('fa-pause', playing);
    $('.body-section-19__status').text(playing ? 'Campaign film playing.' : 'Campaign film paused.');
  });
  $('.body-section-20__favorite').on('click', function () {
    var $button = $(this);
    var selected = !$button.hasClass('is-selected');
    var product = $button.data('product');
    $button.toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false').attr('aria-label', (selected ? 'Remove ' : 'Save ') + product);
    $button.find('i').toggleClass('fa-regular', !selected).toggleClass('fa-solid', selected);
    $('.body-section-20__status').text(product + (selected ? ' saved.' : ' removed from saved items.'));
  });
  (function () {
    var editorialSlides = ['hero-editorial.jpg', 'catalogue-model.jpg', 'catalogue-bag.jpg'];
    var editorialIndex = 0;
    $('.body-section-21__mobile header button').on('click', function () {
      editorialIndex = (editorialIndex + ($(this).data('direction') === 'next' ? 1 : -1) + editorialSlides.length) % editorialSlides.length;
      $('.body-section-21__mobile header span').text(String(editorialIndex + 1).padStart(2, '0') + '/');
      $('.body-section-21__mobile-body>img').attr('src', 'assets/images/' + editorialSlides[editorialIndex]).attr('alt', 'Tendenzze editorial slide ' + (editorialIndex + 1));
      $('.body-section-21__status').text('Editorial slide ' + (editorialIndex + 1) + ' selected.');
    });
  })();
  $('.body-section-24__product button').on('click', function () {
    var $button = $(this);
    var added = !$button.hasClass('is-added');
    var product = $button.data('product');
    $button.toggleClass('is-added', added).attr('aria-pressed', added ? 'true' : 'false').attr('aria-label', (added ? 'Remove ' : 'Add ') + product);
    $button.find('i').toggleClass('fa-plus', !added).toggleClass('fa-check', added);
    $('.body-section-24__status').text(product + (added ? ' added to bag.' : ' removed from bag.'));
  });
  $('.body-section-27__bag').on('click', function () {
    var $button = $(this);
    var added = !$button.hasClass('is-added');
    var product = $button.data('product');
    $button.toggleClass('is-added', added).attr('aria-pressed', added ? 'true' : 'false').attr('aria-label', (added ? 'Remove ' : 'Add ') + product);
    $button.find('i').toggleClass('fa-bag-shopping', !added).toggleClass('fa-check', added);
    $('.body-section-27__status').text(product + (added ? ' added to bag.' : ' removed from bag.'));
  });
  $('.body-section-30__more').on('click', function () {
    var $button = $(this);
    var expanded = !$button.hasClass('is-active');
    $button.toggleClass('is-active', expanded).attr('aria-expanded', expanded ? 'true' : 'false').text(expanded ? 'Show less' : 'Show more');
    $('.body-section-30__status').text(expanded ? 'The complete seasonal assortment is available.' : 'The seasonal assortment is condensed.');
  });
  $('.body-section-32__product button').on('click', function () {
    var $button = $(this);
    var saved = !$button.hasClass('is-saved');
    var product = $button.data('product');
    $button.toggleClass('is-saved', saved).attr('aria-pressed', saved ? 'true' : 'false').attr('aria-label', (saved ? 'Remove ' : 'Save ') + product);
    $('.body-section-32__status').text(product + (saved ? ' saved.' : ' removed from saved items.'));
  });
  $('.body-section-38__arrow').on('click', function () {
    var $gallery = $('.body-section-38__gallery');
    var $cards = $gallery.children('article');
    if ($(this).data('direction') === 'next') {
      $cards.first().appendTo($gallery);
    } else {
      $cards.last().prependTo($gallery);
    }
    $('.body-section-38__status').text('Dress categories reordered ' + $(this).data('direction') + '.');
  });  $('.body-section-40__category button').on('click', function () {
    var $button = $(this);
    var $category = $button.closest('.body-section-40__category');
    var opening = !$category.hasClass('is-open');
    $category.siblings('.body-section-40__category').removeClass('is-open').find('button').attr('aria-expanded', 'false').find('i').removeClass('fa-minus').addClass('fa-plus');
    $category.siblings('.body-section-40__category').children('div').attr('hidden', true);
    $category.toggleClass('is-open', opening);
    $button.attr('aria-expanded', opening ? 'true' : 'false').find('i').toggleClass('fa-minus', opening).toggleClass('fa-plus', !opening);
    $category.children('div').attr('hidden', !opening);
    $('.body-section-40__status').text($button.find('span').text() + (opening ? ' category expanded.' : ' category collapsed.'));
  });  $('.body-section-42__products button').on('click', function () {
    var $button = $(this);
    var added = !$button.hasClass('is-added');
    var product = $button.data('product') || 'Product';
    $button.toggleClass('is-added', added).attr('aria-pressed', added ? 'true' : 'false').attr('aria-label', (added ? 'Remove ' : 'Add ') + product);
    $button.find('i').toggleClass('fa-plus', !added).toggleClass('fa-check', added);
    $('.body-section-42__status').text(product + (added ? ' added to bundle.' : ' removed from bundle.'));
  });  $('.body-section-43__navigation button').on('click', function () {
    var $products = $('.body-section-43__products');
    var $cards = $products.children('article');
    var direction = $(this).data('direction');
    if (direction === 'next') {
      $cards.first().appendTo($products);
    } else {
      $cards.last().prependTo($products);
    }
    $('.body-section-43__status').text('Featured products reordered ' + direction + '.');
  });  $('.body-section-45__grid button').on('click', function () {
    var $button = $(this);
    var saved = !$button.hasClass('is-saved');
    var product = $button.data('product');
    $button.toggleClass('is-saved', saved).attr('aria-pressed', saved ? 'true' : 'false').attr('aria-label', (saved ? 'Remove ' : 'Save ') + product);
    $button.find('i').toggleClass('fa-regular', !saved).toggleClass('fa-solid', saved);
    $('.body-section-45__status').text(product + (saved ? ' saved.' : ' removed from saved items.'));
  });
  $('.body-section-45__mini-nav button').on('click', function () {
    var $products = $('.body-section-45__mini-products');
    var $cards = $products.children('article');
    var direction = $(this).data('direction');
    if (direction === 'next') {
      $cards.first().appendTo($products);
    } else {
      $cards.last().prependTo($products);
    }
    $('.body-section-45__status').text('Mini products reordered ' + direction + '.');
  });  $('.body-section-47__signup form').on('submit', function (event) {
    event.preventDefault();
    var $input = $(this).find('input[type="email"]');
    var valid = $input[0].checkValidity();
    $input.toggleClass('is-invalid', !valid).attr('aria-invalid', valid ? 'false' : 'true');
    $('.body-section-47__status').text(valid ? 'Thank you for subscribing.' : 'Enter a valid email address.');
  });

  $('.body-section-48__more').on('click', function () {
    var $button = $(this);
    var $products = $('.body-section-48__products');
    var expanded = $button.attr('aria-expanded') === 'true';

    if (expanded) {
      $products.children('article').last().prependTo($products);
    } else {
      $products.children('article').first().appendTo($products);
    }

    $button.attr('aria-expanded', expanded ? 'false' : 'true').text(expanded ? 'show more' : 'show less');
    $('.body-section-48__status').text(expanded ? 'Original silk edit restored.' : 'More silk styles displayed.');
  });
})(jQuery);
