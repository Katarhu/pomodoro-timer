const pomodoro_button = document.querySelector('.pomodoro-mode');
const short_break_button = document.querySelector('.short-break-mode');
const long_break_button = document.querySelector('.long-break-mode');
const timer_modes = document.querySelector('.timer-mods')
const timer_input = document.querySelectorAll('.time-input');
const timer_text = document.querySelector('.timer__time');
const checkboxes = document.querySelectorAll('.settings-autoplay__checkbox');

const body = document.querySelector('.body');
const timer_body = document.querySelector('.timer');

const buttons = [pomodoro_button, short_break_button, long_break_button];
const mode_names = ["pomodoro",'short-brake',"long-brake"];

let modes_time = [];

let autostart_pomodoro = false;
let autostart_break = false;

let time_left;
let seconds = 0;

set_mode(0);


// MODE SETS

let localStorage = window.localStorage;

timer_input[0].value = localStorage.getItem('pomodoro') || 35;
timer_input[1].value = localStorage.getItem('short_break') || 7;
timer_input[2].value = localStorage.getItem('long_break') || 10;

set_time();

function set_mode(mode){
    if(mode === 0){
        set_mode_0();
    }
    if(mode === 1){
        set_mode_1();
    }
    if(mode === 2){
        set_mode_2();
    }
}

function set_mode_0(){
    clear_focus();
    buttons[0].classList.add('focus');
    body.style.background = '#EDD2F3';
    timer_body.style.background = '#A568A4';
    set_time();
}

function set_mode_1(){
    clear_focus();
    buttons[1].classList.add('focus');
    body.style.background = '#9A9BC3';
    timer_body.style.background = '#6567AB';
    set_time();
}

function set_mode_2(){
    clear_focus();
    body.style.background = '#C4A0EA';
    timer_body.style.background = '#A3529F';
    buttons[2].classList.add('focus');
    set_time();
}

function get_mode(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains('focus')) return i;
    }
}

// 
// TIME
//

function set_time(){
    set_modes_time();
    time_left = String(get_time());
    seconds = 0;

    if(time_left.includes(".")){
        let separate_time = time_left.split(".");
        time_left = +separate_time[0];
        separate_time[1].length > 1 ? seconds = Math.floor(60 / separate_time[1]) : seconds = 60 * +separate_time[1] / 10;
        timer_text.innerHTML = `${time_left > 9 ? time_left : '0' + time_left} : ${seconds > 9 ? seconds : '0' + seconds}`;
        return;
    }

    timer_text.innerHTML = `${time_left > 9 ? time_left : '0' + time_left} : ${seconds > 9 ? seconds : '0' + seconds}`;
}

function set_modes_time() {
    for(let i = 0; i < timer_input.length; i++){
        modes_time[i] = Math.abs(+timer_input[i].value);
    }
}

function get_time(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains('focus')){
            return modes_time[i];
        }
    }
}


// 
// BUTTONS 
// 

timer_modes.addEventListener('click', button_handler)

function button_handler(item){
    if(item.target.classList.contains('btn')){
        clear_focus();
        item.target.classList.add('focus');
        switch_mode(+item.target.value);
        timer_stop();
    }
}

function clear_focus(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('focus');
    }
}

function switch_mode(mode){
    if(mode === 0 || mode === 1 || mode === 2){
        set_mode(mode);
    }
}

// 
// INPUT
// 

function resetTimer(){
    timer_stop();
    set_time();
}

timer_input[0].onchange = () =>{
    resetTimer();
    localStorage.setItem('pomodoro', modes_time[0]);
}
timer_input[1].onchange = () =>{
    resetTimer();
    localStorage.setItem('short_break', modes_time[1]);
}
timer_input[2].onchange = () =>{
    resetTimer();
    localStorage.setItem('long_break', modes_time[2]);
}


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkbox_handler)
});

function checkbox_handler(event){
    if(event.target.classList.contains('auto-start-break')){
        if(event.target.checked) autostart_break = true;
        else autostart_break = false;
    }
    if(event.target.classList.contains('auto-start-pomodoro')){
        if(event.target.checked) autostart_pomodoro = true;
        else autostart_pomodoro = false;
    }
}