// Set the movie release date for 11 July 2025 (USA time zone)
const releaseDate = new Date('2025-07-11T00:00:00-05:00'); // Midnight, USA Eastern Time (UTC -5)

// Function to update countdown for a given time zone
function updateCountdown(elementId, timeZoneOffset) {
    const countdownElement = document.getElementById(elementId);

    // Calculate the time difference based on the provided time zone offset
    const localReleaseDate = new Date(releaseDate.getTime() + timeZoneOffset * 60 * 60 * 1000);

    // Calculate remaining time
    const now = new Date();
    const timeRemaining = localReleaseDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update the countdown every second
    setTimeout(() => updateCountdown(elementId, timeZoneOffset), 1000);
}

// Update countdowns for USA, UK, and Japan
updateCountdown('countdown-usa', -5); // USA Eastern Time (UTC -5)
updateCountdown('countdown-uk', 0);   // UK Time (UTC 0)
updateCountdown('countdown-japan', 9); // Japan Standard Time (UTC +9)



// Ensure the audio plays after user interaction
document.getElementById('play-audio').addEventListener('click', () => {
    const audio = document.getElementById('background-audio');
    const playButton = document.getElementById('play-audio'); // Reference to the button
    audio.loop = true; // Ensure the audio loops

    if (audio.paused) {
        audio.play()
            .then(() => {
                console.log('Audio playback started.');
                playButton.style.display = 'none'; // Hide the play button
            })
            .catch(error => {
                console.error('Audio playback failed:', error);
            });
    } else {
        audio.pause();
        console.log('Audio playback paused.');
        playButton.style.display = 'none'; // Optionally hide the button even if paused
    }
});

let currentSlide = 0;
const itemsPerSlide = 4; // Number of items visible at once
const sliderItems = document.querySelectorAll('.slider-item');
const slider = document.querySelector('.slider');
const totalItems = sliderItems.length;

// Calculate the total number of slides needed
const maxSlide = Math.ceil(totalItems / itemsPerSlide) - 1;

// Buttons
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Update the slider position
function updateSliderPosition() {
    const itemWidth = sliderItems[0].offsetWidth + 16; // Include margin (adjust if needed)
    const offset = -currentSlide * itemsPerSlide * itemWidth;
    slider.style.transform = `translateX(${offset}px)`;
    slider.style.transition = 'transform 0.3s ease-in-out'; // Smooth animation
}

// Update the state of navigation buttons
function updateButtonState() {
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === maxSlide;
}

// Move to the previous slide
prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
        updateButtonState();
    }
});

// Move to the next slide
nextButton.addEventListener('click', () => {
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSliderPosition();
        updateButtonState();
    }
});

// Initialize slider
function initSlider() {
    updateSliderPosition();
    updateButtonState();
}

// Wait for DOM content to load and initialize
document.addEventListener('DOMContentLoaded', initSlider);
