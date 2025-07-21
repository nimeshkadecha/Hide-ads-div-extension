document.getElementById("toggleAds").addEventListener("change", async (e) => {
  const hideAds = e.target.checked;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (shouldHide) => {
      const divs = document.querySelectorAll("div");
      divs.forEach((div) => {
        const id = div.id?.toLowerCase() || "";
        const classList = Array.from(div.classList).map((cls) =>
          cls.toLowerCase()
        );

        const isAd =
          id.startsWith("ad") ||
          id.startsWith("ads") ||
          classList.some(
            (cls) => cls.startsWith("ad") || cls.startsWith("ads")
          );

        if (isAd) {
          div.style.display = shouldHide ? "none" : "";
        }
      });
    },
    args: [hideAds],
  });
});
