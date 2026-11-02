document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const cards = Array.from(track.children);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    // Account for desktop margin/gap adjustment
    const isDesktop = window.innerWidth >= 768;
    const gap = isDesktop ? 20 : 0; 
    
    // Calculate displacement amount
    const amountToMove = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${amountToMove}px)`;
    
    // Enable/Disable buttons based on limits
    const maxIndex = isDesktop ? cards.length - 2 : cards.length - 1;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  nextBtn.addEventListener('click', () => {
    const isDesktop = window.innerWidth >= 768;
    const maxIndex = isDesktop ? cards.length - 2 : cards.length - 1;
    
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Handle window resizing dynamically to keep layout intact
  window.addEventListener('resize', () => {
    // Reset index safely on screen resize to prevent layout breaking
    currentIndex = 0;
    updateCarousel();
  });

  // Initial call to set button states
  updateCarousel();
});
