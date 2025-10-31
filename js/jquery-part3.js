$(function () {
  console.log("jQuery Part 3 ready!");

  /* =========================
     Task 7: Toast / Notification
     ========================= */
  window.showToast = function (msg, timeout) {
    timeout = typeof timeout === "number" ? timeout : 1200;
    var $wrap = $("#toastWrap");
    if (!$wrap.length) {
      $wrap = $('<div id="toastWrap" aria-live="polite" role="status"></div>').appendTo("body");
      // небольшой базовый стиль если нет CSS (можно убрать)
      $wrap.css({
        position: "fixed",
        right: "16px",
        bottom: "16px",
        zIndex: 99999,
        maxWidth: "320px"
      });
    }

    var $t = $('<div class="toast" />').text(msg).css({
      marginTop: "8px",
      padding: "10px 14px",
      borderRadius: "8px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      background: "#222",
      color: "#fff",
      fontSize: "13px"
    });
    $wrap.append($t);

    setTimeout(function () {
      $t.fadeOut(300, function () { $(this).remove(); });
    }, timeout);
  };


  /* =========================
     Demo button (делегирование — работает для динамически добавленных элементов)
     ========================= */
  $(document).on('click', '#demoToast', function () {
    showToast("This is a sample toast notification!");
  });


  /* =========================
     Task 8: Copy to Clipboard (navigator.clipboard + fallback)
     ========================= */
  $(document).on("click", ".copy-btn", function () {
    var $btn = $(this);
    var targetSel = $btn.data("target"); // e.g. "#copyText1"
    var $target = $(targetSel);
    if (!$target.length) {
      showToast("Target not found");
      return;
    }

    var text = $target.text().trim();

    function onCopySuccess() {
      $btn.addClass("copied");
      var old = $btn.text();
      $btn.text("✓ Copied");
      showToast("Copied to clipboard!");
      setTimeout(function () {
        $btn.removeClass("copied").text(old);
      }, 800);
    }

    function onCopyFail() {
      showToast("Copy failed");
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onCopySuccess).catch(function () {

        fallbackCopy(text, onCopySuccess, onCopyFail);
      });
    } else {
      fallbackCopy(text, onCopySuccess, onCopyFail);
    }
  });

  function fallbackCopy(text, okCb, failCb) {
    var $temp = $("<textarea>", { readonly: "", style: "position: absolute; left: -9999px;" }).val(text).appendTo("body");
    var el = $temp[0];
    el.select();
    el.setSelectionRange(0, el.value.length || 0);
    try {
      var ok = document.execCommand("copy");
      $temp.remove();
      if (ok) okCb();
      else failCb();
    } catch (e) {
      $temp.remove();
      failCb();
    }
  }


  /* =========================
     Task 9: Image Lazy Loading
     ========================= */
  function inView($el) {
    if (!$el.length) return false;
    var top = $el.offset().top;
    var bottom = top + $el.outerHeight();
    var vTop = $(window).scrollTop();
    var vBottom = vTop + $(window).height();
    return bottom > vTop - 50 && top < vBottom + 50; 
  }

  function loadVisibleImages() {
    $("img[data-src]").each(function () {
      var $img = $(this);
      if ($img.attr("src")) return;
      if (inView($img)) {
        var real = $img.data("src");
        if (real) {
          $img.attr("src", real).addClass("loaded");
        }
      }
    });
  }

  var lazyTimer = null;
  $(window).on("scroll resize", function () {
    if (lazyTimer) clearTimeout(lazyTimer);
    lazyTimer = setTimeout(loadVisibleImages, 100);
  });

  loadVisibleImages(); 
});
