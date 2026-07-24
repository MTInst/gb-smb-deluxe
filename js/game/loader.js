// Carregador da ROM e Inicializador do Emulador
window.addEventListener("DOMContentLoaded", function() {
  // Limpa possíveis save states antigos do localStorage
  try {
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var k = localStorage.key(i);
      if (k && (k.indexOf("AUTO_SAVE_STATE_") === 0 || k.indexOf("FREEZE_") === 0)) {
        localStorage.removeItem(k);
      }
    }
  } catch(e) {}

  if (typeof settings !== "undefined") {
    settings[0] = true; // Audio ON
    settings[3] = 1.0;  // Volume 100%
  }

  if (typeof bindTouchControls === "function") {
    bindTouchControls();
  }

  var romPath = "roms/game.gb";
  fetch(romPath)
    .then(function(res) {
      if (!res.ok) {
        return fetch("game.gb");
      }
      return res;
    })
    .then(function(res) {
      if (!res.ok) throw new Error("ROM não encontrada");
      return res.arrayBuffer();
    })
    .then(function(buffer) {
      var bytes = new Uint8Array(buffer);
      var binary = "";
      var chunkSize = 8192;
      for (var i = 0; i < bytes.length; i += chunkSize) {
        var sub = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, sub);
      }

      var canvasElem = document.getElementById("mainCanvas");
      start(canvasElem, binary);

      if (gameboy && gameboy.drawContextOnscreen) {
        gameboy.drawContextOnscreen.imageSmoothingEnabled = false;
        gameboy.drawContextOnscreen.webkitImageSmoothingEnabled = false;
        gameboy.drawContextOnscreen.mozImageSmoothingEnabled = false;
        gameboy.drawContextOnscreen.msImageSmoothingEnabled = false;
      }
    })
    .catch(function(err) {
      console.error("Erro ao inicializar jogo:", err);
    });
});
