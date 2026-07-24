// Save Automático de Bateria (SRAM) do Game Boy no LocalStorage
(function() {
  window.triggerAutoSave = function() {
    if (typeof GameBoyEmulatorInitialized === "function" && GameBoyEmulatorInitialized()) {
      if (typeof autoSave === "function") {
        autoSave();
      }
    }
  };

  // Salva a memória da bateria (SRAM) a cada 2 segundos enquanto joga
  setInterval(window.triggerAutoSave, 2000);

  // Salva imediatamente a bateria ao fechar a página, minimizar ou trocar de app
  window.addEventListener("beforeunload", window.triggerAutoSave);
  window.addEventListener("pagehide", window.triggerAutoSave);
  document.addEventListener("visibilitychange", function() {
    if (document.hidden) window.triggerAutoSave();
  });
})();
