const preview = document.querySelector('#preview-dialog');
const previewImage = document.querySelector('#preview-image');
const previewTitle = document.querySelector('#preview-title');
let previewTrigger;

function closePreview() {
  preview.close();
  document.body.classList.remove('preview-open');
  previewImage.removeAttribute('src');
  previewTrigger?.focus({ preventScroll: true });
}

document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => {
    previewTrigger = button;
    previewTitle.textContent = button.dataset.previewTitle;
    previewImage.alt = button.dataset.previewTitle;
    previewImage.src = button.dataset.preview;
    preview.showModal();
    document.body.classList.add('preview-open');
  });
});

document.querySelector('.preview-close')?.addEventListener('click', closePreview);
preview?.addEventListener('cancel', event => { event.preventDefault(); closePreview(); });
preview?.addEventListener('click', event => {
  if (event.target !== preview) return;
  const rect = preview.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePreview();
});
