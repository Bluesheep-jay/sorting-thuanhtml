

var Element = function (el) {
  this.el = el;
  this.x = el.position().left;
  this.y = el.position().top;
};

let SPEED_ANI = 200;

function swap2(elem0, elem1) {
  if(SPEED >= 90) SPEED_ANI = 1000;
  else if(SPEED >= 75) SPEED_ANI = 800;
  else if(SPEED >= 60) SPEED_ANI = 600;
  else if(SPEED >= 50) SPEED_ANI = 500;
  else if(SPEED >= 40) SPEED_ANI = 400;
  else if(SPEED >= 20) SPEED_ANI = 300;
  else if(SPEED >= 10) SPEED_ANI = 100;
  else if(SPEED >= 5 ) SPEED_ANI = 50;
  else if(SPEED >= 0 ) SPEED_ANI = 0;

  elem0 = elem0.jquery ? elem0 : $(elem0);
  elem1 = elem1.jquery ? elem1 : $(elem1);

  var el1 = new Element(elem0);
  var el2 = new Element(elem1);
  var dir = "left";
  var pos1 = el1.el.offset()[dir];
  var pos2 = el2.el.offset()[dir];

  var endPt = pos2 - pos1;
  var a = el1.el;
  var b = el2.el;
  var aprop = {};
  var bprop = {};

  bprop[dir] = "-=" + endPt;
  endPt = endPt;
  aprop[dir] = "+=" + endPt;

  b.css({ "z-index": -1 });
  b.animate(bprop, {
    duration: SPEED_ANI,
  });
  a.css({ "z-index": "1" });
  a.animate(aprop, {
    duration: SPEED_ANI,
  });
}

let ANIMATION_FRAMES = []; 
function animate(solution) {
  ANIMATION_FRAMES = [];
  solution.addFrame(new Frame());
  const frames = solution.getFrames();

  for (let i = 0; i < frames.length; ++i) {
    (function (i) {
      ANIMATION_FRAMES.push(
        setTimeout(function () {
          $(".bar").removeClass("compared");
          const lastFrame = i == frames.length - 1; // True or F
          const elem = frames[i].elements; // lấy giá trị của frames[i].elements
          const highlight = frames[i].highlights; // có thể có hoặc ko

          // Highlight compared elements (bg-blue)
          if (highlight.length)
            for (h = 0; h < highlight.length; ++h)
              $(bars[highlight[h]]).addClass("compared");

          if (elem.length) {
            swap2(bars[elem[0]], bars[elem[1]]);
            let tmp0 = elem[0];
            let tmp1 = elem[1];
            for (let j = i; j < frames.length; ++j) {
              if (frames[j].elements.length) {
                if (frames[j].elements[0] == tmp0) {
                  frames[j].elements[0] = tmp1;
                } else if (frames[j].elements[0] == tmp1) {
                  frames[j].elements[0] = tmp0;
                }
                if (frames[j].elements[1] == tmp0) {
                  frames[j].elements[1] = tmp1;
                } else if (frames[j].elements[1] == tmp1) {
                  frames[j].elements[1] = tmp0;
                }
              }

              if (frames[j].highlights[0] == tmp0) {
                frames[j].highlights[0] = tmp1;
              } else if (frames[j].highlights[0] == tmp1) {
                frames[j].highlights[0] = tmp0;
              }
              if (frames[j].highlights[1] == tmp0) {
                frames[j].highlights[1] = tmp1;
              } else if (frames[j].highlights[1] == tmp1) {
                frames[j].highlights[1] = tmp0;
              }
            }
          }
          if (lastFrame) {
            $("#stop").attr("disabled", true).removeClass("green");
          }
        }, SPEED * TOTAL_ELEMENTS * i *2)
      );
    })(i);
  }
}

// stop btn
function stopAnimation() {
  for (let i = 0; i < ANIMATION_FRAMES.length; ++i) {
    clearTimeout(ANIMATION_FRAMES[i]);
  }

  $(".bar").removeClass("compared");
  disableInput(false);
}
