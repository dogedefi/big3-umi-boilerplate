document.addEventListener('DOMContentLoaded', () => {
    const styledCssList = document.querySelectorAll('style[data-styled-version="5.3.5"]');
    const umiCss = document.querySelector('script[src="/fix-styled-override.js"]');
    styledCssList.forEach((css) => {
        document.head.insertBefore(css, umiCss);
    });
});
