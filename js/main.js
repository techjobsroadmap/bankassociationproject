// Bankers Association Platform - Main JavaScript

// Utility Functions
const utils = {
    // Format date
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    },

    // Calculate days until
    daysUntil: (dateString) => {
        const today = new Date();
        const targetDate = new Date(dateString);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },

    // Show notification
    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Get user initials
    getUserInitials: (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
};

// Authentication
const auth = {
    // Check if user is logged in
    isLoggedIn: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Get current user
    getCurrentUser: () => {
        return {
            email: localStorage.getItem('userEmail'),
            name: localStorage.getItem('userName'),
            employeeId: localStorage.getItem('employeeId'),
            designation: localStorage.getItem('designation'),
            location: localStorage.getItem('location')
        };
    },

    // Login user
    login: (email, password) => {
        // In production, this would make an API call
        // For demo, we'll simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        return true;
    },

    // Logout user
    logout: () => {
        localStorage.clear();
        window.location.href = '../index.html';
    },

    // Register user
    register: (userData) => {
        // In production, this would make an API call
        // For demo, we'll simulate successful registration
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userName', userData.fullName);
        localStorage.setItem('employeeId', userData.employeeId);
        localStorage.setItem('designation', userData.designation);
        localStorage.setItem('location', userData.location);
        return true;
    }
};

// Sample Data (In production, this would come from API)
const sampleData = {
    exams: [
        {
            id: 1,
            title: 'SBI PO Promotion Exam 2025',
            date: '2025-01-15',
            type: 'Promotion',
            description: 'Promotion exam for Officer to Assistant Manager',
            syllabus: ['Banking Awareness', 'General Knowledge', 'Reasoning', 'Quantitative Aptitude']
        },
        {
            id: 2,
            title: 'Banking Awareness Test',
            date: '2025-02-01',
            type: 'Assessment',
            description: 'General banking knowledge assessment',
            syllabus: ['Banking Terms', 'RBI Guidelines', 'Current Affairs']
        }
    ],

    questions: [
        {
            id: 1,
            question: 'What is the current repo rate set by RBI?',
            options: ['6.5%', '6.75%', '7.0%', '7.25%'],
            correctAnswer: 1,
            explanation: 'The current repo rate is 6.75% as per the latest RBI monetary policy.',
            category: 'Banking Awareness',
            difficulty: 'Medium',
            examType: 'Promotion'
        },
        {
            id: 2,
            question: 'What does CRR stand for in banking?',
            options: ['Cash Reserve Ratio', 'Credit Reserve Ratio', 'Current Reserve Ratio', 'Capital Reserve Ratio'],
            correctAnswer: 0,
            explanation: 'CRR stands for Cash Reserve Ratio, which is the percentage of deposits banks must keep with RBI.',
            category: 'Banking Terms',
            difficulty: 'Easy',
            examType: 'General'
        }
    ],

    transfers: [
        {
            id: 1,
            type: 'OUT',
            currentLocation: 'Mumbai',
            desiredLocation: 'Delhi',
            designation: 'Assistant Manager',
            postedDate: '2025-11-20',
            reason: 'Family reasons',
            contactEmail: 'user1@sbi.co.in'
        },
        {
            id: 2,
            type: 'IN',
            currentLocation: 'Bangalore',
            desiredLocation: 'Mumbai',
            designation: 'Assistant Manager',
            postedDate: '2025-11-18',
            contactEmail: 'user2@sbi.co.in'
        }
    ],

    forumThreads: [
        {
            id: 1,
            title: 'Tips for PO Promotion Exam Preparation',
            author: 'Rajesh Kumar',
            category: 'Exam Preparation',
            replies: 24,
            views: 156,
            lastActivity: '2025-11-25T10:30:00',
            content: 'Looking for effective strategies to prepare for the upcoming PO exam...'
        },
        {
            id: 2,
            title: 'Transfer from Mumbai to Bangalore - Seeking Advice',
            author: 'Priya Sharma',
            category: 'Transfers',
            replies: 15,
            views: 89,
            lastActivity: '2025-11-25T08:15:00',
            content: 'I am looking to transfer from Mumbai to Bangalore. Any advice?'
        }
    ],

    currentAffairs: [
        {
            id: 1,
            title: 'RBI Announces New Repo Rate Changes',
            date: '2025-11-24',
            category: 'Monetary Policy',
            summary: 'The Reserve Bank of India has announced changes to the repo rate affecting lending rates...',
            content: 'Full article content here...'
        },
        {
            id: 2,
            title: 'SBI Launches New Digital Banking Initiative',
            date: '2025-11-23',
            category: 'Technology',
            summary: 'State Bank of India introduces innovative digital banking solutions for customers...',
            content: 'Full article content here...'
        }
    ]
};

// API Simulation (In production, replace with actual API calls)
const api = {
    // Exams
    getExams: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(sampleData.exams), 500);
        });
    },

    getExamById: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exam = sampleData.exams.find(e => e.id === parseInt(id));
                resolve(exam);
            }, 500);
        });
    },

    // Questions
    getQuestions: async (filters = {}) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let questions = [...sampleData.questions];
                
                if (filters.category) {
                    questions = questions.filter(q => q.category === filters.category);
                }
                if (filters.difficulty) {
                    questions = questions.filter(q => q.difficulty === filters.difficulty);
                }
                if (filters.examType) {
                    questions = questions.filter(q => q.examType === filters.examType);
                }
                
                resolve(questions);
            }, 500);
        });
    },

    submitAnswer: async (questionId, answer) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const question = sampleData.questions.find(q => q.id === questionId);
                const isCorrect = question.correctAnswer === answer;
                resolve({ isCorrect, explanation: question.explanation });
            }, 300);
        });
    },

    // Transfers
    getTransfers: async (filters = {}) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let transfers = [...sampleData.transfers];
                
                if (filters.location) {
                    transfers = transfers.filter(t => 
                        t.currentLocation.toLowerCase().includes(filters.location.toLowerCase()) ||
                        t.desiredLocation.toLowerCase().includes(filters.location.toLowerCase())
                    );
                }
                if (filters.type) {
                    transfers = transfers.filter(t => t.type === filters.type);
                }
                
                resolve(transfers);
            }, 500);
        });
    },

    createTransferListing: async (transferData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTransfer = {
                    id: sampleData.transfers.length + 1,
                    ...transferData,
                    postedDate: new Date().toISOString().split('T')[0]
                };
                sampleData.transfers.push(newTransfer);
                resolve(newTransfer);
            }, 500);
        });
    },

    // Forum
    getThreads: async (category = null) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let threads = [...sampleData.forumThreads];
                if (category) {
                    threads = threads.filter(t => t.category === category);
                }
                resolve(threads);
            }, 500);
        });
    },

    // Current Affairs
    getCurrentAffairs: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(sampleData.currentAffairs), 500);
        });
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils, auth, api, sampleData };
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🏦 Bankers Association Platform loaded successfully!');
