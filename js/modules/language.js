window.AwazApp = window.AwazApp || {};

window.AwazApp.initLanguage = () => {
    let currentLang = localStorage.getItem('awaz-lang') || 'en';
    
    const translations = {
        en: {
            dashboard: 'Dashboard',
            reports: 'Reports',
            map: 'Map View',
            analytics: 'Analytics',
            settings: 'Settings',
            login: 'Login',
            search_placeholder: 'Search reports, locations...',
            incident_map: 'Active Incident Map',
            recent_incidents: 'Recent Incidents',
            theme: 'Theme',
            select_lang: 'Select Language'
        },
        ur: {
            dashboard: 'ڈیش بورڈ',
            reports: 'رپورٹس',
            map: 'نقشہ',
            analytics: 'تجزیات',
            settings: 'ترتیبات',
            login: 'لاگ ان',
            search_placeholder: 'تلاش کریں...',
            incident_map: 'فعال واقعات کا نقشہ',
            recent_incidents: 'حالیہ واقعات',
            theme: 'تھیم',
            select_lang: 'زبان منتخب کریں'
        },
        hi: {
            dashboard: 'डैशबोर्ड',
            reports: 'रिपोर्ट',
            map: 'मानचित्र',
            analytics: 'एनालिटिक्स',
            settings: 'सेटअप',
            login: 'लॉग इन',
            search_placeholder: 'खोजें...',
            incident_map: 'सक्रिय घटना मानचित्र',
            recent_incidents: 'हालिया घटनाएँ',
            theme: 'थीम',
            select_lang: 'भाषा चुनें'
        },
        te: {
            dashboard: 'డాష్‌బోర్డ్',
            reports: 'నివేదికలు',
            map: 'మ్యాప్ వీక్షణ',
            analytics: 'విశ్లేషణలు',
            settings: 'సెట్టింగులు',
            login: 'లాగిన్',
            search_placeholder: 'శోధించండి...',
            incident_map: 'క్రియాశీల సంఘటన మ్యాప్',
            recent_incidents: 'ఇటీవలి సంఘటనలు',
            theme: 'థీమ్',
            select_lang: 'భాషను ఎంచుకోండి'
        }
    };

    const updateUI = () => {
        const langData = translations[currentLang];
        document.querySelector('#nav-dashboard span').innerText = langData.dashboard;
        document.querySelector('#nav-report span').innerText = langData.reports;
        document.querySelector('#nav-map span').innerText = langData.map;
        document.querySelector('#nav-analytics span').innerText = langData.analytics;
        document.querySelector('#nav-settings span').innerText = langData.settings;
        document.querySelector('#nav-login span').innerText = langData.login;
        document.querySelector('#nav-theme span').innerText = langData.theme;
        document.querySelector('#nav-language span').innerText = currentLang.toUpperCase();
        
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) searchInput.placeholder = langData.search_placeholder;
        
        // Custom attribute for Urdu (RTL)
        if (currentLang === 'ur') {
            document.body.classList.add('ur-lang');
            document.body.dir = 'rtl';
        } else {
            document.body.classList.remove('ur-lang');
            document.body.dir = 'ltr';
        }

        // Apply specific language fonts
        document.body.className = document.body.className.replace(/\b(lang-\w+)\b/g, '');
        document.body.classList.add(`lang-${currentLang}`);
        
        localStorage.setItem('awaz-lang', currentLang);
    };

    const showLanguageModal = (modalContainer) => {
        if (!modalContainer) return;

        modalContainer.classList.remove('hidden');
        modalContainer.innerHTML = `
            <div class="modal-content animate-in" style="max-width: 400px; text-align: center;">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="margin-bottom: 2rem;">${translations[currentLang].select_lang}</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <button class="lang-option-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">English</button>
                    <button class="lang-option-btn ${currentLang === 'ur' ? 'active' : ''}" data-lang="ur">اردو</button>
                    <button class="lang-option-btn ${currentLang === 'hi' ? 'active' : ''}" data-lang="hi">हिन्दी</button>
                    <button class="lang-option-btn ${currentLang === 'te' ? 'active' : ''}" data-lang="te">తెలుగు</button>
                </div>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        
        modalContainer.querySelectorAll('.lang-option-btn').forEach(btn => {
            btn.onclick = () => {
                currentLang = btn.dataset.lang;
                updateUI();
                modalContainer.classList.add('hidden');
            };
        });
    };

    window.AwazApp.openLanguageSelector = showLanguageModal;

    // Attach click listener
    const navLang = document.getElementById('nav-language');
    if (navLang) {
        navLang.onclick = () => {
             const modal = document.getElementById('modal-container');
             showLanguageModal(modal);
        };
    }

    // Custom styles for Indic languages and RTL
    if (!document.getElementById('lang-extra-styles')) {
        const style = document.createElement('style');
        style.id = 'lang-extra-styles';
        style.innerHTML = `
            .ur-lang { font-family: 'Noto Nastaliq Urdu', 'Inter', serif; }
            .lang-hi { font-family: 'Inter', sans-serif; }
            .lang-te { font-family: 'Inter', 'Noto Sans Telugu', sans-serif; }
            
            .lang-option-btn {
                background: rgba(255,255,255,0.05);
                border: 1px solid var(--border-color);
                color: var(--text-main);
                padding: 1.5rem 1rem;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s;
                font-size: 1.1rem;
            }
            .lang-option-btn:hover {
                background: rgba(20, 184, 166, 0.1);
                border-color: var(--accent-teal);
                transform: translateY(-2px);
            }
            .lang-option-btn.active {
                background: var(--accent-teal);
                color: white;
                border-color: var(--accent-teal);
                box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
            }
            
            .ur-lang .nav-left, .ur-lang .nav-right { flex-direction: row-reverse; }
        `;
        document.head.appendChild(style);
    }

    updateUI();
};
