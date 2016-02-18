(function () {

  // Dumps a tree of react components with references to DOM elements:
  // console.log((function dumpReactComponents() {
  //   var ReactDOM = require("ReactDOM");
  //   var add = function(components, r) {
  //     var k, m = components;
  //     if (r.name) {
  //       if (!m) { m = {}; }
  //       m[r.name] = r;
  //     } else if (r.children) {
  //       if (!m) { m = {}; }
  //       for (k in r.children) {
  //         m[k] = r.children;
  //       }
  //     }
  //     return m;
  //   };
  //   var visitCI = function(ci) {
  //     var k, e = ci._currentElement, unnamed = 0;
  //     var r2, r = {name:null, element:null, children:null};
  //     if (e && e.type && e.type.displayName) {
  //       r.name = e.type.displayName;
  //       r.element = ReactDOM.findDOMNode(ci.getPublicInstance());
  //     }
  //     if (ci._renderedComponent) {
  //       r2 = visitCI(ci._renderedComponent);
  //       r.children = add(r.children, r2);
  //     }
  //     if (ci._renderedChildren) {
  //       for (k in ci._renderedChildren) {
  //         r2 = visitCI(ci._renderedChildren[k]);
  //         r.children = add(r.children, r2);
  //       }
  //     }
  //     return r;
  //   };
  //   var ReactMount = require("ReactMount"), k, ci, r, unnamed = 0;
  //   var components = {};
  //   for (k in ReactMount._instancesByReactRootID) {
  //     r = visitCI(ReactMount._instancesByReactRootID[k]);
  //     components = add(components, r);
  //   }
  //   return components;
  // })());


  function findReactDOMNodePath(namePath, parentInstance) {
    var ReactDOM = require("ReactDOM");
    var name = namePath[0];
    var pci = parentInstance ? {a:parentInstance} : null;
    var ci = findReactDOMNode({name:name, returnInstance:true}, pci);
    if (ci) {
      if (namePath.length > 1) {
        return findReactDOMNodePath(namePath.slice(1), ci);
      }
      return ReactDOM.findDOMNode(ci.getPublicInstance());
    }
    return null;
  }

  // setTimeout(function(){
  //   var e = findReactDOMNodePath([
  //     'MessengerDetailView',
  //     'MessengerDetailView',
  //     'MessengerDetailViewHeaderContainer',
  //     'MessengerDetailViewHeader',
  //     'MercuryThreadTitle',
  //   ]);
  //   console.log('findReactDOMNodePath =>', e);
  // }, 4000)

  function findReactDOMNode(options, instances) {
    var ReactDOM = require("ReactDOM");
    var ReactMount = require("ReactMount");
    var k, ret = null, instance, element, children;

    if (!instances) {
      instances = ReactMount._instancesByReactRootID;
    }

    for (k in instances) {
      instance = instances[k];

      if (!instance) {
        continue;
      }
      element = instance._currentElement;

      if (options.name) {
        if (element && element.type && element.type.displayName == options.name) {
          if (options.returnInstance) {
            return instance;
          }
          return ReactDOM.findDOMNode(instance.getPublicInstance());
        }
      } else if (options.id) {
        if (instance._rootNodeID == options.id) {
          return instance;
        }
      }
      if (typeof instance._stringText === 'string') {
        continue;
      }

      if (instance._renderedComponent) {
        ret = findReactDOMNode(options, { a: instance._renderedComponent });
      }

      children = instance._renderedChildren;
      if (!ret && children) {
        ret = findReactDOMNode(options, children);
      }

      if (ret) {
        return ret;
      }
    }

    return null;
  }


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
 
    showMessageRequests: function() {
      this.openGearMenu();
      var menuItems = document.querySelectorAll(
        'div.uiContextualLayerPositioner.uiLayer > ' +
        'div.uiContextualLayer.uiContextualLayerBelowLeft li [role="menuitem"]'
      );
      menuItems[1].click();
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

    locationChanged: function(url) {
      // https://www.messenger.com/requests/t/1234
      var c = url.split(/\/+/); // [0:"https:", 1:"www.messenger.com", 2:"requests", 3:"t", 4:"1234"]
      var i = 2;
      if (c[i] === 'requests') {
        console.log('in requests'); // WIP
        ++i;
      } else if (c[i] === 'filtered') {
        console.log('in filtered'); // WIP
        ++i;
      }
      if (c[i] === 't' && c[i+1]) {
        this.currentThreadID = c[1];
        this.onThreadChange();
      } else if (this.currentThreadID) {
        this.currentThreadID = null;
        this.onThreadChange();
      }
    },

    onThreadTitleChange: function(title) {
      //console.log('onThreadTitleChange', title);
      window.SetMainWindowTitle(title);
    },

    onThreadChange: function() {
      //console.log('Thread changed to', this.currentThreadID, document.title);
      clearTimeout(this._threadChangeTimer);

      var e, limit;

      // if (this._threadTitleNode && this._threadTitleNode !== e) {
      //   console.log('_threadTitleNode !== e');
      //   this._threadTitleNode = null;
      //   if (this._threadTitleObserver) {
      //     this._threadTitleObserver.disconnect();
      //     this._threadTitleObserver = null;
      //   }
      // }

      if (!this._threadTitleNode) {
        e = findReactDOMNodePath([
          'MessengerDetailView',
          'MessengerDetailView',
          'MessengerDetailViewHeaderContainer',
          'MessengerDetailViewHeader',
          'MercuryThreadTitle',
        ]);
        if (!e) {
          this._threadChangeTimer = setTimeout(this.onThreadChange.bind(this), 500);
          return;
        }
        var onThreadTitleChange = this.onThreadTitleChange.bind(this);
        this._threadTitleNode = e;
        this._threadTitleObserver = new MutationObserver(function(mutations) {
          onThreadTitleChange(e.innerText);
        });
        this._threadTitleObserver.observe(e, {
          childList: true, // MercuryThreadTitle replaces its span leaf
        });
        onThreadTitleChange(e.innerText);
      }
    },

  };



  // Intercept location changes
  window.history._pushState = window.history.pushState;
  window.history.pushState = function(obj, title, url) {
    window.history._pushState(obj, title, url);
    MacMessenger.locationChanged(url);
  };
  MacMessenger.locationChanged(document.location.href);


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

    // This fixes an annoying "beep" sound in the message composer
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
        newConversation.style.zIndex = matches ? "300" : null;
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
    styleComponent("MessengerBanner", {
      "(max-width: 640px)": function(el, matches) {
        el.style.display = 'none';
      }
    });
 

  };
  document.addEventListener('readystatechange', onDocumentLoaded);
  onDocumentLoaded();
})();

console.log('app/main.js loaded');
