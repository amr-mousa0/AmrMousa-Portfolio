/**
 * Pushes custom events to GTM dataLayer, GA4 (gtag), and Meta Pixel (fbq).
 * @param {string} eventName - The name of the event (e.g., 'cta_click')
 * @param {object} eventData - Additional payload for the event
 */
export function trackClick(eventName, eventData = {}) {
  if (typeof window !== 'undefined') {
    // 1. GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });

    // 2. Google Analytics (GA4)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    }

    // 3. Meta Pixel (fbq)
    if (typeof window.fbq === 'function') {
      if (eventName === 'contact_click' || eventName === 'contact_submit') {
        window.fbq('track', 'Contact', eventData);
      } else {
        window.fbq('trackCustom', eventName, eventData);
      }
    }
  }
}
