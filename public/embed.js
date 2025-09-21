(function() {
  // Configuration object - can be customized
  const config = window.FeedbackWidgetConfig || {};
  
  const position = config.position || 'bottom-right';
  const primaryColor = config.primaryColor || '%23365fb8'; // URL encoded blue
  const companyName = config.companyName || 'Company';
  const baseUrl = config.baseUrl || window.location.origin;

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `${baseUrl}/#/widget?position=${position}&color=${primaryColor}&company=${encodeURIComponent(companyName)}`;
  iframe.style.cssText = `
    position: fixed !important;
    ${position.includes('bottom') ? 'bottom: 0 !important;' : 'top: 0 !important;'}
    ${position.includes('right') ? 'right: 0 !important;' : 'left: 0 !important;'}
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    z-index: 999999 !important;
    pointer-events: none !important;
    background: transparent !important;
  `;

  // Allow pointer events only on the widget area
  iframe.onload = function() {
    iframe.style.pointerEvents = 'auto';
  };

  // Append to body
  document.body.appendChild(iframe);
})();