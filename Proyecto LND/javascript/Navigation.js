class Navigation {
    constructor() {
        this.nav = document.querySelector('.main-nav');
        this.hero = document.querySelector('.hero-section');
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 10;
        this.navMenu = document.getElementById('nav-menu');
        this.sideMenu = document.getElementById('side-menu');
        this.menuOverlay = document.getElementById('menu-overlay');
        this.sideMenuClose = document.getElementById('side-menu-close');
        this.sideMenuLinks = document.querySelectorAll('.side-menu-link');
        this.isMenuOpen = false;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.handleScroll();
    }
    
    setupEventListeners() {
        // Menu toggle
        if (this.navMenu) {
            this.navMenu.addEventListener('click', () => this.openMenu());
        }
        
        if (this.sideMenuClose) {
            this.sideMenuClose.addEventListener('click', () => this.closeMenu());
        }
        
        if (this.menuOverlay) {
            this.menuOverlay.addEventListener('click', () => this.closeMenu());
        }
        
        // Close menu when clicking links
        this.sideMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => this.closeMenu(), 300);
            });
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        
        // Scroll behavior
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const currentY = window.scrollY;
        
        // Hide on scroll down, show on scroll up
        if (currentY > this.lastScrollY + this.scrollThreshold) {
            this.nav.classList.add('hide');
        } else if (currentY < this.lastScrollY - this.scrollThreshold) {
            this.nav.classList.remove('hide');
        }
        
        this.lastScrollY = currentY;
        
        // Transparent over hero, solid after hero
        if (this.hero) {
            const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;
            if (currentY + 1 >= heroBottom) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }
    }
    
    openMenu() {
        if (this.sideMenu && this.menuOverlay) {
            this.isMenuOpen = true;
            this.sideMenu.classList.add('active');
            this.menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate menu icon
            this.animateMenuIcon(true);
        }
    }
    
    closeMenu() {
        if (this.sideMenu && this.menuOverlay) {
            this.isMenuOpen = false;
            
            // Reverse animations for links
            const links = Array.from(this.sideMenuLinks).reverse();
            links.forEach((link, index) => {
                link.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
                link.style.opacity = '0';
                link.style.transform = 'translateX(50px)';
            });
            
            // Reverse footer animation
            const footer = document.querySelector('.side-menu-footer');
            if (footer) {
                footer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                footer.style.opacity = '0';
                footer.style.transform = 'translateY(30px)';
            }
            
            // Close menu after animations
            setTimeout(() => {
                this.sideMenu.classList.remove('active');
                this.menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset styles for next opening
                this.sideMenuLinks.forEach(link => {
                    link.style.transition = '';
                    link.style.opacity = '';
                    link.style.transform = '';
                });
                
                if (footer) {
                    footer.style.transition = '';
                    footer.style.opacity = '';
                    footer.style.transform = '';
                }
            }, 400);
            
            // Animate menu icon
            this.animateMenuIcon(false);
        }
    }
    
    animateMenuIcon(isOpen) {
        const spans = this.navMenu.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});