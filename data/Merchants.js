const MerchantsModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Merchants",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        Doctors: L.icon({ iconUrl: 'icons/Merchants/doc.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Gunsmith: L.icon({ iconUrl: 'icons/Merchants/gun.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Scrap_Buyer: L.icon({ iconUrl: 'icons/Merchants/sb.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Ancient_Scrap_Buyer: L.icon({ iconUrl: 'icons/Merchants/asb.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
        Radite_Buyer: L.icon({ iconUrl: 'icons/Merchants/radie.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Doctor", coords: [2907, 2039], type: "Doctors", description: "Sells medicines" },
        { name: "Doctor", coords: [2681, 2028], type: "Doctors", description: "Sells medicines" },
        { name: "Doctor", coords: [546, 1824], type: "Doctors", description: "Sells medicines" },
        { name: "Doctor", coords: [536, 1827], type: "Doctors", description: "Sells medicines" },
        { name: "Gunsmith", coords: [1982, 2081], type: "Gunsmith", description: "Sell firearm" },
        { name: "Gunsmith", coords: [2681, 2062], type: "Gunsmith", description: "Sell firearm" },
        { name: "Gunsmith", coords: [523, 1782], type: "Gunsmith", description: "Sell firearm" },
        { name: "Scrap Buyer", coords: [1976, 2076], type: "Scrap_Buyer", description: "Buying scrap" },
        { name: "Scrap Buyer", coords: [2940, 2068], type: "Scrap_Buyer", description: "Buying scrap" },
        { name: "Scrap Buyer", coords: [2660, 2010], type: "Scrap_Buyer", description: "Buying scrap" },
        { name: "Ancient scrap Buyer", coords: [2939, 2086], type: "Ancient_Scrap_Buyer", description: "Buying ancient scrap" },
        { name: "Radite buyer", coords: [2660, 2048], type: "Radite_Buyer", description: "Buying radite" },
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