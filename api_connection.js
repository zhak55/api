;(function(global){
   // main url to make a request (only https)
   var url = 'https://twiddlebot.ru/api/';

   var JSONP = function(url,data,method,callback){
    //Set the defaults
    url = url || '';
    data = data || {};
    method = method || '';
    callback = callback || function(){};
    
    //Gets all the keys that belong
    //to an object
    var getKeys = function(obj){
      var keys = [];
      for(var key in obj){
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
        
      }
      return keys;
    }

    //Turn the data object into a query string.
    //Add check to see if the second parameter is indeed
    //a data object. If not, keep the default behaviour
    if(typeof data == 'object'){
      var queryString = '';
      var keys = getKeys(data);
      for(var i = 0; i < keys.length; i++){
        queryString += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]])
        if(i != keys.length - 1){ 
          queryString += '&';
        }
      }
      url += '?' + queryString;
    } else if(typeof data == 'function'){
      method = data;
      callback = method;
    }

    //If no method was set and they used the callback param in place of
    //the method param instead, we say method is callback and set a
    //default method of "callback"
    if(typeof method == 'function'){
      callback = method;
      method = 'callback';
    }
  
    //Check to see if we have Date.now available, if not shim it for older browsers
    if(!Date.now){
      Date.now = function() { return new Date().getTime(); };
    }

    //Use timestamp + a random factor to account for a lot of requests in a short time
    //e.g. jsonp1394571775161 
    var timestamp = Date.now();
    var generatedFunction = 'jsonp'+Math.round(timestamp+Math.random()*1000001)

    //Generate the temp JSONP function using the name above
    //First, call the function the user defined in the callback param [callback(json)]
    //Then delete the generated function from the window [delete window[generatedFunction]]
    window[generatedFunction] = function(json){
      callback(json);

      // IE8 throws an exception when you try to delete a property on window
      // http://stackoverflow.com/a/1824228/751089
      try {
        delete window[generatedFunction];
      } catch(e) {
        window[generatedFunction] = undefined;
      }

    };

    //Check if the user set their own params, and if not add a ? to start a list of params
    //If in fact they did we add a & to add onto the params
    //example1: url = http://url.com THEN http://url.com?callback=X
    //example2: url = http://url.com?example=param THEN http://url.com?example=param&callback=X
    if(url.indexOf('?') === -1){ url = url+'?'; }
    else{ url = url+'&'; }
  
    //This generates the <script> tag
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url+method+'='+generatedFunction);
    document.getElementsByTagName("head")[0].appendChild(jsonpScript)
  }

  // Main Class to create deferred object

  function Deferred() {
    this._done = [];
    this._fail = [];
   }

   Deferred.prototype = {
     execute: function(list, args){
       var i = list.length;

      // convert arguments to an array
      // so they can be sent to the
      // callbacks via the apply method
      
      args = Array.prototype.slice.call(args);

      while(i--) list[i].apply(null, args);
      },
     resolve: function(){
       this.execute(this._done, arguments);
      },
     reject: function(){
       this.execute(this._fail, arguments);
      }, 
     done: function(callback){
      this._done.push(callback);
      },
     fail: function(callback){
      this._fail.push(callback);
     }  
   }

   // Main class for requests to build valid request 
   // Just pass method and params as plain object

   function Q() {};

   Q.prototype.api = function(method, params) {
    var d = new Deferred();
    try {
     var reqURL = url + method.replace('.', '/');
     JSONP(reqURL, params, function(data){ 
       if(data.response) d.resolve(data.response);
       else d.reject(data)
      })
     } catch(e) { throw new Error(e); };
    return d;
   }

   global.TWBot = Q;
}(window));
