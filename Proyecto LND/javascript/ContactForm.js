// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate data
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    validateForm(data) {
        if (!data.firstName || !data.lastName) {
            const message = document.createElement('div');
            message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: #c94040ff;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
            message.textContent = '❗ Missing name parameters in contact form';

            document.body.appendChild(message);

            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 3000);
            return false;
        }

        if (!this.validateEmail(data.email)) {
            const message = document.createElement('div');
            message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: #c94040ff;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
            message.textContent = '❗ Please enter a valid email address';

            document.body.appendChild(message);

            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 3000);
            return false;
        }

        if (!data.message || data.message.length < 10) {
            const message = document.createElement('div');
            message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: #c94040ff;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
            message.textContent = '❗ Please enter a valid message (at least 10 characters)';

            document.body.appendChild(message);

            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 3000);
            return false;
        }

        return true;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: #34a853;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
        message.textContent = '✓ Message sent successfully!';

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// Success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});