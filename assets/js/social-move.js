// Move social links to the front of the page on small screens and restore on larger screens.
document.addEventListener('DOMContentLoaded', function () {
  const social = document.querySelector('.social-media-container');
  if (!social) return;

  // Where to move on small screens: just after the navbar if present, else as body first child
  const navbar = document.querySelector('.navbar') || document.querySelector('#navbar');
  const smallTarget = navbar ? (navbar.nextElementSibling || navbar.parentNode) : document.body;

  // Store original location to restore later
  const originalParent = social.parentNode;
  const originalNext = social.nextSibling; // could be null

  const mq = window.matchMedia('(max-width: 576px)');

  function applyMove() {
    if (mq.matches) {
      // Move to front target if not already moved
      if (social.parentNode !== smallTarget || smallTarget.firstChild !== social) {
        smallTarget.insertBefore(social, smallTarget.firstChild);
        social.classList.add('moved-to-top');
      }
    } else {
      // Restore original position if moved
      if (social.parentNode !== originalParent) {
        originalParent.insertBefore(social, originalNext);
        social.classList.remove('moved-to-top');
      }
    }
  }

  // Listen to media query changes and initial state
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', applyMove);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(applyMove);
  }

  applyMove();
});
