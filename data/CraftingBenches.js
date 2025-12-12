const CraftingBenchesModule = {
    // 1. НАСТРОЙКИ СЛОЯ
    layerName: "Crafting Benches",

    // 2. ОПРЕДЕЛЕНИЯ ИКОНОК
    icons: {
        Crafting_Bench: L.icon({ iconUrl: 'icons/Crafting_bench/bench.png', iconSize: [50, 50], iconAnchor: [25, 50], }),
    },

    // 3. МАССИВ ДАННЫХ
    data: [
        { name: "Crafting bench", coords: [2933, 1921], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [3537, 2529], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [2832, 634], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [2827, 669], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [1965, 2098], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [645, 2066], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [645, 2066], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [533, 1814], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [1197, 1971], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [500, 1804], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [575, 1805], type: "Crafting_Bench", description: "Crafting_bench" },
        { name: "Crafting bench", coords: [2640, 1656], type: "Crafting_Bench", description: "Crafting_bench" },
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