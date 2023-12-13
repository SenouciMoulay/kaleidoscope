import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const ListItem: React.FC<{ text: string; scale: number }> = ({ text, scale }) => {
  const style = {
    transform: `scale(${scale})`,
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div className={`text-white p-2 text-center`} style={style}>
      {text}
    </div>
  );
};

const ScrollingList: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef([]);
  const requestRef = useRef<number>();
  const scrollAnimationRef = useRef<number>();

  const mockData = [
    'Daniel Arscham', 'Simon buzé', 'Chien de la casse', 'Bertrand Monsieur', 'Madame Image',
    'Mystère Boule', 'Imagines Wesh', 'Daniel Arscham', 'Simon buzé', 'Chien de la casse', 'Bertrand Monsieur', 'Madame Image',
    'Mystère Boule', 'Imagines Wesh', 'Daniel Arscham', 'Simon buzé', 'Chien de la casse', 'Bertrand Monsieur', 'Madame Image',
    'Mystère Boule', 'Imagines Wesh', 'Daniel Arscham', 'Simon buzé', 'Chien de la casse', 'Bertrand Monsieur', 'Madame Image',
    'Mystère Boule', 'Imagines Wesh'
  ];
  const [activeIndex, setActiveIndex] = useState(Math.floor(mockData.length / 2));

  const calculateScale = (index: number) => {
    const difference = Math.abs(index - activeIndex);
    return Math.max(1 - difference * 0.2, 0.5);
  };

  const smoothScrollTo = (targetPosition) => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current); // Annuler l'animation en cours
    }

    const startPosition = listRef.current.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 500; // Durée de l'animation
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // S'assurer que le progrès ne dépasse pas 1
      const nextScrollPosition = startPosition + distance * progress;

      listRef.current.scrollTop = nextScrollPosition;

      if (timeElapsed < duration) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  const updateActiveIndex = () => {
    if (listRef.current) {
      const centerPosition = listRef.current.offsetHeight / 2 + listRef.current.scrollTop;
      let closest = Number.MAX_VALUE;
      let closestIndex = 0;

      itemRefs.current.forEach((ref, index) => {
        const itemPosition = ref.offsetTop + ref.clientHeight / 2;
        const distance = Math.abs(centerPosition - itemPosition);

        if (distance < closest) {
          closest = distance;
          closestIndex = index;
        }
      });

      if (activeIndex !== closestIndex) {
        setActiveIndex(closestIndex);
        const targetScrollPosition = itemRefs.current[closestIndex].offsetTop - (listRef.current.offsetHeight / 2) + (itemRefs.current[closestIndex].clientHeight / 2);
        smoothScrollTo(targetScrollPosition);
      }
    }
  };

  const handleScroll = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(updateActiveIndex);
  };

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, mockData.length);

    if (listRef.current && itemRefs.current[activeIndex]) {
      const centerElement = itemRefs.current[activeIndex];
      const centerPosition = centerElement.offsetTop + centerElement.clientHeight / 2;
      const scrollPosition = centerPosition - listRef.current.offsetHeight / 2;
      listRef.current.scrollTop = scrollPosition;
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [mockData]);

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="overflow-auto h-64"
      style={{ scrollBehavior: 'smooth' }}
    >
      {mockData.map((item, index) => (
        <div ref={el => itemRefs.current[index] = el} key={index}>
          <ListItem text={item} scale={calculateScale(index)} />
        </div>
      ))}
    </div>
  );
};

export default ScrollingList;
