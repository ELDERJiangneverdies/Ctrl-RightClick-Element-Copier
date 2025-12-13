// content.js
document.addEventListener('contextmenu', async (event) => {
  if (!event.ctrlKey) return;

  event.preventDefault();
  event.stopPropagation();

  const target = event.target;
  const htmlContent = target.outerHTML;

  // Visual Highlight
  target.classList.add('ext-copy-highlight');
  setTimeout(() => {
    target.classList.remove('ext-copy-highlight');
  }, 500);

  // Copy to Clipboard
  try {
    await navigator.clipboard.writeText(htmlContent);
    showToast('元素已复制！');
  } catch (err) {
    console.error('Copy failed:', err);
    showToast('复制失败，请重试', true);
  }
}, true);

function showToast(message, isError = false) {
  const existingToast = document.getElementById('ext-copy-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.id = 'ext-copy-toast';
  toast.textContent = message;
  toast.className = 'ext-copy-toast';
  
  if (isError) toast.style.backgroundColor = 'rgba(220, 38, 38, 0.9)';

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    setTimeout(() => {
      if (toast.isConnected) toast.remove();
    }, 300);
  }, 2000);
}