window.AwazApp = window.AwazApp || {};
window.AwazApp.initAuth = (modalContainer) => {
    const showLogin = () => {
        modalContainer.classList.remove('hidden');
        modalContainer.innerHTML = `
            <div class="modal-content animate-in">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Welcome Back</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Sign in to report issues and track progress.</p>
                <form id="login-form">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Email Address</label>
                        <input type="email" placeholder="name@example.com" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: white; padding: 0.75rem 1rem; border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Password</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: white; padding: 0.75rem 1rem; border-radius: 8px;">
                    </div>
                    <button type="submit" style="width: 100%; background: var(--accent-teal); color: white; padding: 0.75rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer;">Sign In</button>
                </form>
                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
                    Don't have an account? <a href="#" style="color: var(--accent-teal); text-decoration: none;">Join Awaz-e-Awam</a>
                </div>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        document.getElementById('login-form').onsubmit = (e) => {
            e.preventDefault();
            alert('Simulation: Logged in successfully!');
            modalContainer.classList.add('hidden');
        };
    };

    document.getElementById('nav-login').onclick = showLogin;
};
