import { useEffect, useState } from 'react';

interface TypeWriterProps {
  texts: string[];
  delay?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  texts,
  delay = 1500,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseBetween = 2000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!texts.length) return;

    // Initial delay before starting
    if (currentText === '' && !isDeleting) {
      timeout = setTimeout(() => {
        const nextChar = texts[currentTextIndex].charAt(currentText.length);
        setCurrentText((prev) => prev + nextChar);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      // Deleting text
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText.length === 1) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, deletingSpeed);
    } else {
      // Typing text
      if (currentText === texts[currentTextIndex]) {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBetween);
      } else {
        timeout = setTimeout(() => {
          const nextChar = texts[currentTextIndex].charAt(currentText.length);
          setCurrentText((prev) => prev + nextChar);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    delay,
    typingSpeed,
    deletingSpeed,
    pauseBetween,
  ]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypeWriter;
