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
        { name: "Petrolheads Radio Station", coords: [2353, 2694], type: "Location", description: "Radio Station. Captured by PetrolHeads." },
        { name: "Quantum Cola Plant", coords: [262, 1749], type: "Location", description: "Quantum Cola Production Plant" },
        { name: "Dregmir's home base.", coords: [512, 1284], type: "Location", description: "The main mutant campsite" },
        { name: "Scottsdale Motel", coords: [1991, 576], type: "Location", description: "Motel captured by outlaw." },
        { name: "Old Mesa Evac Route", coords: [774, 1649], type: "Location", description: "A small abandoned town" },
        { name: "Military Command Headquarters", coords: [774, 1649], type: "Location", description: "Ruined Military Command Offices" },
        { name: "Pittsdale Station", coords: [547, 1957], type: "Location", description: "Ruined Train Station" },
        { name: "Med-Co Office", coords: [470, 3179], type: "Location", description: "Ruined Med-Co Office" },
        { name: "The Refuge", coords: [709, 3074], type: "Location", description: "The Refuge base" },
        { name: "Mac'Gain Farmstead", coords: [1610, 3415], type: "Location", description: "Mac'Gain Farmstead, overrun by Outlaws" },
        { name: "Red Ridge Array", coords: [583, 1450], type: "Location", description: "Destroyed Military Camp" },
        { name: "Highway Patrol Camp", coords: [904, 2665], type: "Location", description: "Abandoned Small Police Station" },
        { name: "Phoenix Transit Transportation Depot", coords: [649, 2356], type: "Location", description: "Bus Station" },
        { name: "Supply Depot", coords: [365, 2930], type: "Location", description: "Abandoned Train Station" },
        { name: "Transformer Station", coords: [939, 2817], type: "Location", description: "Destroyed Transformer Station" },
        { name: "Abandoned car park", coords: [778, 2218], type: "Location", description: "Abandoned car park" },
        { name: "Sniper Point", coords: [1092, 1932], type: "Location", description: "Snipers hide" },
        { name: "Satcom e1-0", coords: [1097, 2101], type: "Location", description: "Abandoned Military Complex" },
        { name: "Med-Co Labs", coords: [2039, 3034], type: "Location", description: "Abandoned labs" },
        { name: "Cheese-ark", coords: [1246, 1148], type: "Location", description: "Cheese" },
        { name: "Whitehills Base", coords: [2104, 1379], type: "Location", description: "Abandoned Military Base" },
        { name: "Abandoned Railway Yard", coords: [2735, 935], type: "Location", description: "Abandoned Railway Yard" },
        { name: "Solaris array 2", coords: [1967, 3340], type: "Location", description: "Abandoned Military Camp" },
        { name: "Refuge bunker", coords: [2214, 2599], type: "Location", description: "Refuge bunker" },
        { name: "Abandoned Bunker", coords: [2616, 2558], type: "Location", description: "Abandoned Ark  Bunker" },
        { name: "Satan's Gullet", coords: [1604, 2013], type: "Location", description: "Nuclear Crater" },
        { name: "Ransacked Shack", coords: [2872, 1209], type: "Location", description: "Wanderers' Camp near the Antenna" },
        { name: "Phoenix FM.HQ", coords: [2323, 563], type: "Location", description: "Radio Station." },
        { name: "Bowl-o-rama", coords: [2647, 407], type: "Location", description: "Bowling Club." },
        { name: "New Tombstone Dregmir Camp", coords: [1763, 1894], type: "Location", description: "Dregmir Camp" },
        { name: "New Phoenix Dregmir Camp", coords: [1992, 773], type: "Location", description: "Dregmir Camp" },
        { name: "1", coords: [0, 0], type: "Location", description: "1" },
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