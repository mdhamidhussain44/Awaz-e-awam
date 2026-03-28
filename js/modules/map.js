window.AwazApp = window.AwazApp || {};
window.AwazApp.renderMap = (container) => {
    container.innerHTML = `
        <header class="map-header">
            <div>Interactive Urban Map</div>
            <div style="font-size: 0.8rem; color: var(--accent-teal);">Click to simulate report pins</div>
        </header>
        <div class="map-wrapper" style="position: relative; flex-grow: 1; min-height: 500px; display: flex; align-items: center; justify-content: center; background: #000;">
            <canvas id="map-canvas" style="width: 100%; height: 100%; background: #0f172a;"></canvas>
            <div id="map-tooltip" style="position: absolute; pointer-events: none; visibility: hidden; background: rgba(15, 23, 42, 0.95); border: 1px solid var(--accent-teal); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; z-index: 10;">
                <h4 id="tooltip-title"></h4>
                <p id="tooltip-desc" style="font-size: 0.8rem; color: var(--text-muted);"></p>
            </div>
        </div>
    `;

    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('map-tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipDesc = document.getElementById('tooltip-desc');

    let w, h;
    const pins = [
        { x: 200, y: 150, title: 'Road Damage', desc: 'Ameerpet Cross Road', color: '#eab308' },
        { x: 450, y: 320, title: 'Water Leak', desc: 'Madhapur Metro Pillar', color: '#3b82f6' },
        { x: 600, y: 120, title: 'Broken Light', desc: 'Banjara Hills Rd No. 1', color: '#eab308' },
        { x: 120, y: 400, title: 'Sanitation Issue', desc: 'Jubilee Hills Check Post', color: '#22c55e' }
    ];

    const resize = () => {
        const rect = canvas.parentNode.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        w = canvas.width;
        h = canvas.height;
        draw();
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, h);
            ctx.stroke();
        }
        for (let i = 0; i < h; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
        }

        // Draw pins
        pins.forEach(pin => {
            // Glow
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(pin.x, pin.y, 0, pin.x, pin.y, 15);
            gradient.addColorStop(0, pin.color + '66');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.arc(pin.x, pin.y, 15, 0, Math.PI * 2);
            ctx.fill();

            // Center
            ctx.beginPath();
            ctx.fillStyle = pin.color;
            ctx.arc(pin.x, pin.y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let found = false;
        pins.forEach(pin => {
            const dist = Math.sqrt((mouseX - pin.x) ** 2 + (mouseY - pin.y) ** 2);
            if (dist < 15) {
                tooltip.style.visibility = 'visible';
                tooltip.style.left = (pin.x + 10) + 'px';
                tooltip.style.top = (pin.y - 40) + 'px';
                tooltipTitle.innerText = pin.title;
                tooltipDesc.innerText = pin.desc;
                found = true;
                canvas.style.cursor = 'pointer';
            }
        });

        if (!found) {
            tooltip.style.visibility = 'hidden';
            canvas.style.cursor = 'crosshair';
        }
    });

    window.addEventListener('resize', resize);
    resize();
};
