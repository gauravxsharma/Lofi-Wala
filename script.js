// Variables
const masterPlay = document.getElementById("masterPlay");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const gif = document.getElementById("gif");
const cover = document.getElementById("cover");
const progressBar = document.getElementById("myProgressBar");
const songTitle = document.getElementById("songTitle");
const songItemsPlay = document.querySelectorAll(".songItemsPlay");

// Array of songs
const songs = [
    { title: "Let me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { title: "On My Way", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { title: "Faded", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { title: "Alone", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { title: "Bella Ciao", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { title: "Maxico", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { title: "Let me Love You", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { title: "On My Way", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { title: "Faded", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { title: "Let me Love You", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let audioElement = new Audio(songs[0].filePath);
let songIndex = 0;

// Play/Pause toggle
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
});

// Seek functionality
progressBar.addEventListener("change", () => {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

// Next song
next.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();
});

// Previous song
prev.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong();
});

// Load song function
function loadSong() {
    resetAllIcons();
    audioElement.src = songs[songIndex].filePath;
    cover.src = songs[songIndex].coverPath;
    songTitle.textContent = songs[songIndex].title;
    audioElement.play();
    gif.style.display = "block";
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    songItemsPlay[songIndex].classList.remove("fa-circle-play");
    songItemsPlay[songIndex].classList.add("fa-circle-pause");
}

// Play song
function playSong() {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.display = "block";
    songItemsPlay[songIndex].classList.remove("fa-circle-play");
    songItemsPlay[songIndex].classList.add("fa-circle-pause");
}

// Pause song
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.display = "none";
    songItemsPlay[songIndex].classList.remove("fa-circle-pause");
    songItemsPlay[songIndex].classList.add("fa-circle-play");
}

// Reset all play buttons to default state
function resetAllIcons() {
    songItemsPlay.forEach((item) => {
        item.classList.remove("fa-circle-pause");
        item.classList.add("fa-circle-play");
    });
}

// Add event listeners to song list buttons
songItemsPlay.forEach((element, index) => {
    element.addEventListener("click", (e) => {
        if (songIndex === index && !audioElement.paused) {
            pauseSong(); // If same song is playing, pause it
        } else {
            songIndex = index;
            loadSong();
        }
    });
});
