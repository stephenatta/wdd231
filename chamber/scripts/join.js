// ====== Set Current Timestamp ======
document.getElementById('timestamp').value = new Date().toISOString();

// ====== Modal Functionality ======
const modalButtons = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.close-modal');

modalButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});

// Close modal on backdrop click
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });
});
