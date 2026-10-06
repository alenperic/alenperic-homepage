(() => {
  'use strict';

  const button = document.getElementById('share-contact');
  const status = document.getElementById('share-status');
  if (!button || !status) return;

  const card = {
    title: 'Alen Peric — Stay in touch',
    text: 'My contact details and links.',
    url: 'https://alenperic.com/contact/'
  };
  const canShare = typeof navigator.share === 'function';
  const canCopy = Boolean(navigator.clipboard && typeof navigator.clipboard.writeText === 'function');
  if (!canShare && !canCopy) return;
  button.hidden = false;

  const copyLink = async () => {
    if (!canCopy) {
      status.textContent = 'To share, copy the page address: alenperic.com/contact';
      return;
    }
    try {
      await navigator.clipboard.writeText(card.url);
      status.textContent = 'Link copied. Ready to share.';
    } catch {
      status.textContent = 'To share, copy the page address: alenperic.com/contact';
    }
  };

  button.addEventListener('click', async () => {
    status.textContent = '';
    if (!canShare) {
      await copyLink();
      return;
    }
    try {
      await navigator.share(card);
    } catch (error) {
      // Closing the native share sheet is intentional, so no fallback is needed.
      if (error && error.name === 'AbortError') return;
      await copyLink();
    }
  });
})();
