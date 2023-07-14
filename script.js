console.log("Welcome to Spotify");

//Instializing the variables
let songIndex = 0;
let audioElement = new Audio('Music/long-drive-mashup-1.mp3');
let mainPlay = document.getElementById('mainPlay');
let progressBar =document.getElementById('progressBar');
let gif =document.getElementById('gif');
let mainSongName = document.getElementById('mainSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Long Drive Mashup", filePath: "Music/long-drive-mashup-1.mp3", coverPath: "Images/long-drive-mashup-1.png"},
    {songName: "Arjit Singh Mashup", filePath: "Music/arjit-singh-mashup.mp3", coverPath: "Images/arjit-singh-mashup.png"},
    {songName: "Long Drive Mashup-2", filePath: "Music/long-drive-mashup-2.mp3", coverPath: "Images/long-drive-mashup-2.png"},
    {songName: "Darshan Raval Mashup", filePath: "Music/King-mashup.mp3", coverPath: "Images/king-mashup.jpg"},
    {songName: "Long Drive Mashup-3", filePath: "Music/long-drive-mashup-3.mp3", coverPath: "Images/long-drive-mashup-3.png"},
    {songName: "Darshan Raval Mashup", filePath: "Music/Darshan-raval-mashup.mp3", coverPath: "Images/Darshan-raval-mashup.png"},
    {songName: "Long Drive Mashup", filePath: "Music/long-drive-mashup-4.mp3", coverPath: "Images/long-drive-mashup-5.png"},
    {songName: "Long Drive Mashup-2", filePath: "Music/long-drive-mashup-5.mp3", coverPath: "Images/long-drive-mashup-5.png"},
    {songName: "Arjit Singh Mashup", filePath: "Music/AR-Rahaman-mashup.mp3", coverPath: "Images/AR-Rahaman-mashup.jpg"},
    {songName: "Long Drive Mashup-3", filePath: "Music/long-drive-mashup-6.mp3", coverPath: "Images/long-drive-mashup-6.png"}
    
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// Handle play/pause click
mainPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        mainPlay.classList.remove('fa-play-circle')
        mainPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1

    }
    else{
        audioElement.pause()
        mainPlay.classList.remove('fa-pause-circle')
        mainPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    progressBar.value = progress;

})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle')
    element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        if (clickedIndex === songIndex && !audioElement.paused) {
            // Pause the music if the clicked item is already playing
            audioElement.pause();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            mainPlay.classList.remove('fa-pause-circle');
            mainPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            mainSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            audioElement.currentTime = 0;
            audioElement.play();
            mainPlay.classList.remove('fa-play-circle');
            mainPlay.classList.add('fa-pause-circle');
        }
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = songs[songIndex].filePath;
    mainSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle')
    mainPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = songs[songIndex].filePath;
    mainSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle')
    mainPlay.classList.add('fa-pause-circle')
})

// Listen to the "timeupdate" event to update the music time dynamically
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;

    // Update the displayed time
    const currentTime = formatTime(audioElement.currentTime);
    const duration = formatTime(audioElement.duration);
    // Assuming you have an element with the id "musicTime" to display the time
    document.getElementById('musicTime').innerText = `${currentTime}`;
    document.getElementById('duration').innerText = `${duration}`;
});

// Helper function to format the time as MM:SS
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

// Helper function to pad zeros for single-digit minutes or seconds
function padZero(num) {
    return num.toString().padStart(2, '0');
}