const button_settings_open = document.querySelector('.button-settings-open');
const button_settings_close = document.querySelector('.button-settings-close')
const modal_popup = document.querySelector('.settings__modal');
const modal_bg = document.querySelector('.settings');

button_settings_open.onclick = () => modal_handler();
button_settings_close.onclick = () =>  modal_handler();
modal_bg.addEventListener('click', click_out_modal);


function modal_handler(){
    modal_bg.classList.toggle('show-modal')
}

function click_out_modal(event){
    if(event.target.classList[0] === 'settings'){
        modal_bg.classList.remove('show-modal');
    }
}