/* ================================================================
   Brayer Peptides — Cart System
   localStorage cart with slide-in drawer.
   Public API exposed on window.BrayerCart
   ================================================================ */
(function () {
  'use strict';

  var KEY = 'brayer_cart';
  var _items = [];

  /* ── Persistence ─────────────────────────────────────────────── */
  function _load() {
    try { _items = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { _items = []; }
  }

  function _persist() {
    localStorage.setItem(KEY, JSON.stringify(_items));
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: _items } }));
    _updateBadges();
    _render();
  }

  /* ── Public API ──────────────────────────────────────────────── */
  /** addToCart({ id, name, price, dose, image, quantity }) */
  function addToCart(product) {
    var qty = Math.max(1, parseInt(product.quantity, 10) || 1);
    for (var i = 0; i < _items.length; i++) {
      if (_items[i].id === product.id) {
        _items[i].quantity += qty;
        _persist();
        return;
      }
    }
    _items.push({
      id:       product.id,
      name:     product.name     || '',
      price:    parseFloat(product.price) || 0,
      dose:     product.dose     || '',
      image:    product.image    || '',
      quantity: qty
    });
    _persist();
  }

  function removeFromCart(id) {
    _items = _items.filter(function (x) { return x.id !== id; });
    _persist();
  }

  function updateQuantity(id, qty) {
    qty = parseInt(qty, 10);
    if (qty < 1) { removeFromCart(id); return; }
    for (var i = 0; i < _items.length; i++) {
      if (_items[i].id === id) { _items[i].quantity = qty; break; }
    }
    _persist();
  }

  function getCart()      { return _items.slice(); }
  function getCartCount() { return _items.reduce(function (s, x) { return s + x.quantity; }, 0); }
  function getCartTotal() { return _items.reduce(function (s, x) { return s + x.price * x.quantity; }, 0); }
  function clearCart()    { _items = []; _persist(); }

  /* ── DOM refs ────────────────────────────────────────────────── */
  var _overlay, _drawer, _itemsList, _subtotalEl, _countEl;

  /* ── Inject drawer ───────────────────────────────────────────── */
  function _injectDrawer() {
    _overlay = document.createElement('div');
    _overlay.id = 'cart-overlay';
    document.body.appendChild(_overlay);

    _drawer = document.createElement('aside');
    _drawer.id = 'cart-drawer';
    _drawer.setAttribute('role', 'dialog');
    _drawer.setAttribute('aria-modal', 'true');
    _drawer.setAttribute('aria-label', 'Shopping Cart');

    _drawer.innerHTML =
      '<div class="cart-header">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<span class="material-symbols-outlined" style="font-size:20px;color:#4a8a5a">shopping_bag</span>' +
          '<span class="font-display" style="font-size:22px;letter-spacing:0.06em;color:#f0ede8">CART</span>' +
          '<span id="cart-drawer-count" class="label-caps" style="color:#8a8a85">0 ITEMS</span>' +
        '</div>' +
        '<button type="button" id="cart-close" class="cart-close-btn" aria-label="Close cart">' +
          '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
      '</div>' +
      '<div id="cart-items" class="cart-items-list"></div>' +
      '<div class="cart-footer">' +
        '<div class="cart-subtotal-row">' +
          '<span class="label-caps" style="color:#8a8a85">SUBTOTAL</span>' +
          '<span id="cart-subtotal" class="font-display" style="font-size:28px;color:#f0ede8">$0.00</span>' +
        '</div>' +
        '<p style="font-family:Inter,sans-serif;font-size:10px;color:#8a8a85;margin:8px 0 16px;font-style:italic">' +
          'Shipping calculated at checkout. For laboratory research use only.' +
        '</p>' +
        '<button type="button" class="btn-primary cart-checkout-btn" id="cart-checkout-btn">' +
          '<span class="material-symbols-outlined" style="font-size:15px">arrow_forward</span>' +
          'CHECKOUT' +
        '</button>' +
        '<button type="button" class="btn-outlined cart-continue-btn" id="cart-continue">' +
          'CONTINUE SHOPPING' +
        '</button>' +
      '</div>';

    document.body.appendChild(_drawer);
    _itemsList  = document.getElementById('cart-items');
    _subtotalEl = document.getElementById('cart-subtotal');
    _countEl    = document.getElementById('cart-drawer-count');
  }

  /* ── Open / Close ────────────────────────────────────────────── */
  function openCart() {
    if (!_overlay || !_drawer) return;
    _overlay.classList.add('open');
    _drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (!_overlay || !_drawer) return;
    _overlay.classList.remove('open');
    _drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Render drawer items ─────────────────────────────────────── */
  function _render() {
    if (!_itemsList) return;

    if (_items.length === 0) {
      _itemsList.innerHTML =
        '<div class="cart-empty">' +
          '<span class="material-symbols-outlined" style="font-size:52px;color:#2a2a2a;display:block;margin-bottom:16px">shopping_bag</span>' +
          '<p class="label-caps" style="color:#8a8a85;margin-bottom:6px">YOUR CART IS EMPTY</p>' +
          '<p style="font-family:Inter,sans-serif;font-size:12px;color:#4a4a45;text-align:center">Add compounds from the catalog<br>to get started.</p>' +
        '</div>';
      if (_subtotalEl) _subtotalEl.textContent = '$0.00';
      if (_countEl)    _countEl.textContent    = '0 ITEMS';
      return;
    }

    var html = '';
    for (var i = 0; i < _items.length; i++) {
      var item = _items[i];
      var lineTotal = (item.price * item.quantity).toFixed(2);
      html +=
        '<div class="cart-item">' +
          '<img src="' + _esc(item.image) + '" alt="' + _esc(item.name) + '" class="cart-item-img" />' +
          '<div class="cart-item-details">' +
            '<p class="cart-item-name">' + _esc(item.name) + '</p>' +
            (item.dose ? '<p class="label-caps" style="color:#4a8a5a;font-size:9px;margin:0 0 4px">' + _esc(item.dose) + '</p>' : '') +
            '<p class="cart-item-price">$' + item.price.toFixed(2) + ' / vial</p>' +
            '<div class="cart-qty-row">' +
              '<button type="button" class="cart-qty-btn" data-action="dec" data-id="' + _esc(item.id) + '">\u2212</button>' +
              '<span class="cart-qty-val">' + item.quantity + '</span>' +
              '<button type="button" class="cart-qty-btn" data-action="inc" data-id="' + _esc(item.id) + '">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-item-right">' +
            '<p class="cart-item-total">$' + lineTotal + '</p>' +
            '<button type="button" class="cart-remove-btn" data-id="' + _esc(item.id) + '" aria-label="Remove">' +
              '<span class="material-symbols-outlined" style="font-size:16px">delete</span>' +
            '</button>' +
          '</div>' +
        '</div>';
    }
    _itemsList.innerHTML = html;

    var count = getCartCount();
    var total = getCartTotal();
    if (_subtotalEl) _subtotalEl.textContent = '$' + total.toFixed(2);
    if (_countEl)    _countEl.textContent    = count + (count === 1 ? ' ITEM' : ' ITEMS');
  }

  /* ── Update nav badges ───────────────────────────────────────── */
  function _updateBadges() {
    var count = getCartCount();
    var els = document.querySelectorAll('#cart-count');
    for (var i = 0; i < els.length; i++) { els[i].textContent = count; }
  }

  /* ── HTML escape ─────────────────────────────────────────────── */
  function _esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Flash "Added ✓" on button ───────────────────────────────── */
  function _flashAdded(btn) {
    var orig = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:13px">check</span>ADDED';
    btn.style.background = '#2d5a3d';
    btn.disabled = true;
    setTimeout(function () {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 1100);
  }

  /* ── Extract dose string from product name ───────────────────── */
  function _doseFromName(name) {
    var m = name.match(/\d+(?:\.\d+)?\s*(?:mg|iu|mcg|ml)/i);
    return m ? m[0].toUpperCase() : '';
  }

  /* ── Find price span inside article ─────────────────────────── */
  function _readPrice(article) {
    var els = article.querySelectorAll('.font-display');
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent.indexOf('$') !== -1) {
        return parseFloat(els[i].textContent.replace(/[^0-9.]/g, '')) || 0;
      }
    }
    return 0;
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function _init() {
    _load();
    _injectDrawer();
    _render();
    _updateBadges();

    /* overlay and control buttons */
    _overlay.addEventListener('click', closeCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('cart-continue').addEventListener('click', closeCart);
    document.getElementById('cart-checkout-btn').addEventListener('click', function () {
      alert('Checkout coming soon.');
    });

    /* cart icon in nav */
    var cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', openCart);

    /* item qty / remove (delegated) */
    _itemsList.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) {
        var id     = btn.getAttribute('data-id');
        var action = btn.getAttribute('data-action');
        for (var i = 0; i < _items.length; i++) {
          if (_items[i].id === id) {
            updateQuantity(id, _items[i].quantity + (action === 'inc' ? 1 : -1));
            break;
          }
        }
        return;
      }
      var rmBtn = e.target.closest('.cart-remove-btn');
      if (rmBtn) removeFromCart(rmBtn.getAttribute('data-id'));
    });

    /* ADD TO CART — delegated on document
       Catches buttons with the add_shopping_cart icon inside article[data-name]
       (used on the shop page grid cards)                                       */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var article = btn.closest('article[data-name]');
      if (!article) return;
      var icon = btn.querySelector('.material-symbols-outlined');
      if (!icon || icon.textContent.trim() !== 'add_shopping_cart') return;

      var name  = article.getAttribute('data-name') || '';
      var id    = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      var dose  = _doseFromName(name);
      var price = _readPrice(article);
      var imgEl = article.querySelector('img');
      var img   = imgEl ? imgEl.getAttribute('src') : '';

      addToCart({ id: id, name: name, price: price, dose: dose, image: img, quantity: 1 });
      _flashAdded(btn);
      openCart();
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCart();
    });
  }

  /* ── Boot ────────────────────────────────────────────────────── */
  window.BrayerCart = {
    addToCart:      addToCart,
    removeFromCart: removeFromCart,
    updateQuantity: updateQuantity,
    getCart:        getCart,
    getCartCount:   getCartCount,
    getCartTotal:   getCartTotal,
    clearCart:      clearCart,
    openCart:       openCart,
    closeCart:      closeCart
  };
  /* convenience alias */
  window.addToCart = addToCart;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }
})();
