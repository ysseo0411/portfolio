// 결과보기 버튼을 클릭하면 경고창을 띄어주세요.
document.querySelectorAll(".result").forEach((el) => {
  el.querySelector("h4").addEventListener("click", () => {
    el.classList.toggle("active");
    // el.style.transition = "all 0.5s";
  });
});

// document.querySelectorAll(".result").forEach(function(el){
//     console.log(el);
//     el.addEventListener("click", function(){
//         el.classList.toggle("active");
//     });
// });
