import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionTitleProps {
  textMain: string;
  textAccent?: string;
  className?: string;
  triggerOnce?: boolean;
  accentClassName?: string; // 用于 accent 部分的额外样式（如 serif italic）
  textColor?: string; // 主文字颜色，默认使用 primary
  accentColor?: string; // accent 文字颜色，默认使用 accent
  strokeColor?: string; // 描边颜色
  textSize?: string; // 自定义文字大小类，默认 'text-4xl md:text-5xl'
  fontFamily?: string; // 自定义字体类，默认 'font-sans'
}

/**
 * AnimatedSectionTitle - 大標題 stroke-to-fill 動畫元件
 * 
 * 當 section 進入視窗時，標題文字會從左到右從描邊逐漸填滿色彩。
 * 使用雙層文字結構：底層為描邊文字，上層為實心文字，透過 clip-path 實現填滿動畫。
 */
const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
  textMain,
  textAccent,
  className = '',
  triggerOnce = true,
  accentClassName = '',
  textColor = 'hsl(var(--primary))',
  accentColor = 'hsl(var(--accent))',
  strokeColor = 'rgba(120, 113, 108, 0.3)',
  textSize = 'text-4xl md:text-5xl',
  fontFamily = 'font-sans',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated.current) {
            setIsVisible(true);
            if (triggerOnce) {
              hasAnimated.current = true;
              if (containerRef.current) {
                observer.unobserve(containerRef.current);
              }
            }
          } else if (!triggerOnce) {
            setIsVisible(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.4,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, [triggerOnce]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ lineHeight: '1.2' }}
    >
      {/* 底層：描邊文字（一直顯示） */}
      <h2
        className={`${textSize} ${fontFamily} font-bold mb-6 leading-tight tracking-tight`}
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px ${strokeColor}`,
          textStroke: `1px ${strokeColor}`,
        }}
      >
        {textMain}
        {textAccent && (
          <span className={`font-serif italic ${accentClassName}`}>
            {' '}
            {textAccent}
          </span>
        )}
      </h2>

      {/* 上層：實心文字（由左到右填滿） */}
      <h2
        className={`absolute top-0 left-0 ${textSize} ${fontFamily} font-bold mb-6 leading-tight tracking-tight ${
          isVisible ? 'title-fill-visible' : 'title-fill-hidden'
        }`}
        style={{
          color: textColor,
        }}
      >
        {textMain}
        {textAccent && (
          <span
            className={`font-serif italic ${accentClassName}`}
            style={{ color: accentColor }}
          >
            {' '}
            {textAccent}
          </span>
        )}
      </h2>
    </div>
  );
};

export default AnimatedSectionTitle;

