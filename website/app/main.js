// Note:
//   window.MacMessengerVersion will be defined to a string e.g. to "0.1.2"
//   window.MacMessengerGitRev will be defined to a string e.g. "abc917"

window.MacMessenger = {
  openGearMenu: function() {
    this.gearButton.firstElementChild.dispatchEvent(
      new MouseEvent('click', {view:window, bubbles:true, cancelable:true})
    );
  },

  logOut: function() {
    // TODO: Actually "log out" instead of showing the menu
    this.openGearMenu();
  },


  showSettings: function() {
    this.openGearMenu();
    document.querySelector(
      'div.uiLayer.uiContextualLayerPositioner#js_1 > div.uiContextualLayer a'
    ).dispatchEvent(
      new MouseEvent('click', {view:window, bubbles:true, cancelable:true})
    );
  },

  composeNewMessage: function() {
    document.querySelector('a[href="/new"]').dispatchEvent(
      new MouseEvent('click', {view:window, bubbles:true, cancelable:true})
    );
  },

  focusSearchField: function() {
    document.querySelector('input[placeholder~="Search"]').focus();
  },

  focusComposer: function() {
    document.querySelector('div[contenteditable="true"]').focus();
  },

  selectConversationAtIndex: function(index) {
    document.querySelector('li:nth-child('+index+') > [data-reactid]:first-child').click();
  },

};


// Things that need the DOM to be loaded
(function () {
  var onDocumentLoaded = function() {
    if (document.readyState === "loading") {
      return; // still loading
    }
    document.removeEventListener('readystatechange', onDocumentLoaded);

    // This fixes an annoying "beep" sound
    document.body.onkeypress = function (e) {
      var target = e.target.contentEditable && e.target.querySelector('[data-block]');
      if (target && window.getSelection().baseOffset === 0 && !e.metaKey) {
        var textEvent = document.createEvent('TextEvent');
        textEvent.initTextEvent('textInput', true, true, null, String.fromCharCode(e.which));
        target.dispatchEvent(textEvent);
        return false;
      }
    };

    // Find settings gear
    var tryFindSettingsGear = function() {
      var e = document.querySelector('[aria-owns="js_1"]');
      if (e) {
        e = e.parentNode;
        e.style.visibility = 'hidden';
        window.MacMessenger.gearButton = e;
        return true;
      }
    };
    if (!tryFindSettingsGear()) {
      var observer = new MutationObserver(function(mutations) {
        if (tryFindSettingsGear()) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { attributes: false, childList: true, characterData: false });
    }

    // The following two statements enable drag-and-drop file sending
    document.addEventListener('dragover', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'copy';
    });
    document.addEventListener('drop', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      document.querySelector('input[type="file"][name="attachment[]"]').files =
        ev.dataTransfer.files;
    });

  };
  document.addEventListener('readystatechange', onDocumentLoaded);
  onDocumentLoaded();
})();

console.log('app/main.js loaded');
