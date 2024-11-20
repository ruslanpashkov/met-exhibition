function isBot() {
  return /bot|crawler|spider|crawling/i.test(navigator.userAgent);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function loadAOS() {
  if (isBot() || prefersReducedMotion()) {
    return;
  }

  const aosCSS = new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    link.onload = resolve;
    document.head.appendChild(link);
  });

  const aosJS = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });

  Promise.all([aosCSS, aosJS]).then(() => {
    if (typeof AOS !== 'undefined') {
      window.AOS.init({ duration: 1000 });
    }
  });
}

window.addEventListener('load', loadAOS);
