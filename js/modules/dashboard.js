window.AwazApp = window.AwazApp || {};

// Ensure reportsData exists even if reports module hasn't loaded first
window.AwazApp.reportsData = window.AwazApp.reportsData || [];

window.AwazApp.renderDashboard = (container) => {
    const data = window.AwazApp.reportsData;
    const total = data.length;
    const resolved = data.filter(r => r.status === 'resolved').length;
    const inProgress = data.filter(r => r.status === 'in-progress').length;
    const pending = data.filter(r => r.status === 'pending').length;

    container.innerHTML = `
        <div class="dashboard-view" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
            <div class="stat-card">
                <div class="stat-value">${total}</div>
                <div class="stat-label">Total Reports Received</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${resolved}</div>
                <div class="stat-label">Issues Resolved</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${inProgress}</div>
                <div class="stat-label">Currently In Progress</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${pending}</div>
                <div class="stat-label">Pending Review</div>
            </div>
        </div>
        <section class="map-section" style="margin-top: 2rem; width: 100%; grid-column: 1 / -1;">
             <header class="map-header">
                <div>Civic Overview</div>
                <div style="font-size: 0.8rem; color: var(--accent-teal);">Ameerpet, Hyderabad</div>
            </header>
            <div class="map-placeholder" style="height: 300px;">
                <img src="map_placeholder.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.5;">
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                    <p style="color: var(--text-muted);">Dashboard Summary View</p>
                </div>
            </div>
        </section>
    `;
};
