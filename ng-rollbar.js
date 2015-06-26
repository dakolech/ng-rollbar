(function(angular){
  angular.module('tandibar/ng-rollbar', []);

  angular.module('tandibar/ng-rollbar').config(['$provide', function($provide) {
    $provide.decorator("$exceptionHandler", function($delegate, $window) {
      return function (exception, cause) {
        if($window.Rollbar) {
          $window.Rollbar.error(exception, {cause: cause});
        }
        $delegate(exception, cause);
      };
    });
  }]);

  angular.module('tandibar/ng-rollbar').provider('Rollbar', function RollbarProvider() {
    var rollbarProvider = this;

    this.init = function(config) {
      var _rollbarConfig = config;
      /* jshint ignore:start */
      // using https://github.com/rollbar/rollbar.js/blob/v1.4.0/dist/rollbar.snippet.js
      !function(r){function o(n){if(t[n])return t[n].exports;var e=t[n]={exports:{},id:n,loaded:!1};return r[n].call(e.exports,e,e.exports,o),e.loaded=!0,e.exports}var t={};return o.m=r,o.c=t,o.p="",o(0)}([function(r,o,t){"use strict";var n=t(1).Rollbar,e=t(2),i="https://d37gvrvc0wt4s1.cloudfront.net/js/v1.4/rollbar.umd.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||i;var a=n.init(window,_rollbarConfig),l=e(a,_rollbarConfig);a.loadFull(window,document,!1,_rollbarConfig,l)},function(r,o){"use strict";function t(r){this.shimId=++l,this.notifier=null,this.parentShim=r,this.logger=function(){},this._rollbarOldOnError=null,window.console&&"function"==typeof window.console.log&&(this.logger=window.console.log)}function n(r,o,t){window._rollbarWrappedError&&(t[4]||(t[4]=window._rollbarWrappedError),t[5]||(t[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,t),o&&o.apply(window,t)}function e(r){var o=t;return a(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var t=this,n="scope"===r;n&&(t=new o(this));var e=Array.prototype.slice.call(arguments,0),i={shim:t,method:r,args:e,ts:new Date};return window._rollbarShimQueue.push(i),n?t:void 0})}function i(r,o){if(o.hasOwnProperty&&o.hasOwnProperty("addEventListener")){var t=o.addEventListener;o.addEventListener=function(o,n,e){t.call(this,o,r.wrap(n),e)};var n=o.removeEventListener;o.removeEventListener=function(r,o,t){n.call(this,r,o&&o._wrapped?o._wrapped:o,t)}}}function a(r,o){return o=o||window.console.log||function(){},function(){try{return r.apply(this,arguments)}catch(t){o("Rollbar internal error:",t)}}}var l=0;t.init=function(r,o){var e=o.globalAlias||"Rollbar";if("object"==typeof r[e])return r[e];r._rollbarShimQueue=[],r._rollbarWrappedError=null,o=o||{};var l=new t;return a(function(){if(l.configure(o),o.captureUncaught){l._rollbarOldOnError=r.onerror,r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(l,l._rollbarOldOnError,r)};var t,a,s="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(t=0;t<s.length;++t)a=s[t],r[a]&&r[a].prototype&&i(l,r[a].prototype)}return r[e]=l,l},l.logger)()},t.prototype.startProcessing=function(r,o){var t;if(void 0===window._rollbarPayloadQueue){var n,e,i,a;for(t=new Error("rollbar.js did not load");n=window._rollbarShimQueue.shift();)for(i=n.args,a=0;a<i.length;++a)if(e=i[a],"function"==typeof e){e(t);break}}"function"==typeof o&&o(t)},t.prototype.loadFull=function(r,o,t,n,e){var i=this,l=a(function(){var r=o.createElement("script"),e=o.getElementsByTagName("script")[0];r.src=n.rollbarJsUrl,r.async=!t,r.onload=s,e.parentNode.insertBefore(r,e)},this.logger),s=a(function(){"function"==typeof define&&define.amd?require(["rollbar"],function(r){i.startProcessing(r,e)}):i.startProcessing(r.Rollbar,e)},this.logger);a(function(){t?l():r.addEventListener?r.addEventListener("load",l,!1):r.attachEvent("onload",l)},this.logger)()},t.prototype.wrap=function(r,o){try{var t;if(t="function"==typeof o?o:function(){return o||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(o){throw o._rollbarContext=t()||{},o._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=o,o}},r._wrapped._isWrap=!0;for(var n in r)r.hasOwnProperty(n)&&(r._wrapped[n]=r[n])}return r._wrapped}catch(e){return r}};for(var s="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),u=0;u<s.length;++u)t.prototype[s[u]]=e(s[u]);r.exports={Rollbar:t,_rollbarWindowOnError:n}},function(r,o){"use strict";r.exports=function(r,o){return function(t){if(!t&&!window._rollbarInitialized){var n=window.RollbarNotifier,e=o||{},i=e.globalAlias||"Rollbar",a=window.Rollbar.init(e,r);a._processShimQueue(window._rollbarShimQueue||[]),window[i]=a,window._rollbarInitialized=!0,n.processPayloads()}}}}]);
      /* jshint ignore:end */
    };

    getter.$inject = ['$window'];
    function getter($window) {
      return {
        Rollbar: $window.Rollbar,

        configure: $window.Rollbar.configure,

        critical: $window.Rollbar.critical,
        error: $window.Rollbar.error,
        warning: $window.Rollbar.warning,
        info: $window.Rollbar.info,
        debug: $window.Rollbar.debug,

        scope: $window.Rollbar.scope,

        verbose: function (boolean) {
          if (boolean === undefined) { boolean = true; }
          $window.Rollbar.configure({ verbose: boolean });
        },
        enable: function () {
          $window.Rollbar.configure({ enabled: true });
        },
        disable: function () {
          $window.Rollbar.configure({ enabled: false });
        }
      };
    };

    this.$get = getter;
  });

})
(angular);
