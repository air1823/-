const colours = [
  "#fec5bb", "#fcd5ce", "#fae1dd", "#f8edeb", "#e8e8e4", 
  "#d8e2dc", "#ece4db", "#ffe5d9", "#ffd7ba", "#fec89a"
];

const textColours = [
  "#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"
];

let circles = [];
let columns, rows;
let spacingX, spacingY;
let circleSize = 200;
let gapRatio = 1.2;
let textColor;
let lastColorChangeTime = 0;
let colorChangeInterval = 1000; // 每隔 1000 毫秒 (1 秒) 改變一次顏色
let displayTextContent = "教科一B 林愛倪"; // 預設文字
let clickCount = 0; // 用於追蹤點擊次數

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("娃娃體"); // 設定中文可愛字體
  calculateGrid();
  generateCircles();
  textColor = generateRandomTextColour(); // 初始化文字顏色
}

function draw() {
  background('#c6b3d6');
  displayCircles();
  displayText(); // 顯示文字
}

function calculateGrid() {
  columns = floor(windowWidth / (circleSize * gapRatio));
  rows = floor(windowHeight / (circleSize * gapRatio));
  spacingX = windowWidth / (columns + 1);
  spacingY = windowHeight / (rows + 1);
}

function generateRandomColour() {
  let randomNumber = floor(random(colours.length));
  return colours[randomNumber];
}

function generateRandomTextColour() {
  let randomNumber = floor(random(textColours.length));
  return textColours[randomNumber];
}

function generateNumberFromInterval(min, max) {
  return floor(random(min, max + 1));
}

function makeCircles(x, y) {
  let randomNumberOfCircles = generateNumberFromInterval(2, 5);
  let radius = min(spacingX, spacingY) * 0.4;
  let circlesArray = [];

  for (let i = 0; i < randomNumberOfCircles; i++) {
    circlesArray.push({
      x: x,
      y: y,
      r: radius,
      color: generateRandomColour()
    });

    let randomNumberToMinusFromRadius = generateNumberFromInterval(3, 30);
    let newCircleRadius = radius - randomNumberToMinusFromRadius;

    if (newCircleRadius > 10) {
      radius = newCircleRadius;
    } else {
      radius = 0;
    }
  }

  circlesArray.push({
    x: x,
    y: y,
    r: 15,
    color: generateRandomColour()
  });

  return circlesArray;
}

function generateCircles() {
  circles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let x = (c + 1) * spacingX;
      let y = (r + 1) * spacingY;
      circles.push(makeCircles(x, y));
    }
  }
}

function displayCircles() {
  for (let circleSet of circles) {
    for (let circle of circleSet) {
      fill(circle.color);
      ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
    }
  }
}

function displayText() {
  // 控制顏色變化速度
  if (millis() - lastColorChangeTime > colorChangeInterval) {
    textColor = generateRandomTextColour();
    lastColorChangeTime = millis();
  }

  fill(textColor); // 使用緩慢變化的文字顏色
  textAlign(CENTER, CENTER);
  textSize(48); // 設定文字大小
  text(displayTextContent, width / 2, height / 2); // 在畫面正中間顯示文字
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    let circleSet = circles[i];
    for (let circle of circleSet) {
      let d = dist(mouseX, mouseY, circle.x, circle.y);
      if (d < circle.r) {
        let x = circle.x;
        let y = circle.y;
        circles[i] = makeCircles(x, y);

        // 根據點擊次數改變文字內容
        clickCount++;
        if (clickCount === 1) {
          displayTextContent = "興趣:畫畫 吃飯 睡午覺";
        } else if (clickCount === 2) {
          displayTextContent = "喜歡:貓咪 甜食 手工藝";
        } else if (clickCount === 3) {
          displayTextContent = "聯絡方式:413730549@o365.tku.edu.tw";
        } else if (clickCount === 4) {
          displayTextContent = "想更了解我不如找我聊天吧!";
        } else if (clickCount > 4) {
          displayTextContent = "教科一B 林愛倪"; // 重置為預設文字
          clickCount = 0; // 重置點擊次數
        }

        break;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateGrid();
  generateCircles();
}