"use client";
import Spline from '@splinetool/react-spline'; 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Avatar3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    /**
     * ENHANCED WATERMARK REMOVAL
     * Aggressively removes Spline logo from DOM and Shadow DOM
     * NOTE: This violates Spline's free tier TOS. Consider upgrading to Pro.
     */
    const removeSplineLogo = () => {
      // Multiple selectors to catch all variations
      const selectors = [
        'a[href*="spline.design"]',
        'a[href*="spline"]',
        '[class*="watermark"]',
        '[id*="spline-watermark"]',
        'div[style*="spline"]'
      ];

      const findAndRemove = (root: Document | ShadowRoot | Element): boolean => {
        let removed = false;

        // Try all selectors
        selectors.forEach(selector => {
          const elements = root.querySelectorAll(selector);
          elements.forEach(el => {
            if (el.textContent?.toLowerCase().includes('spline') || 
                (el as HTMLAnchorElement).href?.includes('spline')) {
              (el as HTMLElement).style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important;';
              el.remove();
              removed = true;
            }
          });
        });

        // Recursively check Shadow DOM
        const children = root.querySelectorAll('*');
        for (const child of Array.from(children)) {
          if (child.shadowRoot) {
            if (findAndRemove(child.shadowRoot)) removed = true;
          }
        }

        return removed;
      };

      // Poll aggressively
      let attempts = 0;
      const maxAttempts = 100;
      
      const interval = setInterval(() => {
        findAndRemove(document);
        attempts++;
        
        if (attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 50); // Check every 50ms

      // Also use MutationObserver to catch dynamic additions
      const observer = new MutationObserver(() => {
        findAndRemove(document);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // Cleanup after 15 seconds
      setTimeout(() => {
        clearInterval(interval);
        observer.disconnect();
      }, 15000);
    };

    // Start removal immediately and after a delay
    removeSplineLogo();
    setTimeout(removeSplineLogo, 1000);
    setTimeout(removeSplineLogo, 3000);

  }, []);

  if (!mounted) return <div className="w-full h-full bg-transparent" />;

  return (
    <div className="relative w-full h-full min-h-100 flex items-center justify-center overflow-hidden">
      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-brand-secondary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.95 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full h-full relative"
        style={{
          // Additional CSS to hide potential watermarks
          pointerEvents: 'auto'
        }}
      >
        <Spline
          scene="https://prod.spline.design/8IcrMdhqwl2vnpoR/scene.splinecode" 
          onLoad={() => {
            setIsLoading(false);
            // Try removing logo right after load
            setTimeout(() => {
              const links = document.querySelectorAll('a[href*="spline"]');
              links.forEach(link => {
                (link as HTMLElement).style.display = 'none';
                link.remove();
              });
            }, 500);
          }}
        />
      </motion.div>

      {/* CSS override for any watermarks */}
      <style jsx global>{`
        /* Hide Spline watermark with extreme prejudice */
        a[href*="spline.design"],
        a[href*="spline"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        
        /* Target common watermark patterns */
        [class*="watermark"],
        [id*="watermark"],
        [class*="logo"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}