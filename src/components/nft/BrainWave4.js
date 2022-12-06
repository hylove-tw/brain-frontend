///////////////////////////----------------------------腦波第三範例 冰淇淋
//資料吃01
var row = 1
var start = 1
var step = 2
var bgColors = ["#dbc2cf", "#9fa2b2", "#3c7a89", "#2e4756", "#16262e", "#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3", "#246eb9", "#4cb944", "#fdfffc", "#f5ee9e", "#f06543", "#861657", "#a64253", "#d56aa0", "#bbdbb4", "#fcf0cc", "#fffab6"]
var colors = ["#9b4d29", "#fde163", "#cad4a5", "#ffceca", "#f7b7f6", "#f2eddb"]
var colors2 = ["#eadb80", "#A6FFCC", "#00FFFF", "#DE3163", "#990036"]
var allemoClr = ["#faf6ee", "#cb9b8d", "#f8a5a8", "#ca0022", "#dca95a", "#f0a846", "#f7f2a1", "#121116", "#bdbcc4", "#c2f0cb", "#447718", "#aabde7", "#a6e3ff", "#085179"]
var emoClrHP = ["#faf6ee"], emoClrV1 = ["#cb9b8d"], emoClrV2 = ["#f8a5a8"], emoClrV3 = ["#ca0022"], emoClrL1 = ["#ffa940"], emoClrL2 = ["#f36300"], emoClrL3 = ["#eeeb11"]
var emoClrHF = ["#121116"], emoClrU1 = ["#bdbcc4"], emoClrU2 = ["#c2f0cb"], emoClrU3 = ["#447718"], emoClrD1 = ["#aabde7"], emoClrD2 = ["#a6e3ff"], emoClrD3 = ["#085179"]
var emoClrR = ["#fffab6"]
var emoClr, emoText
var iceCream = []
var piece = []
var iceSize = 1.3
var brainData, emoData = [], attentionAmpData = [], meditationAmpData = [], waveSignal, emoAvg = []
var xArrayBefore = [], yArrayBefore = [], xArrayBeforeAvg = 0, yArrayBeforeAvg = 0, sumXYAvg = 0 //16,18


function preload() {
	brainData = loadJSON("raw.json")
	fruitData = {
		x: 200,
		y: 200,
		scale: 1,
		Crotate: 0
	}
	iceCream = {
		x: 0,
		y: 150,
		iceClr: [255, 155, 100],
		rotateIce: 0
	}
}
function drawFruit1(x, y, scale, Crotate) {
	//橘子
	push()
	noStroke()
	translate(x, y)
	rotate(Crotate)
	// text("orange",-20*scale,-10*scale)
	fill("#f54c07")
	arc(0, 0, 80 * scale, 80 * scale, 0, PI);
	fill(255)
	arc(0, 0, 75 * scale, 60 * scale, 0, PI);
	fill("orange")
	arc(0, 0, 65 * scale, 50 * scale, 0, PI);
	//
	stroke(255)
	strokeWeight(4 * scale)
	line(-15 * scale, 0 * scale, -20 * scale, 23 * scale)
	line(-15 * scale, 0 * scale, -22 * scale, 22 * scale)
	//
	line(0 * scale, 0 * scale, -2 * scale, 24 * scale)
	line(0 * scale, 0 * scale, 2 * scale, 25 * scale)
	//
	line(15 * scale, 0 * scale, 20 * scale, 23 * scale)
	line(15 * scale, 0 * scale, 22 * scale, 22 * scale)
	pop()
}
function drawFruit2(x, y, scale, Crotate) {
	//萊姆
	push()
	noStroke()
	translate(x, y)
	rotate(Crotate)
	// text("lemon",-20,-10)
	fill("#d9ba1c")
	arc(0, 0, 90 * scale, 80 * scale, 0, PI);
	fill(255)
	arc(0, 0, 85 * scale, 60 * scale, 0, PI);
	fill("#f3eb51")
	arc(0, 0, 65 * scale, 50 * scale, 0, PI);
	//
	stroke(255)
	strokeWeight(4 * scale)
	line(-15 * scale, 0 * scale, -20 * scale, 23 * scale)
	line(-15 * scale, 0 * scale, -22 * scale, 22 * scale)
	//
	line(0, 0, -2 * scale, 24 * scale)
	line(0, 0, 2 * scale, 25 * scale)
	//
	line(15 * scale, 0, 20 * scale, 23 * scale)
	line(15 * scale, 0, 22 * scale, 22 * scale)
	pop()
}

function drawFruit3(x, y, scale, Crotate) {
	//藍莓
	push()
	noStroke()
	translate(x, y)
	rotate(Crotate)
	// text("blueberry",-20,-50)
	fill("#6f1828")
	ellipse(0, 0, 41 * scale, 38 * scale)
	//
	fill("#b88aa0")
	ellipse(4 * scale, -5 * scale, 25 * scale, 23 * scale)
	//
	fill(255 * scale, 40 * scale)
	ellipse(7 * scale, -8 * scale, 10 * scale, 8 * scale)
	pop()
}

function drawFruit4(x, y, scale, Crotate) {
	//蔓越莓
	push()
	noStroke()
	translate(x, y)
	rotate(Crotate)
	// text("cranberry",-20,-50)
	fill("#cb0f1c")
	ellipse(0, 0, 43 * scale, 39 * scale)
	//
	fill("#dc5f6a")
	ellipse(4 * scale, -5 * scale, 25 * scale, 23 * scale)
	//
	fill(255, 40)
	ellipse(7 * scale, -8 * scale, 10 * scale, 8 * scale)
	pop()
}

function drawPiece() {
	push()
	rotate(iceCream.rotateIce)
	translate(iceCream.x, iceCream.y)
	strokeWeight(random(1))
	stroke(random(0, 10), 20)
	// 繪製糖粉
	for (let i = 0; i < 100; i++) {

		fill(random(colors2))
		fill(random(175, 255), random(175, 255), random(175, 255))

		ellipse(random(-75, 67) * iceSize, random(-50, -5) * iceSize, random(3, 5) * iceSize, random(3, 5) * iceSize)
	}
	for (let i = 0; i < 50; i++) {
		fill(random(colors2))

		fill(random(175, 255), random(175, 255), random(175, 255))
		ellipse(random(-70, 63) * iceSize, random(-70, -50) * iceSize, random(3, 5) * iceSize, random(3, 5) * iceSize)
	}
	for (let i = 0; i < 50; i++) {
		fill(random(colors2))
		fill(random(175, 255), random(175, 255), random(175, 255))
		ellipse(random(-60, 50) * iceSize, random(-90, -60) * iceSize, random(3, 5) * iceSize, random(3, 5) * iceSize)
	}
	for (let i = 0; i < 50; i++) {
		fill(random(colors2))
		fill(random(175, 255), random(175, 255), random(175, 255))
		ellipse(random(-35, 25) * iceSize, random(-105, -90) * iceSize, random(3, 5) * iceSize, random(3, 5) * iceSize)
	}
}

function drawIceCream(iceCream) {
	push()
	// rotate(iceCream.rotateIce)
	// rotate(random(-0.0568,0.0568))
	translate(iceCream.x, iceCream.y)
	fill(iceCream.iceClr)
	strokeWeight(1)
	stroke(random(180, 255))
	ellipse(-5 * iceSize, -30 * iceSize, 150 * iceSize)
	// light
	fill(255, 30)
	noStroke()
	ellipse(5 * iceSize, -70 * iceSize, 100 * iceSize, 68 * iceSize)
	fill(255, 20)
	ellipse(10 * iceSize, -75 * iceSize, 90 * iceSize, 58 * iceSize)
	fill(255, 10)
	ellipse(15 * iceSize, -80 * iceSize, 70 * iceSize, 35 * iceSize)
	//
	fill("#b47155")
	triangle(-50 * iceSize, 100 * iceSize, 0 * iceSize, 400 * iceSize, 45 * iceSize, 100 * iceSize)
	fill(0, 100)
	triangle(-20 * iceSize, 290 * iceSize, 0 * iceSize, 100 * iceSize, 15 * iceSize, 290 * iceSize)
	push()
	let from = color("#f8e9d4")//餅乾邊色
	let to = color("#bb621f")//甜筒色
	fill(from) //餅乾邊色L
	rotate(PI / -1.8)
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 150 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.3))	//甜筒色L1
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 130 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.5))	//甜筒色L2
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 120 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.6))	//甜筒色L3
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 110 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.7))	//甜筒色L4
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 100 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.8))	//甜筒色L5
	arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 80 * iceSize, 0 * iceSize, PI, PIE)
	rotate(1.1 * PI)
	fill(from)//餅乾邊色R
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 150 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.5))//甜筒色R1
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 130 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.6))//甜筒色R2
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 120 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.8))//甜筒色R3
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 110 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 0.9))//甜筒色R4
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 100 * iceSize, 0 * iceSize, PI, PIE)
	fill(lerpColor(from, to, 1))//甜筒色R5
	arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 80 * iceSize, 0 * iceSize, PI, PIE)

	pop()
	pop()
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	// 陰影繪製
	// drawingContext.shadowOffsetX = 5;
	//   drawingContext.shadowOffsetY = 5;
	//   drawingContext.shadowColor = color(0,30);
	background("#e9c1c1");
	ellipseMode(CENTER)
	noStroke()
	frameRate(60)
	brainData = Object.values(brainData)
	print(brainData)
	//第24列為後測的顏色資料
	//將情緒代碼存入emoData陣列
	for (let i = 0; i < brainData[24].length; i++) {
		emoData.push(brainData[24][i])
	}
	//將Attention前測振幅存入attentionAmpData
	attentionAmpData.push(brainData[6].reportData.amplitudeBefore.value)
	//將Meditation前測振幅存入meditationAmpData
	meditationAmpData.push(brainData[7].reportData.amplitudeBefore.value)
	//將emoData平均值擷取
	emoAvg.push(brainData[25])
	//將Attention+Meditation震幅相加
	waveSignal = attentionAmpData[0] + meditationAmpData[0]
	print(emoData, attentionAmpData, meditationAmpData, waveSignal, emoAvg)
	//將xArrayBefore擷取
	for (let i = 0; i < brainData[16].length; i++) {
		xArrayBefore.push(brainData[16][i])
	}
	print("xArrayBefore:", xArrayBefore)
	print("xArrayBefore.length", xArrayBefore.length)
	//////////////////
	//將xArrayBefore計算平均
	for (let i = 0; i < xArrayBefore.length; i++) {
		// print("第"+i+"筆資料:",xArrayBefore[i])
		xArrayBeforeAvg = xArrayBeforeAvg + xArrayBefore[i]
	}
	xArrayBeforeAvg = xArrayBeforeAvg / xArrayBefore.length
	print("xArrayBeforeAvg:", xArrayBeforeAvg)
	//將yArrayBefore擷取
	for (let i = 0; i < brainData[18].length; i++) {
		yArrayBefore.push(brainData[18][i])
	}
	//將yArrayBefore計算平均
	for (let i = 0; i < yArrayBefore.length; i++) {
		// print("第"+i+"筆資料:",yArrayBefore[i])
		yArrayBeforeAvg = yArrayBeforeAvg + yArrayBefore[i]
	}
	yArrayBeforeAvg = yArrayBeforeAvg / yArrayBefore.length
	print("yArrayBeforeAvg:", yArrayBeforeAvg)
	//假總平均 sumXYAvg
	sumXYAvg = int(xArrayBeforeAvg + yArrayBeforeAvg)
	print("sumXYAvg", sumXYAvg)


	//繪圖(背景)
	for (let i = 0; i < 100; i++) {
		push()
		stroke(255)
		rotate(0.5618)
		fill(random(bgColors))
		rect(-100 + i * 100, -height * 200, 50, 1200 * height)
		pop()
	}
	//背景刷淡1
	background(255, 225)
	//繪製水果
	for (let i = 0; i < sumXYAvg; i++) {
		let r = int(random(1, 4))
		if (r = 1) {
			fruitData.x = random(width)
			fruitData.y = random(height)
			fruitData.scale = random(0.5, 1.5)
			fruitData.Crotate = random(5)
			drawFruit1(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
		}
		if (r = 2) {
			fruitData.x = random(width)
			fruitData.y = random(height)
			fruitData.scale = random(0.5, 1.5)
			fruitData.Crotate = random(5)
			drawFruit2(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
		}
		if (r = 3) {
			fruitData.x = random(width)
			fruitData.y = random(height)
			fruitData.scale = random(0.5, 1.5)
			fruitData.Crotate = random(5)
			drawFruit3(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
		}
		if (r = 4) {
			fruitData.x = random(width)
			fruitData.y = random(height)
			fruitData.scale = random(0.5, 1.5)
			fruitData.Crotate = random(5)
			drawFruit4(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
		}

	}
	//背景刷淡
	background(255, 105)
	//
	for (let i = 0; i < emoData.length; i++) {
		if (emoData[i] == "HP") {
			emoText = "心平氣和"
			emoClr = emoClrHP
		}
		if (emoData[i] == "V3") {
			emoText = "極度喜歡"
			emoClr = emoClrV3
		}
		if (emoData[i] == "V2") {
			emoText = "非常喜歡"
			emoClr = emoClrV2
		}
		if (emoData[i] == "V1") {
			emoText = "很喜歡"
			emoClr = emoClrV1
		}
		if (emoData[i] == "L3") {
			emoText = "喜歡"
			emoClr = emoClrL3
		}
		if (emoData[i] == "L2") {
			emoText = "像喜歡"
			emoClr = emoClrL2
		}
		if (emoData[i] == "L1") {
			emoText = "有點喜歡"
			emoClr = emoClrL1
		}
		if (emoData[i] == "U1") {
			emoText = "有點不喜歡"
			emoClr = emoClrU1
		}
		if (emoData[i] == "U2") {
			emoText = "像不喜歡"
			emoClr = emoClrU2
		}
		if (emoData[i] == "U3") {
			emoText = "不喜歡"
			emoClr = emoClrU3
		}
		if (emoData[i] == "D1") {
			emoText = "很不喜歡"
			emoClr = emoClrD1
		}
		if (emoData[i] == "D2") {
			emoText = "非常不喜歡"
			emoClr = emoClrD2
		}
		if (emoData[i] == "D3") {
			emoText = "極度不喜歡"
			emoClr = emoClrD3
		}
		if (emoData[i] == "HF") {
			emoText = "心煩意亂"
			emoClr = emoClrHF
		}
		if (emoData[i] == "R") {
			emoText = "不可置否"
			emoClr = emoClrR
		}
		fill(emoClr)
		textStyle(BOLD)
		textSize(24)
		// text(emoText,100+i*100,100+random(24))
		//冰淇淋preset
		iceCream.x += 100
		iceCream.y = height / 2 + random(-waveSignal * 10, waveSignal * 10)
		iceCream.iceClr = random(emoClr)
		// iceCream.iceClr=random(allemoClr)
		// iceSize= random(0.35,0.85)
		iceSize = 0.5
		// iceCream.rotateIce=random(0.99999,0.99999)
		//繪圖(冰淇淋)
		// print(emoText)
		// print(iceCream)
		// print(i)
		drawIceCream(iceCream)
		// drawPiece()

	}

}


//setup分隔







function draw() {
	//   background(255)
	// print(frameCount)



	// iceCream.x =random(width)
	// iceCream.y =random(height)




	// if(frameCount>1000){
	// 		textSize(50)
	// 		fill(255,105,0,150)
	// 		// text('END',width-200,50)
	// 		noLoop()
	// } 


}