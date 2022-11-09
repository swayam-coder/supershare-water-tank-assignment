import * as echarts from "echarts";

document.getElementById("array-btn").addEventListener("click", function () {
  let inputElement = document.getElementById("inputArr");
  let inputArr = inputElement.value.split(",").map((val) => parseInt(val, 10));
  let blocks = waterAndBlocks(inputArr);
  let water = onlyWater(inputArr);
  waterAndBlocks(inputArr, blocks);
  onlyWater(inputArr, water);
});

function createGraph(xaxisinput, outputArr, id) {
  let dom = document.getElementById(id);
  let myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false
  });

  let option = {
    xAxis: {
      type: "category",
      data: xaxisinput
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: outputArr,
        type: "bar"
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }

  window.addEventListener("resize", myChart.resize);
}

const countWaterUnits = (finalCase) => {
  let sum = 0;
  for (let i = 0; i < finalCase.length; i++) {
    let element = finalCase[i];
    if (element !== "-") {
      sum += +element;
    }
  }
  return sum;
};

function waterAndBlocks(blocks) {
  let finalCase = [], firstCase = [], secondCase = [], result = [], lastValueForFirstCase = 0, lastValueForSecondCase = 0;
  
  for (let i = 0; i < blocks.length; i++) {
    let element = blocks[i];
    if (element === 0) {
      firstCase.push(lastValueForFirstCase);
    } else {
      firstCase.push("-");
      lastValueForFirstCase = element;
    }
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    let element = blocks[i];
    if (element === 0) {
      secondCase[i] = lastValueForSecondCase;
    } else {
      secondCase[i] = "-";
      lastValueForSecondCase = element;
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    let fc = firstCase[i], sc = secondCase[i];
    if (fc === "-") {
      finalCase[i] = "-";
    } else {
      finalCase[i] = fc - sc > 0 ? sc : fc;
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    let element = blocks[i];
    if (element === 0) {
      result.push({
        value: finalCase[i],
        itemStyle: {
          color: "#0000FF"
        }
      });
    } else {
      result.push({
        value: element,
        itemStyle: {
          color: "#FFFF00"
        }
      });
    }
  }
  createGraph(blocks, result, "chart-container");
  let outputSpan = document.getElementById("waterunit");
  outputSpan.innerHTML = `Total ${countWaterUnits(finalCase)} Water Units`;
}

function onlyWater(water) {
  let firstCase = [], secondCase = [], finalCase = [], result = [];
  let lastValueForFirstCase = 0, lastValueForSecondCase = 0;
  
  for (let i = 0; i < water.length; i++) {
    let element = water[i];
    if (element === 0) {
      firstCase.push(lastValueForFirstCase);
    } else {
      firstCase.push("-");
      lastValueForFirstCase = element;
    }
  }
  for (let i = water.length - 1; i >= 0; i--) {
    let element = water[i];
    if (element === 0) {
      secondCase[i] = "-";
    } else {
      secondCase.push("-");
      lastValueForSecondCase = element;
    }
  }
  for (let i = 0; i < water.length; i++) {
    let fc = firstCase[i];
    let sc = secondCase[i];
    if (fc === "-") {
      finalCase[i] = "-";
    } else {
      finalCase[i] = fc - sc > 0 ? sc : fc;
    }
  }
  for (let i = 0; i < water.length; i++) {
    let element = water[i];
    if (element === 0) {
      result.push({
        value: finalCase[i],
        itemStyle: {
          color: "#0000FF"
        }
      });
    } else {
      result.push({
        value: 0,
        itemStyle: {
          color: "#0000FF"
        }
      });
    }
  }
  createGraph(water, result, "chart-container1");
}
