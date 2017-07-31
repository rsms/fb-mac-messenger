// Note:
//   window.MacMessengerVersion will be defined to a string e.g. to "0.1.2"
//   window.MacMessengerGitRev will be defined to a string e.g. "abc917"
//
(function () {
  function last(array) {
    return array[array.length-1];
  }

  function elemInDOM(e) {
    return e && e.ownerDocument && e.ownerDocument.contains(e)
  }

  function observe(root, options, callback) {
    var observer = new MutationObserver(function(mutations) {
      callback(observer, mutations)
    })
    observer.observe(root, options);
    return observer
  }

  var M = window.MacMessenger = {
    _header: null,
    _headerFindObserver: null,
    _headerChangeObserver: null,
    _mainMenuButton: null,

    startObservingViewHeader: function() {
      if (M._headerChangeObserver) {
        M._headerChangeObserver.disconnect()
      }
      M._headerChangeObserver = observe(
        M._header,
        {childList: true},
        function(observer, mutations) {
          M.onMasterViewHeaderChange()
        }
      )
    },

    setMasterViewHeader: function(header) {
      if (header !== M._header) {
        M._header = header
        // if (M._header) {
        //   var s = M._header.style
        //   s.setProperty('justify-content', 'flex-end', 'important')
        //   s.setProperty('-webkit-justify-content', 'flex-end', 'important')
        // }
      }
      return M._header
    },

    getMasterViewHeader: function() {
      if ( !elemInDOM(M._header) &&
           !M._headerFindObserver &&
           !M.setMasterViewHeader(document.querySelector('div[role="banner"]')) )
      {
        M._headerFindObserver = observe(document.body, {childList: true}, function(observer, muts) {
          if (M.setMasterViewHeader(document.querySelector('div[role="banner"]'))) {
            M._headerFindObserver = null
            observer.disconnect()
            M.startObservingViewHeader()
          }
        })
        return null
      } else if (!M._headerChangeObserver) {
        M.startObservingViewHeader()
      }
      return M._header
    },

    onMasterViewHeaderChange: function() {
      // Called when the contents of the master view header changes

      // Find main menu button (if it has been recreated) and hide it if needed
      M.getMainMenuButton()

      // var header = M.getMasterViewHeader()
      // if (header) {
      //   // Hide "Messenger" window title
      //   var masterTitle = header.querySelector('em[data-intl-translation]')
      //   if (masterTitle && masterTitle.parentElement) {
      //     masterTitle.parentElement.style.display = 'none'
      //   }
      // } else console.log('no masterTitle')
    },

    _lastMainMenuButton: null,

    getMainMenuButton: function() {
      var header = M.getMasterViewHeader()
      if (!header) {
        return null
      }
      var mainMenuButton = header.querySelector('div:first-child .uiPopover a[role="button"]')
      if (M._lastMainMenuButton !== mainMenuButton) {
        M._lastMainMenuButton = mainMenuButton
        if (mainMenuButton) {
          mainMenuButton.style.visibility = 'hidden'
        }
      }
      return mainMenuButton
    },

    getMainBackButton: function() {
      var header = M.getMasterViewHeader()
      if (!header) {
        return null
      }
      return header.querySelector('a:first-child[role="button"]')
    },

    openMainMenu: function() {
      var mainMenuButton = M.getMainMenuButton()
      if (mainMenuButton && mainMenuButton.click) {
        mainMenuButton.click()
        return M.getContextMenu()
      }
      return null
    },

    getContextMenuIterator: function() {
      var menuElements = document.querySelectorAll('ul[role="menu"]')

      function MenuItem(element) {
        this.element = element
        this.url = element.href
      }
      MenuItem.prototype.getTitle = function() {
        return this.element.innerText.trim()
      }
      MenuItem.prototype.click = function() {
        return this.element.click()
      }

      function MenuObj(element) {
        this.element = element
        this._items = null
      }
      MenuObj.prototype.itemElements = function() {
        return this._items || (this._items = this.element.querySelectorAll('a[role="menuitem"]'))
      }
      MenuObj.prototype.itemAt = function(index) {
        var itemEl = this.itemElements()[index]
        return itemEl ? new MenuItem(itemEl) : null
      }
      MenuObj.prototype.lastItem = function() {
        var items = this.itemElements()
        var itemEl = items[items.length-1]
        return itemEl ? new MenuItem(itemEl) : null
      }
      MenuObj.prototype[Symbol.iterator] = function() {
        var menu = this
        var items = this.itemElements()
        var index = 0
        return {
          next: function() {
            var itemEl = items[index++]
            return itemEl ? { done: false, value: new MenuItem(itemEl) }
                          : { done: true,  value: null }
          },
        }
      };

      var index = 0
      return {
        next: function() {
          var menuEl = menuElements[index++]
          return menuEl ? { done: false, value: new MenuObj(menuEl) }
                        : { done: true,  value: null }
        },
      }
    },

    getContextMenu: function() {
      var mit = M.getContextMenuIterator()
      var v = mit.next()
      return v.done ? null : v.value
    },

    showSettings: function() {
      var ctxMenu = M.openMainMenu()
      if (ctxMenu) {
        var item = ctxMenu.itemAt(0)
        if (item) {
          item.click()
          return true
        }
      }
      return false
    },

    changeMasterView: function(tagName) {
      // GROUPS
      // PEOPLE
      // RECENT  <---- default
      // SEARCH
      // SUPPORT
      var MessengerActions = require('MessengerActions'),
          MessengerView = require('MessengerView')
      if (MessengerActions && MessengerView) {
        var tag = MessengerView.MASTER[tagName]
        if (tag) {
          MessengerActions.changeMasterView(tag)
          return tag
        }
      }
      return false
    },

    changeFolder: function(tagName) {
      // GROUPS
      // UNREAD <- state toggle
      // FLAGGED
      // ACTION_ARCHIVED  -- "Archived threads"
      // INBOX  <------------- default
      // OTHER
      // PENDING
      // MONTAGE
      // EVENT
      // SENT
      // SPAM
      // UPDATES
      // BCC
      // FILTERED_CONTENT
      // FILTERED_CONTENT_BH
      // FILTERED_CONTENT_ACCOUNT
      // FILTERED_CONTENT_QUASAR
      // FILTERED_CONTENT_INVALID_APP
      // UNAVAILABLE_ATTACHMENT
      // ARCHIVED
      // EMAIL
      // VOICEMAIL
      // SPAM_SPOOFING
      // SPOOF_WARNING
      // SMS_TAG_ROOT
      // APP_ID_ROOT
      // DOMAIN_AUTH_PASS
      // DOMAIN_AUTH_FAIL
      // MTA_SYSTEM_MESSAGE
      // EMAIL_MESSAGE
      // MARKETPLACE
      // ROOM
      var MessengerActions = require('MessengerActions'),
          MessagingTag = require('MessagingTag')
      if (MessengerActions && MessagingTag) {
        var tag = MessagingTag[tagName]
        if (tag) {
          MessengerActions.changeFolder(tag)
          return tag
        }
      }
      return false
    },

    showInbox: function() {
      M.changeMasterView('RECENT') // required when in "active friends" mode
      M.changeFolder('INBOX')
    },

    showActiveFriends: function() {
      M.changeMasterView('RECENT') // required when in "archived threads"
      M.changeFolder('INBOX')      // required when in "archived threads"
      M.changeMasterView('PEOPLE')
    },

    showArchivedThreads: function() {
      M.changeFolder('ACTION_ARCHIVED')
    },

    showMessageRequests: function() {
      M.changeMasterView('RECENT') // required when in "archived threads"
      M.changeFolder('PENDING')
    },

    logOut: function() {
      var mainMenuButton = M.getMainMenuButton()
      if (mainMenuButton) {
        mainMenuButton.click();
        // TODO: requestAnimationFrame for the following
        var menuItem = last(document.querySelectorAll("ul[role='menu']")).querySelector("li:last-child a");
        menuItem.click();
      }
    },

    composeNewMessage: function() {
      document.querySelector('a[href="/new"]').dispatchEvent(
        new MouseEvent('click', {view:window, bubbles:true, cancelable:true})
      );
    },

    focusSearchField: function() {
      document.querySelector('input[aria-autocomplete="list"]').focus();
    },

    focusComposer: function() {
      document.querySelector('div[contenteditable="true"]').focus();
    },

    selectConversationAtIndex: function(index) {
      document.querySelector('div[aria-label="Conversations"] li:nth-child(' + index +') a').click();
    },

    currentConversationItem: function() {
      return document.querySelector('li[aria-relevant="additions text"]');
    },

    canSelectNewerConversation: function () {
      return (this.currentConversationItem().previousElementSibling != null);
    },

    selectNewerConversation: function () {
      var newer = this.currentConversationItem().previousElementSibling;
      if (newer) {
        newer.querySelector('a').click();
      }
    },

    canSelectOlderConversation: function () {
      return (this.currentConversationItem().nextElementSibling != null);
    },

    selectOlderConversation: function () {
      var newer = this.currentConversationItem().nextElementSibling;
      if (newer) {
        newer.querySelector('a').click();
      }
    },

    _viewsWithBackButtons: { 'requests':1, 'filtered':1, 'people':1, 'archived':1 },

    locationChanged: function(url) {
      var c = url.split(/\/+/);
        // e.g. "https://www.messenger.com/requests/t/1234" =>
        // e.g. [0:"https:", 1:"www.messenger.com", 2:"requests", 3:"t", 4:"1234"]
      var i = 2;
      if (M._viewsWithBackButtons[c[i]]) {
        HideMainWindowTitlebar();
        ++i;
      } else {
        ShowMainWindowTitlebar();
      }
      if (c[i] === 't' && c[i+1]) {
        this.currentThreadID = c[1];
        this.onThreadChange();
      } else if (this.currentThreadID) {
        this.currentThreadID = null;
        this.onThreadChange();
      }
    },

    _updateTitleTimer: null,

    onThreadChange: function() {
      clearTimeout(M._updateTitleTimer)
      M._updateTitleTimer = setTimeout(function(){
        var detailViewTitle = document.querySelector('[role="main"] h2')
        if (detailViewTitle) {
          window.SetMainWindowTitle(detailViewTitle.innerText.trim())
        } else {
          window.SetMainWindowTitle('Messenger')
        }
      }, 100)
    },

  };

  window.windowActive = false;
  window.addEventListener('focus', function() { window.windowActive = true; });
  window.addEventListener('blur', function() { window.windowActive = false; });
  window.verifyWindowActive = function() {
    setTimeout(function() {
      if (!window.windowActive) window.dispatchEvent(new Event('focus'));
    }, 10);
  };
  window.verifyWindowInactive = function() {
    setTimeout(function() {
      if (window.windowActive) window.dispatchEvent(new Event('blur'));
    }, 10);
  };

  // Things that need the DOM to be loaded
  function onAppReady() {
    // Intercept location changes
    window.history._pushState = window.history.pushState;
    window.history.pushState = function(obj, title, url) {
      window.history._pushState(obj, title, url);
      MacMessenger.locationChanged(url);
    };
    MacMessenger.locationChanged(document.location.href);

    // Trigger finding main menu "gear" button
    MacMessenger.onMasterViewHeaderChange()

    // #146 Fix for vertical scrollbar appearing when mouse plugged in
    var css = document.createElement('style');
    css.type = 'text/css';

    var style = 'body { overflow: hidden; }'
    style += '@media (max-width: 700px) { [aria-label="New Message"] { visibility: hidden; } }'

    css.appendChild(document.createTextNode(style));
    document.getElementsByTagName('head')[0].appendChild(css);
  }


  // code that makes sure onAppReady is called once the document
  // is ready, including react, and only a single time.
  var didLoad = false;
  function checkDocumentLoaded() {
    if (didLoad) {
      return;
    }
    if (window.require === undefined || !require("React")) {
      // React not yet loaded. We need it for findReactDOMNode to function
      setTimeout(checkDocumentLoaded, 1000);
      return;
    }
    if (document.readyState === "loading") {
      return; // still loading -- readystatechange will trigger again
    }
    document.removeEventListener('readystatechange', onAppReady);
    didLoad = true;
    onAppReady();
  }
  document.addEventListener('readystatechange', checkDocumentLoaded);
  checkDocumentLoaded();

})();

console.log('app/main.js loaded');
