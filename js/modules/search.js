window.AwazApp = window.AwazApp || {};
window.AwazApp.initSearch = (searchInput, container) => {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.trim() === '') return;

        // If searching, we switch to reports view but with a filter
        window.AwazApp.renderReports(container);
        
        // Wait for reports to render then filter the cards manually for display
        setTimeout(() => {
            const cards = container.querySelectorAll('.report-card');
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(query) ? 'block' : 'none';
            });
        }, 10);
    });
};
