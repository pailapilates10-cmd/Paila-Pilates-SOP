(() => {
  const versionNodes = document.querySelectorAll('[data-version]');

  fetch('./version.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Version manifest unavailable');
      return response.json();
    })
    .then((manifest) => {
      const label = `v${manifest.current}`;
      versionNodes.forEach((node) => { node.textContent = label; });
    })
    .catch(() => {
      // The static fallback text in the HTML remains visible if the manifest cannot be loaded.
    });
})();
