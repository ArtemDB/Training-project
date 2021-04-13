"use strict";
window.addEventListener('DOMContentLoaded', () => {

    // Navigation

    const aboutUs = document.querySelector('.about_us'),
          headerLink = document.querySelectorAll('.header_link'),
          header = document.querySelector('.header'),
          contentBlock = document.querySelectorAll('.content_block');

    function addActive(e) {
        e.classList.add('active');
    }
    function removeActive(e) {
        e.classList.remove('active');
    }
    function hideBlockContent() {
        contentBlock.forEach (e => {
            e.style.display = 'none';
            e.classList.remove('fade');
        });
        headerLink.forEach (e => {
            removeActive(e);
        });
    }
    function showBlockContent(i = 0) {
        addActive(headerLink[i]);
        contentBlock[i].style.display = 'block';
        contentBlock[i].classList.add('fade');
    }

    hideBlockContent();
    showBlockContent();

    header.addEventListener ('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('header_link')) {
            headerLink.forEach ((e, i) => {
                if (target == e) {
                    hideBlockContent();
                    showBlockContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2021-05-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 *24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalOn = document.querySelector('.btn_offer'),
          modal = document.querySelector('.modal'),
          modalOff = document.querySelector('.modal_close');

    function modalShow() {
        modal.style.display = 'block';
        document.body.style.overflow= 'hidden';
        clearInterval(modalTimer);
    }
    function modalHide() {
        modal.style.display = 'none';
        document.body.style.overflow= '';
    }
    modalOn.addEventListener('click', modalShow);
    modalOff.addEventListener('click', modalHide);
    modal.onclick = function(e) {
        const mCont = e.target.closest('.modal_content');
        if (!mCont) {
            modalHide();
        }
    };
    document.addEventListener('keydown', (e) =>{
        if (e.code === "Escape" && (modal.style.display = "block")){
            modalHide();
        }
    });
    // const modalTimer = setTimeout(modalShow, 10000);

    // Animation

    headerLink.forEach (e => {
        e.onmouseover = function(event) {
            event.target.classList.add('active_over');
        };
        e.onmouseout = function(event) {
            event.target.classList.remove('active_over');
        };
    });
    const btn = document.querySelector('.btn');
    btn.onmouseover = function(event) {
        event.target.classList.add('btn_shadow');
    };
    btn.onmouseout = function(event) {
        event.target.classList.remove('btn_shadow');
    };

});

