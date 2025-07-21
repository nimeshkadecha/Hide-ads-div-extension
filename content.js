(function autoHideAds() {
  let blockedCount = 0;

  const hideAdDivs = () => {
    const divs = document.querySelectorAll('div');

    divs.forEach(div => {
      const id = div.id?.toLowerCase() || '';
      const classList = Array.from(div.classList).map(cls => cls.toLowerCase());

      const isAd = /ad[s]?/.test(id) || classList.some(cls => /ad[s]?/.test(cls));

      if (isAd && div.style.display !== 'none') {
        div.style.display = 'none';
        blockedCount++;
      }
    });
  };

  hideAdDivs(); // initial block
  showToast(`🚫 Blocked ${blockedCount} ad-like divs`);

  // Watch for dynamic ads
  const observer = new MutationObserver(() => {
    blockedCount = 0;
    hideAdDivs();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Simple toast UI
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#333',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      zIndex: 10000,
      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000); // auto dismiss
  }
})();
