import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export const AnimatedFaviconWave = ({ className = '' }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const lines = svg.querySelectorAll('line');

    // Animate each line with flowing wave effect
    lines.forEach((line, index) => {
      const totalLines = lines.length;
      const progress = index / totalLines;

      // Store original coordinates
      const x1 = parseFloat(line.getAttribute('x1') || '0');
      const y1 = parseFloat(line.getAttribute('y1') || '0');
      const x2 = parseFloat(line.getAttribute('x2') || '0');
      const y2 = parseFloat(line.getAttribute('y2') || '0');

      // Animate y positions with wave effect
      const animateWave = () => {
        let elapsed = 0;
        const animate = () => {
          elapsed += 0.016; // ~60fps
          
          // Ripple wave from left to right
          const wave = Math.sin(elapsed * 0.8 + progress * Math.PI) * 6;
          
          line.setAttribute('y1', String(y1 + wave));
          line.setAttribute('y2', String(y2 + wave));
          
          // Opacity pulse
          const opacityPulse = 0.6 + Math.sin(elapsed * 0.6 + progress * Math.PI) * 0.2;
          line.style.opacity = String(opacityPulse);

          requestAnimationFrame(animate);
        };
        animate();
      };

      animateWave();
    });
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 800 800"
      className={className}
      animate={{ y: [-10, 10] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        filter: 'drop-shadow(0 0 40px rgba(0, 82, 204, 0.15))',
      }}
    >
      {/* Curved lines converging from left to top-right - exact favicon structure */}
      <line x1="50" y1="150" x2="520" y2="80" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="55" y1="170" x2="530" y2="85" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="60" y1="190" x2="540" y2="92" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="65" y1="210" x2="548" y2="100" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="70" y1="230" x2="555" y2="108" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="75" y1="250" x2="562" y2="116" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="80" y1="270" x2="568" y2="125" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="85" y1="290" x2="574" y2="134" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="90" y1="310" x2="580" y2="143" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="95" y1="330" x2="585" y2="152" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="100" y1="350" x2="590" y2="161" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="105" y1="370" x2="594" y2="170" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="110" y1="390" x2="598" y2="179" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="115" y1="410" x2="602" y2="188" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="120" y1="430" x2="605" y2="197" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="125" y1="450" x2="608" y2="206" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="130" y1="470" x2="610" y2="215" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="135" y1="490" x2="612" y2="224" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="140" y1="510" x2="613" y2="233" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="145" y1="530" x2="614" y2="242" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="150" y1="550" x2="615" y2="251" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="155" y1="570" x2="615" y2="260" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="160" y1="590" x2="614" y2="269" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="165" y1="610" x2="613" y2="278" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="170" y1="630" x2="611" y2="287" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="175" y1="650" x2="608" y2="296" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="180" y1="670" x2="605" y2="305" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="185" y1="690" x2="601" y2="314" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="190" y1="710" x2="596" y2="323" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="195" y1="730" x2="590" y2="332" stroke="#0052CC" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
    </motion.svg>
  );
};
