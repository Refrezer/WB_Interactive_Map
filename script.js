// --- 0. КОНФИГУРАЦИЯ ---
const MODULES = [
    typeof MajorFactionsModule !== 'undefined' ? MajorFactionsModule : null,
    typeof SecondaryFactionsModule !== 'undefined' ? SecondaryFactionsModule : null,
    typeof CapturePointsModule !== 'undefined' ? CapturePointsModule : null,
    typeof CraftingBenchesModule !== 'undefined' ? CraftingBenchesModule : null,
    typeof MerchantsModule !== 'undefined' ? MerchantsModule : null,
    typeof PneumamailModule !== 'undefined' ? PneumamailModule : null,
    typeof ResourceModule !== 'undefined' ? ResourceModule : null,
    typeof LootCratesModule !== 'undefined' ? LootCratesModule : null,
    typeof LocationsModule !== 'undefined' ? LocationsModule : (typeof LocationModule !== 'undefined' ? LocationModule : null)
];

const ACTIVE_MODULES = MODULES.filter(m => m !== null);

// --- 1. НАСТРОЙКИ КАРТЫ ---
const MAP_WIDTH = 4096;
const MAP_HEIGHT = 4096;
const IMAGE_FILE = 'images/WB_THEMAP_4K.png';
const bounds = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2, maxZoom: 2, zoomDelta: 0.5, maxBoundsViscosity: 1.0, zoomControl: false
});

L.control.zoom({ position: 'topleft' }).addTo(map);
L.imageOverlay(IMAGE_FILE, bounds).addTo(map);
map.setMaxBounds(bounds);
map.fitBounds(bounds);

// --- 3. СБОРКА ДАННЫХ ---
const allIcons = {};
const finalLayers = [];

ACTIVE_MODULES.forEach(module => {
    if (module.icons) Object.assign(allIcons, module.icons);
});

ACTIVE_MODULES.forEach(module => {
    if (!module.createLayer) return;

    const layerGroups = module.createLayer(allIcons);

    Object.keys(layerGroups).forEach(typeKey => {
        const layerGroup = layerGroups[typeKey];
        layerGroup.addTo(map);

        let iconPath = '';
        if (allIcons[typeKey] && allIcons[typeKey].options) {
            iconPath = allIcons[typeKey].options.iconUrl;
        }

        // --- ИСПРАВЛЕНИЕ ТЕКСТА (СЛОВАРЬ ЗАМЕН) ---
        let labelText = typeKey;
        const SPECIAL_NAMES = {
            "USPA": "USPA",
            "CFR": "CFR",
            "NP": "NP",
            "RRA": "RRA",
            "ARC": "ARC-Tech",
            "Arc": "ARC-Tech",
            "ArcTech": "ARC-Tech",
            "Manpower": "Manpower"
        };

        if (SPECIAL_NAMES[typeKey]) {
            labelText = SPECIAL_NAMES[typeKey];
        } else {
            labelText = typeKey
                .replace(/([A-Z])/g, ' $1')
                .replace(/_/g, ' ')
                .trim();
        }

        const groupName = module.layerName ? module.layerName : 'OTHER';

        finalLayers.push({
            groupName: groupName,
            typeKey: typeKey,
            label: labelText,
            iconPath: iconPath,
            layer: layerGroup
        });
    });
});

// --- 4. РЕНДЕРИНГ БОКОВОЙ ПАНЕЛИ ---
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    // HEADER
    const header = document.createElement('div');
    header.className = 'sidebar-header';
    header.innerHTML = '<h1>WB MAP</h1>';
    sidebar.appendChild(header);

    // CONTENT
    const content = document.createElement('div');
    content.className = 'sidebar-content';
    sidebar.appendChild(content);

    // --- ЛОГИКА СОРТИРОВКИ ---
    const ORDER_LIST = [
        "Major faction", "Secondary faction", "Points", "Locations",
        "Loot", "Merchants", "Crafting benches", "Pneumamail",
    ];

    function getSortIndex(groupName) {
        const normalizedGroup = groupName.toLowerCase();
        const index = ORDER_LIST.findIndex(orderItem => normalizedGroup.includes(orderItem.toLowerCase()));
        return index === -1 ? 999 : index;
    }

    // 1. Группируем слои
    const groups = {};
    finalLayers.forEach(item => {
        if (!groups[item.groupName]) {
            groups[item.groupName] = [];
        }
        groups[item.groupName].push(item);
    });

    // 2. Сортируем названия групп
    const sortedGroupNames = Object.keys(groups).sort((a, b) => {
        return getSortIndex(a) - getSortIndex(b);
    });

    // 3. Выводим группы
    sortedGroupNames.forEach(groupName => {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-header';
        groupHeader.innerHTML = `<h2>${groupName.replace(/_/g, ' ')}</h2>`;
        content.appendChild(groupHeader);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'items-grid';

        const groupInputs = [];

        groups[groupName].forEach(item => {
            const label = document.createElement('label');
            label.className = 'filter-item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = true;

            groupInputs.push({ input: input, layer: item.layer });

            input.addEventListener('change', () => {
                if (input.checked) map.addLayer(item.layer);
                else map.removeLayer(item.layer);
            });

            if (item.iconPath) {
                const img = document.createElement('img');
                img.src = item.iconPath;
                label.appendChild(img);
            }

            const span = document.createElement('span');
            span.innerText = item.label;

            label.prepend(input);
            label.appendChild(span);
            gridContainer.appendChild(label);
        });

        content.appendChild(gridContainer);

        // ЛОГИКА КЛИКА ПО ЗАГОЛОВКУ ГРУППЫ (ВКЛ/ВЫКЛ ВСЕ)
        groupHeader.addEventListener('click', () => {
            const allChecked = groupInputs.every(obj => obj.input.checked);
            const targetState = !allChecked;

            groupInputs.forEach(obj => {
                obj.input.checked = targetState;
                if (targetState) {
                    map.addLayer(obj.layer);
                } else {
                    map.removeLayer(obj.layer);
                }
            });
        });
    });

    // FOOTER
    const footer = document.createElement('div');
    footer.className = 'sidebar-footer';
    footer.innerHTML = '<p>Made by Refrezer(Ran_joi)</p>';
    sidebar.appendChild(footer);
}

// --- 5. МОБИЛЬНАЯ ОПТИМИЗАЦИЯ (Скрытие/Показ меню) ---
function initMobileToggle() {
    const mapContainer = document.querySelector('.map-container');
    const sidebar = document.getElementById('sidebar');

    if (!mapContainer || !sidebar) return;

    // 1. Вставляем кнопку
    const toggleButton = document.createElement('div');
    toggleButton.className = 'menu-toggle-button';
    toggleButton.innerHTML = 'FILTERS';

    // Вставляем кнопку на карту
    mapContainer.appendChild(toggleButton);

    // 2. Логика переключения
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('menu-open');

        // Меняем текст кнопки для UX
        if (sidebar.classList.contains('menu-open')) {
            toggleButton.innerText = 'СКРЫТЬ';
        } else {
            toggleButton.innerText = 'FILTERS';
        }
    });

    // 3. Закрытие меню при клике на карту (вне меню), если оно открыто
    map.on('click', function() {
        if (sidebar.classList.contains('menu-open')) {
            sidebar.classList.remove('menu-open');
            toggleButton.innerText = 'FILTERS';
        }
    });
}

// Запуск инициализации
initSidebar();
initMobileToggle();

map.on('click', function(e) {
    console.log(`[${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)}]`);
});