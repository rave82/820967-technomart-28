function addClassActive(e, obj)
{
    e.preventDefault();
    
    obj.parentNode.classList.add(obj.getAttribute('data-class-active'));
}

function removeClassActive(e, obj)
{
    e.preventDefault();
    
    obj.parentNode.classList.remove(obj.getAttribute('data-class-active'));
}

/*function catalogItemShowButton(e, obj)
{
    if(!obj.classList.contains('show-btn'))
    {
        obj.classList.add('show-btn');
    }
    else
    {
        obj.classList.remove('show-btn');
    }
}*/

function filterCheckedParam(e, obj)
{
    e.preventDefault();
    
    if(obj.classList.contains('disabled'))
    {
        return false;
    }
    
    if(obj.classList.contains('radio'))
    {
        var rbtn = obj.parentNode.parentNode.querySelector('label.checked');
        if(rbtn != undefined)
        {
            rbtn.classList.remove('checked');
        }
        obj.classList.add('checked');
    }
    else
    {
        if(!obj.classList.contains('checked'))
        {
            obj.classList.add('checked');
        }
        else
        {
            obj.classList.remove('checked');
        }
    }
}

function initRange()
{
    var form_filter = document.getElementById('form-filter');
    
    if(form_filter != undefined)
    {
        var sliders = form_filter.querySelectorAll('.filter-range');
        if(sliders && sliders.length > 0)
        {
            var slider = false, snapValues = [];
            
            sliders.forEach(function(range_container)
            {
                slider = range_container.querySelector('.filter-slider');
                if(slider)
                {
                    noUiSlider.create(slider, {
                        start: [parseInt(slider.getAttribute('data-min-start')), parseInt(slider.getAttribute('data-max-start'))],
                        connect: true,
                        step:1,
                        range: {
                            'min': parseInt(slider.getAttribute('data-min')),
                            'max': parseInt(slider.getAttribute('data-max'))
                        }
                    });

                    snapValues = [range_container.querySelector('.range-value-start'), range_container.querySelector('.range-value-end')];
                    slider.noUiSlider.on('update', function (values, handle) {
                        //snapValues[handle].innerHTML = parseInt(values[handle]);
                        snapValues[handle].value = parseInt(values[handle]);
                    });
                    
                    snapValues[0].addEventListener('change', function () {
                        slider.noUiSlider.set([this.value, null]);
                    });
                    snapValues[1].addEventListener('change', function () {
                        slider.noUiSlider.set([null, this.value]);
                    });
                }
            });
        }
    }
}

function toggleTabContent(e, obj)
{
    e.preventDefault();
    
    var parent = obj.parentNode;
    var class_active = parent.getAttribute('data-class-active');
    var tab_content_id = obj.getAttribute('data-tab-id').toString();
    var tabs_container = document.getElementById(parent.getAttribute('data-tabs-container-id'));
    var btn_active = parent.querySelector('.'+class_active);
    var children = tabs_container.querySelectorAll(':scope > .tab-content');
    
    btn_active.classList.remove(class_active);
    obj.classList.add(class_active);
    children.forEach(function(tab_content)
    {
        tab_content.classList.add('hidden');
        if(tab_content.id.toString() == tab_content_id)
        {
            tab_content.classList.remove('hidden');
        }
    });
}

function getPrevSlide(e, obj)
{
    e.preventDefault();
    
    var parent = obj.parentNode;
    var cur_slide = parent.querySelector('div.slider-item-current');
    var index = (parseInt(cur_slide.getAttribute('data-index')) - 1);
    var next_slide = null;
    
    if(index <= 0)
    {
        var slider_items = parent.querySelectorAll('div.slider-item');
        index = slider_items.length;
        next_slide = slider_items[(parseInt(index) - 1)];
    }
    else
    {
        next_slide = parent.querySelector('div.slider-item-'+index);
    }
    
    if(next_slide != undefined)
    {
        cur_slide.classList.remove('slider-item-current');
        next_slide.classList.add('slider-item-current');
        setCurrentSlide(e, null, index);
    }
}

function getNextSlide(e, obj)
{
    e.preventDefault();
    
    var parent = obj.parentNode;
    var cur_slide = parent.querySelector('div.slider-item-current');
    var index = (parseInt(cur_slide.getAttribute('data-index')) + 1);
    var next_slide = parent.querySelector('div.slider-item-'+index);
    
    if(next_slide == undefined)
    {
        index = 1;
        next_slide = parent.querySelector('div.slider-item-'+index);
    }
    
    if(next_slide != undefined)
    {
        cur_slide.classList.remove('slider-item-current');
        next_slide.classList.add('slider-item-current');
        setCurrentSlide(e, null, index);
    }
}

function setCurrentSlide(e, obj, choose_index)
{
    e.preventDefault();
    (choose_index != undefined && parseInt(choose_index) > 0) ? '' : choose_index = 0;
    
    if(choose_index <= 0)
    {
        var parent = obj.parentNode.parentNode;
        var cur_slide = parent.querySelector('div.slider-item-current');
        var index = parseInt(obj.getAttribute('data-index'));
        var next_slide = parent.querySelector('div.slider-item-'+index);

        if(next_slide != undefined)
        {
            cur_slide.classList.remove('slider-item-current');
            next_slide.classList.add('slider-item-current');
        }
        
        var item_active = obj.parentNode.querySelector('.slider-pagination-item-active');
        if(item_active != undefined)
        {
            item_active.classList.remove('slider-pagination-item-active');
        }
        obj.classList.add('slider-pagination-item-active');
    }
    else
    {
        var pagination = document.getElementById('slider-pagination');
        obj = pagination.querySelector('.slider-pagination-item[data-index="'+choose_index+'"]');
        
        var item_active = obj.parentNode.querySelector('.slider-pagination-item-active');
        if(item_active != undefined)
        {
            item_active.classList.remove('slider-pagination-item-active');
        }
        obj.classList.add('slider-pagination-item-active');
    }
}

var POPUP_OPEN = false;
var BODY = null;
window.onload = function()
{
    initRange();
    
    BODY = document.querySelector('body');
    var popupBtnClose = document.querySelectorAll('.popup-element-close');
    var popupBody = null;
    popupBtnClose.forEach(function(item)
    {
        item.addEventListener('click', function(e)
        {
            closePopup(e, item);
        });
        
        popupBody = item.closest('.popup-body');
        popupBody.addEventListener('click', function(e)
        {
            if(e.target.classList.contains('popup-body'))
            {
                closePopup(e, e.target);
            }
        });
    });
    
    window.addEventListener('keydown', function(e)
    {
        if(e.keyCode === 27)
        {
            if(POPUP_OPEN)
            {
                closePopupsOpen();
            }
        }
    });
}

function closePopup(e, obj, unlock)
{
    if(e != undefined)
    {
        e.preventDefault();
    }
    
    POPUP_OPEN = false;
    var modal = obj.closest('div.popup');
    if(modal != undefined)
    {
        modal.classList.remove('popup-active');
    }
    
    if(unlock == undefined)
    {
        bodyUnLock();
    }
}

function closePopupsOpen()
{
    bodyUnLock();
    var is_open = false;
    var popupOpen = document.querySelector('.popup.popup-active');
    
    if(popupOpen)
    {
        is_open = true;
        closePopup(null, popupOpen, 1);
    }
    
    return is_open;
}

function openPopup(modal)
{
    if(modal != undefined)
    {
        closePopupsOpen();
        
        POPUP_OPEN = true;
        modal.classList.add('popup-active');
        bodyLock();
    }
}

function bodyLock()
{
    var lockPaddingValue = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
    
    BODY.style.paddingRight = lockPaddingValue;
    BODY.classList.add('body-lock-scroll');
}

function bodyUnLock()
{
    BODY.style.paddingRight = null;
    BODY.classList.remove('body-lock-scroll');
}

function addBasket(e, obj)
{
    e.preventDefault();
    
    var modal = document.getElementById('modal-item-add-cart');
    
    openPopup(modal);
}

function showPopupFeedback(e, obj)
{
    e.preventDefault();
    
    var modal = document.getElementById('modal-feedback');
    
    openPopup(modal);
}