window.AwazApp = window.AwazApp || {};

window.AwazApp.renderMap = (container) => {
    container.innerHTML = `
        <header class="map-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                <div style="font-weight: 600;">Ameerpet, Hyderabad</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--accent-teal); background: rgba(20, 184, 166, 0.1); padding: 0.25rem 0.75rem; border-radius: 999px;">Live Urban Grid</div>
        </header>
        <div class="map-wrapper" style="position: relative; flex-grow: 1; min-height: 500px;">
            <div id="map-container"></div>
        </div>
    `;

    // Coordinates for Ameerpet, Hyderabad
    const ameerpetCoords = [17.4375, 78.4485];
    
    // Initialize Leaflet map
    // We delay slightly to ensure the container is fully rendered in the DOM
    setTimeout(() => {
        const map = L.map('map-container').setView(ameerpetCoords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Simulated issues mapped to real coordinates around Ameerpet
        const mapPins = [
            { coords: [17.4395, 78.4485], title: 'Road Damage', desc: 'Major pothole near Ameerpet Metro Station.', status: 'pending', color: '#eab308' },
            { coords: [17.4355, 78.4445], title: 'Water Leak', desc: 'Main pipe burst near Mythrivanam.', status: 'in-progress', color: '#3b82f6' },
            { coords: [17.4415, 78.4525], title: 'Broken Light', desc: 'Street light out on BK Guda Road.', status: 'pending', color: '#eab308' },
            { coords: [17.4325, 78.4485], title: 'Overflowing Bin', desc: 'Sanitation issue near Big Bazaar.', status: 'resolved', color: '#22c55e' }
        ];

        mapPins.forEach(pin => {
            const marker = L.circleMarker(pin.coords, {
                radius: 8,
                fillColor: pin.color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <div style="color: white;">
                    <strong style="color: var(--accent-teal); display: block; margin-bottom: 4px;">${pin.title}</strong>
                    <p style="font-size: 0.8rem; margin: 0; opacity: 0.8;">${pin.desc}</p>
                    <span style="display: inline-block; margin-top: 8px; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: ${pin.color}">${pin.status}</span>
                </div>
            `);
        });

        // Trigger map resize to fix gray tile issues in SPAs
        setTimeout(() => map.invalidateSize(), 100);
    }, 100);
};
