window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image');

    images.forEach(image => {
        // Set random position and rotation for each image
        const randomX = Math.floor(Math.random() * 80);
        const randomY = Math.floor(Math.random() * 80);
        const randomRotation = Math.floor(Math.random() * 30) - 15; // Rotate between -15 and 15 degrees

        image.style.left = `${randomX}%`;
        image.style.top = `${randomY}%`;
        image.style.transform = `rotate(${randomRotation}deg)`;
    });
});
