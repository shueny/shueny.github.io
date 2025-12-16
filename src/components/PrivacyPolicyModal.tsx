import React, { useEffect } from 'react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Drawer - Slides up from bottom */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-white/80 backdrop-blur-xl rounded-t-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 ease-out"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-60px)] px-6 md:px-12 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
                Privacy Policy
              </h1>
              <p className="text-secondary text-sm">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="prose prose-stone max-w-none space-y-8 text-secondary leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  1. Data Protection Overview
                </h2>
                <p>
                  The following information provides a simple overview of what
                  happens to your personal data when you visit this website.
                  Personal data is any data with which you can be personally
                  identified.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  2. Data Collection on This Website
                </h2>
                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  Who is responsible for data collection?
                </h3>
                <p>
                  Data processing on this website is carried out by the website
                  operator. You can find their contact details in the Impressum
                  section of this website.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  How do we collect your data?
                </h3>
                <p>
                  Some data is collected when you provide it to us. This could,
                  for example, be data you enter in a contact form or when using
                  the chat widget.
                </p>
                <p>
                  Other data is collected automatically by our IT systems when
                  you visit the website. This is mainly technical data (e.g.,
                  internet browser, operating system, or time of page view).
                  This data is collected automatically as soon as you enter this
                  website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  3. Cookies & Analytics
                </h2>
                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  What are cookies?
                </h3>
                <p>
                  Cookies are small text files that are stored on your device
                  when you visit a website. They help the website remember your
                  preferences and improve your browsing experience.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  Types of cookies we use
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    <strong>Necessary Cookies:</strong> These are essential for
                    the website to function properly and cannot be disabled.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> We use Google Analytics
                    to understand how visitors interact with our website. These
                    cookies collect information anonymously and help us improve
                    our site. You can opt-out of these cookies through our
                    cookie consent banner.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  Google Analytics
                </h3>
                <p>
                  If you consent to analytics cookies, this website uses Google
                  Analytics, a web analytics service provided by Google Inc.
                  Google Analytics uses cookies to analyze how visitors use the
                  site. The information generated by the cookie about your use
                  of the website (including your IP address) will be transmitted
                  to and stored by Google on servers in the United States.
                </p>
                <p className="mt-4">
                  We use IP anonymization, which means your IP address will be
                  truncated before being sent to Google. You can opt-out of
                  Google Analytics by disabling analytics cookies in our cookie
                  settings or by installing the{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-orange-700 underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  4. Chat Widget & AI Services
                </h2>
                <p>
                  This website uses a chat widget powered by Google Gemini AI.
                  When you interact with the chat widget:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    Your messages are processed by Google Gemini AI services
                  </li>
                  <li>
                    Conversation data may be stored temporarily for the purpose
                    of providing responses
                  </li>
                  <li>
                    We do not share your personal information with third parties
                    except as necessary to provide the service
                  </li>
                </ul>
                <p className="mt-4">
                  By using the chat widget, you consent to the processing of
                  your data by Google Gemini AI in accordance with Google's
                  privacy policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  5. Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    Request information about your personal data we process
                  </li>
                  <li>Request correction of inaccurate personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  If you have any questions or concerns about your data, please
                  contact us using the information provided in the Impressum
                  section.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  6. SSL or TLS Encryption
                </h2>
                <p>
                  This site uses SSL or TLS encryption for security reasons and
                  to protect the transmission of confidential content. You can
                  recognize an encrypted connection by the fact that the address
                  line of the browser changes from "http://" to "https://" and
                  by the lock symbol in your browser line.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  7. Contact
                </h2>
                <p>
                  For questions about data protection, please contact us using
                  the information provided in the Impressum section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyModal

