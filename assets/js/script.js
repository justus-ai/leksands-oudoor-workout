// Ensure bootstrap dropdowns and toggles behave on touch devices
document.addEventListener('DOMContentLoaded', function () {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navbarCollapse) return;

  navbarCollapse.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    // Optionally ignore links that toggle dropdowns or have no href/navigation
    // if (link.matches('[data-bs-toggle], [data-bs-toggle="dropdown"]')) return;

    if (navbarCollapse.classList.contains('show')) {
      if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (!bsCollapse) {
          // create instance without toggling open/close immediately
          bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }
        bsCollapse.hide();
      }
    }
  });
});
