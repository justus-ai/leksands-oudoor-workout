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
(function(){
  const sl = document.querySelector('.social-links');
  console.log('social-links found:', !!sl);
  if (!sl) return;
  console.log('children:', sl.childElementCount);
  console.log('social-links computed:', {
    display: getComputedStyle(sl).display,
    visibility: getComputedStyle(sl).visibility,
    opacity: getComputedStyle(sl).opacity,
    height: getComputedStyle(sl).height,
    maxHeight: getComputedStyle(sl).maxHeight
  });

  const i = sl.querySelector('i');
  console.log('first <i> found:', !!i);
  if (i) console.log('icon classes:', i.className, 'font-family:', getComputedStyle(i).fontFamily, 'color:', getComputedStyle(i).color);

  // walk ancestors to find clipping/stacking rules
  let node = sl;
  while (node) {
    console.log(node.tagName, 'class=' + node.className, 'display=' + getComputedStyle(node).display,
      'overflow=' + getComputedStyle(node).overflow, 'position=' + getComputedStyle(node).position, 'transform=' + getComputedStyle(node).transform, 'z-index=' + getComputedStyle(node).zIndex);
    node = node.parentElement;
  }
})();
