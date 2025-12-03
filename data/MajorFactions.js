const MajorFactionsModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Major Factions",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        CFR: L.icon({ iconUrl: 'icons/MajorFaction/cfr.png', iconSize: [80, 80], iconAnchor: [40, 80], }),
        USPA: L.icon({ iconUrl: 'icons/MajorFaction/USPA.png', iconSize: [80, 80], iconAnchor: [40, 80], }),
        NP: L.icon({ iconUrl: 'icons/MajorFaction/NP.png', iconSize: [80, 80], iconAnchor: [40, 80], }),
        ARC: L.icon({ iconUrl: 'icons/MajorFaction/ART.png', iconSize:[80, 80], iconAnchor: [40, 80], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Cascadian Federal Rebuplic", coords: [2913, 612], type: "CFR", description: "CFR Main Base." },
        { name: "U.S. Provisional Authority", coords: [900, 3010], type: "USPA", description: "USPA Main Base" },
        { name: "New Phoenix", coords: [3097, 2093], type: "NP", description: "New Phoenix Main Base." },
        { name: "Ark Technologies Inc.)", coords: [2323, 3087], type: "ARC", description: "Ark Technologies Inc. Main Base" }
        ],

    createLayer: function(allIcons) {
        const layers = {};

        this.data.forEach(poi => {
            const typeKey = poi.type;
            const icon = allIcons[typeKey];

            if (!layers[typeKey]) {

                layers[typeKey] = L.layerGroup();
            }

            if (icon) {
                const marker = L.marker(poi.coords, {icon: icon})

                    .bindPopup(`<h3>${poi.name}</h3><p>${poi.description}</p>`);

                layers[typeKey].addLayer(marker);
            }
        });
        return layers;
    }
};