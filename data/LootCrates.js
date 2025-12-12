const LootCratesModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Valuable loot",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        Loot_Ancient: L.icon({ iconUrl: 'icons/ancient.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Radite: L.icon({ iconUrl: 'icons/radite.png', iconSize: [50, 50], iconAnchor: [25, 50], })
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Ancient Сrate", coords: [1200, 3500], type: "Loot_Ancient", description: "Ancient Junk" },
        { name: "Ancient Сrate", coords: [3550, 2604], type: "Loot_Ancient", description: "Ancient Junk" },
        { name: "Ancient Сrate", coords: [2078, 1505], type: "Loot_Ancient", description: "Ancient Junk" },
        { name: "Radite Crate", coords: [488, 2650], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [484, 2675], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [2085, 2526], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [2346, 2691], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [2348, 2706], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [1078, 2067], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [1279, 3273], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [994, 3393], type: "Radite", description: "Radite inside" },
        { name: "Radite Crate", coords: [889, 1437], type: "Radite", description: "Radite inside" },
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