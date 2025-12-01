"use client";
import { useEffect } from "react";

export default function CounterScript() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      let start = 0;
      const end = parseInt(counter.getAttribute("data-value"));
      const duration = 1200;
      const step = end / (duration / 16);

      function animate() {
        start += step;
        counter.innerText = Math.floor(start);

        if (start < end) {
          requestAnimationFrame(animate);
        } else {
          counter.innerText = end;
        }
      }

      animate();
    });
  }, []);

  return null;
}
