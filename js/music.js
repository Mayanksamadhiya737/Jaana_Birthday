// Music Player Data
const songs = [
    {
        title: "Khaab",
        artist: "Akhil",
        duration: 200,
        url: "assets/music/khaab.mp3",
        image: "assets/music/tile1.png"
    },
    {
        title: "Kaun Tujhe",
        artist: "Amaal Mallik",
        duration: 240,
        url: "assets/music/kaun-tujhe.mp3",
        image: "assets/music/tile1.png"
    },
    {
        title: "Mast Magan",
        artist: "Arijit Singh",
        duration: 280,
        url: "assets/music/mast-magan.mp3",
        image: "assets/music/tile1.png"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
const audio = document.getElementById('audioPlayer');

// Initialize player
document.addEventListener('DOMContentLoaded', function() {
    renderPlaylist();
    loadTrack(0);
    
    // Audio event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onTrackEnd);
    audio.addEventListener('loadedmetadata', updateTimeDisplay);
    
    // Progress bar click
    document.getElementById('progressBar').addEventListener('click', function(e) {
        const width = this.offsetWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });
});

function renderPlaylist() {
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = '';
    
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `song-item ${index === currentTrackIndex ? 'playing' : ''}`;
        item.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${formatTime(song.duration)}</div>
        `;
        item.onclick = () => {
            currentTrackIndex = index;
            loadTrack(index);
            play();
        };
        playlist.appendChild(item);
    });
}

function loadTrack(index) {
    const song = songs[index];
    audio.src = song.url;
    document.getElementById('nowPlayingTitle').textContent = song.title;
    document.getElementById('nowPlayingArtist').textContent = song.artist;
    document.getElementById('albumImage').src = song.image;
    
    // Update playlist highlighting
    document.querySelectorAll('.song-item').forEach((item, i) => {
        item.classList.toggle('playing', i === index);
    });
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('currentTime').textContent = '0:00';
}

function play() {
    audio.play();
    isPlaying = true;
    document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
    document.getElementById('albumCover').classList.add('playing');
    document.getElementById('recordSpin').classList.add('playing');
}

function pause() {
    audio.pause();
    isPlaying = false;
    document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
    document.getElementById('albumCover').classList.remove('playing');
    document.getElementById('recordSpin').classList.remove('playing');
}

function togglePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function nextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    }
    loadTrack(currentTrackIndex);
    play();
}

function previousTrack() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
        loadTrack(currentTrackIndex);
    }
    play();
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    document.querySelectorAll('.control-btn')[0].classList.toggle('active', isShuffle);
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    const repeatBtn = document.querySelectorAll('.control-btn')[4];
    
    if (repeatMode === 0) {
        repeatBtn.classList.remove('active');
    } else if (repeatMode === 1) {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
    } else {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i><span style="font-size: 0.6rem;">1</span>';
    }
}

function onTrackEnd() {
    if (repeatMode === 2) {
        // Repeat one
        audio.currentTime = 0;
        play();
    } else {
        // Repeat all or no repeat (next track)
        nextTrack();
    }
}

function updateProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
    }
}

function updateTimeDisplay() {
    if (audio.duration) {
        document.getElementById('totalTime').textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function goToOptions() {
    audio.pause();
    window.location.href = 'options.html';
}
