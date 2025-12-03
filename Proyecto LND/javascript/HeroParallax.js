// HeroParallax
function initHeroParallax() {
    const hero = document.querySelector('.hero-section');
    const canvas = document.getElementById('particle-canvas');
    const content = document.querySelector('.hero-content');
    const indicator = document.querySelector('.scroll-indicator');

    if (!hero || !canvas || !content) return;

    const factorBg = 0.3;
    const factorContent = 0.1;
    const factorIndicator = 0.2;

    const onScroll = () => {
        const y = window.scrollY;

        canvas.style.transform = `translateY(${y * factorBg}px)`;
        content.style.transform = `translateY(${y * factorContent}px)`;
        if (indicator) {
            indicator.style.transform =
                `translateX(-50%) translateY(${y * factorIndicator}px)`;
        }
    };

    // Run once and on scroll
    onScroll();
    window.addEventListener('scroll', onScroll);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroParallax();
});
