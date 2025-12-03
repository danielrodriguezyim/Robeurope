// Video Carousel
class VideoCarousel {
    constructor() {
        this.videos = [
            '1_pwn8q73H0',
            'YbIII8HvBwc',
            'wGxLz2onGh0'
        ];
        this.currentIndex = 0;
        this.videoFrame = document.getElementById('video-frame');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.createDots();
        this.setupEventListeners();
        this.updateVideo();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.videos.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    updateVideo() {
        const videoId = this.videos[this.currentIndex];
        this.videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
        this.animateTransition('left');
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = (this.currentIndex + 1) % this.videos.length;
        this.animateTransition('right');
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        const direction = index > this.currentIndex ? 'right' : 'left';
        this.currentIndex = index;
        this.animateTransition(direction);
    }

    animateTransition(direction) {
        const wrapper = document.querySelector('.video-wrapper');

        // Fade out
        wrapper.style.opacity = '0';
        wrapper.style.transform = direction === 'right' ? 'translateX(-50px)' : 'translateX(50px)';

        setTimeout(() => {
            this.updateVideo();

            // Reset position
            wrapper.style.transform = direction === 'right' ? 'translateX(50px)' : 'translateX(-50px)';

            // Fade in
            setTimeout(() => {
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'translateX(0)';

                setTimeout(() => {
                    this.isAnimating = false;
                }, 300);
            }, 50);
        }, 300);
    }
}

// Initialize video carousel
document.addEventListener('DOMContentLoaded', () => {
    new VideoCarousel();
});