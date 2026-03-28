window.AwazApp = window.AwazApp || {};

window.AwazApp.renderSubmissions = (container, modalContainer) => {
    const personalReports = window.AwazApp.reportsData.filter(r => r.isPersonal);

    if (personalReports.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 5rem 2rem; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color); margin-top: 2rem;">
                <div style="width: 80px; height: 80px; background: rgba(20, 184, 166, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </div>
                <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">No Submissions Yet</h2>
                <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto 2rem; line-height: 1.6;">You haven't reported any civic issues yet. Your contributions help make the city better for everyone.</p>
                <button id="btn-start-report" style="background: var(--accent-teal); color: white; padding: 0.8rem 2rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">
                    Report Your First Issue
                </button>
            </div>
        `;

        document.getElementById('btn-start-report').onclick = () => {
            // Switch to reports view and open modal
            document.getElementById('nav-report').click();
            setTimeout(() => {
                const newReportBtn = document.getElementById('btn-new-report');
                if (newReportBtn) newReportBtn.click();
            }, 100);
        };
        return;
    }

    container.innerHTML = `
        <header class="view-header" style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="font-size: 1.5rem; font-weight: 700;">My Submissions</h2>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">Tracking ${personalReports.length} issues reported by you.</p>
                </div>
                <button id="btn-new-report-sub" style="background: var(--accent-teal); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    Report Another
                </button>
            </div>
        </header>

        <div class="reports-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
            ${personalReports.map(report => `
                <div class="report-card animate-in" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span class="report-status status-${report.status}">${report.status}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">ID: #${report.id.toString().slice(-4)}</span>
                        </div>
                        <h3 class="report-title">${report.title}</h3>
                        <p class="report-desc">${report.desc}</p>
                        
                        <div style="margin-top: 1.5rem; display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                ${report.location}
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${report.time}
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700;">Latest Activity</div>
                        ${report.logs && report.logs.length > 0 ? `
                            <div style="font-size: 0.85rem; color: var(--text-main); font-style: italic;">
                                "${report.logs[report.logs.length-1].action}"
                            </div>
                        ` : `
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Awaiting official review</div>
                        `}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('btn-new-report-sub').onclick = () => {
        document.getElementById('nav-report').click();
        setTimeout(() => {
            const newReportBtn = document.getElementById('btn-new-report');
            if (newReportBtn) newReportBtn.click();
        }, 100);
    };
};
