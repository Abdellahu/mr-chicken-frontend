import  { useEffect, useRef, useState } from "react";
import "./UseHopUp.css";

function UseHopUp(threshold = 0.1) {
  const elementRef = useRef(null);
  const [isvisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: threshold,
      }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);
  return { elementRef, isvisible };
}

export default UseHopUp;
