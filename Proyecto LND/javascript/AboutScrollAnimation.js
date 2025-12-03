// About Section Scroll Animation
class AboutScrollAnimation {
    constructor() {
        this.section = document.querySelector('.about-section-scroll');
        this.container = document.querySelector('.about-scroll-container');
        this.title = document.getElementById('aboutTitle');
        this.description = document.getElementById('aboutDescription');
        this.image = document.getElementById('aboutImage');
        
        if (!this.section || !this.container || window.innerWidth <= 1024) {
            return;
        }
        
        this.sections = [
            {
                title: "Hands-On Learning",
                description: "Experience real robotics challenges that develop practical engineering skills. Our competitions provide students with hands-on opportunities to design, build, and program robots that solve complex problems. Through iterative design processes and technical challenges, participants gain invaluable experience in mechanical engineering, electronics, and programming.",
                image: "./images/picture1.jpg"
            },
            {
                title: "International Network",
                description: "Connect with schools and students across Europe. Join a vibrant community of robotics enthusiasts, share knowledge, and collaborate on innovative projects that transcend borders and cultures. Build lasting friendships and professional networks that will support your journey in technology and engineering.",
                image: "./images/picture2.jpg"
            },
            {
                title: "Competitive Excellence",
                description: "Showcase your skills in prestigious robotics competitions. Compete against the best teams in Europe, earn recognition for your achievements, and push the boundaries of what's possible in robotics. Our competitions provide a platform to demonstrate technical prowess, creativity, and teamwork under pressure.",
                image: "./images/picture3.jpg"
            }
        ];
        
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        this.setupScrollObserver();
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024) {
                this.cleanup();
            }
        });
    }
    
    setupScrollObserver() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const rect = this.container.getBoundingClientRect();
        const containerHeight = this.container.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through the container
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (containerHeight - windowHeight)));
        
        // Determine which section should be shown based on scroll progress
        const sectionIndex = Math.floor(scrollProgress * this.sections.length);
        const clampedIndex = Math.max(0, Math.min(this.sections.length - 1, sectionIndex));
        
        // Calculate progress within current section
        const sectionProgress = (scrollProgress * this.sections.length) % 1;
        
        // Update content if section changed
        if (clampedIndex !== this.currentIndex) {
            this.updateContent(clampedIndex, sectionProgress);
            this.currentIndex = clampedIndex;
        } else {
            // Update opacity based on section progress for smooth transitions
            this.updateOpacity(sectionProgress);
        }
    }
    
    updateContent(index, progress) {
        const section = this.sections[index];
        
        // Fade out
        this.title.style.opacity = '0';
        this.title.style.transform = 'translateY(-20px)';
        this.description.style.opacity = '0';
        this.description.style.transform = 'translateY(-20px)';
        this.image.style.opacity = '0';
        this.image.style.transform = 'scale(0.95)';
        
        // Update content after fade out
        setTimeout(() => {
            this.title.textContent = section.title;
            this.description.textContent = section.description;
            this.image.src = section.image;
            
            // Fade in
            setTimeout(() => {
                this.title.style.opacity = '1';
                this.title.style.transform = 'translateY(0)';
                this.description.style.opacity = '1';
                this.description.style.transform = 'translateY(0)';
                this.image.style.opacity = '1';
                this.image.style.transform = 'scale(1)';
            }, 50);
        }, 300);
    }
    
    updateOpacity(progress) {
        // Smooth opacity transitions within sections
        const opacity = Math.min(1, progress * 2);
        this.title.style.opacity = opacity;
        this.description.style.opacity = opacity;
        this.image.style.opacity = opacity;
    }
    
    cleanup() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AboutScrollAnimation();
});