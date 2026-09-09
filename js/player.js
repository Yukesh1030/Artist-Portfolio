document.addEventListener("DOMContentLoaded", () => {
    // Discography Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const musicItems = document.querySelectorAll('.music-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            musicItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    gsap.fromTo(item, {opacity: 0, scale: 0.9}, {opacity: 1, scale: 1, duration: 0.5});
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Custom Player Logic (Simulated since no actual audio files are provided)
    const playBtn = document.getElementById('play-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    
    let isPlaying = false;
    let progressInterval;
    let currentSeconds = 0;
    const totalSeconds = 272; // 4:32

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            
            const icon = playBtn.querySelector('i');
            if (isPlaying) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                progressInterval = setInterval(() => {
                    if (currentSeconds >= totalSeconds) {
                        clearInterval(progressInterval);
                        isPlaying = false;
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play');
                        currentSeconds = 0;
                        progressFill.style.width = '0%';
                        currentTimeEl.innerText = '0:00';
                        return;
                    }
                    currentSeconds += 1;
                    const percent = (currentSeconds / totalSeconds) * 100;
                    progressFill.style.width = `${percent}%`;
                    currentTimeEl.innerText = formatTime(currentSeconds);
                }, 1000);
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                clearInterval(progressInterval);
            }
        });
    }

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            currentSeconds = pos * totalSeconds;
            progressFill.style.width = `${pos * 100}%`;
            currentTimeEl.innerText = formatTime(currentSeconds);
        });
    }
});
