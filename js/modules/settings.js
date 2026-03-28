window.AwazApp = window.AwazApp || {};
window.AwazApp.initSettings = (modalContainer) => {
    const showSettings = () => {
        modalContainer.classList.remove('hidden');
        modalContainer.innerHTML = `
            <div class="modal-content animate-in">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Control Panel</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Manage your preferences and notification settings.</p>
                <div class="settings-list">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                        <div>
                            <div style="font-weight: 600;">Push Notifications</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Get alerts for status updates on your reports.</div>
                        </div>
                        <input type="checkbox" checked style="accent-color: var(--accent-teal); cursor: pointer;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                        <div>
                            <div style="font-weight: 600;">High-Contrast Mode</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Increase readability for low vision users.</div>
                        </div>
                        <input type="checkbox" style="accent-color: var(--accent-teal); cursor: pointer;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
                        <div>
                            <div style="font-weight: 600;">Data Sharing</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Anonymize and share details with local authorities.</div>
                        </div>
                        <input type="checkbox" checked style="accent-color: var(--accent-teal); cursor: pointer;">
                    </div>
                </div>
                <button id="btn-save-settings" style="width: 100%; margin-top: 2rem; background: var(--accent-teal); color: white; padding: 0.75rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer;">Save All Changes</button>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        document.getElementById('btn-save-settings').onclick = () => {
             alert('Simulation: Settings updated successfully!');
             modalContainer.classList.add('hidden');
        };
    };

    document.getElementById('nav-settings').onclick = showSettings;
};
