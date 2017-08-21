// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // cover the primitive data types
  var isPrimitive = function (obj) {
    if (typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean' || obj === null) {
      return true;
    } 
    return false;
  };
  // determine if it can not be stringify or can
  var isUnStringifyable = function (obj) {
    if (obj === undefined || typeof obj === 'function') {
      return true;
    } 
    return false;
  };
  // if it is primitive data type assign return values 
  if (isPrimitive(obj)) {
    if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
      return '' + obj;
    } else if (typeof obj === 'string') {
      return '"' + obj + '"';
    }
  }

  // return values for undefined and function
  if (isUnStringifyable(obj)) {
    return undefined;
  }
  // utilitize recursion for objects and arrays  
  if (Array.isArray(obj)) {
    var arrStr = '[';
    // some recursion that adds to arrStr
    obj.forEach(function(item) {
      arrStr += stringifyJSON(item);
      if (item !== obj[obj.length - 1]) {
        arrStr += ',';
      }
    });
    
    return arrStr + ']';
  }
  if (typeof obj === 'object') {
    var objStr = '{';
    var lastKey = Object.keys(obj).pop();
    for (var key in obj) {
      if (!isUnStringifyable(obj[key])) {
        objStr += '"' + key + '":' + stringifyJSON(obj[key]);
        if (key !== lastKey) {
          objStr += ',';
        }
      }
    }
   
    return objStr + '}';
  }
};

