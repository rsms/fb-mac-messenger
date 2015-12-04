(function () {

  function findReactDOMNode(options, instances) {
    var React = require("React");
    var ReactDOM = require("ReactDOM");
    var ReactMount = require("ReactMount");
    var ret = null;

    if (!instances) instances = ReactMount._instancesByReactRootID;

    for (n in instances) {
      var instance = instances[n];

      if (!instance) continue;
      var element = instance._currentElement;

      if (options.name) {
        if (element && element.type && element.type.displayName == options.name) {
          return ReactDOM.findDOMNode(instance.getPublicInstance());
        }
      } else if (options.id) {
        if (instance._rootNodeID == options.id) {
          // if (element.type.displayName) {
          //   console.log(element.type.displayName);
          // } else {
          //   console.log(element.type);
          // }
          return instance;
        }
      }
      if (typeof instance._stringText === 'string') continue;

      if (instance._renderedComponent) {
        ret = findReactDOMNode(options, { a: instance._renderedComponent });
      }

      var children = instance._renderedChildren;
      if (!ret && children) {
        ret = findReactDOMNode(options, children);
      }

      if (ret) return ret;
    }

    return null;
  }


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
  
  // Returns a new object with new values for each key
  var mapObject = function(original, eachFn) {
    var res = {};
    for (var key in original) {
      res[key] = eachFn(key, original[key]);
    }
    return res;
  };
  
  // Runs the specified function for each key-value pair
  var eachKey = function(object, eachFn) {
    for (var key in object) {
      eachFn(key, object[key]);
    }
  };

  // Note:
  //   window.MacMessengerVersion will be defined to a string e.g. to "0.1.2"
  //   window.MacMessengerGitRev will be defined to a string e.g. "abc917"

  window.MacMessenger = {
    openGearMenu: function() {
      this.gearButton.firstElementChild.firstElementChild.dispatchEvent(
        new MouseEvent('click', {view:window, bubbles:true, cancelable:true})
      );
    },

    logOut: function() {
      // TODO: Actually "log out" instead of showing the menu
      this.openGearMenu();
    },


    showSettings: function() {
      this.openGearMenu();
      var sel =
        'div.uiContextualLayerPositioner.uiLayer > ' +
        'div.uiContextualLayer.uiContextualLayerBelowLeft li > a';
      document.querySelector(sel).click();
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
      return document.querySelector('li[role="log"]');
    },

    canSelectNewerConversation: function () {
      return (this.currentConversationItem().previousElementSibling != null);
    },

    selectNewerConversation: function () {
      var newer = this.currentConversationItem().previousElementSibling;
      if (newer) {
        newer.querySelector('[data-reactid]:first-child').click();
      }
    },

    canSelectOlderConversation: function () {
      return (this.currentConversationItem().nextElementSibling != null);
    },

    selectOlderConversation: function () {
      var newer = this.currentConversationItem().nextElementSibling;
      if (newer) {
        newer.querySelector('[data-reactid]:first-child').click();
      }
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
        //console.log('convo content changed: reactToMutations');
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
  var didLoad = false;
  var onDocumentLoaded = function() {
    if (didLoad) {
      return;
    }
    if (window.require === undefined || !require("React") || !require("ReactMount")) {
      // React not yet loaded. We need it for findReactDOMNode to function
      setTimeout(onDocumentLoaded, 100);
      return;
    }
    if (document.readyState === "loading") {
      return; // still loading
    }
    document.removeEventListener('readystatechange', onDocumentLoaded);
    didLoad = true;

    // This fixes an annoying "beep" sound
    document.body.addEventListener('keypress', function (e) {
      if (e.target.contentEditable && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        var textEvent = document.createEvent('TextEvent');
        textEvent.initTextEvent('textInput', true, true, null, String.fromCharCode(e.which));
        e.target.dispatchEvent(textEvent);
      }
    }, true);

    // Find settings gear
    var tryFindSettingsGear = function() {
      var e = findReactDOMNode({ name: "MessengerSettingsMenu" });
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

    // #146 Fix for vertical scrollbar appearing when mouse plugged in
    var css = document.createElement('style');
    css.type = 'text/css';
    var style = 'body { overflow: hidden; }';
    css.appendChild(document.createTextNode(style));
    document.getElementsByTagName('head')[0].appendChild(css);
 
    // Keep track of media query event listeners
    var styles = {
      queries: {},
      add: function(responsesBySize) {
        eachKey(responsesBySize, function(size, response) {
          // Add media query and list of listeners if nothing listens for this size yet
          if (!styles.queries[size]) {
            styles.queries[size] = {
              query: window.matchMedia(size),
              listeners: new Set(),
              queryResponse: function(query) {
                // On a width change, run all listeners
                styles.queries[size].listeners.forEach(function(response) {
                  response(query.matches);
                });
              }
            };
            
            styles.queries[size].query.addListener(styles.queries[size].queryResponse);
          }
          
          styles.queries[size].listeners.add(response);
        });
      },
      remove: function(responsesBySize) {
        eachKey(responsesBySize, function(size, response) {
          if (!styles.queries[size]) return;
          styles.queries[size].listeners.delete(response);

          // Remove media query listener if there are no responses to run
          if (styles.queries[size].listeners.length === 0) {
            styles.queries[size].query.removeListener(styles.queries[size].queryResponse);
            delete styles.queries[size];
          }
        });
      },
      queryMatches: function(size) {
        return styles.queries[size] ? styles.queries[size].query.matches : null;
      }
    };
    
    // Add styles and media query listeners to a React component
    var styleComponent = function(reactClass, queryResponses, options) {
      var tryFindUIComponent = function() {
        var e = findReactDOMNode({ name: reactClass });
        if (e) {
          var responses = mapObject(
            queryResponses,
            function(size, response) {
              return function(query) { response(e, query); }
            }
          );
          styles.add(responses);
          
          var runAll = function() {
            eachKey(responses, function(size, response) {
              response(styles.queryMatches(size));
            });
          };
          runAll();
          
          // Reapply styles if any children change
          var childrenObserver = new MutationObserver(runAll);
          childrenObserver.observe(e, options || { childList: true });
          
          // Remove listeners and start fresh if the element is removed from the DOM
          var parentObserver = new MutationObserver(function(mutations) {
            mutations.some(function(mutation) {
              if (mutation.type == "childList" && [].indexOf.call(mutation.removedNodes, e) != -1) {
                styles.remove(responses);
                childrenObserver.disconnect();
                parentObserver.disconnect();
                styleComponent(reactClass, queryResponses, options); // Find new React component
                return true; // Stop iterating through mutations
              }
              return false;
            });
          });
          parentObserver.observe(e.parentNode, { childList: true });
          
          return true;
        }
      }
   
      if (!tryFindUIComponent()) {
        var observer = new MutationObserver(function(mutations) {
          if (tryFindUIComponent()) {
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true });
      }
    }
    styleComponent("MessengerMasterView", {
      "(max-width: 640px)": function(el, matches) {
        // Allow sidebar to go smaller
        el.parentNode.style.minWidth = matches ? null : "280px";
      }
    });
    styleComponent("MessengerMasterViewHeader", {
      "(max-width: 640px)": function(el, matches) {
        // Make banner contain children correctly
        el.style.display = matches ? "block" : null;
        
        // Move over New Conversation button
        var newConversation = el.querySelector("a[href='/new']");
        newConversation.style.marginRight = matches ? "-49px" : null;
        newConversation.style.float = matches ? "right" : null;
        newConversation.style.position = matches ? "relative" : null;
        newConversation.style.zIndex = matches ? "10" : null;
      }
    });
    styleComponent("MessengerRecentContainer", {
      "(max-width: 640px)": function(el, matches) {
        Array.prototype.forEach.call(el.querySelectorAll("ul li"), function(thread) {
          Array.prototype.forEach.call(
            thread.querySelectorAll("div[aria-label='Conversation actions'], div[aria-label='Actions'] img"),
            function(child) {
              // Make settings gear have better contrast and appear in the same position
              // as the read receipt
              var color = thread.hasAttribute("aria-relevant") ? "#F6F6F6" : "white";
              child.style.backgroundColor = matches ? color : null;
              child.style.border = matches ? ("2px solid " + color) : null;
              child.style.borderRadius = matches ? "50%" : null;
              child.style.marginTop = matches ? "-44px" : null;
              child.style.marginRight = matches ? "-2px" : null;
            }
          );
        });
      }
    }, {
      // Listen for the selected thread changing in the element subtree
      childList: true,
      attributes: true,
      attributeFilter: ["aria-relevant"],
      subtree: true
    });
    styleComponent("MessengerDetailView", {
      "(max-width: 640px)": function(el, matches) {
        // Move border from entire right pane to just the conversation
        el.style.borderLeft = matches ? "0" : null;
        el.querySelector(":scope > div:last-child").style.borderLeft =
          matches ? "1px solid rgba(0, 0, 0, .20)" : null;
      }
    });
    styleComponent("MessengerDetailViewHeaderContainer", {
      "(max-width: 640px)": function(el, matches) {
        // Move over search bar to accomodate New Conversation button
        el.style.paddingLeft = matches ? "49px" : null;
        
        // Make sure conversation title doesn't overlap buttons
        var titleText = el.querySelector("h2");
        if (titleText) {
          titleText.parentNode.style.paddingRight = matches ? "41px" : null;
          titleText.parentNode.style.boxSizing = matches ? "border-box" : null;
          titleText.parentNode.style.paddingLeft = matches ? "7px" : null;
          titleText.parentNode.style.minWidth = matches ? "100%" : null;
          titleText.style.overflow = matches ? "hidden" : null;
          titleText.style.textOverflow = matches ? "ellipsis" : null;
          titleText.style.width = matches ? "100%" : null;
        }
      }
    });

  };
  document.addEventListener('readystatechange', onDocumentLoaded);
  onDocumentLoaded();
})();

console.log('app/main.js loaded');
