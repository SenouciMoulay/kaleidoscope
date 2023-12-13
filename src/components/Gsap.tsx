// DropdownList.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface BoxElement extends HTMLDivElement {
    tl?: gsap.core.Timeline;
  }
  

const DropdownList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxesRef = useRef<BoxElement[]>([]); // Utilisez l'interface BoxElement ici
    const scrollDistRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const c = containerRef.current;
      const boxes = boxesRef.current;
  
      const makeBoxes = (n: number) => {
        for (let i = 0; i < n; i++) {
          const b = document.createElement('div') as BoxElement; // Assurez-vous de caster b comme BoxElement
          boxes.push(b);
          c?.appendChild(b);
        }
      };
  
      makeBoxes(30);
  
      gsap.to(c, 0.4, { perspective: 200, backgroundColor: '#fff' });
  
      boxes.forEach((b, i) => {
        gsap.set(b, {
          left: '50%',
          top: '50%',
          margin: -150,
          width: 300,
          height: 300,
          borderRadius: '20%',
          backgroundImage: `url(https://picsum.photos/300/?image=${i + 50}`,
          clearProps: 'transform',
          backfaceVisibility: 'hidden',
        });
  
        b.tl = gsap.timeline({ paused: true, defaults: { immediateRender: true } })
          .fromTo(b, {
            scale: 0.3,
            rotationX: (i / boxes.length) * 360,
            transformOrigin: '50% 50% -500%',
          }, {
            rotationX: '+=360',
            ease: 'none',
          })
          .timeScale(0.05);
  
        b.addEventListener('mouseover', (e) => { gsap.to(e.currentTarget, { opacity: 0.5, scale: 0.36, duration: 0.4, ease: 'expo' }); });
        b.addEventListener('mouseout', (e) => { gsap.to(e.currentTarget, { opacity: 1, scale: 0.3, duration: 0.2, ease: 'back.out(3)', overwrite: 'auto' }); });
        b.addEventListener('click', (e) => { if (e.currentTarget instanceof HTMLElement) window.open(e.currentTarget?.style.backgroundImage.slice(5, -2), '_blank'); });
      });
  
      ScrollTrigger.create({
        trigger: scrollDistRef.current,
        start: "top top",
        end: "bottom bottom",
        onRefresh: (self) => {
          boxes.forEach((b, i) => { if(b.tl) gsap.set(b.tl, { progress: self.progress }); });
        },
        onUpdate: (self) => {
          console.log(self.progress);
          boxes.forEach((b, i) => { if(b.tl)gsap.to(b.tl, { progress: self.progress }); });
        },
      });
    }, []);
  
    return (
      <div className="absolute">
        <div id="container" className="fixed h-full w-full overflow-hidden" ref={containerRef}></div>
        <div id="scrollDist" ref={scrollDistRef} className="top-0 w-full h-[400%]"></div>
      </div>
    );
  };

export default DropdownList;
