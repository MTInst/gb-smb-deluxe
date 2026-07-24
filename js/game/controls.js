// Mapeamento de Controles Touch e Teclado Físico
(function() {
  function unlockAudio() {
    if (typeof XAudioJSWebAudioContextHandle !== "undefined" && XAudioJSWebAudioContextHandle) {
      if (XAudioJSWebAudioContextHandle.state === "suspended") {
        XAudioJSWebAudioContextHandle.resume();
      }
    }
  }

  window.addEventListener("touchstart", unlockAudio, { passive: true });
  window.addEventListener("mousedown", unlockAudio, { passive: true });
  window.addEventListener("click", unlockAudio, { passive: true });

  function bindTouchControls() {
    var buttons = document.querySelectorAll("[data-gb-key]");
    buttons.forEach(function(btn) {
      var keyIndex = parseInt(btn.getAttribute("data-gb-key"), 10);

      var handleDown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        unlockAudio();
        if (typeof GameBoyJoyPadEvent === "function") {
          GameBoyJoyPadEvent(keyIndex, true);
        }
      };

      var handleUp = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof GameBoyJoyPadEvent === "function") {
          GameBoyJoyPadEvent(keyIndex, false);
        }
      };

      btn.addEventListener("touchstart", handleDown, { passive: false });
      btn.addEventListener("touchend", handleUp, { passive: false });
      btn.addEventListener("mousedown", handleDown);
      btn.addEventListener("mouseup", handleUp);
    });
  }

  // Teclado Físico
  window.addEventListener("keydown", function(e) {
    unlockAudio();
    var code = e.keyCode || e.which;
    var map = {39: 0, 37: 1, 38: 2, 40: 3, 88: 4, 90: 5, 16: 6, 13: 7};
    if (map[code] !== undefined) {
      GameBoyJoyPadEvent(map[code], true);
    }
  });

  window.addEventListener("keyup", function(e) {
    var code = e.keyCode || e.which;
    var map = {39: 0, 37: 1, 38: 2, 40: 3, 88: 4, 90: 5, 16: 6, 13: 7};
    if (map[code] !== undefined) {
      GameBoyJoyPadEvent(map[code], false);
    }
  });

  window.bindTouchControls = bindTouchControls;
})();
