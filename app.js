/* =============================================
   PROJECT APEX 90 — app.js
   Enhanced: Scroll CTA, FAQ, Language, AOS,
   Parallax, Year, Smooth Scroll
   ============================================= */

let currentLang = 'en';

/* ─── LANGUAGE DETECTION ─── */
function detectLanguage() {
    const stored = localStorage.getItem('apex_lang');
    if (stored && ['en', 'pt', 'es'].includes(stored)) {
        currentLang = stored;
    } else {
        // Default: EN. Auto-switch only for Spanish speakers.
        // PT is available via button but never auto-detected (product targets US + Hispanic markets).
        const nav = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
        currentLang = nav === 'es' ? 'es' : 'en';
    }
    applyLanguage(currentLang);
    updateLangButtons(currentLang);
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('apex_lang', lang);
    applyLanguage(lang);
    updateLangButtons(lang);
}

function updateLangButtons(lang) {
    ['en', 'pt', 'es'].forEach(l => {
        const btn = document.getElementById('langBtn-' + l);
        if (btn) btn.classList.toggle('active', l === lang);
    });
}

function applyLanguage(lang) {
    if (typeof translations === 'undefined' || !translations[lang]) return;
    const dic = translations[lang];

    if (dic.meta_title) document.title = dic.meta_title;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dic[key] !== undefined) el.innerHTML = dic[key];
    });

    if (window.feather) feather.replace();
}

/* ─── FLOATING CTA VISIBILITY ─── */
function initFloatingCta() {
    const cta = document.getElementById('floatingCta');
    const hero = document.querySelector('.hero');
    if (!cta || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                cta.classList.add('visible');
            } else {
                cta.classList.remove('visible');
            }
        },
        { threshold: 0.1 }
    );
    observer.observe(hero);
}

/* ─── HERO PARALLAX ─── */
function initParallax() {
    const heroContent = document.getElementById('heroContent');
    if (!heroContent) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < 700) {
                    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
                    heroContent.style.opacity = Math.max(0, 1 - scrolled / 500);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ─── FAQ ACCORDION ─── */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(i => {
                i.classList.remove('active');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ─── SMOOTH SCROLL FOR ANCHORS ─── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ─── DYNAMIC YEAR ─── */
function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ─── AOS INIT ─── */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 750,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic'
        });
    }
}

/* ─── FEATHER ICONS INIT ─── */
function initFeather() {
    if (window.feather) feather.replace();
}

/* ─── CTA CLICK PULSE + META PIXEL EVENT ─── */
function initCtaPulse() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            // Visual feedback
            this.style.transform = 'scale(0.97)';
            setTimeout(() => { this.style.transform = ''; }, 180);

            // Meta Pixel — InitiateCheckout event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'PROJECT APEX 90',
                    currency: 'USD',
                    value: 47.00
                });
            }
        });
    });
}

/* ─── MAIN INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
    detectLanguage();
    initAOS();
    initFeather();
    setYear();
    initSmoothScroll();
    initFloatingCta();
    initParallax();
    initFAQ();
    initCtaPulse();
});

/* ─── SCROLL TO TOP ON LOAD ─── */
window.addEventListener('load', () => {
    if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
    initFeather(); // Re-run after all assets loaded
});
