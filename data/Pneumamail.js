const PneumamailModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Pneumamail",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        Mail_Service: L.icon({ iconUrl: 'icons/Pneumamail/Mail.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Drop_off_Point: L.icon({ iconUrl: 'icons/Pneumamail/Recieve.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Mail service", coords: [1924, 2072], type: "Mail_Service", description: "Job - Mail service" },
        { name: "Mail service", coords: [3174, 2064], type: "Mail_Service", description: "Job - Mail service" },
        { name: "Drop-off point", coords: [1645, 3649], type: "Drop_off_Point", description: "Package Drop-off point" },
        { name: "Drop-off point", coords: [872, 3205], type: "Drop_off_Point", description: "Package Drop-off point" },
        { name: "Drop-off point", coords: [1473, 354], type: "Drop_off_Point", description: "Package Drop-off point" },

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