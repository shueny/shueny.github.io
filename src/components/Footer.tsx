import React, { useState } from 'react';
import ImpressumModal from './ImpressumModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import { useLanguage, LanguageProvider } from '../contexts/LanguageContext'; // 👈 1. 確保引入 LanguageProvider

// 2. 將原本的 Footer 邏輯改名為 "FooterContent"
const FooterContent: React.FC = () => {
  const { t } = useLanguage(); // 這裡可以安全使用 hook，因為外層有 Provider
  const currentYear = new Date().getFullYear();
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <>
      <footer className="bg-primary text-white border-t border-stone-800">
        <div className="container mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-400">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <p>
                © {currentYear} {t.footer.copyright}.{' '}
                {t.footer.allRightsReserved}.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowImpressum(true)}
                  className="hover:text-accent transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  {t.footer.impressum}
                </button>
                <span className="text-stone-600">|</span>
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="hover:text-accent transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  {t.footer.privacyPolicy}
                </button>
              </div>
            </div>
            <div className="flex gap-6 text-xs font-mono">
              <span className="hover:text-accent transition-colors cursor-default">
                {t.footer.designedWith}
              </span>
              <span className="hover:text-accent transition-colors cursor-default">
                React 18
              </span>
              <span className="hover:text-accent transition-colors cursor-default">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </footer>
      <ImpressumModal
        isOpen={showImpressum}
        onClose={() => setShowImpressum(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </>
  );
};

// 3. 匯出包裹好的組件
const Footer: React.FC = () => {
  return (
    <LanguageProvider>
      <FooterContent />
    </LanguageProvider>
  );
};

export default Footer;
