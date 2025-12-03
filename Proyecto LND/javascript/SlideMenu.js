// Slide Menu functionality
const menuBox = document.querySelector('.menu-box');
const slideMenu = document.getElementById('slide-menu');
const menuLinks = document.querySelectorAll('.menu-link');

// Toggle menu on button click
if (menuBox) {
    menuBox.addEventListener('click', () => {
        slideMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (slideMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        slideMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside (on the overlay)
if (slideMenu) {
    slideMenu.addEventListener('click', (e) => {
        if (e.target === slideMenu) {
            slideMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && slideMenu && slideMenu.classList.contains('active')) {
        slideMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});