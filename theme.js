(function(){
    try {
      var saved = localStorage.getItem('portfolio-theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    } catch (e) {}
  })();