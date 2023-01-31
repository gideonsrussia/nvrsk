ymaps.ready(init);

async function getCoords(url) {
  const request = new Request(url);
  const response = await fetch(request);
  const coordsText = await response.text();
  return JSON.parse(coordsText);
}

async function init() {
    const myMap = new ymaps.Map("map", {
            center: [44.72, 37.75],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        });
    
    const coords = await getCoords("coords.json");

    // Создаем многоугольник, используя вспомогательный класс Polygon.
    const east = new ymaps.Polygon(coords.east, {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        hintContent: "Восточный район"
    }, {
        // Задаем опции геообъекта.
        // Цвет заливки.
        fillColor: '#00ff80',
        // Ширина обводки.
        strokeWidth: .5,
        strokeColor: '#000000',
        // Общая прозрачность (как для заливки, так и для обводки).
        opacity: 0.35,
    });

    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(east);
}
