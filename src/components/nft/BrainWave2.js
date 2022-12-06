
///////////////////////////----------------------------腦波第二範例 正念三角形
var triangleR = 10
var row = 1
var start = 1
var step = 2
var colors = ["#fcb97d", "#edd892", "#c6b89e"]

function preload() {
    table = loadTable('brtest.csv', 'csv', 'header');

}

var sumAll = 0
function setup() {
    var sumDelta = 0, sumTheta = 0, sumLAlpha = 0, sumHAlpha = 0, sumLBeta = 0, sumHBeta = 0, sumLgama = 0, sumHgama = 0
    createCanvas(windowWidth, windowHeight);
    frameRate(60)
    for (let r = 0, r1 = 1; r < table.getRowCount() & r1 < table.getRowCount(); r++, r1++) {

        for (let c = 1; c < table.getColumnCount(); c++) {
            if (c == 1)
                var Signal = table.getString(r, c)
            if (c == 2)
                var Attention = table.getString(r, c)
            if (c == 3)
                var Meditation = table.getString(r, c)
            if (c == 4) {
                var Delta = Number(table.getString(r, c))
                var Delta1 = Number(table.getString(r1, c))
                sumDelta = sumDelta + Delta - Delta1
            }
            if (c == 5) {
                var Theta = Number(table.getString(r, c))
                var Theta1 = Number(table.getString(r1, c))
                sumTheta = sumTheta + Theta - Theta1
            }

            if (c == 6) {
                var LAlpha = Number(table.getString(r, c))
                var LAlpha1 = Number(table.getString(r1, c))
                sumLAlpha = sumLAlpha + LAlpha - LAlpha1
            }
            if (c == 7) {
                var HAlpha = Number(table.getString(r, c))
                var HAlpha1 = Number(table.getString(r1, c))
                sumHAlpha = sumHAlpha + HAlpha - HAlpha1
            }
            if (c == 8) {
                var LBeta = Number(table.getString(r, c))
                var LBeta1 = Number(table.getString(r1, c))
                sumLBeta = sumLBeta + LBeta - LBeta1

            }
            if (c == 9) {
                var HBeta = Number(table.getString(r, c))
                var HBeta1 = Number(table.getString(r1, c))
                sumHBeta = sumHBeta + HBeta - HBeta1
            }
            if (c == 10) {
                var Lgama = Number(table.getString(r, c))
                var Lgama1 = Number(table.getString(r1, c))
                sumLgama = sumLgama + Lgama - Lgama1
            }

            if (c == 11) {
                var Hgama = Number(table.getString(r, c))
                var Hgama1 = Number(table.getString(r1, c))
                sumHgama = sumHgama + Hgama - Hgama1
            }

            print('a')

        }
    }
    print('b')
    sumAll = (sumDelta + sumTheta + sumLAlpha + sumHAlpha + sumLBeta + sumHBeta + sumLgama + sumHgama) / table.getRowCount()
    // fill("red")
    // textSize(20)
    // text(sumAll ,130,500)

    background("#b5b8a3");
    rectMode(CENTER)
    blendMode(BLEND)
    stroke(255)
    // noStroke()
    fill("#AABA9E")
    triangle(triangleR, height - triangleR, width / 2, 0, width - triangleR, height - triangleR)

    translate(width / 2, triangleR * 2)



    drawTriangle()
    // circle(0,-triangleR,triangleR/2)
    for (var i = 1; i < height / (triangleR * 2) - 1; i++) {
        translate(0, triangleR * 2)
        translate(-triangleR, 0)
        drawTriangle()
        for (var o = 0; o < row; o++) { }
        push()
        for (var p = 0; p < row; p++) {
            translate(triangleR * 2, 0)
            drawTriangle()
        }

        pop()
        row++
    }
}
function drawTriangle() {
    fill(random(colors))
    // fill(noise(255))
    push()
    // shearY(random(-abs(sumAll),abs(sumAll)))
    // shearX(random(-0.6,0.6))

    triangle(-triangleR, 0, 0, -triangleR * 2, triangleR, 0)
    pop()
}



function draw() {
    // for (let r=0;r<table.getRowCount();r++){

    //     for(let c=1;c<table.getColumnCount();c++){
    //         fill(255,155,30)
    //         textSize(20)
    //         opop = table.getString(r,c)
    //         text(opop,100+r*100,100+c*100)
    //     }
    // }
    // text(sumAll ,50,50)
}