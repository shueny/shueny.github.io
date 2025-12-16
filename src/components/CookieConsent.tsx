import React, { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      // Load analytics if user previously consented
      if (savedPreferences.analytics) {
        loadGoogleAnalytics();
      }
    }
  }, []);

  const loadGoogleAnalytics = () => {
    // Only load if not already loaded
    if (window.gtag) return;

    // Get Google Analytics ID from environment variable or use placeholder
    // Set VITE_GA_MEASUREMENT_ID in your .env file
    const GA_MEASUREMENT_ID =
      import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

    // Don't load if using placeholder
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn(
        'Google Analytics ID not configured. Set VITE_GA_MEASUREMENT_ID in .env file.'
      );
      return;
    }

    // Load gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR compliance
    });
  };

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setShowBanner(false);
    setShowSettings(false);
    loadGoogleAnalytics();
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);

    if (preferences.analytics) {
      loadGoogleAnalytics();
    } else {
      // Remove analytics if user disabled it
      if (window.gtag) {
        // Disable Google Analytics
        window.gtag = undefined;
        window.dataLayer = [];
      }
    }
  };

  const toggleAnalytics = () => {
    setPreferences((prev) => ({
      ...prev,
      analytics: !prev.analytics,
    }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    We use cookies to enhance your browsing experience and
                    analyze site traffic. You can choose to accept all cookies
                    or customize your preferences.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-6 py-2.5 border-2 border-stone-300 text-primary text-sm font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300 rounded-full whitespace-nowrap"
                  >
                    Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-2.5 bg-stone-100 text-primary text-sm font-bold uppercase tracking-wider hover:bg-stone-200 transition-all duration-300 rounded-full whitespace-nowrap"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-700 transition-all duration-300 rounded-full shadow-lg shadow-orange-500/20 whitespace-nowrap"
                    style={{ backgroundColor: 'hsl(var(--accent))' }}
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">
                Cookie Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-stone-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-b border-stone-200 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-primary">
                      Necessary Cookies
                    </h3>
                    <p className="text-sm text-secondary">
                      Required for the website to function properly
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-stone-100 rounded-full text-xs font-bold text-stone-600">
                    Always Active
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary mb-1">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-secondary">
                      Help us understand how visitors interact with our website
                      by collecting and reporting information anonymously
                      (Google Analytics)
                    </p>
                  </div>
                  <button
                    onClick={toggleAnalytics}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ml-4 ${
                      preferences.analytics ? 'bg-accent' : 'bg-stone-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        preferences.analytics
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-700 transition-all duration-300 rounded-full shadow-lg shadow-orange-500/20"
                  style={{ backgroundColor: 'hsl(var(--accent))' }}
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 border-2 border-stone-300 text-primary text-sm font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default CookieConsent;
