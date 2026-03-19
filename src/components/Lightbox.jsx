import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Lightbox.css';

export default function Lightbox({ images, activeIndex, onClose, onNav }) {
  const isOpen = activeIndex !== null;
  const total = images.length;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNav((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onNav]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNav((activeIndex + 1) % total);
  }, [activeIndex, total, onNav]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const current = isOpen ? images[activeIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
          {total > 1 && (
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={current.image}
                alt={current.name}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <span className="lightbox-cat">{current.category}</span>
                <h3 className="lightbox-name">{current.name}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          {total > 1 && (
            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="lightbox-counter">
            {activeIndex + 1} / {total}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
