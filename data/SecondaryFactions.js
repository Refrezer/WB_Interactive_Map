const SecondaryFactionsModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Secondary Factions",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        RRA: L.icon({ iconUrl: 'icons/SecondaryFactions/RRA.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        The_Monarchs: L.icon({ iconUrl: 'icons/SecondaryFactions/Monarchs.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Arizona_Rangers: L.icon({ iconUrl: 'icons/SecondaryFactions/AR.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Ponderosa_watch: L.icon({ iconUrl: 'icons/SecondaryFactions/PW.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Petrolheads: L.icon({ iconUrl: 'icons/SecondaryFactions/ph.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Re-organized Red Army", coords: [653, 2041], type: "RRA", description: "RRa Main Base." },
        { name: "The Monarchs", coords: [3037, 1906], type: "The_Monarchs", description: "The Monarchs Main Base." },
        { name: "Arizona Rangers", coords: [1668, 838], type: "Arizona_Rangers", description: "Arizona Rangers Main Base." },
        { name: "Ponderosa Watch", coords: [570, 1778], type: "Ponderosa_watch", description: "Ponderosa Watch Main Base." },
        { name: "Petrolheads", coords: [1209, 1935], type: "Petrolheads", description: "Petrolheads Main Base." },
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