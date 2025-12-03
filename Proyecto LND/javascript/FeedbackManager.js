// Feedback Manager with LocalStorage
class FeedbackManager {
    constructor() {
        this.feedbacks = this.loadFeedbacks();
        this.currentEditId = null;
        this.init();
    }

    init() {
        if (this.feedbacks.length === 0) {
            this.initializeDefaultFeedbacks();
        }

        this.renderFeedbacks();
        this.setupEventListeners();
    }

    loadFeedbacks() {
        const stored = localStorage.getItem('robeurope_feedbacks');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing feedbacks:', e);
                return [];
            }
        }
        return [];
    }

    saveFeedbacks() {
        try {
            localStorage.setItem('robeurope_feedbacks', JSON.stringify(this.feedbacks));
        } catch (e) {
            console.error('Error saving feedbacks:', e);
            alert('Unable to save feedback. Storage might be full.');
        }
    }

    initializeDefaultFeedbacks() {
        const defaultFeedbacks = [
            {
                id: Date.now() + 1,
                author: "Maria González",
                text: "Participating in Robeurope was an incredible experience! My students learned so much about teamwork and problem-solving. The organization was impeccable.",
                date: "2024-11-15"
            },
            {
                id: Date.now() + 2,
                author: "Thomas Schmidt",
                text: "As a teacher, I've seen my students' passion for technology grow exponentially. Robeurope provides the perfect platform for young innovators.",
                date: "2024-11-10"
            },
            {
                id: Date.now() + 3,
                author: "Sophie Dubois",
                text: "The competition format is excellent. It challenges students while maintaining a supportive and educational atmosphere. Highly recommended!",
                date: "2024-11-05"
            },
            {
                id: Date.now() + 4,
                author: "Alessandro Rossi",
                text: "Our school has participated for three years now. Each year, the event gets better. The impact on our students' STEM skills is remarkable.",
                date: "2024-10-28"
            }
        ];

        this.feedbacks = defaultFeedbacks;
        this.saveFeedbacks();
    }

    setupEventListeners() {
        const addBtn = document.getElementById('add-feedback-btn');
        const modal = document.getElementById('feedback-modal');
        const closeBtn = document.getElementById('modal-close');
        const backdrop = document.querySelector('.modal-backdrop');
        const form = document.getElementById('feedback-form');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveFeedback();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal(feedbackId = null) {
        const modal = document.getElementById('feedback-modal');
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('feedback-form');

        if (!modal || !modalTitle || !form) return;

        form.reset();
        this.currentEditId = feedbackId;

        if (feedbackId) {
            const feedback = this.feedbacks.find(f => f.id === feedbackId);
            if (feedback) {
                modalTitle.textContent = 'Edit Your Feedback';
                document.getElementById('feedback-id').value = feedbackId;
                document.getElementById('feedback-author').value = feedback.author;
                document.getElementById('feedback-text').value = feedback.text;
            }
        } else {
            modalTitle.textContent = 'Add Your Feedback';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        document.body.style.overflow = '';
        this.currentEditId = null;
    }

    saveFeedback() {
        const authorInput = document.getElementById('feedback-author');
        const textInput = document.getElementById('feedback-text');

        if (!authorInput || !textInput) return;

        const author = authorInput.value.trim();
        const text = textInput.value.trim();

        if (!author || !text) {
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
            message.textContent = '❗ Please fill in all the fields';

            document.body.appendChild(message);

            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 3000);
            return;
        }


        const date = new Date().toISOString().split('T')[0];

        if (this.currentEditId) {
            const index = this.feedbacks.findIndex(f => f.id === this.currentEditId);
            if (index !== -1) {
                this.feedbacks[index] = {
                    ...this.feedbacks[index],
                    author,
                    text,
                    date
                };
            }
        } else {
            const newFeedback = {
                id: Date.now(),
                author,
                text,
                date
            };
            this.feedbacks.unshift(newFeedback);
        }

        this.saveFeedbacks();
        this.renderFeedbacks();
        this.closeModal();
    }

    deleteFeedback(id) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.id = 'delete-confirm-modal';
        modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 9999; display: flex; 
        align-items: center; justify-content: center;
    `;

        const content = document.createElement('div');
        content.style.cssText = `
        background: white; padding: 30px; border-radius: 12px; 
        max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-height: 80vh; overflow: auto;
    `;

        const message = document.createElement('p');
        message.textContent = 'Are you sure you want to delete this feedback?';
        message.style.cssText = 'margin: 0 0 20px 0; font-size: 18px; line-height: 1.4; color: black;';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Yes, Delete';
        confirmBtn.style.cssText = `
        background: #c94040; color: white; border: none; padding: 12px 24px; 
        border-radius: 6px; cursor: pointer; margin-right: 10px; font-size: 16px;
    `;

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
        background: #f0f0f0; color: #333; border: none; padding: 12px 24px; 
        border-radius: 6px; cursor: pointer; font-size: 16px;
    `;

        // Build modal
        content.append(message, confirmBtn, cancelBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Event handlers
        const removeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };

        confirmBtn.onclick = () => {
            this.feedbacks = this.feedbacks.filter(f => f.id !== id);
            this.saveFeedbacks();
            this.renderFeedbacks();
            removeModal();
        };

        cancelBtn.onclick = removeModal;

        modal.onclick = (e) => {
            if (e.target === modal) removeModal();
        };

        // Escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                removeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }


    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    renderFeedbacks() {
        const grid = document.getElementById('feedback-grid');

        if (!grid) return;

        if (this.feedbacks.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1; font-size: 18px;">No feedback yet. Be the first to share your experience!</p>';
            return;
        }

        grid.innerHTML = this.feedbacks.map(feedback => `
            <div class="feedback-card">
                <p class="feedback-text">"${this.escapeHtml(feedback.text)}"</p>
                <div class="feedback-meta">
                    <div>
                        <div class="feedback-author">${this.escapeHtml(feedback.author)}</div>
                        <div class="feedback-date">${this.formatDate(feedback.date)}</div>
                    </div>
                </div>
                <div class="feedback-actions">
                    <button class="btn-edit" onclick="feedbackManager.openModal(${feedback.id})">Edit</button>
                    <button class="btn-delete" onclick="feedbackManager.deleteFeedback(${feedback.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize feedback manager
let feedbackManager;
document.addEventListener('DOMContentLoaded', () => {
    feedbackManager = new FeedbackManager();
});