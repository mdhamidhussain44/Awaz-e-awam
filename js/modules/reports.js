window.AwazApp = window.AwazApp || {};

// Data Persistence Logic
// Initialize reportsData from localStorage or fallback to the INITIAL_REPORTS_DATA from data.js
const loadReports = () => {
    const saved = localStorage.getItem('awaz_reports_v1');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse saved reports:", e);
        }
    }
    return window.AwazApp.INITIAL_REPORTS_DATA || [];
};

// Helper to save current state to localStorage
const saveReports = () => {
    localStorage.setItem('awaz_reports_v1', JSON.stringify(window.AwazApp.reportsData));
};

// Global state initialization
window.AwazApp.reportsData = loadReports();

// Helper to get current location coordinates
const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => reject(err),
            { timeout: 10000 }
        );
    });
};

window.AwazApp.renderReports = (container, modalContainer) => {
    container.innerHTML = `
        <header class="view-header" style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <h2 style="font-size: 1.5rem; font-weight: 600;">Incident Reports</h2>
                    <span style="background: rgba(20, 184, 166, 0.1); color: var(--accent-teal); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">System Active</span>
                </div>
                <button id="btn-new-report" style="background: var(--accent-teal); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    Report New Issue
                </button>
            </div>
            <div class="filters" style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="pending">Pending</button>
                <button class="filter-btn" data-filter="in-progress">In Progress</button>
                <button class="filter-btn" data-filter="resolved">Resolved</button>
            </div>
        </header>

        <div class="reports-grid" id="reports-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
            <!-- Report cards will be injected here -->
        </div>
    `;

    const listContainer = document.getElementById('reports-list');

    const renderList = (filter = 'all') => {
        const filtered = filter === 'all' ? window.AwazApp.reportsData : window.AwazApp.reportsData.filter(r => r.status === filter);
        
        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; opacity: 0.5;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    <p>No reports found for this status.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filtered.map(report => `
            <div class="report-card animate-in" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <span class="report-status status-${report.status}">${report.status}</span>
                        <div style="text-align: right;">
                             <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Department</div>
                             <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent-teal);">${report.department || 'Unassigned'}</div>
                        </div>
                    </div>
                    <h3 class="report-title">${report.title}</h3>
                    <p class="report-desc">${report.desc}</p>
                    ${report.notes ? `<div style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; border-left: 3px solid var(--accent-teal); margin-bottom: 1rem;">
                        <span style="font-size: 0.7rem; color: var(--accent-teal); font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 0.25rem;">DEPT NOTE</span>
                        <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">${report.notes}</p>
                    </div>` : ''}
                </div>
                <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <div class="report-meta" style="margin-bottom: 1rem;">
                        <span style="display: flex; align-items: center; gap: 0.4rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${report.location}
                        </span>
                        <span style="display: flex; align-items: center; gap: 0.4rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            ${report.time}
                        </span>
                    </div>
                    <button class="manage-btn" data-id="${report.id}" style="width: 100%; height: 36px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-main); font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        Manage Ticket
                    </button>
                </div>
            </div>
        `).join('');

        // Attach Manage listeners
        listContainer.querySelectorAll('.manage-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                showManagementModal(parseInt(btn.dataset.id));
            };
        });
    };

    const showManagementModal = (reportId) => {
        const report = window.AwazApp.reportsData.find(r => r.id === reportId);
        if (!report) return;

        modalContainer.classList.remove('hidden');
        modalContainer.innerHTML = `
            <div class="modal-content animate-in" style="max-width: 500px;">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2 4-4"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 10h8"/><path d="M13 14h8"/><path d="M5 6h4"/><path d="M5 10h4"/></svg>
                    <h2 style="font-size: 1.5rem; font-weight: 700;">Update Ticket State</h2>
                </div>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.85rem;">Ticket #${report.id} in ${report.location}</p>

                <form id="management-form" style="display: grid; gap: 1.25rem;">
                    <div>
                        <label style="display: block; font-size: 0.75rem; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase;">Modified By (Admin Name)</label>
                        <input type="text" name="modifier" required 
                               value="${window.AwazApp.currentUser ? window.AwazApp.currentUser.name : ''}" 
                               ${window.AwazApp.currentUser ? 'readonly style="background: rgba(255,255,255,0.02); opacity: 0.8; cursor: not-allowed; width: 100%; color: var(--text-main); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); outline: none;"' : 'style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem; border-radius: 8px; outline: none;"'}
                               placeholder="e.g. Officer Naresh">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label style="display: block; font-size: 0.75rem; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase;">Current State</label>
                            <select name="status" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem; border-radius: 8px; outline: none;">
                                <option value="pending" ${report.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="in-progress" ${report.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                <option value="resolved" ${report.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.75rem; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase;">Assigned Dept</label>
                            <select name="department" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem; border-radius: 8px; outline: none;">
                                <option value="Public Works" ${report.department === 'Public Works' ? 'selected' : ''}>Public Works</option>
                                <option value="Sanitation" ${report.department === 'Sanitation' ? 'selected' : ''}>Sanitation</option>
                                <option value="Health" ${report.department === 'Health' ? 'selected' : ''}>Health</option>
                                <option value="Electricity Dept" ${report.department === 'Electricity Dept' ? 'selected' : ''}>Electricity Dept</option>
                                <option value="Water Board" ${report.department === 'Water Board' ? 'selected' : ''}>Water Board</option>
                                <option value="Traffic Control" ${report.department === 'Traffic Control' ? 'selected' : ''}>Traffic Control</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.75rem; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase;">Departmental Notes</label>
                        <textarea name="notes" placeholder="e.g. Work started, estimated completion by tomorrow..." style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem; border-radius: 8px; height: 100px; resize: none; outline: none;">${report.notes || ''}</textarea>
                    </div>

                    <button type="submit" style="width: 100%; background: var(--accent-teal); color: white; padding: 0.8rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);">Save Changes & Notify</button>
                    
                    <div style="margin-top: 1.5rem;">
                        <h3 style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                            Action History
                        </h3>
                        <div id="history-log" style="max-height: 150px; overflow-y: auto; background: rgba(0,0,0,0.1); border-radius: 8px; border: 1px solid var(--border-color); padding: 0.5rem;">
                            ${report.logs && report.logs.length > 0 ? report.logs.map(log => `
                                <div style="padding: 0.6rem; border-bottom: 1px solid var(--border-color); font-size: 0.8rem;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
                                        <span style="font-weight: 700; color: var(--accent-teal);">${log.user}</span>
                                        <span style="color: var(--text-muted); font-size: 0.7rem;">${log.time}</span>
                                    </div>
                                    <div style="color: var(--text-main); line-height: 1.4;">${log.action}</div>
                                </div>
                            `).reverse().join('') : '<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No previous activity</div>'}
                        </div>
                    </div>

                    <button type="button" id="modal-cancel" style="width: 100%; background: transparent; color: var(--text-muted); padding: 0.4rem; border: none; cursor: pointer;">Cancel</button>
                </form>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        document.getElementById('modal-cancel').onclick = () => modalContainer.classList.add('hidden');
        
        const form = document.getElementById('management-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const modifier = formData.get('modifier');
            const newStatus = formData.get('status');
            const newDept = formData.get('department');
            const newNotes = formData.get('notes');

            // Tracking changes for the log
            let changes = [];
            if (newStatus !== report.status) changes.push(`Status: ${report.status} → ${newStatus}`);
            if (newDept !== report.department) changes.push(`Dept: ${report.department} → ${newDept}`);
            if (newNotes !== report.notes) changes.push(`Updated departmental notes`);

            if (changes.length === 0 && newNotes === report.notes) {
                alert("No changes detected.");
                return;
            }

            // Apply updates
            report.status = newStatus;
            report.department = newDept;
            report.notes = newNotes;

            // Initialize logs if missing
            if (!report.logs) report.logs = [];
            
            // Push new log entry
            report.logs.push({
                time: new Date().toLocaleString(),
                user: modifier,
                action: changes.join(', ') || "Updated ticket details"
            });

            // Persist to LocalStorage
            saveReports();

            // Success feedback
            modalContainer.innerHTML = `
                <div class="modal-content animate-in" style="text-align: center; padding: 3rem;">
                    <div style="width: 64px; height: 64px; background: rgba(20, 184, 166, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Ticket Updated</h2>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Real-time update reflected in the database and citizen feed.</p>
                    <button id="success-close" style="background: var(--accent-teal); color: white; padding: 0.75rem 2rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer;">Awesome</button>
                </div>
            `;

            document.getElementById('success-close').onclick = () => {
                modalContainer.classList.add('hidden');
                renderList();
            };
        };
    };

    const showNewReportModal = () => {
        if (!modalContainer) return;

        modalContainer.classList.remove('hidden');
        modalContainer.innerHTML = `
            <div class="modal-content animate-in" style="max-width: 600px;">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer; transition: transform 0.2s;">&times;</button>
                
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--accent-teal);">Report a New Issue</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem;">Contribute to your community by reporting civic problems in real-time.</p>
                
                <form id="report-form" style="display: grid; gap: 1.25rem;">
                    <div>
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Issue Title</label>
                        <input type="text" name="title" required placeholder="e.g., Pothole on High Street" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none; transition: border-color 0.3s;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Category</label>
                            <select name="category" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none; cursor: pointer;">
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Sanitation">Sanitation</option>
                                <option value="Safety">Safety</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Location</label>
                            <div style="display: flex; gap: 0.5rem;">
                                <input type="text" id="report-location" name="location" placeholder="e.g., Ameerpet" style="flex-grow: 1; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                                <button type="button" id="btn-detect-loc" title="Detect Current Location" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--accent-teal); padding: 0.75rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Description</label>
                        <textarea name="desc" required placeholder="Please describe the issue in detail..." style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; height: 100px; resize: none; outline: none;"></textarea>
                    </div>

                    <div style="padding: 1rem; border: 2px dashed var(--border-color); border-radius: 8px; text-align: center; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--accent-teal)'" onmouseout="this.style.borderColor='var(--border-color)'">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera" style="color: var(--text-muted); margin-bottom: 0.5rem;"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                         <p style="font-size: 0.8rem; color: var(--text-muted);">Click to upload photo or drag & drop</p>
                    </div>
                    
                    <button type="submit" style="width: 100%; background: var(--accent-teal); color: white; padding: 0.8rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; margin-top: 0.5rem; transition: all 0.3s ease;">Submit Report</button>
                </form>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        
        const detectBtn = document.getElementById('btn-detect-loc');
        const locInput = document.getElementById('report-location');

        detectBtn.onclick = async () => {
            detectBtn.style.opacity = '0.5';
            detectBtn.innerHTML = '<div class="loader" style="width:16px; height:16px; border-width:2px;"></div>';
            try {
                const pos = await getCurrentLocation();
                locInput.value = `Current Location (${pos.lat.toFixed(2)}, ${pos.lng.toFixed(2)})`;
                detectBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
            } catch (err) {
                console.error("Location error:", err);
                alert("Could not detect location. Please enter it manually.");
                detectBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
            }
            detectBtn.style.opacity = '1';
        };
        
        const form = document.getElementById('report-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing...";

            const formData = new FormData(form);
            let locationName = formData.get('location');

            // Fallback to location detection if empty
            if (!locationName) {
                try {
                    const pos = await getCurrentLocation();
                    locationName = `Current Location (${pos.lat.toFixed(2)}, ${pos.lng.toFixed(2)})`;
                } catch (err) {
                    locationName = "Undisclosed Location";
                }
            }
            
            const newReport = {
                id: Date.now(),
                status: 'pending',
                title: formData.get('title'),
                desc: formData.get('desc'),
                location: locationName,
                time: 'Just now',
                department: formData.get('category'),
                notes: '',
                logs: []
            };

            window.AwazApp.reportsData.unshift(newReport);
            
            // Persist to LocalStorage
            saveReports();

            // Success Feedback
            modalContainer.innerHTML = `
                <div class="modal-content animate-in" style="text-align: center; padding: 3rem;">
                    <div style="width: 64px; height: 64px; background: rgba(34, 197, 94, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Report Submitted!</h2>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Thank you for contributing. Our team will review the issue shortly.</p>
                    <button id="success-close" style="background: var(--accent-teal); color: white; padding: 0.75rem 2rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer;">Close</button>
                </div>
            `;

            document.getElementById('success-close').onclick = () => {
                modalContainer.classList.add('hidden');
                renderList();
            };
        };
    };

    renderList();

    // Event listeners
    document.getElementById('btn-new-report').onclick = showNewReportModal;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderList(btn.dataset.filter);
        };
    });

    // Styles for animations and manage-btn
    if (!document.getElementById('reports-extra-styles')) {
        const style = document.createElement('style');
        style.id = 'reports-extra-styles';
        style.innerHTML = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-in {
                animation: slideIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            .filter-btn {
                background: rgba(255,255,255,0.05);
                border: 1px solid var(--border-color);
                color: var(--text-muted);
                padding: 0.4rem 1.25rem;
                border-radius: 9999px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 0.85rem;
            }
            .filter-btn.active, .filter-btn:hover {
                color: var(--accent-teal);
                border-color: var(--accent-teal);
                background: rgba(20, 184, 166, 0.1);
            }
            .manage-btn:hover {
                background: var(--accent-teal) !important;
                border-color: var(--accent-teal) !important;
                color: white !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
            }
            #modal-close:hover {
                transform: rotate(90deg);
                color: var(--accent-teal);
            }
            input:focus, textarea:focus, select:focus {
                border-color: var(--accent-teal) !important;
                box-shadow: 0 0 10px rgba(20, 184, 166, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
};
