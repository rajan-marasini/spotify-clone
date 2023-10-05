fetch("./songs.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error("Error to get the songs");
        }
        return res.json();
    })
    .then((songs) => {
        let songIndex = 0;
        let audioElement = new Audio("songs/1.mp3");
        let masterPlay = document.getElementById("masterPlay");
        let myProgressBar = document.getElementById("myProgressBar");
        let giff = document.getElementById("animatedGiff");
        let songItems = Array.from(
            document.getElementsByClassName("songItems")
        );
        const nextButton = document.querySelector("#nextButton");
        const previousButton = document.querySelector("#previousButton");

        let songList = songs
            .map((song, index) => {
                return `<div class="songItems">
                    <div class="coverImage">
                        <img src='${song.coverPath}' alt="" />
                    </div>
                    <span class="songName">${song.songName}</span>
                    <span class="timeStamp">
                        ${song.songLength}
                        <i
                            id="${index}"
                            class="fa-solid fa-play-circle songItemPlay"
                        ></i
                    ></span>
                </div>`;
            })
            .join("");
        document.querySelector(".songsList").innerHTML = songList;

        const currentPlaying = document.querySelector("#currentPlaying");
        const playFromInside = document.querySelectorAll(".songItemPlay");

        masterPlay.addEventListener("click", () => {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();

                let songNumber = songIndex;
                songNumber.toString();

                document
                    .getElementById(songNumber)
                    .classList.remove("fa-play-circle");
                document
                    .getElementById(songNumber)
                    .classList.add("fa-pause-circle");

                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
                giff.style.opacity = 1;
            } else {
                audioElement.pause();
                masterPlay.classList.remove("fa-pause-circle");
                masterPlay.classList.add("fa-play-circle");
                giff.style.opacity = 0;
                makeAllPause();
            }
            currentPlaying.textContent = songs[songIndex].songName;
        });

        audioElement.addEventListener("timeupdate", () => {
            progress = (audioElement.currentTime / audioElement.duration) * 100;
            myProgressBar.value = progress;
        });

        myProgressBar.addEventListener("change", () => {
            audioElement.currentTime =
                (myProgressBar.value * audioElement.duration) / 100;
        });

        previousButton.addEventListener("click", () => {
            audioElement.pause();
            makeAllPause();
            if (songIndex <= 0) {
                songIndex = 9;
            } else {
                songIndex -= 1;
            }

            let songNumber = songIndex;
            songNumber.toString();

            document
                .getElementById(songNumber)
                .classList.remove("fa-play-circle");
            document
                .getElementById(songNumber)
                .classList.add("fa-pause-circle");

            audioElement.src = songs[songIndex].filePath;

            audioElement.currentTime = 0;

            audioElement.play();
            giff.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");

            currentPlaying.textContent = songs[songIndex].songName;
        });
        nextButton.addEventListener("click", () => {
            audioElement.pause();
            makeAllPause();

            if (songIndex >= 9) {
                songIndex = 0;
            } else {
                songIndex += 1;
            }

            let songNumber = songIndex;
            songNumber.toString();

            document
                .getElementById(songNumber)
                .classList.remove("fa-play-circle");
            document
                .getElementById(songNumber)
                .classList.add("fa-pause-circle");

            audioElement.src = songs[songIndex].filePath;

            audioElement.currentTime = 0;

            audioElement.play();
            giff.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");

            currentPlaying.textContent = songs[songIndex].songName;
        });

        const makeAllPause = () => {
            playFromInside.forEach((element) => {
                element.classList.add("fa-play-circle");
                element.classList.remove("fa-pause-circle");
            });
        };

        playFromInside.forEach((element) => {
            element.addEventListener("click", (e) => {
                songIndex = parseInt(e.target.id);
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    audioElement.src = songs[songIndex].filePath;

                    makeAllPause();
                    audioElement.currentTime = 0;

                    audioElement.play();
                    e.target.classList.remove("fa-play-circle");
                    e.target.classList.add("fa-pause-circle");
                    masterPlay.classList.remove("fa-play-circle");
                    masterPlay.classList.add("fa-pause-circle");
                    giff.style.opacity = 1;
                } else {
                    audioElement.pause();
                    e.target.classList.remove("fa-pause-circle");
                    e.target.classList.add("fa-play-circle");
                    masterPlay.classList.remove("fa-pause-circle");
                    masterPlay.classList.add("fa-play-circle");
                    giff.style.opacity = 0;
                }

                currentPlaying.textContent = songs[songIndex].songName;
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });
// }

// getSongs();
