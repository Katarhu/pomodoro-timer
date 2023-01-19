const audio_range = document.querySelector('.settings-audio__range');
const select = document.querySelector('.settings-audio__select');
const options = document.querySelectorAll('.audio-options')
const audio_player = document.querySelector('.audio-player');

audio_player.volume = audio_range.value / 100;


audio_range.onchange = () => {
    audio_player.volume = audio_range.value / 100;
}

audio_player.src = `${select.selectedOptions[0].value}`;

select.onchange = () => {
    select_handler();
}

function select_handler(){
    let audio_play_timeout =  setTimeout(()=>{
        audio_player.pause();
        audio_player.currrentTime = 0;
    }, 2500)

    if(!audio_player.paused){
        audio_player.pause();
        audio_player.currrentTime = 0;
        clearTimeout(audio_play_timeout);
    }

    audio_player.src = `${select.selectedOptions[0].value}`;
    
    audio_player.muted = false;
    audio_player.play()
}

options.forEach(option => {
    option.onclick = () => {
        console.log('hello')
        audio_player.play()
        setTimeout(()=>{
            audio_player.pause();
            audio_player.currrentTime = 0;
        }, 5000)
    }
})