document.addEventListener('DOMContentLoaded', () => {
    const appView = document.getElementById('app-view');
    const modalContainer = document.getElementById('modal-container');
    const searchInput = document.querySelector('.search-container input');
    const navItems = document.querySelectorAll('.nav-item');

    // Navigation and View Switching (Routing)
    const switchView = (viewId) => {
        // Clear active classes
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Show loader
        appView.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
        
        // Simulated loading delay for smooth feel
        setTimeout(() => {
            switch (viewId) {
                case 'nav-dashboard':
                    document.getElementById('nav-dashboard').classList.add('active');
                    if (window.AwazApp && window.AwazApp.renderDashboard) {
                        window.AwazApp.renderDashboard(appView);
                    }
                    break;
                case 'nav-report':
                    document.getElementById('nav-report').classList.add('active');
                    if (window.AwazApp && window.AwazApp.renderReports) {
                        window.AwazApp.renderReports(appView, modalContainer);
                    }
                    break;
                case 'nav-map':
                    document.getElementById('nav-map').classList.add('active');
                    if (window.AwazApp && window.AwazApp.renderMap) {
                        window.AwazApp.renderMap(appView);
                    }
                    break;
                case 'nav-analytics':
                    document.getElementById('nav-analytics').classList.add('active');
                    if (window.AwazApp && window.AwazApp.renderAnalytics) {
                        window.AwazApp.renderAnalytics(appView);
                    }
                    break;
                default:
                    if (window.AwazApp && window.AwazApp.renderDashboard) {
                        window.AwazApp.renderDashboard(appView);
                    }
            }
            
            // Re-apply click pop for newly rendered elements if needed
            attachClickPop();
            
            // Console log for debugging/feedback
            console.log(`Navigated to: ${viewId}`);
        }, 300);
    };

    // Helper for "pop" animation feedback
    const attachClickPop = () => {
        document.querySelectorAll('.nav-item, .report-card, button').forEach(el => {
            el.addEventListener('click', () => {
                const svg = el.querySelector('svg') || el;
                if (svg && svg.classList) {
                    svg.classList.remove('click-pop');
                    void svg.offsetWidth; // Trigger reflow
                    svg.classList.add('click-pop');
                    setTimeout(() => svg.classList.remove('click-pop'), 400);
                }
            });
        });
    };

    // Nav Item Click Listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.tagName === 'A') e.preventDefault();
            
            const id = item.id;
            // Only switch view for the first 4 main navigation items
            if (['nav-dashboard', 'nav-report', 'nav-map', 'nav-analytics'].includes(id)) {
                switchView(id);
            }
        });
    });

    // Initialize Global Modules if they exist
    if (window.AwazApp) {
        if (window.AwazApp.initLanguage) window.AwazApp.initLanguage();
        if (window.AwazApp.initAuth) window.AwazApp.initAuth(modalContainer);
        if (window.AwazApp.initSettings) window.AwazApp.initSettings(modalContainer);
        if (window.AwazApp.initSearch) window.AwazApp.initSearch(searchInput, appView);
    }

    // Initial load
    switchView('nav-dashboard');
    attachClickPop();
});
