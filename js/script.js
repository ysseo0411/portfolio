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
        delay: 1.6,
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
