let pageBody = document.body
var observeDOM = (function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function(obj, callback) {
    if (!obj || obj.nodeType !== 1) {
      return;
    }

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback);

      // have the observer observe for changes in children
      mutationObserver.observe(obj, {childList: true, subtree: true});
      return mutationObserver;
    } else if (window.addEventListener) { // browser support fallback
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  }
})();


// Observe a specific DOM element:
observeDOM(pageBody, function(m) {
   var addedNodes = [], removedNodes = [];

   m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes));

   m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes));

    if (addedNodes.length > 0) {
        addedNodes[0].style["display"] = "none";
        const overlay = document.getElementById("piano-template-overlay")
        pageBody.style["overflow"] = "unset"
        if (overlay) {
            overlay.style["display"] = "none";
        }
        const ribbon = document.getElementById("firebaseui-auth-ribbon-container")
        if (ribbon) {
            ribbon.style["display"] = "none";
        }
    }
});



