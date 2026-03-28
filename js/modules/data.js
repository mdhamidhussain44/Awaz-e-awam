window.AwazApp = window.AwazApp || {};

// Initial Mock Data Store
// This serves as the 'Default State' of the application
window.AwazApp.INITIAL_REPORTS_DATA = [
    { id: 1, status: 'pending', title: 'Large Pot Hole on Main Road', desc: 'Significant hazard near Ameerpet intersection. Traffic slowed down.', location: 'Ameerpet', time: '2 hours ago', department: 'Public Works', notes: '', logs: [] },
    { id: 2, status: 'in-progress', title: 'Broken Street Light', desc: 'Entire block is dark near Banjara Hills, causing safety concerns.', location: 'Banjara Hills', time: '5 hours ago', department: 'Electricity Dept', notes: 'Team dispatched to investigate.', logs: [] },
    { id: 3, status: 'resolved', title: 'Overflowing Garbage Bin', desc: 'Waste management team has cleared the area near Jubilee Hills.', location: 'Jubilee Hills', time: '1 day ago', department: 'Sanitation', notes: 'Cleared at 8 AM.', logs: [] },
    { id: 4, status: 'pending', title: 'Water Leakage', desc: 'Main water line burst in Madhapur, causing flood in the street.', location: 'Madhapur', time: '30 mins ago', department: 'Water Board', notes: '', logs: [] },
    { id: 5, status: 'resolved', title: 'Traffic Signal Malfunction', desc: 'Lights fixed at the Panjagutta roundabout.', location: 'Panjagutta', time: '3 hours ago', department: 'Traffic Control', notes: 'Signal relay replaced.', logs: [] },
    { id: 6, status: 'in-progress', title: 'Illegal Dumping', desc: 'Piles of construction waste blocking the sidewalk in Somajiguda.', location: 'Somajiguda', time: '8 hours ago', department: 'Sanitation', notes: 'Truck scheduled for pickup tomorrow.', logs: [] }
];
