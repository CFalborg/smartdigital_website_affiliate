/**
 * SmartDigital – Affiliate tracking
 * Forwards UTM params from ManyChat to PartnerStack affiliate links
 */
(function () {
  'use strict';

  function getUTMParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
    };
  }

  function appendUTMs(url, utms) {
    try {
      var u = new URL(url);
      Object.keys(utms).forEach(function (k) {
        if (utms[k]) u.searchParams.set(k, utms[k]);
      });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function trackClick(product, url) {
    // Extend here with PartnerStack SDK when live:
    // window.gr && window.gr('track', 'conversion', { email: '' });
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'affiliate_click',
        affiliate_product: product,
        affiliate_url: url,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var utms = getUTMParams();
    var links = document.querySelectorAll('a[data-affiliate-product]');
    links.forEach(function (link) {
      link.href = appendUTMs(link.href, utms);
      link.addEventListener('click', function () {
        trackClick(link.dataset.affiliateProduct || '', link.href);
      });
    });
  });
})();
