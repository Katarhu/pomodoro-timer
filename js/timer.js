const start_timer_button = document.querySelector('.timer-start-button');
const audio = document.querySelector('.audio-player');
let timer_interval;
let isWork = false;

start_timer_button.addEventListener('click', timer_handler);


function timer_handler(){
    isWork = !isWork;

    if(isWork) {
        timer_start(get_time());
    } else {
        timer_stop();
    }
}

function timer_start(){
    isWork = true;
    start_timer_button.innerHTML = 'STOP';
    timer_interval = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            time_left -= 1;
            seconds = 59;
        }
        if(time_left < 0){
            timer_stop();
            set_mode();
            audio.muted = false;
            audio.play();

            setTimeout(()=>{
                audio.currrentTime = 0;
                audio_player.currrentTime = 0;
                audio.pause();    
            },5500)

            if(get_mode() === 1 || get_mode() === 2) {
                switch_mode(0);
                if(autostart_pomodoro) timer_start();
            }   
            else {
                switch_mode(1);
                if(autostart_break) timer_start();
            }
        }
        timer_text.innerHTML = `${time_left > 9 ? time_left : '0'+time_left} : ${seconds > 9 ? seconds : '0'+seconds}`;
    },1000)
}
function timer_stop(){
    audio.pause();
    isWork = false;
    start_timer_button.innerHTML = 'START';
    clearInterval(timer_interval);
}