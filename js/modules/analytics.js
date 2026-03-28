window.AwazApp = window.AwazApp || {};
window.AwazApp.renderAnalytics = (container) => {
    container.innerHTML = `
        <div class="analytics-view" style="display: flex; flex-direction: column; gap: 2rem;">
            <header>
                <h2 style="font-size: 1.5rem; font-weight: 600;">Data Insights</h2>
                <p style="color: var(--text-muted);">Civic trends and performance metrics across Karachi.</p>
            </header>

            <div class="charts-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div class="stat-card" style="text-align: left;">
                    <h3>Reports by Category</h3>
                    <div id="category-chart" style="height: 250px; display: flex; align-items: flex-end; gap: 1rem; padding: 2rem 1rem;">
                        <!-- Bar chart -->
                    </div>
                </div>
                <div class="stat-card" style="text-align: left;">
                    <h3>Resolution Efficiency</h3>
                    <div style="height: 250px; display: flex; justify-content: center; align-items: center;">
                        <div class="progress-ring" style="width: 150px; height: 150px; border-radius: 50%; border: 10px solid var(--border-color); border-top-color: var(--accent-teal); position: relative; display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 1.5rem; font-weight: 700;">68%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const categoryData = [
        { label: 'Roads', value: 80, color: '#eab308' },
        { label: 'Lights', value: 45, color: '#14b8a6' },
        { label: 'Water', value: 65, color: '#3b82f6' },
        { label: 'Waste', value: 30, color: '#22c55e' }
    ];

    const chartContainer = document.getElementById('category-chart');
    chartContainer.innerHTML = categoryData.map(data => `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; height: ${data.value}%; background: ${data.color}; border-radius: 4px; position: relative;">
                <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: var(--text-muted);">${data.value}</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${data.label}</span>
        </div>
    `).join('');
};
