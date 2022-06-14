/* preloading page */
imagesProgress();
function imagesProgress() {
  var preload = $(".preload"),
    $progressText = preload.find(".progress-text"),
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 1000 / 60);

  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  function updateProgress() {
    var target = (imgLoaded / imgTotal) * 100;

    current += (target - current) * 0.1;
    $progressText.text(Math.floor(current) + "%");

    if (current >= 100) {
      clearInterval(progressTimer);
      preload.addClass("loaded");
      $progressText.delay(1000).animate({ opacity: 0 }, function () {
        preload.fadeOut();
      });
    }
    if (current > 99.9) {
      current = 100;
    }
  }
}
