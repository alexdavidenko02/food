function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);

    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    //Modal Window 

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modalTimerID);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
};

export default modal;
export {closeModal};
export {openModal};