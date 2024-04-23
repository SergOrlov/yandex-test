// Running Line

(() => {

    const runningLine = () => {
        const container  = document.querySelectorAll('.running-line');
        const content = document.querySelector('.running-line__content');
        let clonedContent = content.cloneNode(true);
        container.forEach((item) => {
            clonedContent = content.cloneNode(true);
            item.appendChild(clonedContent);
        });
        const animationBlock = document.querySelectorAll('.running-line__content');

        animationBlock.forEach((item) => {
            item.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-100%)' }
            ],{
                duration: 15000,
                iterations: Infinity
            });
        });
    }

runningLine();

})();


// Vasuki slider

(() => {

    const slidesCollection = document.querySelectorAll('.vasuki__item');
    const slides = Array.from(slidesCollection);

    const createIndikator = () => {
        const indikatorList = document.querySelector('.vasuki__slide-indikators-list');
        const indikatorTemplate = document.querySelector('#slide-indikator')
        .content
        .querySelector('.vasuki__slide-indikators-item');
        const similarItemFragment = document.createDocumentFragment();

        for (let i = 0; i < slides.length; i++) {
            const indikator = indikatorTemplate.cloneNode(true);
            similarItemFragment.appendChild(indikator);
            indikatorList.appendChild(similarItemFragment);
        }
    }

    createIndikator();

    const updateSlider = (width) => {
        const slidesCollection = document.querySelectorAll('.vasuki__item');
        const slides = Array.from(slidesCollection);

        const prevButton = document.querySelector('.vasuki__arrow-left');
        const nextButton = document.querySelector('.vasuki__arrow-right');
        let slideIndex = 0;

        const indikatorsCollection = document.querySelectorAll('.vasuki__slide-indikators-item');
        const indikators = Array.from(indikatorsCollection);
        indikators[0].classList.add('vasuki__slide-indikators-item--active');

        const checkIndikator = () => {
            indikators.forEach((item, index) => {
                index === slideIndex ? item.classList.add('vasuki__slide-indikators-item--active') : item.classList.remove('vasuki__slide-indikators-item--active');
            })
        }

        const slidesList = document.querySelector('.vasuki__list');

        const checkIndex = () => {
            slideIndex == slides.length-1 ? nextButton.classList.add('arrow--disabled') : nextButton.classList.remove('arrow--disabled');
            slideIndex == 0 ? prevButton.classList.add('arrow--disabled') : prevButton.classList.remove('arrow--disabled');
        }

        const increaseIndex = () => {
            slideIndex++;
        }

        const decreaseIndex = () => {
            slideIndex--;
        }

        const changeSlider = (selector, magnitude, index, changeIndex) => {
            selector.addEventListener('click', () => {
                changeIndex();
                let transformation = magnitude * slideIndex;

                slides[slideIndex + index].animate([
                    { transform: 'translateX(' + transformation + 'px)' }
                ],{
                    fill: 'forwards'
                });

                checkIndex();
                checkIndikator();
            });
        }

        changeSlider(nextButton, -Math.abs(width), 0, increaseIndex);
        changeSlider(prevButton, width, 1, decreaseIndex);
    }

    const vasuki = document.querySelector('.vasuki');
    const initial = vasuki.innerHTML;

    if (window.innerWidth < 768) {
        updateSlider(335);
    }

    if (window.innerWidth < 1024 && window.innerWidth > 768) {
        updateSlider(600);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            vasuki.innerHTML = initial;
            updateSlider(335);
        }

        if (window.innerWidth < 1024 && window.innerWidth > 768) {
            vasuki.innerHTML = initial;
            updateSlider(600);
        }
    });

})();


// Participants slider

(() => {

    let PARTICIPANTS = [
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Хозе-Рауль Капабланка',
            role: 'Чемпион мира по шахматам',
        },
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Эммануил Ласкер',
            role: 'Чемпион мира по шахматам',
        },
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Александр Алехин',
            role: 'Чемпион мира по шахматам',
        },
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Арон Нимцович',
            role: 'Чемпион мира по шахматам',
        },
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Рихард Рети',
            role: 'Чемпион мира по шахматам',
        },
        {
            img: '../img/speaker_photo_320x320_2x.png',
            name: 'Остап Бендер',
            role: 'Гроссмейстер',
        },
    ]

    const updateSlider = (width, onScreen, loop) => {

        const participantsList = document.querySelector('.participants__list');
        const participantsItemTemplate = document.querySelector('#participants-item')
        .content
        .querySelector('.participants__item');
        const totalSlides = document.querySelector('.participants__total');
        totalSlides.textContent = PARTICIPANTS.length;
        let currentSlide = document.querySelector('.participants__current');
        currentSlide.textContent = onScreen;
        const prevButton = document.querySelector('.participants__arrow-left');
        const nextButton = document.querySelector('.participants__arrow-right');

        const createCards = (participants) => { 
            const similarItemFragment = document.createDocumentFragment();
            participants.forEach((key) => {
                const participantsItem = participantsItemTemplate.cloneNode(true);
                participantsItem.querySelector('.participants__img').src = key.img;
                participantsItem.querySelector('.participants__name').textContent = key.name;
                participantsItem.querySelector('.participants__role').textContent = key.role;
                similarItemFragment.appendChild(participantsItem);
            });
            participantsList.appendChild(similarItemFragment);
        }

        createCards(PARTICIPANTS);

        let cardsCollection = document.querySelectorAll('.participants__item');
        let cards = Array.from(cardsCollection);
        let slideIndex = 0;

        const increaseIndex = (onScreen) => {
            slideIndex += onScreen;
        }

        const decreaseIndex = (onScreen) => {
            slideIndex -= onScreen;
        }

        let slideCounter = onScreen;

        const increaseCounter = (onScreen) => {
            slideCounter += onScreen;
        }

        const decreaseCounter = (onScreen) => {
            slideCounter -= onScreen;
        }

        const changeSlider = (selector, magnitude, index, changeIndex, onScreen, changeCounter) => {
            selector.addEventListener('click', () => {
                changeCounter(onScreen);
                if (slideCounter > PARTICIPANTS.length) {
                    slideCounter = onScreen;
                    currentSlide.textContent = onScreen;
                } else {
                    currentSlide.textContent = slideCounter;
                }
                prevButton.disabled = true;
                nextButton.disabled = true;
                let startPoint = magnitude * slideIndex/onScreen;
                let transformation = magnitude * (slideIndex/onScreen + index);
                changeIndex(onScreen);
                slideIndex > 0 ? prevButton.classList.remove('arrow--disabled') : prevButton.classList.add('arrow--disabled');

                setTimeout(() => {
                    prevButton.disabled = false;
                    nextButton.disabled = false;
                }, 1000);
                
                cards.forEach((card) => {
                    card.animate([
                        { transform: 'translateX(' + startPoint + 'px)' },
                        { transform: 'translateX(' + transformation + 'px)' }
                    ],{
                        duration: 1000,
                        fill: 'forwards'
                    });
                });

                if (slideIndex == cards.length - onScreen) { 
                    createCards(PARTICIPANTS);
                    cardsCollection = document.querySelectorAll('.participants__item');
                    cards = Array.from(cardsCollection);
                    cardsLength = PARTICIPANTS.length;
                } else if (slideIndex == PARTICIPANTS.length) {
                    setTimeout(() => {
                        participantsList.innerHTML='';
                        createCards(PARTICIPANTS);
                        cardsCollection = document.querySelectorAll('.participants__item');
                        cards = Array.from(cardsCollection);
                        slideIndex = 0;
                        prevButton.classList.add('arrow--disabled');
                    }, 1000);
                }
            });
        }

        changeSlider(nextButton, width, 1, increaseIndex, onScreen, increaseCounter);
        changeSlider(prevButton, width, -1, decreaseIndex, onScreen, decreaseCounter);

        // let startLoop = loop;
        
        // const loopSlides = () => {
        //     nextButton.click();
        // }

        // let timeId = setInterval(loopSlides, 4000);

        // if (startLoop) {
        //     window.addEventListener('resize', () => {        
        //         if (window.innerWidth > 1280) {
        //             timeId;
        //         }
        //     });
        // } else {
        //     clearInterval(timeId);
        // }
    }

    let loopSlides = () => {
        document.querySelector('.participants__arrow-right').click();
    }

    let timeId = setInterval(loopSlides, 4000);

    if (window.innerWidth > 1280) {
        updateSlider(-1230, 3);
        timeId;
    }

    if (window.innerWidth < 1280 && window.innerWidth > 768) {
        updateSlider(-410, 1);
        clearInterval(timeId);
    }

    if (window.innerWidth < 768) {
        updateSlider(-335, 1);
        clearInterval(timeId);
    }

    const participants = document.querySelector('.participants');
    const initial = participants.innerHTML;
    
    window.addEventListener('resize', () => {
        clearInterval(timeId);

        if (window.innerWidth < 768) {
            participants.innerHTML = initial;
            updateSlider(-335, 1);
        }

        if (window.innerWidth < 1280 && window.innerWidth > 768) {
            participants.innerHTML = initial;
            updateSlider(-410, 1);
        }

        if (window.innerWidth > 1280) {
            participants.innerHTML = initial;
            updateSlider(-1230, 3);
            loopSlides = () => {
                document.querySelector('.participants__arrow-right').click();
            }
        
            timeId = setInterval(loopSlides, 4000);
        }
    });
})();