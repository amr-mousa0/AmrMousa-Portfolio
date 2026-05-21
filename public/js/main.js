/**
 * Egyptian Arabic Localization & Global UI Interactivity Logic
 * Handles language switching, dictionary lookup, theme toggle, drawer, modals, and scroll animations.
 */

window.trackClick = window.trackClick || function (eventName, eventData = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...eventData
    });
};

let currentLang = localStorage.getItem('amr_lang') || 'en';
let isTransitioning = false;

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            const translation = translations[currentLang][key];

            // Handle HTML content if it's the hero description or similar
            if (translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    const phElements = document.querySelectorAll('[data-i18n-ph]');
    phElements.forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.setAttribute('placeholder', translations[currentLang][key]);
        }
    });

    // Update toggle button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }
}

function toggleLanguage() {
    if (isTransitioning) return;
    isTransitioning = true;

    const luxuryLoader = document.getElementById('luxury-loader');
    const html = document.documentElement;

    // 1. Show Loader and spirited messages
    if (luxuryLoader) {
        const loaderTitle = luxuryLoader.querySelector('.loader-job-title');
        if (loaderTitle) {
            const messages = currentLang === 'en'
                ? ["بنظبط زوايا التصميم...", "بنجهز الأكواد بالحب...", "بنرتب البيانات بكل شياكة..."]
                : ["Aligning architectural precision...", "Curating data elegance...", "Manifesting luxury experience..."];
            loaderTitle.textContent = messages[Math.floor(Math.random() * messages.length)];
        }
        luxuryLoader.classList.remove('hidden');
        luxuryLoader.style.opacity = '';
        luxuryLoader.style.visibility = '';
    }

    // 3. Perform Switch after brief delay (Loader cinematic feel)
    setTimeout(() => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('amr_lang', currentLang);

        // Update HTML attributes
        html.setAttribute('lang', currentLang);
        html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

        // Update all text content
        updateContent();

        // 4. Hide Loader
        setTimeout(() => {
            if (luxuryLoader) {
                luxuryLoader.classList.add('hidden');
                luxuryLoader.style.opacity = '';
                luxuryLoader.style.visibility = '';
            }
            isTransitioning = false;
        }, 600);
    }, 400);
}

/* ===== Global UI Interactivity ===== */
let drawerOpen = false;

function applyTheme(name) {
    const themeBtn = document.getElementById('themeBtn');
    if (name === 'light') {
        document.body.classList.add('light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('amr_theme', name);
    document.querySelectorAll('.blob').forEach(b => b.style.opacity = document.body.classList.contains('light') ? 0.08 : 0.12);
}

function setDrawer(open) {
    drawerOpen = !!open;
    const drawer = document.getElementById('drawer');
    if (!drawer) return;
    if (drawerOpen) {
        drawer.classList.add('expanded');
        document.body.classList.add('drawer-open');
        drawer.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            drawer.querySelector('.menu-item')?.focus();
        }, 220);
    } else {
        drawer.classList.remove('expanded');
        document.body.classList.remove('drawer-open');
        drawer.setAttribute('aria-hidden', 'true');
    }
}

function goToSection(sel) {
    const luxuryLoader = document.getElementById('luxury-loader');
    const target = document.querySelector(sel);

    // Check if we are on the homepage (accounting for base path)
    const isHomePage = window.location.pathname === (window.BASE_URL || '/') ||
        window.location.pathname === (window.BASE_URL || '/').replace(/\/$/, '') ||
        window.location.pathname === '/';

    if (!isHomePage) {
        if (window.location.pathname.includes('/methodology') && sel === '#who') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!target && sel.startsWith('#')) {
            // Navigate to home + hash so the user lands on the right section.
            // The History API scrub in initApp will then wipe the hash after scroll.
            const homeUrl = (window.BASE_URL || '/');
            if (luxuryLoader) {
                luxuryLoader.classList.remove('hidden');
                setTimeout(() => {
                    window.location.href = homeUrl + sel;
                }, 400);
            } else {
                window.location.href = homeUrl + sel;
            }
            return;
        }
    }

    function updateFocus() {
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    }

    if (luxuryLoader) {
        luxuryLoader.classList.remove('hidden');
        setTimeout(() => {
            target?.scrollIntoView({ behavior: 'auto', block: 'start' });
            updateFocus();
            setTimeout(() => { luxuryLoader.classList.add('hidden'); }, 600);
        }, 400);
    } else {
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateFocus();
    }
}

function openModal(serviceId) {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Initialize everything
function initApp() {
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    updateContent();

    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.removeEventListener('click', toggleLanguage);
        langBtn.addEventListener('click', toggleLanguage);
    }

    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('amr_theme') || 'dark';
    applyTheme(savedTheme);
    if (themeBtn) {
        // remove old listeners by cloning or just assume it's safe to add
        themeBtn.onclick = () => {
            const now = document.body.classList.contains('light') ? 'dark' : 'light';
            applyTheme(now);
        };
    }

    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.onclick = () => { setDrawer(!drawerOpen); };

    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) closeBtn.onclick = () => { setDrawer(false); };

    const drawer = document.getElementById('drawer');
    if (drawer) {
        drawer.querySelectorAll('.menu-item').forEach(item => {
            item.onclick = () => {
                const target = item.getAttribute('data-target');
                setDrawer(false);
                goToSection(target);
            };
            item.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') item.click();
            };
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawerOpen) setDrawer(false);
        const modal = document.getElementById('service-modal');
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
    });



    // Hide loader on load
    const luxuryLoader = document.getElementById('luxury-loader');
    if (luxuryLoader) {
        const minLoaderTime = 300;
        const initTime = Date.now();
        function hideLoader() {
            const elapsed = Date.now() - initTime;
            const remaining = Math.max(0, minLoaderTime - elapsed);
            setTimeout(() => {
                luxuryLoader.classList.add('hidden');
            }, remaining);
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            hideLoader();
        } else {
            document.addEventListener('DOMContentLoaded', hideLoader);
        }
    }

    // Zero-Hash Navigation: Intercept anchor links with hashes (guard against duplicate registration)
    if (!window._zeroHashDelegated) {
        window._zeroHashDelegated = true;
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                goToSection(targetId);
            }
        }, { passive: false });
    }

    // History API Scrub: Wipe hash on load if present
    if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }, 100);
    }

    // Initialize Scrollspy & Scroll-to-Top Button
    const mainEl = document.querySelector('main');
    if (mainEl) {
        // Reset section offsets and cache them on load
        sectionOffsets = [];
        cacheOffsets();

        let isScrolling = false;

        const updateScrollSpy = () => {
            const scrollTopBtn = document.getElementById('scroll-top-btn');
            if (scrollTopBtn) {
                if (mainEl.scrollTop > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }

            // Skip section scrollspy highlights on subpages
            const isHomePage = window.location.pathname === (window.BASE_URL || '/') ||
                window.location.pathname === (window.BASE_URL || '/').replace(/\/$/, '') ||
                window.location.pathname === '/';
            if (!isHomePage) return;

            if (sectionOffsets.length === 0) cacheOffsets();
            let currentSection = '#hero';
            sectionOffsets.forEach(sec => {
                if (mainEl.scrollTop >= sec.top - 200) {
                    currentSection = sec.id;
                }
            });
            const navLinks = document.querySelectorAll('.header-nav .nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        // Run scroll spy update immediately to highlight "Home" or the current section on load
        updateScrollSpy();

        mainEl.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    updateScrollSpy();
                    isScrolling = false;
                });
            }
        }, { passive: true });
    }

    if (!window._scrollTopDelegated) {
        window._scrollTopDelegated = true;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('#scroll-top-btn');
            if (btn) {
                e.preventDefault();
                const mainEl = document.querySelector('main');
                mainEl?.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// Cached section offsets to eliminate synchronous layout thrashing
let sectionOffsets = [];
function cacheOffsets() {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const sections = mainEl.querySelectorAll('section');
    sectionOffsets = Array.from(sections).map(sec => ({
        id: '#' + sec.getAttribute('id'),
        top: sec.offsetTop
    }));
}
window.addEventListener('resize', cacheOffsets);

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('astro:page-load', initApp);
