// 로딩 소스
function imagesProgress() {
  let $container = $("#progress"),
    $progressText = $container.find(".progress-text"),
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 2000 / 60);

  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  function updateProgress() {
    let target = (imgLoaded / imgTotal) * 100;

    current += (target - current) * 0.1;
    $progressText.text(Math.floor(current) + "%");

    if (current >= 100) {
      clearInterval(progressTimer);
      $container
        .animate({ opacity: "0" }, 1500, "easeInOutQuint")
        .animate({ top: "-100%" }, 1500);

      gsap.to("#header", {
        top: 0,
        opacity: 1,
        duration: 2.5,
        delay: 0.5,
        ease: "circ.out",
      });

      gsap.to("#mainview .right .main_img", {
        opacity: 1,
        duration: 0.5,
        delay: 1,
      });

      gsap.to("#mainview .line", {
        opacity: 1,
        duration: 0.5,
        delay: 1,
      });

      gsap.to("#mainview .left .planet", {
        opacity: 1,
        duration: 0.5,
        delay: 1.9,
      });

      gsap.to("#mainview .contents .scrolldown", {
        opacity: 1,
        duration: 1,
        delay: 2.2,
      });

      gsap.to("#mainview .left h2 span", {
        opacity: 1,
        y: 0,
        duration: 3.5,
        delay: 2.7,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
      });

      gsap.to("#mainview .left p span", {
        opacity: 1,
        duration: 0.6,
        delay: 3.2,
        stagger: 0.03,
      });

      gsap.to("#mainview .left a", {
        opacity: 1,
        duration: 0.6,
        delay: 8.5,
        stagger: 0.03,
      });
    }
    if (current > 99.9) {
      current = 100;
    }
  }
}
imagesProgress();

// 텍스트 분할하기
$(".splice").each(function () {
  let txt = $(this).text();
  let split = txt.split("").join("</span><span aria-hidden='true'>");
  split = "<span aria-hidden='true'>" + split + "</span>";
  $(this).html(split).attr("aria-label", txt);
});

// 메뉴 클릭시 부드러운 움직임
const navbarMenu = document.querySelector(".nav, #header");

navbarMenu.addEventListener("click", (event) => {
  // console.log(event.target.dataset.link);

  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  //위의 코드 이동 후 다시 체크!
  // console.log(event.target.dataset.link);

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });

  $("html, body").animate({ scrollTop: totalPos }, 2000, "easeOutBounce");
});

// script 버튼 호버 효과
$(".script .btn a").hover(
  function () {
    $(".script .middle-box").css({
      "background-color": "#b5e5c4",
      transition: "0.2s",
    });
    $(".script .bottom-box").css({ "background-color": "#ccc" });
  },
  function () {
    $(".script .middle-box, .script .bottom-box").css(
      "background-color",
      "#fff"
    );
  }
);

function btnclick() {
  $(".script .top-box").css({});
}

// 마우스 커서 효과
const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor__circle");

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener("mouseleave", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.remove(className);
  });
});
