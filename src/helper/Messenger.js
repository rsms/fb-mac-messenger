// Chrome extension
var Messenger;
if (!Messenger) { Messenger = {}; }
(function () {

// Call(sel:string, resolve:(arg?)=>, reject:(err)=>, arg...)
// Notify(sel:string, arg...)
native function Call();
native function Notify();

// Mixin that provides addEventListener, removeEventListener and emitEvent.
function EventListenerMixin(target) {
  Object.defineProperty(target, '_eventListeners', {value:{}});
  return Object.assign(target, {
    emitEvent(event, ev) {
      //console.log('emitEvent', event);
      var handlers = this._eventListeners[event];
      //console.log('this._eventListeners["'+event+'"] =', handlers);
      var onhandler = this['on'+event];
      if (handlers || onhandler) {
        if (!ev || typeof ev !== 'object') {
          ev = {};
        }
        ev.type = event;
        for (var handler of handlers) {
          handler(ev);
        }
        if (onhandler) {
          onhandler(ev);
        }
      }
    },

    addEventListener(event, handler) {
      var handlers = this._eventListeners[event];
      if (!handlers) {
        this._eventListeners[event] = new Set([handler]);
      } else {
        handlers.add(handler);
      }
    },

    removeEventListener(event, handler) {
      var handlers = this._eventListeners[event];
      if (handlers) {
        handlers.remove(handler);
        if (handlers.size === 0) {
          this._eventListeners[event] = null;
        }
      }
    },
  });
}

Messenger.echo = function() {
  let args = Array.prototype.slice.call(arguments);
  return new Promise(function(resolve, reject) {
    args.unshift('echo', resolve, reject);
    Call.apply(null, args);
  })
};

class Notification {
  // Events on the Notification object itself:
  //   x-activate (tag:string)
  //     A notification was activated by user.
  //   x-cancel (tag:string)
  //     A notification was canceled
  //
  // Events on Notification instances:
  //   click (event:Event)
  //     Notification was activated by user.
  //     Call event.preventDefault() to prevent the browser from
  //     focusing the Notification's tab/window or activating the app.

  static requestPermission(cb) {
    let p = new Promise(function(resolve, reject) {
      p.resolve(/*permission=*/'granted');
    });
    if (typeof cb === 'function') {
      // legacy API
      p.then(r => { cb(null, r); }).catch(e => { cb(e); });
    } else {
      return p;
    }
  }

  constructor(title, options) {
    if (!options || typeof options !== 'object') {
      options = {};
    }
    this.title = title;
    if (options.tag) {
      options.tag = String(options.tag);
      this.tag = options.tag;
      Notification._active.set(tag, this);
    } else {
      this.tag = null;
      // put it in _pending until we get a tag back to prevent
      // the notification object from being garbage collected.
      Notification._pending.add(this);
    }
    let resolve = tag => {
      // Called when the host app has accepted our notification.
      // If we didn't provide a tag, the host app generated one for us.
      if (!this.tag) {
        Notification._pending.delete(this);
        Notification._active.set(tag, this);
      }
      this.tag = tag;
    }
    let reject = () => {
      if (!this.tag) {
        Notification._pending.delete(this);
      }
    }
    Call('createNotification', resolve, reject, String(title), options);
  }

  close() {
    if (this.tag) {
      Notify('closeNotification', this.tag);
      Notification._active.delete(this.tag);
    } else {
      Notification._pending.delete(this);
    }
  }
}

EventListenerMixin(Notification);
EventListenerMixin(Notification.prototype);
Notification.permission = 'granted'; // always granted
Notification._active = new Map;
Notification._pending = new Set;

// Called when a new window object is ready
Messenger._onWindowReady = function(window) {
  window.Notification = Notification;
};

})();
