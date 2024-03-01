CURRENT_SET = new Set();

(function init() {
  updateSpeed();
  updateElements();
  // showDetails();
})();

// Add bind events on UI elements
$("#speed").on("input", function () {
  updateSpeed();
});

$("#elements").on("input", function () {
  updateElements();
});

// $("#algorithms").on("change", function () {
//   showDetails();
// });

$("#sort").on("click", function () {
  runAlgo();
});

$("#stop").on("click", function () {
  stopAnimation();
});

$("#reset").on("click", function () {
  reset();
});

$("#restart").on("click", function () {
  restart();
});

function updateSpeed() {
  SPEED = document.getElementById("speed").value;
  document.getElementById("speed-count").innerHTML = 101 - SPEED;
}

function updateElements() {
  clearContainer();
  TOTAL_ELEMENTS = document.getElementById("elements").value;
  document.getElementById("element-count").innerHTML = TOTAL_ELEMENTS;
  CURRENT_SET = generateRandomSet();
  insertBars(CURRENT_SET);
}

/// CHANGED
// tạo array random 1-> 100
function generateRandomSet() {
  let set = new Set();  //[50, 30, 90, 40,70]
  while (set.size < TOTAL_ELEMENTS) {
    set.add(Math.round(Math.random() * 99) + 1);
  }
  
  return set; // kiểu mảng arr
}

function clearContainer() {
  container.innerHTML = "";
}

// tạo các thanh bar cho id="bars"
function insertBars(set) {
  // CONTAINER_WIDTH =600 ben index.html truyen vao
  const width = CONTAINER_WIDTH / TOTAL_ELEMENTS;

  // Tạo bars
  const arr = Array.from(set);
  for (let i = 0; i < arr.length; ++i) {
    let bar = document.createElement("div");
    bar.setAttribute("class", "bar");
    bar.setAttribute(
      "style",
      "width: " + width + "px; height: " + arr[i] + "%;"
    );
    bar.innerHTML = arr[i]; // show ra từng bar
    container.appendChild(bar); // container = document.getElementById("bars");
  }
}

function showDetails() {
  const algo = $("select#algorithms").children("option:selected").val();
  $(".algo-container").addClass("hidden");
  $("#" + algo + "-info").removeClass("hidden");
}

function disableInput(what = true) {
  $(".sort").attr("disabled", what);
  $(".slider-input").attr("disabled", what);
  $("select#algorithms").attr("disabled", what);
  $("select#order").attr("disabled", what);

  // Swap colors
  $("#stop").attr("disabled", true).removeClass("green");

  if (what) {
    $(".sort").removeClass("green");
    $("#stop").attr("disabled", false).addClass("green");

    return;
  }

  $(".sort").addClass("green");
}

function reset() {
  stopAnimation();
  updateSpeed();
  updateElements();
}

function restart() {
  stopAnimation();
  clearContainer();
  insertBars(CURRENT_SET);
  disableInput(false);
}

// nhấn btn sort
function runAlgo() {
  if (SPEED <= 0) {
    console.log("Abnormal delay.");
    return;
  }

  // chọn thuật toán nào??
  const algo = $("select#algorithms").children("option:selected").val();
  // chọn thứ tự nào (tăng dần hay giảm dần)
  const order = $("select#order").children("option:selected").val();

  let elements = JSON.parse(JSON.stringify(getElements()));
  const solution = solve(algo, order, elements);

  if (solution) {
    disableInput();
    animate(solution);   // animation.js
  }

  // Tạo mảng bars [5,9,20,45,...] lấy từ file html
  function getElements() {
    let els = Array();
    for (let i = 0; i < bars.length; ++i) {
      els.push(parseInt(bars[i].innerHTML));
    }
    return els;
  }

  function solve(algo, order, elements) {
    switch (algo) {
      case "bubble": {
        return Algorithms.bubble(elements, order);
      }
      // case "comb": {
      //   return Algorithms.comb(elements, order);
      // }
      // case "heap": {
      //   return Algorithms.heap(elements, order);
      // }
      // case "insertion": {
      //   return Algorithms.insertion(elements, order);
      // }
      // case "selection": {
      //   return Algorithms.selection(elements, order);
      // }
      // case "shell": {
      //   return Algorithms.shell(elements, order);
      // }
      default: {
        return false;
      }
    }
  }
}
