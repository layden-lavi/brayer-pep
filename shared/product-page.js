/* ================================================================
   Brayer Peptides — Product Page Renderer
   Reads window.PRODUCT_DATA and renders the full product page
   into <main id="product-root">
   ================================================================ */
(function () {
  'use strict';

  /* ── Mini catalog — used for Related Products section ────────── */
  var CATALOG = [
    { id: 'bpc157',          name: 'BPC-157',                  price: 48,  image: '../assets/images/bpc157_10mg.png',          category: 'RECOVERY' },
    { id: 'tb500',           name: 'TB-500',                   price: 54,  image: '../assets/images/tb500_10mg.png',           category: 'TISSUE REPAIR' },
    { id: 'bpc157_tb500',    name: 'BPC-157 + TB-500',         price: 95,  image: '../assets/images/bpc157_tb500_10mg.png',    category: 'RECOVERY' },
    { id: 'cjc1295_nodac',   name: 'CJC-1295 No DAC',          price: 52,  image: '../assets/images/cjc1295_nodac_5mg.png',    category: 'GH AXIS' },
    { id: 'cjc1295_nodac_ipa', name: 'CJC-1295 No DAC + IPA', price: 82,  image: '../assets/images/cjc1295_nodac_ipa_10mg.png', category: 'GH AXIS' },
    { id: 'ipamorelin',      name: 'Ipamorelin',               price: 44,  image: '../assets/images/ipamorelin_5mg.png',       category: 'GH AXIS' },
    { id: 'tesamorelin',     name: 'Tesamorelin',              price: 125, image: '../assets/images/tesamorelin_10mg.png',     category: 'GH AXIS' },
    { id: 'igf1_lr3',        name: 'IGF-1 LR3',                price: 95,  image: '../assets/images/igf1_lr3_1mg.png',         category: 'GROWTH FACTORS' },
    { id: 'aod',             name: 'AOD-9604',                 price: 42,  image: '../assets/images/aod_5mg.png',              category: 'FAT LOSS' },
    { id: 'hgh_frag',        name: 'HGH Fragment 176-191',     price: 58,  image: '../assets/images/hgh_frag_5mg.png',         category: 'FAT LOSS' },
    { id: 'tirzepatide',     name: 'Tirzepatide',              price: 185, image: '../assets/images/tirzepatide_10mg.png',     category: 'METABOLIC' },
    { id: 'retatrutide',     name: 'Retatrutide',              price: 195, image: '../assets/images/retatrutide_10mg.png',     category: 'METABOLIC' },
    { id: 'cagrilintide',    name: 'Cagrilintide',             price: 175, image: '../assets/images/cagrilintide_10mg.png',    category: 'METABOLIC' },
    { id: 'survodutide',     name: 'Survodutide',              price: 175, image: '../assets/images/survodutide_10mg.png',     category: 'METABOLIC' },
    { id: 'mazdutide',       name: 'Mazdutide',                price: 165, image: '../assets/images/mazdutide_5mg.png',        category: 'METABOLIC' },
    { id: 'mt2',             name: 'MT-2',                     price: 72,  image: '../assets/images/mt2_10mg.png',             category: 'PERFORMANCE' },
    { id: 'pt141',           name: 'PT-141',                   price: 62,  image: '../assets/images/pt141_10mg.png',           category: 'PERFORMANCE' },
    { id: 'oxytocin',        name: 'Oxytocin',                 price: 78,  image: '../assets/images/oxytocin_10mg.png',        category: 'PERFORMANCE' },
    { id: 'hcg',             name: 'HCG',                      price: 85,  image: '../assets/images/hcg_5000iu.png',           category: 'HORMONAL' },
    { id: 'slu_pp_332',      name: 'SLU-PP-332',               price: 145, image: '../assets/images/slu_pp_332_5mg.png',       category: 'METABOLIC' },
    { id: 'ghk_cu',          name: 'GHK-Cu 50mg',              price: 46,  image: '../assets/images/ghk_cu_50mg.png',          category: 'LONGEVITY' },
    { id: 'ghk_cu_100',      name: 'GHK-Cu 100mg',             price: 78,  image: '../assets/images/ghk_cu_100mg.png',         category: 'LONGEVITY' },
    { id: 'mots_c',          name: 'MOTS-c',                   price: 185, image: '../assets/images/mots_c_40mg.png',          category: 'LONGEVITY' },
    { id: 'nad_plus',        name: 'NAD+',                     price: 95,  image: '../assets/images/nad_plus_500.png',         category: 'LONGEVITY' },
    { id: '5_amino_1mq',     name: '5-Amino-1MQ',              price: 85,  image: '../assets/images/5_amino_1mq_50mg.png',     category: 'METABOLIC' },
    { id: 'ss31',            name: 'SS-31',                    price: 115, image: '../assets/images/ss31_10mg.png',            category: 'LONGEVITY' },
    { id: 'glow_blend',      name: 'Glow Blend',               price: 125, image: '../assets/images/glow_blend.png',           category: 'LONGEVITY' },
    { id: 'klow_blend',      name: 'Klow Blend',               price: 145, image: '../assets/images/klow_blend.png',           category: 'LONGEVITY' },
    { id: 'selank',          name: 'Selank',                   price: 50,  image: '../assets/images/selank_10mg.png',          category: 'NOOTROPIC' },
    { id: 'semax',           name: 'Semax',                    price: 58,  image: '../assets/images/semax_10mg.png',           category: 'NOOTROPIC' },
    { id: 'cerebrolysin',    name: 'Cerebrolysin',             price: 145, image: '../assets/images/cerebrolysin_60mg.png',    category: 'NOOTROPIC' },
    { id: 'kpv',             name: 'KPV',                      price: 65,  image: '../assets/images/kpv_10mg.png',             category: 'IMMUNE' },
    { id: 'thymosin_alpha1', name: 'Thymosin Alpha-1',         price: 78,  image: '../assets/images/thymosin_alpha1_5mg.png',  category: 'IMMUNE' },
    { id: 'vip',             name: 'VIP',                      price: 125, image: '../assets/images/vip_10mg.png',             category: 'IMMUNE' },
    { id: 'dsip',            name: 'DSIP',                     price: 68,  image: '../assets/images/dsip_10mg.png',            category: 'SLEEP' }
  ];

  /* ── Escape HTML ─────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Build dose selector HTML ────────────────────────────────── */
  function buildDoseSelector(doses) {
    if (!doses || doses.length <= 1) return '';
    var html = '<div class="mb-6">' +
      '<p class="label-caps mb-3" style="color:#8a8a85">SELECT DOSE</p>' +
      '<div id="dose-selector" class="flex flex-wrap gap-2">';
    for (var i = 0; i < doses.length; i++) {
      html += '<button type="button" class="variant-btn' + (i === 0 ? ' active' : '') + '" ' +
        'data-dose-index="' + i + '" ' +
        'data-price="' + doses[i].price + '" ' +
        'data-label="' + esc(doses[i].label) + '" ' +
        (doses[i].image ? 'data-image="' + esc(doses[i].image) + '" ' : '') +
        '>' + esc(doses[i].label) + ' — $' + doses[i].price.toFixed(2) + '</button>';
    }
    html += '</div></div>';
    return html;
  }

  /* ── Build related products HTML ─────────────────────────────── */
  function buildRelated(ids, currentId) {
    var related = [];
    for (var i = 0; i < ids.length && related.length < 4; i++) {
      for (var j = 0; j < CATALOG.length; j++) {
        if (CATALOG[j].id === ids[i] && CATALOG[j].id !== currentId) {
          related.push(CATALOG[j]);
          break;
        }
      }
    }
    if (related.length === 0) return '';

    var html = '<section class="px-6 md:px-16 py-16 max-w-[1400px] mx-auto" data-animate>' +
      '<div class="flex items-center gap-6 mb-8 pb-6" style="border-bottom:1px solid rgba(240,237,232,0.07)">' +
        '<h2 class="headline-lg">RELATED COMPOUNDS</h2>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">';

    for (var k = 0; k < related.length; k++) {
      var p = related[k];
      html +=
        '<a href="' + esc(p.id) + '.html" class="flat-card flex flex-col overflow-hidden" style="text-decoration:none">' +
          '<div class="relative overflow-hidden" style="height:180px">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style="opacity:0.75" />' +
          '</div>' +
          '<div class="p-4 flex flex-col flex-1">' +
            '<p class="label-caps mb-1" style="color:#4a8a5a;font-size:9px">' + esc(p.category) + '</p>' +
            '<p class="font-display" style="font-size:20px;color:#f0ede8;margin:0 0 8px">' + esc(p.name) + '</p>' +
            '<p class="font-display" style="font-size:18px;color:#f0ede8;margin-top:auto">$' + p.price.toFixed(2) + '</p>' +
          '</div>' +
        '</a>';
    }
    html += '</div></section>';
    return html;
  }

  /* ── Build full page HTML ────────────────────────────────────── */
  function buildPage(data) {
    var doses      = data.doses || [];
    var firstDose  = doses[0] || { label: '', price: 0, image: data.image };
    var mainImage  = firstDose.image || data.image || '';
    var purity     = data.purity || '99%+';
    var related    = buildRelated(data.related || [], data.id);

    return (
      /* Breadcrumb */
      '<section class="px-6 md:px-16 pt-10 pb-0 max-w-[1400px] mx-auto">' +
        '<nav aria-label="breadcrumb">' +
          '<ol class="flex items-center gap-2 label-caps" style="color:#8a8a85">' +
            '<li><a href="../home_brayer_peptides/code.html" style="color:#8a8a85;text-decoration:none">HOME</a></li>' +
            '<li style="color:#4a4a45;margin:0 2px">›</li>' +
            '<li><a href="../research_shop_brayer_peptides/code.html" style="color:#8a8a85;text-decoration:none">SHOP</a></li>' +
            '<li style="color:#4a4a45;margin:0 2px">›</li>' +
            '<li style="color:#f0ede8">' + esc(data.name).toUpperCase() + '</li>' +
          '</ol>' +
        '</nav>' +
      '</section>' +

      /* Two-column product section */
      '<section class="px-6 md:px-16 py-10 max-w-[1400px] mx-auto">' +
        '<div class="grid grid-cols-1 lg:grid-cols-[45%_53%] gap-12 items-start">' +

          /* LEFT — image */
          '<div>' +
            '<div class="relative overflow-hidden" style="background:#1c1c1c;border:1px solid rgba(240,237,232,0.07)">' +
              '<img id="product-main-img" src="' + esc(mainImage) + '" alt="' + esc(data.name) + '" ' +
                'style="width:100%;height:520px;object-fit:cover;opacity:0.85" />' +
              '<div class="purity-badge">' + esc(purity) + ' PURE</div>' +
              '<div class="absolute bottom-4 left-4 flex items-center gap-2">' +
                '<span class="stock-dot"></span>' +
                '<span class="label-caps" style="color:#4a8a5a">IN STOCK</span>' +
              '</div>' +
            '</div>' +
            /* Thumbnails (shown if multiple doses with distinct images) */
            (doses.length > 1
              ? '<div id="dose-thumbs" class="flex gap-2 mt-3">' +
                  doses.map(function (d, i) {
                    var src = d.image || mainImage;
                    return '<button type="button" class="dose-thumb' + (i === 0 ? ' active' : '') + '" ' +
                      'data-dose-index="' + i + '" ' +
                      'style="width:72px;height:72px;padding:0;border:2px solid ' + (i === 0 ? '#1a3a2a' : 'rgba(240,237,232,0.12)') + ';background:none;cursor:pointer;overflow:hidden;flex-shrink:0">' +
                      '<img src="' + esc(src) + '" alt="' + esc(d.label) + '" style="width:100%;height:100%;object-fit:cover;opacity:0.8" />' +
                      '</button>';
                  }).join('') +
                '</div>'
              : ''
            ) +
          '</div>' +

          /* RIGHT — details */
          '<div>' +
            '<p class="label-caps mb-3" style="color:#4a8a5a">' + esc(data.category) + '</p>' +
            '<h1 class="font-display mb-5" style="font-size:clamp(44px,5.5vw,68px);line-height:0.95;letter-spacing:0.02em;color:#f0ede8">' + esc(data.name) + '</h1>' +

            /* Price */
            '<div class="flex items-baseline gap-2 mb-4">' +
              '<span id="product-price" class="font-display" style="font-size:44px;color:#f0ede8;letter-spacing:0.02em">$' + firstDose.price.toFixed(2) + '</span>' +
              '<span class="label-caps" style="color:#8a8a85">/ vial</span>' +
            '</div>' +

            /* Stock + shipping */
            '<div class="flex items-center gap-3 mb-7" style="flex-wrap:wrap">' +
              '<span class="stock-dot"></span>' +
              '<span class="label-caps" style="color:#4a8a5a">IN STOCK</span>' +
              '<span class="label-caps" style="color:#3a3a38">·</span>' +
              '<span class="label-caps" style="color:#8a8a85">SAME-DAY DISPATCH</span>' +
            '</div>' +

            /* Dose selector */
            buildDoseSelector(doses) +

            /* Qty + Add to Cart */
            '<div class="flex gap-3 mb-8 flex-wrap">' +
              '<div class="flex items-stretch" style="border:1px solid rgba(240,237,232,0.18)">' +
                '<button type="button" id="qty-dec" class="cart-qty-btn" style="font-size:18px" aria-label="Decrease">\u2212</button>' +
                '<span id="qty-val" class="cart-qty-val" style="min-width:44px;font-size:14px">1</span>' +
                '<button type="button" id="qty-inc" class="cart-qty-btn" style="font-size:18px" aria-label="Increase">+</button>' +
              '</div>' +
              '<button type="button" id="add-to-cart-btn" class="btn-primary flex-1 justify-center" style="font-size:12px;padding:14px 28px;min-width:180px">' +
                '<span class="material-symbols-outlined" style="font-size:17px">add_shopping_cart</span>' +
                'ADD TO CART' +
              '</button>' +
            '</div>' +

            /* Trust badges */
            '<div class="flex flex-wrap gap-5 py-5 mb-7" style="border-top:1px solid rgba(240,237,232,0.07);border-bottom:1px solid rgba(240,237,232,0.07)">' +
              '<div class="flex items-center gap-2">' +
                '<span class="material-symbols-outlined" style="font-size:17px;color:#4a8a5a">verified</span>' +
                '<span class="label-caps" style="color:#8a8a85">COA TESTED</span>' +
              '</div>' +
              '<div class="flex items-center gap-2">' +
                '<span class="material-symbols-outlined" style="font-size:17px;color:#4a8a5a">science</span>' +
                '<span class="label-caps" style="color:#8a8a85">99%+ PURITY</span>' +
              '</div>' +
              '<div class="flex items-center gap-2">' +
                '<span class="material-symbols-outlined" style="font-size:17px;color:#4a8a5a">local_shipping</span>' +
                '<span class="label-caps" style="color:#8a8a85">FAST DISPATCH</span>' +
              '</div>' +
              '<div class="flex items-center gap-2">' +
                '<span class="material-symbols-outlined" style="font-size:17px;color:#4a8a5a">thermostat</span>' +
                '<span class="label-caps" style="color:#8a8a85">COLD CHAIN STORED</span>' +
              '</div>' +
            '</div>' +

            /* Description */
            '<div class="mb-8">' +
              '<p class="label-caps mb-4" style="color:#4a8a5a">PRODUCT OVERVIEW</p>' +
              '<p style="font-size:14px;line-height:1.8;color:#8a8a85">' + esc(data.description) + '</p>' +
            '</div>' +

            /* Research-use-only disclaimer */
            '<div class="p-5" style="background:#0f0f0f;border:1px solid rgba(240,237,232,0.06);border-left:3px solid #1a3a2a">' +
              '<p class="label-caps mb-2" style="color:#4a8a5a;font-size:9px">⚠ RESEARCH USE ONLY</p>' +
              '<p style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;color:#4a4a45">' +
                'This product is intended for in-vitro laboratory research purposes only. It is not approved for human consumption, veterinary use, or as a dietary supplement. ' +
                'Must be handled by qualified research personnel in compliance with all applicable local, national, and international regulations. Not for sale to persons under 18 years of age.' +
              '</p>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</section>' +

      related
    );
  }

  /* ── Wire interactivity ──────────────────────────────────────── */
  function wireInteractivity(data) {
    var doses     = data.doses || [];
    var firstDose = doses[0] || { label: '', price: 0, image: data.image };
    var activeDose = firstDose;
    var qty        = 1;

    /* Price display */
    var priceEl = document.getElementById('product-price');
    var mainImg = document.getElementById('product-main-img');

    /* Dose selector */
    var doseSelector = document.getElementById('dose-selector');
    if (doseSelector) {
      doseSelector.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-dose-index]');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-dose-index'), 10);
        activeDose = doses[idx] || firstDose;

        /* update price */
        if (priceEl) priceEl.textContent = '$' + activeDose.price.toFixed(2);

        /* update main image */
        if (mainImg && activeDose.image) mainImg.src = activeDose.image;

        /* update selector active state */
        doseSelector.querySelectorAll('.variant-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* sync thumbnails */
        var thumbs = document.getElementById('dose-thumbs');
        if (thumbs) {
          thumbs.querySelectorAll('.dose-thumb').forEach(function (t) {
            var active = parseInt(t.getAttribute('data-dose-index'), 10) === idx;
            t.style.borderColor = active ? '#1a3a2a' : 'rgba(240,237,232,0.12)';
            t.classList.toggle('active', active);
          });
        }
      });
    }

    /* Thumbnails also trigger dose change */
    var thumbsEl = document.getElementById('dose-thumbs');
    if (thumbsEl) {
      thumbsEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.dose-thumb');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-dose-index'), 10);
        /* trigger same logic as dose selector */
        if (doseSelector) {
          var doseBtn = doseSelector.querySelector('[data-dose-index="' + idx + '"]');
          if (doseBtn) doseBtn.click();
        } else {
          /* single-dose page — just update image */
          activeDose = doses[idx] || firstDose;
          if (mainImg && activeDose.image) mainImg.src = activeDose.image;
        }
      });
    }

    /* Qty controls */
    var qtyVal = document.getElementById('qty-val');
    document.getElementById('qty-dec').addEventListener('click', function () {
      if (qty > 1) { qty--; if (qtyVal) qtyVal.textContent = qty; }
    });
    document.getElementById('qty-inc').addEventListener('click', function () {
      qty++;
      if (qtyVal) qtyVal.textContent = qty;
    });

    /* Add to Cart */
    document.getElementById('add-to-cart-btn').addEventListener('click', function () {
      if (!window.BrayerCart) return;
      var doseLabel = activeDose.label || '';
      var itemId    = data.id + (doseLabel ? '-' + doseLabel.toLowerCase().replace(/[^a-z0-9]/g, '') : '');
      window.BrayerCart.addToCart({
        id:       itemId,
        name:     data.name,
        price:    activeDose.price,
        dose:     doseLabel,
        image:    activeDose.image || data.image || '',
        quantity: qty
      });
      /* flash button */
      var btn = document.getElementById('add-to-cart-btn');
      var orig = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:17px">check</span>ADDED TO CART';
      btn.style.background = '#2d5a3d';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 1200);
      window.BrayerCart.openCart();
    });
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    var data = window.PRODUCT_DATA;
    var root = document.getElementById('product-root');
    if (!data || !root) return;

    root.innerHTML = buildPage(data);
    wireInteractivity(data);

    /* trigger animations.js if present */
    if (window.initAnimations) window.initAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
