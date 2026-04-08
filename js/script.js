/* ════════════════════════════════════════════════════════════
   CONFIGURAÇÕES E CONSTANTES
   ════════════════════════════════════════════════════════════ */

const CONFIG = {
    THEME_KEY: 'theme',
    SCROLL_THRESHOLD: 20,
    SECTION_OFFSET: 120,
    TYPING_SPEED: 80,
    DELETING_SPEED: 45,
    PAUSE_TIME: 1800,
    WORD_CHANGE_DELAY: 200,
    FORM_SUBMIT_DELAY: 600,
    WHATSAPP_NUMBER: '5581991246738',
    SECTIONS: ['home', 'sobre', 'servicos', 'contato'],
};

const TYPEWRITER_WORDS = ['web', 'suporte', 'sites', 'tecnologia', 'soluções', 'inovação'];

/* ════════════════════════════════════════════════════════════
   TEMA (TEMA CLARO/ESCURO)
   ════════════════════════════════════════════════════════════ */

const ThemeManager = {
    root: document.documentElement,
    themeBtn: document.getElementById('theme-btn'),

    initialize() {
        const savedTheme = this.getSavedTheme();
        this.applyTheme(savedTheme);
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
    },

    getSavedTheme() {
        const saved = localStorage.getItem(CONFIG.THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    applyTheme(theme) {
        this.root.setAttribute('data-theme', theme);
        const emoji = theme === 'dark' ? '☀️' : '🌙';
        this.themeBtn.textContent = emoji;
    },

    toggleTheme() {
        const current = this.root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(next);
        localStorage.setItem(CONFIG.THEME_KEY, next);
    },
};

/* ════════════════════════════════════════════════════════════
   NAVEGAÇÃO E SCROLL
   ════════════════════════════════════════════════════════════ */

const NavManager = {
    navbar: document.getElementById('navbar'),

    initialize() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },

    handleScroll() {
        this.updateNavbarState();
        this.updateActiveSection();
    },

    updateNavbarState() {
        const isScrolled = window.scrollY > CONFIG.SCROLL_THRESHOLD;
        this.navbar.classList.toggle('scrolled', isScrolled);
    },

    updateActiveSection() {
        for (let i = CONFIG.SECTIONS.length - 1; i >= 0; i--) {
            const section = document.getElementById(CONFIG.SECTIONS[i]);
            if (!section) continue;

            const sectionTop = section.offsetTop - CONFIG.SECTION_OFFSET;
            if (window.scrollY >= sectionTop) {
                this.setActiveLink(CONFIG.SECTIONS[i]);
                break;
            }
        }
    },

    setActiveLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-links a, #mobile-drawer a[data-mobile-section]');
        navLinks.forEach(link => {
            const isActive =
                link.dataset.section === sectionId ||
                link.dataset.mobileSection === sectionId;
            link.classList.toggle('active', isActive);
        });
    },
};

/* ════════════════════════════════════════════════════════════
   MENU MOBILE
   ════════════════════════════════════════════════════════════ */

const MobileMenuManager = {
    hamburger: document.getElementById('hamburger'),
    drawer: document.getElementById('mobile-drawer'),

    initialize() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
    },

    toggleMenu() {
        this.hamburger.classList.toggle('open');
        this.drawer.classList.toggle('open');
    },

    close() {
        this.hamburger.classList.remove('open');
        this.drawer.classList.remove('open');
    },
};

// Função global para fechar menu mobile (chamada no HTML)
function closeMobileMenu() {
    MobileMenuManager.close();
}

/* ════════════════════════════════════════════════════════════
   MÁQUINA DE ESCREVER (TYPEWRITER)
   ════════════════════════════════════════════════════════════ */

const TypewriterManager = {
    element: document.getElementById('typed-text'),
    words: TYPEWRITER_WORDS,
    state: {
        currentWordIndex: 0,
        displayedText: '',
        isDeleting: false,
    },

    initialize() {
        this.performTypingStep();
    },

    performTypingStep() {
        const word = this.words[this.state.currentWordIndex];
        const displayLength = this.state.displayedText.length;
        const wordLength = word.length;

        if (!this.state.isDeleting && displayLength < wordLength) {
            this.addCharacter(word);
            this.scheduleNextStep(CONFIG.TYPING_SPEED);
        } else if (!this.state.isDeleting && displayLength === wordLength) {
            this.scheduleNextStep(CONFIG.PAUSE_TIME, () => {
                this.state.isDeleting = true;
                this.performTypingStep();
            });
        } else if (this.state.isDeleting && displayLength > 0) {
            this.removeCharacter();
            this.scheduleNextStep(CONFIG.DELETING_SPEED);
        } else {
            this.moveToNextWord();
            this.scheduleNextStep(CONFIG.WORD_CHANGE_DELAY);
        }
    },

    addCharacter(word) {
        this.state.displayedText = word.slice(0, this.state.displayedText.length + 1);
        this.updateDisplay();
    },

    removeCharacter() {
        this.state.displayedText = this.state.displayedText.slice(0, -1);
        this.updateDisplay();
    },

    moveToNextWord() {
        this.state.isDeleting = false;
        this.state.currentWordIndex = (this.state.currentWordIndex + 1) % this.words.length;
    },

    updateDisplay() {
        this.element.textContent = this.state.displayedText;
    },

    scheduleNextStep(delay, callback = null) {
        setTimeout(() => {
            if (callback) callback();
            else this.performTypingStep();
        }, delay);
    },
};

/* ════════════════════════════════════════════════════════════
   FORMULÁRIO DE CONTATO
   ════════════════════════════════════════════════════════════ */

const ContactFormManager = {
    form: document.getElementById('contact-form'),
    formWrapper: document.getElementById('form-wrapper'),
    successState: document.getElementById('success-state'),
    submitBtn: document.getElementById('submit-btn'),
    submitText: document.getElementById('submit-text'),
    submitIcon: document.getElementById('submit-icon'),
    submitSpinner: document.getElementById('submit-spinner'),

    initialize() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(event) {
        event.preventDefault();

        const formData = this.getFormData();
        if (!this.validateFormData(formData)) return;

        this.showLoadingState();
        this.sendViaWhatsApp(formData);
        this.showSuccessState();
    },

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
        };
    },

    validateFormData(data) {
        return data.name && data.email && data.message;
    },

    showLoadingState() {
        this.submitBtn.disabled = true;
        this.submitText.textContent = 'Enviando...';
        this.submitIcon.style.display = 'none';
        this.submitSpinner.style.display = 'block';
    },

    sendViaWhatsApp(formData) {
        const message = this.buildWhatsAppMessage(formData);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    },

    buildWhatsAppMessage(data) {
        return `Olá! Recebi uma nova mensagem do formulário:\n\nNome: ${data.name}\nEmail: ${data.email}\nMensagem: ${data.message}`;
    },

    showSuccessState() {
        setTimeout(() => {
            this.formWrapper.style.display = 'none';
            this.successState.style.display = 'flex';
        }, CONFIG.FORM_SUBMIT_DELAY);
    },

    reset() {
        this.form.reset();
        this.submitBtn.disabled = false;
        this.submitText.textContent = 'Enviar mensagem';
        this.submitIcon.style.display = 'block';
        this.submitSpinner.style.display = 'none';
        this.successState.style.display = 'none';
        this.formWrapper.style.display = 'block';
    },
};

// Função global para resetar formulário (chamada no HTML)
function resetForm() {
    ContactFormManager.reset();
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */

const FooterManager = {
    initialize() {
        this.updateFooterYear();
    },

    updateFooterYear() {
        const currentYear = new Date().getFullYear();
        const footerText = `© ${currentYear} — Desenvolvido por Rodrigo Eduardo De Almeida. Todos os direitos reservados.`;
        document.getElementById('footer-year').textContent = footerText;
    },
};

/* ════════════════════════════════════════════════════════════
   INICIALIZAÇÃO DA APLICAÇÃO
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    NavManager.initialize();
    MobileMenuManager.initialize();
    TypewriterManager.initialize();
    ContactFormManager.initialize();
    FooterManager.initialize();
});