window.AwazApp = window.AwazApp || {};

// Initial Mock User Database (Default)
const DEFAULT_USERS = [
    { 
        id: 'u1', 
        name: 'Admin User', 
        email: 'admin@awaz.com', 
        password: 'admin123', 
        role: 'admin', 
        dept: 'All' 
    },
    { 
        id: 'u2', 
        name: 'Officer Naresh', 
        email: 'naresh@awaz.com', 
        password: 'hyderabad2024', 
        role: 'officer', 
        dept: 'Public Works' 
    },
    { 
        id: 'u3', 
        name: 'Officer Hamid', 
        email: 'hamid@awaz.com', 
        password: 'hamid123', 
        role: 'officer', 
        dept: 'Sanitation' 
    }
];

// Persistence Logic for User Database
window.AwazApp.loadUsers = () => {
    const saved = localStorage.getItem('awaz_users_db');
    if (saved) {
        try {
            window.AwazApp.MOCK_USERS = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse user database:", e);
            window.AwazApp.MOCK_USERS = [...DEFAULT_USERS];
        }
    } else {
        window.AwazApp.MOCK_USERS = [...DEFAULT_USERS];
        window.AwazApp.saveUsers();
    }
};

window.AwazApp.saveUsers = () => {
    localStorage.setItem('awaz_users_db', JSON.stringify(window.AwazApp.MOCK_USERS));
};

// Initial Load
window.AwazApp.loadUsers();
