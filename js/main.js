// ==========================================
// ヘッダー・ハンバーガーメニュー・ページ切り替え・
// タブ・アコーディオン すべてのUIロジック
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

  var hamburger   = document.getElementById('hamburgerBtn');
  var slideMenu   = document.getElementById('slideMenu');
  var menuOverlay = document.getElementById('menuOverlay');
  var pageButtons = document.querySelectorAll('[data-target]');
  var pageSections = document.querySelectorAll('.page-section');

  // ---- メニュー開閉 ----
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    slideMenu.classList.add('open');
    slideMenu.setAttribute('aria-hidden', 'false');
    menuOverlay.classList.add('open');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    slideMenu.classList.remove('open');
    slideMenu.setAttribute('aria-hidden', 'true');
    menuOverlay.classList.remove('open');
  }

  hamburger.addEventListener('click', function () {
    if (slideMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.addEventListener('click', closeMenu);

  // ---- ページ（初期／趣味趣向について／生息場所／アバターまとめ／注意事項）切り替え ----
  function showPage(target) {
    pageSections.forEach(function (section) {
      section.classList.remove('active');
    });
    var targetSection = document.getElementById('page-' + target);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // メニュー内のアクティブ表示を更新
    document.querySelectorAll('.slide-menu button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.target === target);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  pageButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showPage(btn.dataset.target);
      closeMenu();
    });
  });

  // ---- タブ（趣味趣向について：好み／苦手） ----
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.profile-tabs');
      wrap.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      wrap.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      var target = document.getElementById(btn.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // ---- アコーディオン（好みタブの中身） ----
  document.querySelectorAll('.acc-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.closest('.acc-item');
      var panel = item.querySelector('.acc-panel');
      var isOpen = item.classList.contains('open');

      if (isOpen) {
        panel.style.maxHeight = null;
        item.classList.remove('open');
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // 初期状態で開いている項目（.acc-item.open）の高さをセット
  document.querySelectorAll('.acc-item.open .acc-panel').forEach(function (panel) {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });

});
