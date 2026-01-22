// Ensure bootstrap dropdowns and toggles behave on touch devices
document.addEventListener('DOMContentLoaded', function () {
  var navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    navbarCollapse.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && navbarCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  }
});
