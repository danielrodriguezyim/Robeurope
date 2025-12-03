// Header hide/show on scroll (desktop only)
let lastScrollTop = 0;
const header = document.getElementById('main-nav');
const scrollThreshold = 100;

function handleHeaderScroll() {
    // Only apply on desktop (larger than 1024px)
    if (window.innerWidth > 1024) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide header
                header.classList.add('hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('hidden');
            }
        } else {
            // At top of page - always show
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } else {
        // Always show header on mobile/tablet
        header.classList.remove('hidden');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('resize', handleHeaderScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const slideMenu = document.getElementById('slide-menu');
            if (slideMenu && slideMenu.classList.contains('active')) {
                slideMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});