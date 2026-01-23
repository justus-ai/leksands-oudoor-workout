// Ensures Bootstrap navbar collapses on link click (mobile) and prints diagnostics for .social-links.
// Wrap everything in DOMContentLoaded to avoid race conditions.
document.addEventListener('DOMContentLoaded', () => {
  // 1) Collapse navbar when a link is clicked (mobile/touch friendly)
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    navbarCollapse.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // Ignore links that are dropdown toggles
      if (link.matches('[data-bs-toggle], [data-bs-toggle="dropdown"]')) return;

      if (navbarCollapse.classList.contains('show') && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (!bsCollapse) {
          // create instance but don't toggle immediately
          bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }
        bsCollapse.hide();
      }
    });
  }

  // 2) Diagnostics for .social-links and its ancestors
  //    Use this to find clipping/stacking/visibility issues (overflow, transform, z-index, opacity, position).
  (function dumpSocialLinksDiagnostics() {
    const sl = document.querySelector('.social-links');
    if (!sl) {
      console.warn('No .social-links found');
      return;
    }

    console.group('social-links diagnostics');
    console.log('Element:', sl);
    const slCS = getComputedStyle(sl);
    console.log('Computed (social-links):', {
      display: slCS.display,
      visibility: slCS.visibility,
      opacity: slCS.opacity,
      height: slCS.height,
      maxHeight: slCS.maxHeight,
      overflow: slCS.overflow
    });

    const firstIcon = sl.querySelector('i, svg, .icon');
    console.log('First inner icon found:', !!firstIcon, firstIcon ? (firstIcon.className || firstIcon.tagName) : null);

    // Walk ancestors and log key properties that commonly cause clipping/stacking issues
    let node = sl;
    let depth = 0;
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      const info = {
        display: cs.display,
        position: cs.position,
        overflow: cs.overflow,
        transform: cs.transform === 'none' ? '' : cs.transform,
        zIndex: cs.zIndex,
        opacity: cs.opacity
      };
      console.log(`[ancestor ${depth}] <${node.tagName.toLowerCase()} class="${node.className}">`, info);

      // Warn about likely problematic properties
      if (cs.overflow !== 'visible') {
        console.warn(`ancestor ${depth} may clip children (overflow: ${cs.overflow})`, node);
      }
      if (cs.transform && cs.transform !== 'none') {
        console.warn(`ancestor ${depth} has transform which can create a new stacking context`, node);
      }
      if (cs.position !== 'static' && cs.zIndex !== 'auto') {
        console.log(`ancestor ${depth} stacking (position: ${cs.position}, z-index: ${cs.zIndex})`);
      }

      node = node.parentElement;
      depth++;
    }
    console.groupEnd();
  })();
});
