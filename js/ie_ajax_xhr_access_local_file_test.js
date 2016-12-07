$.ajaxSetup({
  xhr: function() {
    if("ActiveXObject" in window) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
      return new XMLHttpRequest();
    }
  }
});