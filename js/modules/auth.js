window.AwazApp = window.AwazApp || {};

window.AwazApp.initAuth = (modalContainer) => {
    // Session Management
    const loadSession = () => {
        const saved = localStorage.getItem('awaz_user_session');
        if (saved) {
            try {
                window.AwazApp.currentUser = JSON.parse(saved);
                updateNavUI();
            } catch (e) {
                console.error("Failed to load user session:", e);
            }
        }
    };

    const saveSession = (user) => {
        window.AwazApp.currentUser = user;
        localStorage.setItem('awaz_user_session', JSON.stringify(user));
        updateNavUI();
    };

    const clearSession = () => {
        window.AwazApp.currentUser = null;
        localStorage.removeItem('awaz_user_session');
        updateNavUI();
        document.getElementById('nav-dashboard').click();
    };

    const updateNavUI = () => {
        const navLogin = document.getElementById('nav-login');
        if (!navLogin) return;

        if (window.AwazApp.currentUser) {
            navLogin.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                <span>Hi, ${window.AwazApp.currentUser.name.split(' ')[0]}</span>
            `;
            navLogin.title = "Click to Logout";
        } else {
            navLogin.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Login</span>
            `;
            navLogin.title = "Login";
        }
    };

    const showAuthModal = (view = 'login') => {
        if (window.AwazApp.currentUser && view === 'login') {
            if (confirm(`Do you want to logout, ${window.AwazApp.currentUser.name}?`)) {
                clearSession();
            }
            return;
        }

        modalContainer.classList.remove('hidden');
        if (view === 'login') renderLoginForm();
        else renderSignupForm();
    };

    const renderLoginForm = () => {
        modalContainer.innerHTML = `
            <div class="modal-content animate-in">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Welcome Back</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Sign in to report issues and track progress.</p>
                <form id="login-form">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Email Address</label>
                        <input type="email" name="email" required placeholder="admin@awaz.com" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Password</label>
                        <input type="password" name="password" required placeholder="••••••••" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                    </div>
                    <div id="login-error" style="color: #ef4444; font-size: 0.8rem; margin-bottom: 1rem; display: none; text-align: center;">Invalid email or password.</div>
                    <button type="submit" id="btn-login-submit" style="width: 100%; background: var(--accent-teal); color: white; padding: 0.75rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);">Sign In</button>
                </form>
                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
                    Don't have an account? <a href="#" id="go-to-signup" style="color: var(--accent-teal); text-decoration: none; font-weight: 600;">Join Awaz-e-Awam</a>
                </div>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        document.getElementById('go-to-signup').onclick = (e) => { e.preventDefault(); renderSignupForm(); };
        
        const form = document.getElementById('login-form');
        const errorMsg = document.getElementById('login-error');
        const submitBtn = document.getElementById('btn-login-submit');

        form.onsubmit = (e) => {
            e.preventDefault();
            errorMsg.style.display = 'none';
            submitBtn.innerText = "Verifying...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');

            const user = window.AwazApp.MOCK_USERS.find(u => u.email === email && u.password === password);

            setTimeout(() => {
                if (user) {
                    saveSession({ id: user.id, name: user.name, role: user.role, dept: user.dept });
                    modalContainer.classList.add('hidden');
                    alert(`Welcome back, ${user.name}!`);
                } else {
                    errorMsg.style.display = 'block';
                    submitBtn.innerText = "Sign In";
                    submitBtn.disabled = false;
                }
            }, 800);
        };
    };

    const renderSignupForm = () => {
        modalContainer.innerHTML = `
            <div class="modal-content animate-in">
                <button id="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Join the Community</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Create an account to track your submissions.</p>
                <form id="signup-form">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Email Address</label>
                        <input type="email" name="email" required placeholder="john@example.com" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted);">Password</label>
                        <input type="password" name="password" required placeholder="••••••••" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1rem; border-radius: 8px; outline: none;">
                    </div>
                    <div id="signup-error" style="color: #ef4444; font-size: 0.8rem; margin-bottom: 1rem; display: none; text-align: center;">Email already registered.</div>
                    <button type="submit" id="btn-signup-submit" style="width: 100%; background: var(--accent-teal); color: white; padding: 0.75rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);">Create Account</button>
                </form>
                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
                    Already have an account? <a href="#" id="go-to-login" style="color: var(--accent-teal); text-decoration: none; font-weight: 600;">Sign In</a>
                </div>
            </div>
        `;

        document.getElementById('modal-close').onclick = () => modalContainer.classList.add('hidden');
        document.getElementById('go-to-login').onclick = (e) => { e.preventDefault(); renderLoginForm(); };
        
        const form = document.getElementById('signup-form');
        const errorMsg = document.getElementById('signup-error');
        const submitBtn = document.getElementById('btn-signup-submit');

        form.onsubmit = (e) => {
            e.preventDefault();
            errorMsg.style.display = 'none';
            submitBtn.innerText = "Joining...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const existing = window.AwazApp.MOCK_USERS.find(u => u.email === email);

            setTimeout(() => {
                if (existing) {
                    errorMsg.style.display = 'block';
                    submitBtn.innerText = "Create Account";
                    submitBtn.disabled = false;
                } else {
                    const newUser = {
                        id: 'u' + (window.AwazApp.MOCK_USERS.length + 1),
                        name: name,
                        email: email,
                        password: password,
                        role: 'citizen',
                        dept: 'None'
                    };
                    
                    window.AwazApp.MOCK_USERS.push(newUser);
                    if (window.AwazApp.saveUsers) window.AwazApp.saveUsers();
                    
                    saveSession({ id: newUser.id, name: newUser.name, role: newUser.role, dept: newUser.dept });
                    modalContainer.classList.add('hidden');
                    alert(`Welcome to Awaz-e-Awam, ${name}!`);
                }
            }, 1000);
        };
    };

    loadSession();
    document.getElementById('nav-login').onclick = () => showAuthModal('login');
};
