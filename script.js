const songDatabase = [
    {
        id: 1,
        title: "Midnight City",
        artist: "Urban Dreams",
        image: "https://plus.unsplash.com/premium_photo-1676499537897-501734403882?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        audioUrl: "assets/music/midnight-city.mp3"
    },
    {
        id: 2,
        title: "Electric Soul",
        artist: "The Frequencies",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSPkb0Jr8STe5JtcBJlOwejBgKyKMG72FPMg&s",
        audioUrl: "assets/music/electric-soul.mp3"
    },
    {
        id: 3,
        title: "Acoustic Sunrise",
        artist: "Morning Wood",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        audioUrl: "assets/music/acoustic-sunrise.mp3"
    },
    {
        id: 4,
        title: "Deep Bass",
        artist: "DJ K-Nova",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        audioUrl: "assets/music/deep-bass.mp3"
    },
    {
        id: 5,
        title: "Velocity",
        artist: "Synth Masters",
        image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        audioUrl: "assets/music/velocity.mp3"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const mainSearch = document.getElementById("mainSearch");

    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("main-play-btn");
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.querySelector(".progress-container");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalTimeDisplay = document.getElementById("total-time");

    const avatarBtn = document.getElementById("avatarBtn");
    const authModal = document.getElementById("authModal");
    const closeAuth = document.getElementById("closeAuth");
    const authTitle = document.getElementById("authTitle");
    const authBtn = document.getElementById("authBtn");
    const authForm = document.getElementById("authForm");
    const toggleText = document.querySelector(".toggle-text");

    const aboutBtn = document.getElementById("aboutBtn");
    const aboutModal = document.getElementById("aboutModal");
    const closeAbout = document.getElementById("closeAbout");

    let currentSong = null;
    let currentSongIndex = 0;
    let isPlaying = false;
    let isLogin = true;

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    function updatePlayButton() {
        playPauseBtn.innerHTML = isPlaying
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play"></i>';
    }

    function updatePlayerDisplay(song) {
        const playerLeft = document.querySelector(".player-left");

        playerLeft.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <div class="song-details">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <button class="like-btn" type="button"><i class="fa-regular fa-heart"></i></button>
        `;

        const likeBtn = playerLeft.querySelector(".like-btn");

        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("liked");

            const icon = likeBtn.querySelector("i");
            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");
        });
    }

    function selectAndPlaySong(song) {
    currentSong = song;

    currentSongIndex = songDatabase.findIndex(
        s => s.id === song.id
    );
        audioPlayer.src = song.audioUrl;

        updatePlayerDisplay(song);

        audioPlayer.play();
        isPlaying = true;
        updatePlayButton();
    }

    function renderSongs(songsToRender = songDatabase) {
        const scrollContainer = document.querySelector(".scroll-container");
        scrollContainer.innerHTML = "";

        songsToRender.forEach(song => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");

            songCard.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${song.image}" alt="${song.title}">
                    <div class="card-overlay"><i class="fa-solid fa-play"></i></div>
                </div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            `;

            songCard.addEventListener("click", () => {
                selectAndPlaySong(song);
            });

            scrollContainer.appendChild(songCard);
        });
    }

    function updateAuthMode() {
        if (isLogin) {
            authTitle.innerText = "Login";
            authBtn.innerText = "Login";
            toggleText.innerHTML = `Don't have an account? <span id="toggleAuth">Sign Up</span>`;
        } else {
            authTitle.innerText = "Sign Up";
            authBtn.innerText = "Sign Up";
            toggleText.innerHTML = `Already have an account? <span id="toggleAuth">Login</span>`;
        }
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(15, 15, 19, 0.95)";
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.background = "rgba(22, 22, 29, 0.7)";
            navbar.style.boxShadow = "none";
        }
    });

    menuBtn.addEventListener("click", () => {
        const icon = menuBtn.querySelector("i");

        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    playPauseBtn.addEventListener("click", () => {
        if (!currentSong) {
            selectAndPlaySong(songDatabase[0]);
            return;
        }

        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
        } else {
            audioPlayer.play();
            isPlaying = true;
        }

        updatePlayButton();
    });

    const nextBtn = document.querySelector(".fa-forward-step").parentElement;

const prevBtn = document.querySelector(".fa-backward-step").parentElement;

nextBtn.addEventListener("click", () => {

    currentSongIndex++;

    if (currentSongIndex >= songDatabase.length) {
        currentSongIndex = 0;
    }

    selectAndPlaySong(songDatabase[currentSongIndex]);
});

prevBtn.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songDatabase.length - 1;
    }

    selectAndPlaySong(songDatabase[currentSongIndex]);
});

    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;

        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;

        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songDatabase.length) {
        currentSongIndex = 0;
    }

    selectAndPlaySong(songDatabase[currentSongIndex]);
});

    progressContainer.addEventListener("click", e => {
        if (!audioPlayer.duration) return;

        const width = progressContainer.offsetWidth;
        const clickedTime = (e.offsetX / width) * audioPlayer.duration;

        audioPlayer.currentTime = clickedTime;
    });

    mainSearch.addEventListener("input", () => {
        const value = mainSearch.value.toLowerCase();

        const filteredSongs = songDatabase.filter(song =>
            song.title.toLowerCase().includes(value) ||
            song.artist.toLowerCase().includes(value)
        );

        renderSongs(filteredSongs);
    });

    avatarBtn.addEventListener("click", () => {
        authModal.style.display = "flex";
    });

    closeAuth.addEventListener("click", () => {
        authModal.style.display = "none";
    });

    toggleText.addEventListener("click", e => {
        if (e.target.id !== "toggleAuth") return;

        isLogin = !isLogin;
        updateAuthMode();
    });

    authForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (isLogin) {
            const storedUser = JSON.parse(localStorage.getItem(email));

            if (storedUser && storedUser.password === password) {
                alert("Login Successful!");
                authModal.style.display = "none";
            } else {
                alert("Invalid Credentials!");
            }
        } else {
            localStorage.setItem(email, JSON.stringify({ email, password }));
            alert("Account Created! Please Login.");

            isLogin = true;
            updateAuthMode();
        }

        authForm.reset();
    });

    aboutBtn.addEventListener("click", e => {
        e.preventDefault();
        aboutModal.style.display = "flex";
    });

    closeAbout.addEventListener("click", () => {
        aboutModal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === authModal) {
            authModal.style.display = "none";
        }

        if (e.target === aboutModal) {
            aboutModal.style.display = "none";
        }
    });

    renderSongs();
    const genreCards = document.querySelectorAll(".genre-card");

genreCards.forEach(card => {

    card.addEventListener("click", () => {

        const genre = card.innerText.toLowerCase();

        let filteredSongs = [];

        if (genre.includes("pop")) {
            filteredSongs = [songDatabase[0]];
        }

        else if (genre.includes("lo-fi")) {
            filteredSongs = [songDatabase[2]];
        }

        else if (genre.includes("hip-hop")) {
            filteredSongs = [songDatabase[3]];
        }

        else if (genre.includes("edm")) {
            filteredSongs = [songDatabase[4]];
        }

        renderSongs(filteredSongs);

        if (filteredSongs.length > 0) {
            selectAndPlaySong(filteredSongs[0]);
        }
    });

});
    updatePlayerDisplay(songDatabase[0]);
    updateAuthMode();
});
