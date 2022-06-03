gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector("#wrap");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed",
});

window.addEventListener("load", function () {
  let pinBoxes = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: pageContainer, //locomotive scroll
      scrub: true,
      trigger: "#profile",
      markers: true,
      pin: true,
      // anticipatePin: 1,
      start: "#about",
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
    ease: "none",
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
});
