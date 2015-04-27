(function () {

  // observeElement
  var observeElement = function(baseElement, selector, handler) {
    var e = baseElement.querySelector(selector);
    var observer;
    var findElement = function() {
      var e = baseElement.querySelector(selector);
      if (e !== observer.currentElement) {
        observer.currentElement = e;
        handler(e);
      }
    };
    observer = new MutationObserver(findElement);
    observer.observe(baseElement, {
      // attributes: true,
      childList: true,
      subtree: true,
    });
    findElement();
    return observer;
  };

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
      console.log('settings element:', document.querySelector('#js_2 > div.uiContextualLayer a'));
      document.querySelector('#js_2 > div.uiContextualLayer a').click();
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

    updateThreadIDFromURL: function(url) {
      var m = /\/t\/([^\/]+)$/.exec(url);
      if (m && this.currentThreadID !== m[1]) {
        this.currentThreadID = m[1];
        this.onThreadChange();
      }
    },

    onThreadChange: function() {
      //console.log('Thread changed to', this.currentThreadID);
    },

    augmentConversation: function(baseElement){
      // var convoContainer = document.querySelector(
      //   'div.uiScrollableArea.fade.contentBefore.contentAfter'+
      //   '>div.uiScrollableAreaWrap'+
      //   '>div.uiScrollableAreaBody'+
      //   '>div.uiScrollableAreaContent'
      // );
      // if (!convoContainer) {
      //   return;
      // }
      var dropboxSharedLinks = baseElement.querySelectorAll(
        'div[aria-owns^="js_"][tabindex]>span '+
        'a[href^="https://www.dropbox.com/s/"]:not([data-dbxaugmented])'
      );

      var imageFileExtensions = {
        'jpg':1,'jpeg':1,'png':1,
      };

      //var messages = document.querySelectorAll('div[aria-owns^="js_"][tabindex]>span');
      Array.prototype.forEach.call(dropboxSharedLinks, function (e) {
        //var reactID = msg.getAttribute('data-reactid');
        e.setAttribute('data-dbxaugmented', ''); // mark as "processed" so we don't try again
        var m = /\/s\/[^\/]+\/([^\/\?]+)/.exec(e.href);
        if (m) {
          var filename = decodeURI(m[1]);
          var ext = /\.([^\.]+)$/.exec(filename);
          if (ext) { ext = ext[1]; }
          if (ext && imageFileExtensions[ext.toLowerCase()]) {
            var downloadURL = e.href.replace(/\?dl=0/, '?dl=1');
            var img = document.createElement('img');
            img.src = downloadURL;
            img.onload = function() {
              //console.log(filename, img.width, img.height);
              img.style.maxWidth = '200px';
              img.style.maxHeight = '200px';
              e.innerText = '';
              e.appendChild(img);
            };
            e.style.display = 'block';
            // e.style.width = '100%';
            e.style.minWidth = '100px';
            e.style.minHeight = '100px';
            // //e.style.backgroundColor = 'rgba(0,0,0,0.1)';
            // e.style.backgroundImage = 'url("' + downloadURL + '")';
            // e.style.backgroundSize = 'contain';
            // e.style.backgroundPosition = 'center center';
            // e.style.backgroundRepeat = 'no-repeat';
            // e.style.textDecoration = 'none';
            // e.style.color = 'transparent';
            // e.innerHTML = ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
            //               ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;';
            e.title = filename;
          } else {
            var icon = document.createElement('div');
            icon.className = '_2uf5';
            e.parentNode.insertBefore(icon, e);
          }
          e.innerText = filename;
        }
      });
    },

  };



  // Intercept location changes
  window.history._pushState = window.history.pushState;
  window.history.pushState = function(obj, title, url) {
    window.history._pushState(obj, title, url);
    MacMessenger.updateThreadIDFromURL(url);
  };
  MacMessenger.updateThreadIDFromURL(document.location.href);


  // observe conversation content switch
  observeElement(
    document,
    '[data-reactid=".0.1.$1.0.1.$0.0.0.0.0.0.0.1"]',
    function (convoContainer) {
      //console.log('convoContainer:', convoContainer);
      if (!convoContainer) {
        return;
      }
      var latencyTimer, reactionLatency = 100;
      var reactToMutations = function() {
        clearTimeout(latencyTimer);
        latencyTimer = null;
        console.log('convo content changed: reactToMutations');
        MacMessenger.augmentConversation(convoContainer);
      };
      observer = new MutationObserver(function() {
        if (!latencyTimer) {
          latencyTimer = setTimeout(reactToMutations, reactionLatency);
        }
      });
      observer.observe(convoContainer, {
        // attributes: true,
        childList: true,
        subtree: true,
      });
    }
  );
  setInterval(function(){ MacMessenger.augmentConversation(document); }, 2000);


  // Things that need the DOM to be loaded
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
      var e = document.querySelector('[aria-owns="js_2"]');
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
      observer.observe(document.body, { childList: true });
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
