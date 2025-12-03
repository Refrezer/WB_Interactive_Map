const CapturePointsModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Capture Points",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        Waste_coins: L.icon({ iconUrl: 'icons/Points/Wastecoins.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Manpower: L.icon({ iconUrl: 'icons/Points/Manpower.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Electricity : L.icon({ iconUrl: 'icons/Points/Dam.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        HeavySteel : L.icon({ iconUrl: 'icons/Points/HeavySteel.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Oil: L.icon({ iconUrl: 'icons/Points/Oil.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Circuitry: L.icon({ iconUrl: 'icons/Points/Circuitry.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Wood: L.icon({ iconUrl: 'icons/Points/Wood.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Prison", coords: [557, 2798], type: "Manpower", description: "Gain Manpower" },
        { name: "Apache Junction", coords: [1263, 2476], type: "Manpower", description: "Gain Manpower" },
        { name: "Casa Grande Motel", coords: [898, 1766], type: "Manpower", description: "Gain Manpower" },
        { name: "Scavengers Keep", coords: [2567, 3107], type: "Manpower", description: "Gain Manpower" },
        { name: "FROG-2 Topside", coords: [2216, 3513], type: "Manpower", description: "Gain Manpower" },
        { name: "ARPR Radio Station", coords: [1800, 1524], type: "Manpower", description: "Gain Manpower" },
        { name: "Airport Capture Point", coords: [1303, 2967], type: "Waste_coins", description: "Gain Waste Coins" },
        { name: "Gaxon Water Plant", coords: [2556, 715], type: "Waste_coins", description: "Gain Waste Coins" },
        { name: "Phoenix General Hospital", coords: [3219, 2780], type: "Waste_coins", description: "Gain Waste Coins" },
        { name: "Solance Tower", coords: [3377, 2644], type: "Waste_coins", description: "Gain Waste Coins" },
        { name: "Ultra Value Mart", coords: [1846, 2623], type: "Waste_coins", description: "Gain Waste Coins" },
        { name: "ARC-Fusion Gas Station", coords: [1505, 322], type: "Oil", description: "Gain Oil" },
        { name: "The Dam", coords: [1014, 265], type: "Electricity", description: "Producing Power" },
        { name: "Warehouse", coords: [1576, 1283], type: "HeavySteel", description: "Gain Heavy Steel" },
        { name: "Whitehills base", coords: [2100, 1458], type: "Circuitry", description: "Gain Heavy Steel" },
        { name: "Roosevelt National Park", coords: [1465, 677], type: "Wood", description: "Gain Wood" },
    ],

    createLayer: function(allIcons) {
        const layers = {};

        this.data.forEach(poi => {
            const typeKey = poi.type;

            // Если иконка не определена в allIcons, она берется из этого модуля (this.icons)
            // Но мы полагаемся на allIcons, который собирается в script.js
            const icon = allIcons[typeKey] || this.icons[typeKey];

            if (!layers[typeKey]) {
                layers[typeKey] = L.layerGroup();
            }

            if (icon) {
                const marker = L.marker(poi.coords, {icon: icon})
                    .bindPopup(`<h3>${poi.name}</h3><p>${poi.description}</p>`);

                layers[typeKey].addLayer(marker);
            } else {
                 console.error(`Missing icon for type: ${typeKey} in CapturePointsModule.`);
            }
        });
        return layers;
    }
};