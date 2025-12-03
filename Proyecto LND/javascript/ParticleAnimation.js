// Particle Animation for Hero and Contact sections
class ParticleAnimation {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = options.particleCount || 100;
        this.connectionDistance = options.connectionDistance || 150;
        this.mouseRadius = options.mouseRadius || 200;
        this.mouse = { x: null, y: null };
        
        // Autonomous movement settings
        this.baseSpeed = options.baseSpeed || 1.5;
        this.wanderStrength = options.wanderStrength || 0.1;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.baseSpeed,
                vy: (Math.random() - 0.5) * this.baseSpeed,
                radius: Math.random() * 2 + 1,
                wanderAngle: Math.random() * Math.PI * 2 // For autonomous wandering
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Autonomous wandering behavior
            particle.wanderAngle += (Math.random() - 0.5) * this.wanderStrength * 0.3;
            
            // Add wandering force to velocity
            particle.vx += Math.cos(particle.wanderAngle) * this.wanderStrength;
            particle.vy += Math.sin(particle.wanderAngle) * this.wanderStrength;
            
            // Mouse interaction (repulsion)
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouseRadius) {
                    const force = (this.mouseRadius - distance) / this.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.5;
                    particle.vy -= Math.sin(angle) * force * 0.5;
                }
            }
            
            // Limit velocity for smoother movement
            const maxSpeed = this.baseSpeed * 2;
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gentle friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Bounce off edges with some randomness
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.9;
                particle.wanderAngle = Math.random() * Math.PI * 2; // Randomize direction on bounce
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.9;
                particle.wanderAngle = Math.random() * Math.PI * 2;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.5;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle animations
document.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation('particle-canvas', {
        particleCount: 80,
        connectionDistance: 120,
        mouseRadius: 250,
        baseSpeed: 1.2,
        wanderStrength: 0.01
    });
    
    new ParticleAnimation('contact-canvas', {
        particleCount: 60,
        connectionDistance: 100,
        mouseRadius: 150,
        baseSpeed: 0.8,
        wanderStrength: 0.01
    });
});
