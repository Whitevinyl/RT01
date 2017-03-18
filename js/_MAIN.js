

// INIT //
var canvas = [];
var ctx = [];
var TWEEN;
var fonts;
var stats;

// METRICS //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = halfX;
var dy = halfY;
var headerType = 0;
var midType = 0;
var dataType = 0;
var bodyType = 0;
var subType = 0;
var device = "desktop";

var TAU = 2 * Math.PI;


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;




// COLORS //
var bgCols = [new RGBA(235,240,224,1),new RGBA(51,44,52,1),new RGBA(240,240,240,1),new RGBA(255,150,155,1),new RGBA(5,5,5,1)];
var concreteCols = [ new RGBA(40,40,50,1), new RGBA(100,100,90,1), new RGBA(170,170,160,1), new RGBA(180,180,170,1), new RGBA(201,201,190,1), new RGBA(210,210,200,1)];
var grassCols = [new RGBA(40,60,60,1),new RGBA(210,230,240,1),new RGBA(255,150,155,1)];


// ADJUSTMENTS //
// messy... //
color.master = new RGBA(0,0,0,1);
var darken = 0;
var pink = -20;
color.highPass = new RGBA(darken,darken + pink,darken + (pink * 1.5),1);
var wash = 0;
color.lowPass = new RGBA(wash,wash,wash,1);
var lightBalance = 0.5;

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------


function init() {

    // SETUP CANVAS //
    var cnvs = document.getElementById("main");
    var cntx = cnvs.getContext("2d");
    cntx.mozImageSmoothingEnabled = false;
    cntx.imageSmoothingEnabled = false;

    canvas.push(cnvs);
    ctx.push(cntx);


    /*StartAudioContext(Tone.context, '#main').then(function(){
        //started
    });*/

    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    // INITIALISE THINGS //
    setupInteraction(canvas[0]);
    setup3d();
    //setupAudio();


    /*fonts = new Fonts(['Bodoni:n4,o4'],2,function(){
        setupDrawing();
        draw();
    });
    fonts.setup();*/

    setupDrawing();
    draw();

    setupStats();
}

function setupStats() {
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}


//-------------------------------------------------------------------------------------------
//  MAIN LOOP
//-------------------------------------------------------------------------------------------


function draw() {
    if (stats) {
        stats.begin();
    }

    update();
    drawBG();
    drawScene();

    if (stats) {
        stats.end();
    }

    requestAnimationFrame(draw);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------


function update() {
    if (TWEEN) {
        TWEEN.update();
    }

    render3d();
}









