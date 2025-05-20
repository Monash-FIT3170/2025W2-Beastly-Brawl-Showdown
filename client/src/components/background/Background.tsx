import React from 'react';

interface GameBackgroundProps {
  /**
   * Path to the background image
   */
  imagePath: string;
  /**
   * Children components to render on top of the background
   */
  children: React.ReactNode;
  /**
   * Whether to apply a blur effect to the background image
   * @default true
   */
  blurred?: boolean;
  /**
   * Opacity of the background image (0-1)
   * @default 0.7
   */
  imageOpacity?: number;
  /**
   * Whether to show the overlay pattern on top of the background
   * @default true
   */
  showOverlayPattern?: boolean;
  /**
   * Opacity of the overlay pattern (0-1)
   * @default 0.1
   */
  overlayOpacity?: number;
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  /**
   * Background color fallback/gradient
   * @default 'from-green-200 to-green-300'
   */
  fallbackGradient?: string;
}

const GameBackground: React.FC<GameBackgroundProps> = ({
  imagePath,
  children,
  blurred = true,
  imageOpacity = 0.7,
  showOverlayPattern = true,
  overlayOpacity = 0.1,
  className = '',
  fallbackGradient = 'from-green-200 to-green-300'
}) => {
  // SVG pattern for the overlay
  const overlayPatternSvg = `data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000" fill-opacity="${overlayOpacity}"%3E%3Cpath d="M0 0h40v40H0z"/%3E%3Cpath d="M20 0v40M0 20h40"/%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Fallback gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${fallbackGradient}`} />
      
      {/* Background image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ${
          blurred ? 'blur-sm' : ''
        }`}
        style={{
          backgroundImage: `url(${imagePath})`,
          opacity: imageOpacity
        }}
      />
      
      {/* Overlay pattern */}
      {showOverlayPattern && (
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("${overlayPatternSvg}")`,
            opacity: overlayOpacity
          }}
        />
      )}
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GameBackground;