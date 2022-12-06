<template>
    <div class="flex gap-2">
        <div class="btn btn-sm btn-outline btn-error" @click="initCanvas">重新產生</div>
        <div class="btn btn-sm btn-outline btn-primary" @click="downloadCanvas">下載圖片</div>
    </div>
    <div class="mockup-window border border-base-300 shadow-lg bg-base-300 w-full my-2">
        <div id="p5Canvas" ref="p5elem" class="rounded w-full"></div>
    </div>
    <!-- <div class="flex gap-2">
        <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">弧線出現的臨界值</span>
            </label>
            <input type="number" name="arcThreshold" v-model="arcThreshold"
                class="input input-bordered w-full max-w-xs">
        </div>
        <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">中心圓圈出現的臨界值</span>
            </label>
            <input type="number" name="arcThreshold" v-model="circleThreshold"
                class="input input-bordered w-full max-w-xs">
        </div>
        <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">中心圓圈的透明度</span>
            </label>
            <input type="number" name="arcThreshold" min="0" max="100" v-model="circleOpacity"
                class="input input-bordered w-full max-w-xs">
        </div>
    </div> -->
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import P5 from 'p5'

const prop = defineProps([
    'brainData'
])
const canvas = ref('')
const p5elem = ref({})
const arcThreshold = ref(10)
const circleThreshold = ref(10)
const circleOpacity = ref(5)
console.log(arcThreshold.value)
const sketch = function (s) {

    let row = 1
    let start = 1
    let step = 2
    let bgColors = ["#dbc2cf", "#9fa2b2", "#3c7a89", "#2e4756", "#16262e", "#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3", "#246eb9", "#4cb944", "#fdfffc", "#f5ee9e", "#f06543", "#861657", "#a64253", "#d56aa0", "#bbdbb4", "#fcf0cc", "#fffab6"]
    let colors = ["#9b4d29", "#fde163", "#cad4a5", "#ffceca", "#f7b7f6", "#f2eddb"]
    let colors2 = ["#eadb80", "#A6FFCC", "#00FFFF", "#DE3163", "#990036"]
    let allemoClr = ["#faf6ee", "#cb9b8d", "#f8a5a8", "#ca0022", "#dca95a", "#f0a846", "#f7f2a1", "#121116", "#bdbcc4", "#c2f0cb", "#447718", "#aabde7", "#a6e3ff", "#085179"]
    let emoClrHP = ["#faf6ee"], emoClrV1 = ["#cb9b8d"], emoClrV2 = ["#f8a5a8"], emoClrV3 = ["#ca0022"], emoClrL1 = ["#ffa940"], emoClrL2 = ["#f36300"], emoClrL3 = ["#eeeb11"]
    let emoClrHF = ["#121116"], emoClrU1 = ["#bdbcc4"], emoClrU2 = ["#c2f0cb"], emoClrU3 = ["#447718"], emoClrD1 = ["#aabde7"], emoClrD2 = ["#a6e3ff"], emoClrD3 = ["#085179"]
    let emoClrR = ["#fffab6"]
    let emoClr, emoText
    let iceCream = []
    let piece = []
    let iceSize = 1.3
    let brainData, emoData = [], attentionAmpData = [], meditationAmpData = [], waveSignal, emoAvg = []
    let xArrayBefore = [], yArrayBefore = [], xArrayBeforeAvg = 0, yArrayBeforeAvg = 0, sumXYAvg = 0 //16,18

    brainData = prop?.brainData
    let fruitData = {
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
    const windowWidth = p5elem.value.clientWidth
    const windowHeight = s.windowHeight
    let height = windowHeight
    let width = windowWidth
    console.log(windowWidth, windowHeight)
    s.setup = () => {
        s.createCanvas(windowWidth, windowHeight);
        // 陰影繪製
        // drawingContext.shadowOffsetX = 5;
        //   drawingContext.shadowOffsetY = 5;
        //   drawingContext.shadowColor = color(0,30);
        s.background("#e9c1c1");
        s.ellipseMode(s.CENTER)
        s.noStroke()
        s.frameRate(60)
        brainData = Object.values(brainData)
        console.log(brainData)
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
        console.log(emoData, attentionAmpData, meditationAmpData, waveSignal, emoAvg)
        //將xArrayBefore擷取
        for (let i = 0; i < brainData[16].length; i++) {
            xArrayBefore.push(brainData[16][i])
        }
        console.log("xArrayBefore:", xArrayBefore)
        console.log("xArrayBefore.length", xArrayBefore.length)
        //////////////////
        //將xArrayBefore計算平均
        for (let i = 0; i < xArrayBefore.length; i++) {
            // console.log("第"+i+"筆資料:",xArrayBefore[i])
            xArrayBeforeAvg = xArrayBeforeAvg + xArrayBefore[i]
        }
        xArrayBeforeAvg = xArrayBeforeAvg / xArrayBefore.length
        console.log("xArrayBeforeAvg:", xArrayBeforeAvg)
        //將yArrayBefore擷取
        for (let i = 0; i < brainData[18].length; i++) {
            yArrayBefore.push(brainData[18][i])
        }
        //將yArrayBefore計算平均
        for (let i = 0; i < yArrayBefore.length; i++) {
            // console.log("第"+i+"筆資料:",yArrayBefore[i])
            yArrayBeforeAvg = yArrayBeforeAvg + yArrayBefore[i]
        }
        yArrayBeforeAvg = yArrayBeforeAvg / yArrayBefore.length
        console.log("yArrayBeforeAvg:", yArrayBeforeAvg)
        //假總平均 sumXYAvg
        sumXYAvg = s.int(xArrayBeforeAvg + yArrayBeforeAvg)
        console.log("sumXYAvg", sumXYAvg)


        //繪圖(背景)
        for (let i = 0; i < 100; i++) {
            s.push()
            s.stroke(255)
            s.rotate(0.5618)
            s.fill(s.random(bgColors))
            s.rect(-100 + i * 100, -height * 200, 50, 1200 * height)
            s.pop()
        }
        //背景刷淡1
        s.background(255, 225)
        //繪製水果
        for (let i = 0; i < sumXYAvg; i++) {
            let r = s.int(s.random(1, 4))
            if (r = 1) {
                fruitData.x = s.random(width)
                fruitData.y = s.random(height)
                fruitData.scale = s.random(0.5, 1.5)
                fruitData.Crotate = s.random(5)
                drawFruit1(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
            }
            if (r = 2) {
                fruitData.x = s.random(width)
                fruitData.y = s.random(height)
                fruitData.scale = s.random(0.5, 1.5)
                fruitData.Crotate = s.random(5)
                drawFruit2(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
            }
            if (r = 3) {
                fruitData.x = s.random(width)
                fruitData.y = s.random(height)
                fruitData.scale = s.random(0.5, 1.5)
                fruitData.Crotate = s.random(5)
                drawFruit3(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
            }
            if (r = 4) {
                fruitData.x = s.random(width)
                fruitData.y = s.random(height)
                fruitData.scale = s.random(0.5, 1.5)
                fruitData.Crotate = s.random(5)
                drawFruit4(fruitData.x, fruitData.y, fruitData.scale, fruitData.Crotate)
            }

        }
        //背景刷淡
        s.background(255, 105)
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
            s.fill(emoClr)
            s.textStyle(s.BOLD)
            s.textSize(24)
            // text(emoText,100+i*100,100+random(24))
            //冰淇淋preset
            iceCream.x += 100
            iceCream.y = height / 2 + s.random(-waveSignal * 10, waveSignal * 10)
            iceCream.iceClr = s.random(emoClr)
            // iceCream.iceClr=random(allemoClr)
            // iceSize= random(0.35,0.85)
            iceSize = 0.5
            // iceCream.rotateIce=random(0.99999,0.99999)
            //繪圖(冰淇淋)
            // console.log(emoText)
            // console.log(iceCream)
            // console.log(i)
            drawIceCream(iceCream)
            // drawPiece()

        }
    }
    s.draw = () => {
    }
    function drawFruit1(x, y, scale, Crotate) {
        //橘子
        s.push()
        s.noStroke()
        s.translate(x, y)
        s.rotate(Crotate)
        // text("orange",-20*scale,-10*scale)
        s.fill("#f54c07")
        s.arc(0, 0, 80 * scale, 80 * scale, 0, s.PI);
        s.fill(255)
        s.arc(0, 0, 75 * scale, 60 * scale, 0, s.PI);
        s.fill("orange")
        s.arc(0, 0, 65 * scale, 50 * scale, 0, s.PI);
        //
        s.stroke(255)
        s.strokeWeight(4 * scale)
        s.line(-15 * scale, 0 * scale, -20 * scale, 23 * scale)
        s.line(-15 * scale, 0 * scale, -22 * scale, 22 * scale)
        //
        s.line(0 * scale, 0 * scale, -2 * scale, 24 * scale)
        s.line(0 * scale, 0 * scale, 2 * scale, 25 * scale)
        //
        s.line(15 * scale, 0 * scale, 20 * scale, 23 * scale)
        s.line(15 * scale, 0 * scale, 22 * scale, 22 * scale)
        s.pop()
    }
    function drawFruit2(x, y, scale, Crotate) {
        //萊姆
        s.push()
        s.noStroke()
        s.translate(x, y)
        s.rotate(Crotate)
        // text("lemon",-20,-10)
        s.fill("#d9ba1c")
        s.arc(0, 0, 90 * scale, 80 * scale, 0, s.PI);
        s.fill(255)
        s.arc(0, 0, 85 * scale, 60 * scale, 0, s.PI);
        s.fill("#f3eb51")
        s.arc(0, 0, 65 * scale, 50 * scale, 0, s.PI);
        //
        s.stroke(255)
        s.strokeWeight(4 * scale)
        s.line(-15 * scale, 0 * scale, -20 * scale, 23 * scale)
        s.line(-15 * scale, 0 * scale, -22 * scale, 22 * scale)
        //
        s.line(0, 0, -2 * scale, 24 * scale)
        s.line(0, 0, 2 * scale, 25 * scale)
        //
        s.line(15 * scale, 0, 20 * scale, 23 * scale)
        s.line(15 * scale, 0, 22 * scale, 22 * scale)
        s.pop()
    }

    function drawFruit3(x, y, scale, Crotate) {
        //藍莓
        s.push()
        s.noStroke()
        s.translate(x, y)
        s.rotate(Crotate)
        // text("blueberry",-20,-50)
        s.fill("#6f1828")
        s.ellipse(0, 0, 41 * scale, 38 * scale)
        //
        s.fill("#b88aa0")
        s.ellipse(4 * scale, -5 * scale, 25 * scale, 23 * scale)
        //
        s.fill(255 * scale, 40 * scale)
        s.ellipse(7 * scale, -8 * scale, 10 * scale, 8 * scale)
        s.pop()
    }

    function drawFruit4(x, y, scale, Crotate) {
        //蔓越莓
        s.push()
        s.noStroke()
        s.translate(x, y)
        s.rotate(Crotate)
        // text("cranberry",-20,-50)
        s.fill("#cb0f1c")
        s.ellipse(0, 0, 43 * scale, 39 * scale)
        //
        s.fill("#dc5f6a")
        s.ellipse(4 * scale, -5 * scale, 25 * scale, 23 * scale)
        //
        s.fill(255, 40)
        s.ellipse(7 * scale, -8 * scale, 10 * scale, 8 * scale)
        s.pop()
    }

    function drawPiece() {
        s.push()
        s.rotate(iceCream.rotateIce)
        s.translate(iceCream.x, iceCream.y)
        s.strokeWeight(s.random(1))
        s.stroke(s.random(0, 10), 20)
        // 繪製糖粉
        for (let i = 0; i < 100; i++) {

            s.fill(s.random(colors2))
            s.fill(s.random(175, 255), s.random(175, 255), s.random(175, 255))

            s.ellipse(s.random(-75, 67) * iceSize, s.random(-50, -5) * iceSize, s.random(3, 5) * iceSize, s.random(3, 5) * iceSize)
        }
        for (let i = 0; i < 50; i++) {
            s.fill(s.random(colors2))

            s.fill(s.random(175, 255), s.random(175, 255), s.random(175, 255))
            s.ellipse(s.random(-70, 63) * iceSize, s.random(-70, -50) * iceSize, s.random(3, 5) * iceSize, s.random(3, 5) * iceSize)
        }
        for (let i = 0; i < 50; i++) {
            s.fill(s.random(colors2))
            s.fill(s.random(175, 255), s.random(175, 255), s.random(175, 255))
            s.ellipse(s.random(-60, 50) * iceSize, s.random(-90, -60) * iceSize, s.random(3, 5) * iceSize, s.random(3, 5) * iceSize)
        }
        for (let i = 0; i < 50; i++) {
            s.fill(s.random(colors2))
            s.fill(s.random(175, 255), s.random(175, 255), s.random(175, 255))
            s.ellipse(s.random(-35, 25) * iceSize, s.random(-105, -90) * iceSize, s.random(3, 5) * iceSize, s.random(3, 5) * iceSize)
        }
    }

    function drawIceCream(iceCream) {
        s.push()
        // rotate(iceCream.rotateIce)
        // rotate(random(-0.0568,0.0568))
        s.translate(iceCream.x, iceCream.y)
        s.fill(iceCream.iceClr)
        s.strokeWeight(1)
        s.stroke(s.random(180, 255))
        s.ellipse(-5 * iceSize, -30 * iceSize, 150 * iceSize)
        // light
        s.fill(255, 30)
        s.noStroke()
        s.ellipse(5 * iceSize, -70 * iceSize, 100 * iceSize, 68 * iceSize)
        s.fill(255, 20)
        s.ellipse(10 * iceSize, -75 * iceSize, 90 * iceSize, 58 * iceSize)
        s.fill(255, 10)
        s.ellipse(15 * iceSize, -80 * iceSize, 70 * iceSize, 35 * iceSize)
        //
        s.fill("#b47155")
        s.triangle(-50 * iceSize, 100 * iceSize, 0 * iceSize, 400 * iceSize, 45 * iceSize, 100 * iceSize)
        s.fill(0, 100)
        s.triangle(-20 * iceSize, 290 * iceSize, 0 * iceSize, 100 * iceSize, 15 * iceSize, 290 * iceSize)
        s.push()
        let from = s.color("#f8e9d4")//餅乾邊色
        let to = s.color("#bb621f")//甜筒色
        s.fill(from) //餅乾邊色L
        s.rotate(s.PI / -1.8)
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 150 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.3))	//甜筒色L1
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 130 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.5))	//甜筒色L2
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 120 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.6))	//甜筒色L3
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 110 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.7))	//甜筒色L4
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 100 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.8))	//甜筒色L5
        s.arc(-130 * iceSize, -70 * iceSize, 300 * iceSize, 80 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.rotate(1.1 * s.PI)
        s.fill(from)//餅乾邊色R
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 150 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.5))//甜筒色R1
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 130 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.6))//甜筒色R2
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 120 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.8))//甜筒色R3
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 110 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 0.9))//甜筒色R4
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 100 * iceSize, 0 * iceSize, s.PI, s.PIE)
        s.fill(s.lerpColor(from, to, 1))//甜筒色R5
        s.arc(130 * iceSize, -60 * iceSize, 300 * iceSize, 80 * iceSize, 0 * iceSize, s.PI, s.PIE)

        s.pop()
        s.pop()
    }
}



function initCanvas() {
    let select = document.getElementById('p5Canvas')
    if (select.lastChild) select.removeChild(select.lastChild)
    canvas.value = new P5(sketch, 'p5Canvas')
}

function downloadCanvas() {
    let current = new Date()
    canvas.value.saveCanvas(`${prop.brainData.name}-${current.getFullYear()}${current.getMonth()}${current.getDate()}_${current.getHours()}_${current.getMinutes()}_${current.getSeconds()}`, 'png')
}

onMounted(() => {
    initCanvas()
})

watch(prop, () => {
    initCanvas()
})
</script>

<style scoped>
</style>