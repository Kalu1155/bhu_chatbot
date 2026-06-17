import gsap from "gsap";

export const fadeIn = (target) => {
  gsap.from(target, {
    opacity: 0,
    y: 40,
    duration: 1,
  });
};