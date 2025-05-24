
import { useEffect, useRef } from "react";

const ScrollReveal = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, options);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return null;
};

export default ScrollReveal;
