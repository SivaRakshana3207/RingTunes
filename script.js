const cards = document.querySelectorAll(".music-card");

// Disable right-click / long press menu
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Prevent dragging
document.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

cards.forEach(card => {
    const audio = card.querySelector(".audio");
    const playIcon = card.querySelector(".playIcon");
    const pauseIcon = card.querySelector(".pauseIcon");

    // Single click: Play / Pause
    card.addEventListener("click", () => {

        // Stop all other songs
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                const otherAudio = otherCard.querySelector(".audio");
                const otherPlay = otherCard.querySelector(".playIcon");
                const otherPause = otherCard.querySelector(".pauseIcon");

                otherAudio.pause();
                otherAudio.currentTime = 0;

                otherPlay.classList.remove("hidden");
                otherPause.classList.add("hidden");
            }
        });

        // Toggle current song
        if (audio.paused) {
            audio.play();

            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
        } else {
            audio.pause();

            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
        }
    });

    // Download button click
    document.querySelectorAll(".download-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent play/pause

            const card = btn.closest(".bg-white");
            const audio = card.querySelector(".audio");

            const link = document.createElement("a");
            link.href = audio.src;
            link.download = audio.src.split("/").pop();

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Double click: Download audio
    card.addEventListener("dblclick", () => {
        const link = document.createElement("a");
        link.href = audio.src;
        link.download = audio.src.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Reset icon when song ends
    audio.addEventListener("ended", () => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    });
});