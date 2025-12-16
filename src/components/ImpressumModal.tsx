import React, { useEffect } from 'react'
import { PORTFOLIO_OWNER } from '../constants'

interface ImpressumModalProps {
  isOpen: boolean
  onClose: () => void
}

const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
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
                Impressum
              </h1>
              <p className="text-secondary text-sm">
                Legal Notice / Angaben gemäß § 5 TMG
              </p>
            </div>

            <div className="prose prose-stone max-w-none space-y-8 text-secondary leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Information according to § 5 TMG
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {PORTFOLIO_OWNER}
                  </p>
                  <p>
                    <strong>Location:</strong> Achstetten, Germany
                  </p>
                  <p>
                    <strong>Available for:</strong> Hybrid (Ulm) & Remote
                    Projects
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Contact
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:shueny@example.com"
                      className="text-accent hover:text-orange-700 transition-colors underline-offset-4 hover:underline"
                    >
                      shueny@example.com
                    </a>
                  </p>
                  <p className="text-sm text-stone-500 italic">
                    Please note: This is a portfolio website. For professional
                    inquiries, please use the contact form or email address
                    provided.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Responsible for content
                </h2>
                <p>
                  {PORTFOLIO_OWNER} is responsible for the content of this
                  website according to § 55 Abs. 2 RStV.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Liability for Contents
                </h2>
                <p>
                  As service providers, we are liable for own contents of these
                  websites according to Sec. 7, paragraph 1 German Telemedia Act
                  (TMG). However, according to Sec. 8 to 10 German Telemedia Act
                  (TMG), service providers are not under obligation to
                  permanently monitor submitted or stored information or to
                  search for evidences that indicate illegal activities.
                </p>
                <p className="mt-4">
                  Legal obligations to removing information or to blocking the
                  use of information remain unchallenged. In this case,
                  liability is only possible at the time of knowledge about a
                  specific violation of law. Illegal contents will be removed
                  immediately at the time we get knowledge of them.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Liability for Links
                </h2>
                <p>
                  Our offer includes links to external third party websites. We
                  have no influence on the contents of those websites, therefore
                  we cannot guarantee for those contents. Providers or
                  administrators of linked websites are always responsible for
                  their own contents. The linked websites had been checked for
                  possible violations of law at the time of the establishment of
                  the link. Illegal contents were not detected at the time of
                  the linking.
                </p>
                <p className="mt-4">
                  However, a permanent monitoring of the contents of linked
                  websites cannot be imposed without reasonable indications that
                  there has been a violation of law. Illegal links will be
                  removed immediately at the time we get knowledge of them.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Copyright
                </h2>
                <p>
                  Contents and compilations published on these websites by the
                  providers are subject to German copyright laws. Reproduction,
                  editing, distribution as well as the use of any kind outside
                  the scope of the copyright law require a written permission of
                  the author or originator.
                </p>
                <p className="mt-4">
                  Downloads and copies of these websites are permitted for
                  private use only. The commercial use of our contents without
                  permission of the original author is prohibited.
                </p>
                <p className="mt-4">
                  Copyright laws of third parties are respected as long as the
                  contents on these websites do not originate from the provider.
                  Contributions of third parties on this site are indicated as
                  such. However, if you notice any violations of copyright law,
                  please inform us. Such contents will be removed immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImpressumModal
