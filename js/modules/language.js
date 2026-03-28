window.AwazApp = window.AwazApp || {};
window.AwazApp.initLanguage = () => {
    let currentLang = 'en';
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
            recent_incidents: 'Recent Incidents'
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
            recent_incidents: 'حالیہ واقعات'
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
        document.querySelector('.search-container input').placeholder = langData.search_placeholder;
        
        // Custom attribute for Urdu (RTL)
        if (currentLang === 'ur') {
            document.body.classList.add('ur-lang');
            document.body.dir = 'rtl';
        } else {
            document.body.classList.remove('ur-lang');
            document.body.dir = 'ltr';
        }
    };

    document.getElementById('nav-language').onclick = () => {
        currentLang = currentLang === 'en' ? 'ur' : 'en';
        updateUI();
    };

    // Style for RTL
    const style = document.createElement('style');
    style.innerHTML = `
        .ur-lang {
            font-family: 'Noto Nastaliq Urdu', 'Inter', serif;
        }
        .ur-lang .nav-left, .ur-lang .nav-right {
             flex-direction: row-reverse;
        }
    `;
    document.head.appendChild(style);
};
