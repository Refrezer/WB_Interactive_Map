const LocationsModule = { // <-- Переименовано с CreatureModule
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Locations", // <-- Обновлено имя слоя

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        // Мы можем использовать иконку спавна тварей, но переименуем ее для смысла
        Dungeon: L.icon({ iconUrl: 'icons/Locations/dungeon.png', iconSize: [50, 50], iconAnchor: [25, 50], }), // <-- Имя типа и иконка
        Location: L.icon({ iconUrl: 'icons/Locations/location.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Settlement: L.icon({ iconUrl: 'icons/Locations/Settlement.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Abandoned Prison Facility", coords: [558, 2737], type: "Location", description: "An old abandoned prison. Many enemies." },
        { name: "Tombstone", coords: [1555, 1774], type: "Location", description: "Abandoned Settlement. Captured by outlaw." },
        { name: "Petrolheads Radio Station", coords: [2215, 2601], type: "Location", description: "Radio Station. Captured by outlaw." },
        { name: "MC Dowell", coords: [1956, 2081], type: "Settlement", description: "Settlement." },
        { name: "Sunnyvale Estates", coords: [3081, 1240], type: "Settlement", description: "Settlement." },
        { name: "Pittsdale", coords: [547, 1812], type: "Settlement", description: "Settlement." },
        { name: "Phoenix", coords: [3113, 2197], type: "Settlement", description: "Settlement." },
        { name: "DEFCON Building", coords: [1641, 2872], type: "Dungeon", description: "Dungeon. 2 crates of ancient loot inside." },
        { name: "Whitehills Complex", coords: [1784, 1427], type: "Dungeon", description: "Dungeon. 2 crates of ancient loot inside." },
        { name: "Ultra Value Mart", coords: [1839, 2613], type: "Dungeon", description: "Dungeon. 2 crates of ancient loot inside." },
        { name: "RadGuard Admin", coords: [1704, 2693], type: "Dungeon", description: "Dungeon. 1 crate of ancient loot inside." },
        { name: "Manhole Cover", coords: [1943, 2103], type: "Dungeon", description: "Dungeon. 2 crates of ancient loot inside." },

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