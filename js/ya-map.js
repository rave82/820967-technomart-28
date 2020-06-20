var yaMap = null;
var COUNT_SHOW_MAP = 0;

function init()
{
    // Создание карты.
    yaMap = new ymaps.Map("map", {
        center: [59.9386,30.3231],
        zoom: 14,
        controls: []
    });
    yaMap.controls.add("zoomControl");
    
    var myPlacemark1 = new ymaps.Placemark([59.9386,30.3231], {
        // Свойства.
        // Содержимое иконки, балуна и хинта.
        iconContent: '',
        balloonContent: 'г. Санкт-Петербург, ул. Б. Конюшенная, д. 19/8',
        hintContent: 'Большая Конюшенная улица, 19/8',
        balloonContentHeader: '08:00 - 22:00',
        balloonContentFooter: '+7(812) 555-05-55'
    });
    yaMap.geoObjects.add(myPlacemark1);
    
    yaMap.container.fitToViewport();
}

function showPopupMap(e, obj)
{
    e.preventDefault();
    
    var modal = document.getElementById('modal-map');
    
    openPopup(modal);
    
    if(parseInt(COUNT_SHOW_MAP) == 0)
    {
        ++COUNT_SHOW_MAP;
        setTimeout(function()
        {
            ymaps.ready(init);
        }, 200);
    }
    else
    {
        yaMap.container.fitToViewport();
    }
}