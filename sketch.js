let input;
let slider;
let button;
let dropdown;
let isBouncing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.size(300, 50);
  input.value('Hello, World!');
  input.style('font-size', '50px');
  input.style('font-family', 'Arial');
  
  slider = createSlider(28, 50, 32);
  slider.position(input.x + input.width + 10, 10);
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 80, 10);
  button.mousePressed(() => isBouncing = !isBouncing);
  
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
  dropdown.option(''); // 預設選項為空白
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('iclass');
  dropdown.changed(() => {
    let selected = dropdown.value();
    if (selected === '淡江大學') {
      window.location.href = 'https://www.tku.edu.tw/';
    } else if (selected === '教育科技學系') {
      window.location.href = 'https://www.et.tku.edu.tw/';
    } else if (selected === 'iclass') {
      window.location.href = 'https://iclass.tku.edu.tw/';
    }
  });
}

function draw() {
  background(0); // 設定背景顏色為黑色
  let txt = input.value();
  textAlign(CENTER, CENTER);
  textSize(slider.value()); // 根據滑桿的值設定文字大小
  fill(255); // 設定文字顏色為白色
  textAlign(LEFT, CENTER);
  textSize(16);
  text("文字大小", slider.x + slider.width + 10, slider.y + slider.height / 2);
  
  textAlign(CENTER, CENTER);
  textSize(slider.value());
  if (txt.length > 0) {
    let spacedTxt = txt.split('').join(' ');
    let lines = (height - 100) / 40; // 每行之間的間隔
    for (let i = 0; i < lines; i++) {
      let displayTxt = '';
      while (textWidth(displayTxt + spacedTxt) < width) {
        displayTxt += spacedTxt + ' ';
      }
      if (isBouncing) {
        let yOffset = sin(frameCount * 0.1 + i) * 10; // 每個文字跳動的幅度相同，頻率不相同
        text(displayTxt, width / 2, 100 + (i * 40) + yOffset);
      } else {
        text(displayTxt, width / 2, 100 + (i * 40));
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
