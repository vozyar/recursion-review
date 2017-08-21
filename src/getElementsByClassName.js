// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

//But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  node = node || document.body;
  var nodes = []; //contains elements with className
  
  //node contains class
  var classes = node.className.split(' '); 
  if (classes.indexOf(className) >= 0) {
    nodes.push(node);
  } 
  
  for (var i = 0; i < node.children.length; i++) {
    var results = getElementsByClassName(className, node.children[i]);
    nodes = nodes.concat(results);
  }
  
  return nodes;
};

