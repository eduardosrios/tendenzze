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
  $('.body-section-49__filters button').on('click', function () {
    var $button = $(this);
    $button.addClass('is-active').attr('aria-pressed', 'true').siblings().removeClass('is-active').attr('aria-pressed', 'false');
    $('.body-section-49__status').text($button.text() + ' collection selected.');
  });

  $('.body-section-49__actions button').on('click', function () {
    var $button = $(this);
    var added = $button.attr('aria-pressed') !== 'true';
    $button.attr('aria-pressed', added ? 'true' : 'false').text(added ? 'Added' : 'Add to Cart');
    $('.body-section-49__status').text(added ? 'London Skyline Hoodie added to cart.' : 'London Skyline Hoodie removed from cart.');
  });  $('.body-section-50__film button').on('click', function () {
    var $button = $(this);
    var playing = $button.attr('aria-pressed') !== 'true';
    $button.attr('aria-pressed', playing ? 'true' : 'false').attr('aria-label', playing ? 'Pause technical motion film' : 'Play technical motion film');
    $button.find('i').toggleClass('fa-play', !playing).toggleClass('fa-pause', playing);
    $('.body-section-50__status').text(playing ? 'Technical motion film playing.' : 'Technical motion film paused.');
  });  $('.body-section-52__swatches button').on('click', function () {
    var $button = $(this);
    var $article = $button.closest('article');
    $button.addClass('is-selected').attr('aria-pressed', 'true').siblings().removeClass('is-selected').attr('aria-pressed', 'false');
    $('.body-section-52__status').text($button.data('color') + ' selected for ' + $article.find('h3').text() + '.');
  });  var summerTestimonials = [
    { title: 'Perfect Quality and Customer Service!', quote: 'Absolutely love the quality of the clothing at Tendenzze! Every piece feels premium, and the designs are just what I was looking for to elevate my wardrobe. The customer service is excellent too—quick responses, helpful advice, and they made the shopping experience smooth and easy. My new go-to for all things fashion, whether it’s everyday wear or something special!', name: 'Paul Eden', location: 'From California' },
    { title: 'Effortless Style for Every Day!', quote: 'Beautiful fabrics, thoughtful cuts, and pieces that work together with ease. Delivery was quick, every detail felt considered, and the fit guidance was exactly right.', name: 'Amina Lee', location: 'From New York' },
    { title: 'A Summer Wardrobe I Love!', quote: 'The collection feels light, polished, and easy to wear. Each piece arrived beautifully finished, and the team made choosing the right sizes simple.', name: 'Sofia Martin', location: 'From London' }
  ];

  $('.body-section-53__dots button').on('click', function () {
    var $button = $(this);
    var review = summerTestimonials[Number($button.data('review'))];
    $button.addClass('is-active').attr('aria-pressed', 'true').siblings().removeClass('is-active').attr('aria-pressed', 'false');
    $('.body-section-53__testimonial h3').text(review.title);
    $('.body-section-53__testimonial blockquote').text(review.quote);
    $('.body-section-53__name').text(review.name);
    $('.body-section-53__location').text(review.location);
    $('.body-section-53__avatar').attr('alt', review.name);
    $('.body-section-53__status').text(review.name + ' testimonial selected.');
  });
  var $valerie = $('.body-section-54__story--road');
  if ($valerie.length) {
    var $valerieStatus = $('.body-section-54__status');
    var $valerieProgress = $('.body-section-54__media input[type="range"]');
    $('.body-section-54__pause').on('click', function () {
      var paused = $(this).attr('aria-pressed') !== 'true';
      $(this).attr('aria-pressed', String(paused)).attr('aria-label', paused ? 'Play Valérie film' : 'Pause Valérie film').find('i').attr('class', paused ? 'fa-solid fa-play' : 'fa-solid fa-pause');
      $valerie.toggleClass('is-paused', paused);
      $valerieStatus.text(paused ? 'Valérie film paused.' : 'Valérie film playing.');
    });
    $('.body-section-54__skip').on('click', function () {
      $valerieProgress.val(Math.min(100, Number($valerieProgress.val()) + 15)).trigger('input');
      $valerieStatus.text('Valérie film advanced.');
    });
    $('.body-section-54__mute').on('click', function () {
      var muted = $(this).attr('aria-pressed') !== 'true';
      $(this).attr('aria-pressed', String(muted)).attr('aria-label', muted ? 'Unmute film' : 'Mute film').find('i').attr('class', muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-low');
      $valerieStatus.text(muted ? 'Valérie film muted.' : 'Valérie film unmuted.');
    });
    $('.body-section-54__expand').on('click', function () {
      var active = $(this).attr('aria-pressed') !== 'true';
      $(this).attr('aria-pressed', String(active));
      if (active && $valerie.get(0).requestFullscreen) {
        $valerie.get(0).requestFullscreen().catch(function () { $(this).attr('aria-pressed', 'false'); }.bind(this));
      } else if (!active && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
    $(document).on('fullscreenchange', function () {
      $('.body-section-54__expand').attr('aria-pressed', String(document.fullscreenElement === $valerie.get(0)));
    });
  }

  var $section56 = $('.body-section-56');
  if ($section56.length) {
    var $section56Status = $('.body-section-56__status');
    $('.body-section-56__quick').on('click', function () {
      var product = $(this).closest('article').data('product');
      $section56Status.text('Quick view opened for ' + product + '.');
    });
    $('.body-section-56__add').on('click', function () {
      var added = $(this).attr('aria-pressed') !== 'true';
      var product = $(this).closest('article').data('product');
      $(this).attr('aria-pressed', String(added)).text(added ? 'Added' : 'Add to bag');
      $section56Status.text(product + (added ? ' added to bag.' : ' removed from bag.'));
    });
    var section56Reviews = $('.body-section-56__reviews blockquote').map(function () { return $(this).contents().first().text(); }).get();
    var section56Offset = 0;
    $('.body-section-56__previous, .body-section-56__next').on('click', function () {
      section56Offset += $(this).hasClass('body-section-56__next') ? 1 : -1;
      section56Offset = (section56Offset + section56Reviews.length) % section56Reviews.length;
      $('.body-section-56__reviews blockquote').each(function (index) {
        $(this).contents().first()[0].textContent = section56Reviews[(index + section56Offset) % section56Reviews.length];
      });
      $section56Status.text('Testimonials updated.');
    });
  }

  $('.body-section-58__person button').on('click', function () {
    $('.body-section-58__person button').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
    $('.body-section-58__status').text($(this).attr('aria-label').replace('Select', 'Selected') + '.');
  });

  $('.body-section-60__questions button').on('click', function () {
    var $button = $(this);
    var $article = $button.closest('article');
    var opening = $button.attr('aria-expanded') !== 'true';
    $('.body-section-60__questions article').removeClass('is-open').find('button').attr('aria-expanded', 'false').find('i').text('+');
    if (opening) {
      $article.addClass('is-open');
      $button.attr('aria-expanded', 'true').find('i').text('−');
    }
    $('.body-section-60__status').text(opening ? $button.find('span').text() + ' expanded.' : 'Question collapsed.');
  });

  $('.body-section-60__form').on('submit', function (event) {
    event.preventDefault();
    var $form = $(this);
    var valid = this.checkValidity();
    $form.toggleClass('is-valid', valid).toggleClass('is-invalid', !valid);
    $('.body-section-60__status').text(valid ? 'Thank you for subscribing.' : 'Enter a valid email address.');
  });
  $('.body-section-62__drag').on('click', function () {
    var $cards = $('.body-section-62__cards');
    $cards.children('a').first().appendTo($cards);
    $('.body-section-62__status').text('Featured collection rotated.');
  });
  $('.body-section-63__categories button').on('click', function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
    $('.body-section-63__status').text($(this).data('category') + ' selected.');
  });  $('.body-section-65__heart').on('click', function () {
    var saved = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(saved)).toggleClass('is-active', saved).find('i').attr('class', saved ? 'fa-solid fa-heart' : 'fa-regular fa-heart');
    $('.body-section-65__status').text(saved ? 'Product saved.' : 'Product removed from saved items.');
  });
  $('.body-section-66__items article > button').on('click', function () {
    $(this).closest('article').remove();
    var total = 0;
    $('.body-section-66__items article').each(function () { total += Number($(this).data('price')); });
    var formatted = total.toLocaleString('en-US').replace(/,/g, ' ') + ' ₽';
    $('.body-section-66__subtotal, .body-section-66__total').text(formatted);
    $('.body-section-66__cart > h2').text('Order (' + $('.body-section-66__items article').length + ')');
    $('.body-section-66__status').text('Cart updated.');
  });
  $('.body-section-67__sizes button').on('click', function () {
    $(this).addClass('is-active').attr('aria-pressed', 'true').siblings().removeClass('is-active').attr('aria-pressed', 'false');
    $('.body-section-67__status').text('Size ' + $(this).text() + ' selected.');
  });
  $('.body-section-67__add').on('click', function () {
    var added = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(added)).toggleClass('is-added', added).html('<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> ' + (added ? 'Added to cart' : 'Add to cart'));
    $('.body-section-67__status').text(added ? 'Fanta Pant added to cart.' : 'Fanta Pant removed from cart.');
  });
  $('.body-section-67__arrows button').on('click', function () {
    var $grid = $('.body-section-67__grid');
    if ($(this).data('direction') === 'next') { $grid.children().first().appendTo($grid); } else { $grid.children().last().prependTo($grid); }
    $('.body-section-67__status').text('Product order updated.');
  });
  $('.body-section-70__item > button').on('click', function () {
    var $item = $(this).closest('.body-section-70__item');
    $('.body-section-70__item').removeClass('is-open').find('> button').attr('aria-expanded', 'false');
    $item.addClass('is-open');
    $(this).attr('aria-expanded', 'true');
    $('.body-section-70__status').text($(this).find('h2, h3').text() + ' expanded.');
  });
  $('.body-section-72__tabs button').on('click', function () {
    $(this).addClass('is-active').attr('aria-selected', 'true').siblings().removeClass('is-active').attr('aria-selected', 'false');
    $('.body-section-72__status').text($(this).text() + ' selected.');
  });
  $('.body-section-72__phone-grid article p button').on('click', function () {
    var added = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(added)).toggleClass('is-added', added);
    $('.body-section-72__status').text(added ? 'Product added to bag.' : 'Product removed from bag.');
  });
  $('.body-section-76__canvas > button').on('click', function () {
    var playing = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(playing)).attr('aria-label', playing ? 'Pause leather campaign film' : 'Play leather campaign film').toggleClass('is-playing', playing).find('i').attr('class', playing ? 'fa-solid fa-pause' : 'fa-solid fa-play');
    $('.body-section-76__status').text(playing ? 'Campaign film playing.' : 'Campaign film paused.');
  });
  $('.body-section-80__arrow').on('click', function () {
    var $section = $('.body-section-80');
    var $cards = $section.find('.body-section-80__cards');
    var current = Number($section.attr('data-slide')) || 1;
    if ($(this).hasClass('body-section-80__arrow--next')) {
      $cards.children().first().appendTo($cards);
      current = current === 4 ? 1 : current + 1;
    } else {
      $cards.children().last().prependTo($cards);
      current = current === 1 ? 4 : current - 1;
    }
    $section.attr('data-slide', String(current));
    $section.find('.body-section-80__counter').text(String(current).padStart(2, '0') + ' / 04');
    $section.find('.body-section-80__status').text('Featured collection ' + current + ' selected.');
  });
  $('.body-section-81__ticker button').on('click', function () {
    var $section = $('.body-section-81');
    var story = Number($section.attr('data-story')) + ($(this).data('direction') === 'next' ? 1 : -1);
    if (story < 1) { story = 25; }
    if (story > 25) { story = 1; }
    $section.attr('data-story', String(story)).find('.body-section-81__issue').text(String(story).padStart(2, '0'));
    $section.find('.body-section-81__status').text('Campaign story ' + story + ' selected.');
  });
  $('.body-section-82__story > button').on('click', function () {
    var number = $(this).text();
    $('.body-section-82__story > button').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
    $('.body-section-82__status').text('Ethos story ' + Number(number) + ' selected.');
  });
  $('.body-section-86__products figure button').on('click', function () {
    var saved = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(saved)).find('i').attr('class', saved ? 'fa-solid fa-heart' : 'fa-regular fa-heart');
    $('.body-section-86__status').text($(this).attr('aria-label').replace('Save ', '') + (saved ? ' saved.' : ' removed from saved items.'));
  });
  $('.body-section-91__stories article > button').on('click', function () {
    var $article = $(this).closest('article');
    $('.body-section-91__stories article').removeClass('is-active').find('> button').attr('aria-expanded', 'false');
    $article.addClass('is-active');
    $(this).attr('aria-expanded', 'true');
    $('.body-section-91__status').text($(this).find('strong').text() + ' selected.');
  });
  $('.body-section-92__accordions button').on('click', function () {
    var expanded = $(this).attr('aria-expanded') !== 'true';
    $('.body-section-92__accordions button').attr('aria-expanded', 'false');
    $(this).attr('aria-expanded', String(expanded));
    $('.body-section-92__status').text($(this).text().trim() + (expanded ? ' expanded.' : ' collapsed.'));
  });
  $('.body-section-92__directory form').on('submit', function (event) {
    event.preventDefault();
    var valid = this.checkValidity();
    $('.body-section-92__status').text(valid ? 'Thank you for subscribing.' : 'Enter a valid email address.');
  });
  $('.body-section-93__canvas figure button').on('click', function () {
    var playing = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(playing)).attr('aria-label', playing ? 'Pause material campaign film' : 'Play material campaign film').find('i').attr('class', playing ? 'fa-solid fa-pause' : 'fa-solid fa-play');
    $('.body-section-93__status').text(playing ? 'Material campaign film playing.' : 'Material campaign film paused.');
  });
  $('.body-section-96__list button').on('click', function () {
    var $button = $(this);
    $('.body-section-96__list button').removeClass('is-active').removeAttr('aria-pressed');
    $button.addClass('is-active').attr('aria-pressed', 'true');
    $('.body-section-96__canvas > figure img').attr('src', $button.data('image')).attr('alt', $button.find('strong').text() + ' category preview');
    $('.body-section-96__status').text($button.find('strong').text() + ' selected.');
  });
  $('.body-section-97__drag').on('click', function () {
    var $rail = $('.body-section-97__rail');
    $rail.children().first().appendTo($rail);
    $('.body-section-97__status').text('Next campaign collection selected.');
  });
  $('.body-section-99 footer nav button').on('click', function () {
    var enabled = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(enabled)).find('i').attr('class', enabled ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off');
    $('.body-section-99__status').text('Cookie settings ' + (enabled ? 'enabled.' : 'disabled.'));
  });  $('.body-section-99 footer form').on('submit', function (event) {
    event.preventDefault();
    var valid = this.checkValidity();
    $('.body-section-99__status').text(valid ? 'Thank you for joining.' : 'Enter a valid email address.');
  });
  $('.body-section-103__toolbar button').on('click', function () {
    $(this).toggleClass('is-active');
    $('.body-section-103__status').text($(this).text().trim() + ' filter toggled.');
  });
  $('.body-section-104__grid button').on('click', function () {
    var added = !$(this).hasClass('is-added');
    $(this).toggleClass('is-added', added).text(added ? 'Added' : 'Add to cart');
    $('.body-section-104__status').text($(this).siblings('h3').text() + (added ? ' added to cart.' : ' removed from cart.'));
  });
  $('.body-section-106__list button').on('click', function () {
    var $article = $(this).closest('article');
    $('.body-section-106__list article').removeClass('is-open').find('button').attr('aria-expanded', 'false').find('i').attr('class', 'fa-solid fa-plus');
    $article.addClass('is-open');
    $(this).attr('aria-expanded', 'true').find('i').attr('class', 'fa-solid fa-minus');
    $('.body-section-106__status').text($(this).find('strong').text() + ' expanded.');
  });
  $('.body-section-109 nav button').on('click', function () {
    $('.body-section-109 nav button').removeClass('is-active');
    $(this).addClass('is-active');
    $('.body-section-109__status').text($(this).text() + ' collection selected.');
  });
  $('.body-section-109__products figure button').on('click', function () {
    $('.body-section-109__status').text('Olive hoodie added to cart.');
  });
  $('.body-section-116 header button').on('click', function () {
    var $items = $('.body-section-116__categories');
    if ($(this).data('direction') === 'next') { $items.children().first().appendTo($items); } else { $items.children().last().prependTo($items); }
    $('.body-section-116__status').text(($(this).data('direction') === 'next' ? 'Next' : 'Previous') + ' product category selected.');
  });
  var section119Seconds = 52;
  window.section119Timer = window.setInterval(function () {
    section119Seconds = section119Seconds === 0 ? 59 : section119Seconds - 1;
    $('.body-section-119__timer [data-unit="seconds"]').text(String(section119Seconds).padStart(2, '0'));
  }, 1000);
  $('.body-section-120 header button').on('click', function () {
    var $products = $('.body-section-120__products');
    if ($(this).data('direction') === 'next') { $products.children().first().appendTo($products); } else { $products.children().last().prependTo($products); }
    $('.body-section-120__status').text(($(this).data('direction') === 'next' ? 'Next' : 'Previous') + ' accessories selected.');
  });
  $('.body-section-122__controls button').on('click', function () {
    var $reviews = $('.body-section-122__reviews');
    if ($(this).data('direction') === 'next') { $reviews.children().first().appendTo($reviews); } else { $reviews.children().last().prependTo($reviews); }
    $('.body-section-122__status').text(($(this).data('direction') === 'next' ? 'Next' : 'Previous') + ' reviews selected.');
  });
  $('.body-section-123__list button').on('click', function () {
    var $article = $(this).closest('article');
    $('.body-section-123__list article').removeClass('is-open').find('button').attr('aria-expanded', 'false').find('i').attr('class', 'fa-solid fa-plus');
    $article.addClass('is-open');
    $(this).attr('aria-expanded', 'true').find('i').attr('class', 'fa-solid fa-minus');
    $('.body-section-123__status').text($(this).find('strong').text() + ' expanded.');
  });
  $('.body-section-126__watch').on('click', function () {
    var playing = $(this).attr('aria-pressed') !== 'true';
    $(this).attr('aria-pressed', String(playing)).find('i').attr('class', playing ? 'fa-solid fa-pause' : 'fa-solid fa-play');
    $('.body-section-126__status').text(playing ? 'Presentation playing.' : 'Presentation paused.');
  });
  $('.body-section-127__controls button').on('click', function () {
    var $stones = $('.body-section-127__stones');
    if ($(this).data('direction') === 'next') { $stones.children().first().appendTo($stones); } else { $stones.children().last().prependTo($stones); }
    $stones.children().removeClass('is-active').eq(2).addClass('is-active');
    $('.body-section-127__status').text(($(this).data('direction') === 'next' ? 'Next' : 'Previous') + ' jewelry cut selected.');
  });
  $('.footer-section-2__newsletter').on('submit', function (event) {
    event.preventDefault();
    var email = String($('#footer-2-email').val() || '').trim();
    if (!email) { return; }
    $(this).find('.footer-section-2__status').text('Thank you. You are on the Tendenzze list.');
    this.reset();
  });
  function normalizeStageFourTypography() {
    $('body *').each(function () {
      if (this.matches('script, style, i, [aria-hidden="true"]')) { return; }
      var hasDirectText = Array.prototype.some.call(this.childNodes, function (node) {
        return node.nodeType === 3 && node.textContent.trim();
      });
      if (!hasDirectText) { return; }
      var size = parseFloat(window.getComputedStyle(this).fontSize);
      if (size < 16) {
        this.classList.add('tendenzze-min-text');
        return;
      }
      if (!this.matches('h1, h2, h3, h4, h5, h6') && size <= 60) {
        var scale = size <= 18 ? 16 : size <= 22 ? 20 : size <= 28 ? 24 : size <= 40 ? 32 : 48;
        this.classList.add('tendenzze-type-' + scale);
      }
    });
  }

  function normalizeStageFourPalette() {
    function parseColor(value) {
      var parts = String(value).match(/[0-9.]+/g);
      if (!parts || parts.length < 3) { return null; }
      return { r: Number(parts[0]), g: Number(parts[1]), b: Number(parts[2]), a: parts.length > 3 ? Number(parts[3]) : 1 };
    }
    function token(color, surface) {
      if (!color || color.a === 0) { return null; }
      var max = Math.max(color.r, color.g, color.b);
      var min = Math.min(color.r, color.g, color.b);
      var chroma = max - min;
      var light = color.r * .2126 + color.g * .7152 + color.b * .0722;
      if (chroma > 24) { return light < 48 ? 'navy' : 'accent'; }
      if (surface) {
        if (light < 58) { return 'ink'; }
        if (light < 145) { return 'navy'; }
        if (light < 238) { return 'muted'; }
        return light > 252 ? 'white' : 'paper';
      }
      if (light < 62) { return 'ink'; }
      if (light > 238) { return 'white'; }
      return 'muted';
    }
    function luminance(color) {
      var channels = [color.r, color.g, color.b].map(function (value) {
        value /= 255;
        return value <= .03928 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
      });
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    function effectiveBackground(element) {
      while (element && element !== document.documentElement) {
        var color = parseColor(window.getComputedStyle(element).backgroundColor);
        if (color && color.a > .02) { return color; }
        element = element.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    }
    $('body *').each(function () {
      if (this.matches('script, style, img, picture, video, source')) { return; }
      var style = window.getComputedStyle(this);
      var background = token(parseColor(style.backgroundColor), true);
      var foreground = token(parseColor(style.color), false);
      var border = style.borderTopStyle !== 'none' && parseFloat(style.borderTopWidth) > 0 ? token(parseColor(style.borderTopColor), false) : null;
      if (background && style.backgroundImage === 'none') { this.classList.add('tz-bg-' + background); }
      if (foreground) { this.classList.add('tz-text-' + foreground); }
      if (border) { this.classList.add('tz-border-' + border); }
    });
    $('body *').each(function () {
      if (this.matches('script, style, img, picture, video, source, i, [aria-hidden="true"]')) { return; }
      var hasDirectText = Array.prototype.some.call(this.childNodes, function (node) {
        return node.nodeType === 3 && node.nodeValue.trim().length > 0;
      });
      if (!hasDirectText) { return; }
      var foreground = parseColor(window.getComputedStyle(this).color);
      var background = effectiveBackground(this);
      if (!foreground) { return; }
      var foregroundLuminance = luminance(foreground);
      var backgroundLuminance = luminance(background);
      var contrast = (Math.max(foregroundLuminance, backgroundLuminance) + .05) / (Math.min(foregroundLuminance, backgroundLuminance) + .05);
      if (contrast < 4.5) {
        Array.prototype.slice.call(this.classList).filter(function (className) {
          return className.indexOf('tz-text-') === 0;
        }).forEach(function (className) {
          this.classList.remove(className);
        }, this);
        this.classList.add(backgroundLuminance > .5 ? 'tz-text-ink' : 'tz-text-white');
      }
    });
  }
  function applyBootstrapLayoutClasses() {
    $('.hero-section, .body-section, .footer-section').addClass('container-fluid p-0');
    $('[class*="__grid"], [class*="__products"], [class*="__cards"], [class*="__gallery"], [class*="__stories"], [class*="__categories"]').each(function () {
      var display = window.getComputedStyle(this).display;
      var $children = $(this).children();
      if ($children.length > 1 && (display === 'grid' || display === 'flex')) {
        $(this).addClass('row g-0 mx-0');
        $children.addClass('col');
      }
    });
  }

  $('.submenu-toggle').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var $item = $(this).closest('.hero-main-menu__item');
    var open = !$item.hasClass('is-open');
    $('.hero-main-menu__item').removeClass('is-open').find('.submenu-toggle').attr('aria-expanded', 'false').find('i').attr('class', 'fa-solid fa-chevron-down');
    if (open) {
      $item.addClass('is-open');
      $(this).attr('aria-expanded', 'true').find('i').attr('class', 'fa-solid fa-chevron-up');
    }
  });

  $(document).on('click', function () {
    $('.hero-main-menu__item').removeClass('is-open').find('.submenu-toggle').attr('aria-expanded', 'false').find('i').attr('class', 'fa-solid fa-chevron-down');
  }).on('keydown', function (event) {
    if (event.key === 'Escape') { $(document).trigger('click'); }
  });

  var lastStageFourScroll = window.pageYOffset;
  var stageFourScrollTicking = false;
  function updateStageFourStickyBar() {
    var current = window.pageYOffset;
    var show = current > 320 && current < lastStageFourScroll - 4;
    var $bar = $('.site-sticky-bar');
    $bar.toggleClass('is-visible', show).attr('aria-hidden', show ? 'false' : 'true');
    lastStageFourScroll = current;
    stageFourScrollTicking = false;
  }
  $(window).on('scroll', function () {
    if (!stageFourScrollTicking) {
      window.requestAnimationFrame(updateStageFourStickyBar);
      stageFourScrollTicking = true;
    }
  });

  applyBootstrapLayoutClasses();
  normalizeStageFourPalette();
  normalizeStageFourTypography();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { normalizeStageFourPalette(); normalizeStageFourTypography(); });
  }
  var stageFourResizeTimer;
  $(window).on('resize', function () {
    window.clearTimeout(stageFourResizeTimer);
    stageFourResizeTimer = window.setTimeout(function () { normalizeStageFourPalette(); normalizeStageFourTypography(); }, 50);
  });

  function initStageFiveInteractions() {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sectionSelectors = [];
    for (var sectionNumber = 1; sectionNumber <= 30; sectionNumber += 1) {
      sectionSelectors.push('.body-section-' + String(sectionNumber).padStart(2, '0'));
    }
    var $revealTargets = $('.hero-section, ' + sectionSelectors.join(', ') + ', .footer-section');
    $revealTargets.attr('data-tz-reveal', '');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      $revealTargets.addClass('is-visible');
    } else {
      document.documentElement.classList.add('tz-motion-ready');
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      $revealTargets.each(function () { revealObserver.observe(this); });
    }

    if (!reducedMotion) {
      $('.hero-section-1, .hero-section-2').on('pointermove.tendenzzeMotion', function (event) {
        var rect = this.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - .5) * 12;
        var y = ((event.clientY - rect.top) / rect.height - .5) * 10;
        this.style.setProperty('--tz-parallax-x', x.toFixed(2) + 'px');
        this.style.setProperty('--tz-parallax-y', y.toFixed(2) + 'px');
      }).on('pointerleave.tendenzzeMotion', function () {
        this.style.setProperty('--tz-parallax-x', '0px');
        this.style.setProperty('--tz-parallax-y', '0px');
      });
    }

    var viewerSectionSelectors = ['01', '03', '07', '09', '10', '13', '14', '16', '17', '22', '23', '25', '26', '28', '29'].map(function (number) {
      return '.body-section-' + number;
    });
    var $viewerImages = $(viewerSectionSelectors.join(', ')).find('img').filter(function () {
      return !this.closest('a, button') && !this.hasAttribute('aria-hidden');
    });
    $viewerImages.addClass('tz-media-trigger').attr({ tabindex: '0', role: 'button' }).each(function () {
      var label = this.getAttribute('alt') || 'editorial image';
      this.setAttribute('aria-label', 'Open ' + label + ' in editorial viewer');
    });

    var $viewer = $('<div class="tz-editorial-viewer" role="dialog" aria-modal="true" aria-label="Editorial image viewer" aria-hidden="true"><div class="tz-editorial-viewer__panel"><button class="tz-editorial-viewer__close" type="button" aria-label="Close editorial viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button><button class="tz-editorial-viewer__nav tz-editorial-viewer__nav--previous" type="button" aria-label="Previous image"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button><div class="tz-editorial-viewer__media"><img alt=""></div><button class="tz-editorial-viewer__nav tz-editorial-viewer__nav--next" type="button" aria-label="Next image"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button><div class="tz-editorial-viewer__caption"><p></p><span></span></div></div></div>');
    $('body').append($viewer);
    var viewerItems = [];
    var viewerIndex = 0;
    var viewerReturnFocus = null;
    var pointerStartX = null;

    function updateViewer() {
      var item = viewerItems[viewerIndex];
      if (!item) { return; }
      $viewer.find('.tz-editorial-viewer__media img').attr({ src: item.src, alt: item.alt });
      $viewer.find('.tz-editorial-viewer__caption p').text(item.alt);
      $viewer.find('.tz-editorial-viewer__caption span').text(String(viewerIndex + 1).padStart(2, '0') + ' / ' + String(viewerItems.length).padStart(2, '0'));
      $viewer.find('.tz-editorial-viewer__nav').prop('disabled', viewerItems.length < 2);
    }

    function openViewer(trigger) {
      var $section = $(trigger).closest('.body-section');
      viewerItems = $section.find('img.tz-media-trigger').map(function () {
        return { src: this.currentSrc || this.src, alt: this.alt || 'Tendenzze editorial image', node: this };
      }).get();
      viewerIndex = Math.max(0, viewerItems.findIndex(function (item) { return item.node === trigger; }));
      viewerReturnFocus = trigger;
      document.documentElement.style.setProperty('--tz-scrollbar-compensation', (window.innerWidth - document.documentElement.clientWidth) + 'px');
      updateViewer();
      $('body').addClass('tz-viewer-open');
      $viewer.addClass('is-open').attr('aria-hidden', 'false');
      window.setTimeout(function () { $viewer.find('.tz-editorial-viewer__close').trigger('focus'); }, 30);
    }

    function closeViewer() {
      if (!$viewer.hasClass('is-open')) { return; }
      $viewer.removeClass('is-open').attr('aria-hidden', 'true');
      $('body').removeClass('tz-viewer-open');
      $viewer.find('.tz-editorial-viewer__media img').removeAttr('src').attr('alt', '');
      if (viewerReturnFocus) { viewerReturnFocus.focus(); }
    }

    function stepViewer(direction) {
      if (viewerItems.length < 2) { return; }
      viewerIndex = (viewerIndex + direction + viewerItems.length) % viewerItems.length;
      updateViewer();
    }

    $viewerImages.on('click.tendenzzeViewer', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openViewer(this);
    }).on('keydown.tendenzzeViewer', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openViewer(this);
      }
    });
    $viewer.find('.tz-editorial-viewer__close').on('click', closeViewer);
    $viewer.find('.tz-editorial-viewer__nav--previous').on('click', function () { stepViewer(-1); });
    $viewer.find('.tz-editorial-viewer__nav--next').on('click', function () { stepViewer(1); });
    $viewer.on('click', function (event) { if (event.target === this) { closeViewer(); } });
    $viewer.find('.tz-editorial-viewer__media').on('pointerdown', function (event) { pointerStartX = event.clientX; }).on('pointerup pointercancel', function (event) {
      if (pointerStartX === null) { return; }
      var distance = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(distance) > 55) { stepViewer(distance > 0 ? -1 : 1); }
    });
    $(document).on('keydown.tendenzzeViewer', function (event) {
      if (!$viewer.hasClass('is-open')) { return; }
      if (event.key === 'Escape') { closeViewer(); return; }
      if (event.key === 'ArrowLeft') { stepViewer(-1); return; }
      if (event.key === 'ArrowRight') { stepViewer(1); return; }
      if (event.key === 'Tab') {
        var $focusable = $viewer.find('button:not([disabled])');
        var first = $focusable.get(0);
        var last = $focusable.get($focusable.length - 1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });

    var $serviceCards = $('.body-section-15__services article');
    $serviceCards.attr({ tabindex: '0', role: 'button', 'aria-expanded': 'false' }).first().addClass('is-active').attr('aria-expanded', 'true');
    function activateService(card) {
      var $card = $(card);
      var active = !$card.hasClass('is-active');
      $serviceCards.removeClass('is-active').attr('aria-expanded', 'false');
      if (active) { $card.addClass('is-active').attr('aria-expanded', 'true'); }
    }
    $serviceCards.on('click.tendenzzeServices', function () { activateService(this); }).on('keydown.tendenzzeServices', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateService(this); }
    });

    var $metrics = $('.body-section-05__metrics dd');
    function animateMetric(element) {
      var original = element.textContent.trim();
      var value = parseInt(original.replace(/[^0-9]/g, ''), 10);
      var suffix = original.replace(/[0-9]/g, '');
      if (!value || reducedMotion) { return; }
      var started = performance.now();
      function frame(now) {
        var progress = Math.min(1, (now - started) / 1150);
        var eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(value * eased) + suffix;
        if (progress < 1) { window.requestAnimationFrame(frame); }
      }
      element.textContent = '0' + suffix;
      window.requestAnimationFrame(frame);
    }
    if ('IntersectionObserver' in window && !reducedMotion) {
      var metricObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $metrics.each(function () { animateMetric(this); });
            observer.disconnect();
          }
        });
      }, { threshold: .45 });
      var metricsNode = document.querySelector('.body-section-05__metrics');
      if (metricsNode) { metricObserver.observe(metricsNode); }
    }

    $('.body-section-02__heart').attr('aria-pressed', 'false').on('click.tendenzzeSave', function () {
      var $button = $(this);
      var selected = !$button.hasClass('is-selected');
      var product = $button.closest('article').find('h3').text().trim() || 'Product';
      $button.toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false');
      $button.find('i').toggleClass('fa-regular', !selected).toggleClass('fa-solid', selected);
      $('.body-section-02__status').text(product + (selected ? ' saved.' : ' removed from saved items.'));
    });

    $('.body-section-19__play').on('click.tendenzzeFilm', function () {
      $('.body-section-19').toggleClass('is-film-active', $(this).hasClass('is-playing'));
    });

    $('.body-section-27__arrow').on('click.tendenzzeRail', function (event) {
      event.preventDefault();
      var $rail = $('.body-section-27__products');
      var $cards = $rail.children('article');
      if (!$cards.length) { return; }
      if ($(this).hasClass('body-section-27__arrow--next')) { $cards.first().appendTo($rail); }
      else { $cards.last().prependTo($rail); }
      $rail.removeClass('is-reordering');
      window.requestAnimationFrame(function () { $rail.addClass('is-reordering'); });
      $('.body-section-27__status').text('Collection moved ' + ($(this).hasClass('body-section-27__arrow--next') ? 'forward.' : 'backward.'));
    });
  }

  initStageFiveInteractions();
})(jQuery);
