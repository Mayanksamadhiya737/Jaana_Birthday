// Gallery Data - 9 images (use images from puzzle folder)
const galleryImages = [
    'assets/gallery/tile1.jpeg',
    'assets/gallery/tile2.jpeg',
    'assets/gallery/tile3.jpeg',
    'assets/gallery/tile4.jpeg',
    'assets/gallery/tile5.jpeg',
    'assets/gallery/tile6.jpeg',
    'assets/gallery/tile7.jpeg',
    'assets/gallery/tile8.jpeg',
    'assets/gallery/tile9.webp',
];

let currentSlideIndex = 0;
let lightboxIndex = 0;
let autoPlayInterval;
const AUTO_PLAY_DELAY = 3000; // 3 seconds

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function() {
    renderGridView();
    document.getElementById('totalSlides').textContent = galleryImages.length;
    if (galleryImages.length > 0) {
        showSlide(0);
    }
    switchToGrid(); // Grid first
});

function renderGridView() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image}" alt="Gallery image ${index + 1}" loading="lazy">
            <div class="gallery-item-overlay">
                <i class="fas fa-expand"></i>
            </div>
        `;
        item.onclick = () => openLightbox(index);
        galleryGrid.appendChild(item);
    });
}

// Lightbox Functions
function openLightbox(index) {
    lightboxIndex = index;
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    img.src = galleryImages[lightboxIndex];
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[lightboxIndex];
}

function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[lightboxIndex];
}

// Slideshow Functions
function showSlide(index) {
    const img = document.getElementById('slideshowImage');
    img.src = galleryImages[index];
    currentSlideIndex = index;
    document.getElementById('currentSlide').textContent = index + 1;
    
    // Update progress bar
    const progress = ((index + 1) / galleryImages.length) * 100;
    document.getElementById('slideProgress').style.width = progress + '%';
}

function nextSlide() {
    let next = (currentSlideIndex + 1) % galleryImages.length;
    showSlide(next);
    resetAutoPlay();
}

function previousSlide() {
    let prev = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
    showSlide(prev);
    resetAutoPlay();
}

// Auto-play Functions
function startAutoPlay() {
    clearInterval(autoPlayInterval); // VERY IMPORTANT
    autoPlayInterval = setInterval(() => {
        let next = (currentSlideIndex + 1) % galleryImages.length;
        showSlide(next);
    }, AUTO_PLAY_DELAY);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// View Toggle Functions
function switchToGrid() {
    document.getElementById('gridView').classList.add('active');
    document.getElementById('slideshowView').classList.remove('active');
    
    document.querySelectorAll('.toggle-btn')[0].classList.add('active');
    document.querySelectorAll('.toggle-btn')[1].classList.remove('active');

    clearInterval(autoPlayInterval); // Stop autoplay
}

function switchToSlideshow() {
    document.getElementById('gridView').classList.remove('active');
    document.getElementById('slideshowView').classList.add('active');
    
    document.querySelectorAll('.toggle-btn')[0].classList.remove('active');
    document.querySelectorAll('.toggle-btn')[1].classList.add('active');

    startAutoPlay(); // Always restart autoplay
}

// Navigation
function goToOptions() {
    window.location.href = 'options.html';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    if (document.getElementById('lightboxModal').style.display === 'flex') {
        if (event.key === 'ArrowRight') nextLightbox();
        if (event.key === 'ArrowLeft') prevLightbox();
        if (event.key === 'Escape') closeLightbox();
    }
});

// Keyboard navigation for slideshow
document.addEventListener('keydown', function(event) {
    if (document.getElementById('slideshowView').classList.contains('active')) {
        if (event.key === 'ArrowRight') nextSlide();
        if (event.key === 'ArrowLeft') previousSlide();
    }
});
