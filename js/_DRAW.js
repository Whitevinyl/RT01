




function setupDrawing() {

}



//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------


function drawBG() {
    ctx[0].globalAlpha = 1;
    color.fill(ctx[0],bgCols[0]);
    ctx[0].fillRect(0,0,fullX,fullY);
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------


function drawScene() {
    var u = units;
    var font = "Open Sans";
    var ct = ctx[0];

    draw3d(ct);

    /*color.fill(ct,textCol);
    ct.fillRect(dx - (15*u),dy - (15*u),30*u,30*u);

    ct.textAlign = 'center';
    ct.font = '400 ' + bodyType + 'px ' + font;
    ct.fillText('Default',dx,dy + (60*u));*/
}



//-------------------------------------------------------------------------------------------
//  DRAW FUNCTIONS
//-------------------------------------------------------------------------------------------


function drawSpriteTri(ctx,ctx2,alpha,size,col) {

    // Alpha Channel //
    /*ctx2.clearRect(0,0,size,size);
    ctx2.beginPath();
    ctx2.moveTo(size/2, 0);
    ctx2.lineTo(size,   size * 0.85);
    ctx2.lineTo(0,      size * 0.85);
    ctx2.closePath();
    ctx2.fill();*/

    // color //
    ctx.globalAlpha = 0.4;
    color.fill(ctx,col);
    ctx.fillRect(0,0,size,size);

    // add alpha //
    /*ctx.globalCompositeOperation = "destination-atop";
    ctx.drawImage( alpha, 0, 0 );

    // aliase //
    var imgData = ctx.getImageData(0,0,size,size);
    var data = imgData.data;
    var l = data.length;
    for (var i=0; i<l; i+=4) {

        data[i] = 255;
        data[i+1] = 255;
        data[i+2] = 255;

        if (data[i+3] > 0) {
            data[i+3] = 100;
        }
    }
    ctx.putImageData(imgData,0,0);*/
}


function drawGrassTexture(ctx,size,col) {

    color.fill(ctx,col);

    var hx = size / 2;

    ctx.beginPath();
               // x               // y
    ctx.moveTo(hx - (hx * 0.8),   size);
    ctx.lineTo(0,                 size * 0.5); // p
    ctx.lineTo(hx - (hx * 0.55),   size * 0.96);
    ctx.lineTo(hx - (hx * 0.5),   size * 0.1); // p
    ctx.lineTo(hx - (hx * 0.2),   size * 0.96);
    ctx.lineTo(hx,                0);          // p
    ctx.lineTo(hx + (hx * 0.2),   size * 0.96);
    ctx.lineTo(hx + (hx * 0.5),   size * 0.2); // p
    ctx.lineTo(hx + (hx * 0.55),   size * 0.96);
    ctx.lineTo(size,              size * 0.6); // p
    ctx.lineTo(hx + (hx * 0.8),   size);

    ctx.closePath();
    ctx.fill();

}



function spacedText(ctx,string,x,y,spacing) {

    var chars = string.length;
    var fullWidth = (chars-1) * spacing;
    var charList = [];
    var charWidths = [];
    for (var i=0; i<chars; i++) {
        var c = string.substr(i, 1);
        var w = ctx.measureText(c).width;
        charList.push (c);
        charWidths.push(w);
        fullWidth += w;
    }

    x -= fullWidth/2;

    for (i=0; i<chars; i++) {
        ctx.fillText(charList[i], x, y);
        x += (spacing + charWidths[i]);
    }
}


function drawPlay(ct,x,y,w,h) {
    ct.beginPath();
    ct.moveTo(x - (w/2), y - (h/2));
    ct.lineTo(x - (w/2), y + (h/2));
    ct.lineTo(x + (w/2), y);
    ct.closePath();
    ct.fill();
}

function drawPause(ct,x,y,w,h) {
    ct.fillRect(x - (w*0.45), y - (h/2), w*0.25, h);
    ct.fillRect(x + (w*0.2), y - (h/2), w*0.25, h);
}

function drawHamburger(ct,x,y,w,h,t) {
    ct.fillRect(x - (w/2), y - (h/2), w, t);
    ct.fillRect(x - (w/2), y - (t/2), w, t);
    ct.fillRect(x - (w/2), y + (h/2) - t, w, t);
}




//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


