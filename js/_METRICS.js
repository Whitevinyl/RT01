/**
 * Created by luketwyman on 25/11/2015.
 */

//-------------------------------------------------------------------------------------------
//  METRICS
//-------------------------------------------------------------------------------------------



function metrics() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = getPixelRatio();


    for (var i=0; i<canvas.length; i++) {
        canvas[i].width  = width * ratio;
        canvas[i].height = height * ratio;
        canvas[i].style.width = width + "px";
        canvas[i].style.height = height + "px";
    }

    console.log(width);
    console.log(ratio);

    // UNIT SIZES //
    halfX = Math.round((width * ratio)/2);
    halfY = Math.round((height * ratio)/2);
    fullX = width * ratio;
    fullY = height * ratio;

    // DEVICE CHECK //
    if (fullY>(fullX*1.05)) {
        device = "mobile";
    } else if (fullY>(fullX*0.65)) {
        device = "tablet";
    } else {
        device = "desktop";
    }
    console.log(device);

    var u;

    if (device=="mobile") {

        u = (width * ratio) * 2.6;
        units = (u/700);

        // TEXT SIZES //
        headerType = Math.round(u/32);
        midType = Math.round(u/47);
        bodyType = Math.round(u/62);
        dataType = Math.round(u/100);
        subType = Math.round(u/90);

        if (camera3d) {
            camera3d.aspect = fullX / (fullX*1.2);
            camera3d.aspect = halfX / halfY;
            camera3d.updateProjectionMatrix();
            cameraDepth = 8.5 + (((height/width)-1)*5);
            camera3d.position.z = cameraDepth;
        }

    } else {

        u = (height * ratio) * 1.8;
        units = (u/800);

        // TEXT SIZES //
        headerType = Math.round(u/22);
        midType = Math.round(u/35);
        bodyType = Math.round(u/50);
        dataType = Math.round(u/85);
        subType = Math.round(u/90);

        if (camera3d) {
            camera3d.aspect = halfX / halfY;
            camera3d.updateProjectionMatrix();
            cameraDepth = 7.1;
            camera3d.position.z = cameraDepth;
        }
    }



    dx = halfX;
    dy = halfY;
}


function getPixelRatio() {
    var cntx = ctx[0];
    var dpr = window.devicePixelRatio || 1;
    var bsr = cntx.webkitBackingStorePixelRatio ||
        cntx.mozBackingStorePixelRatio ||
        cntx.msBackingStorePixelRatio ||
        cntx.oBackingStorePixelRatio ||
        cntx.backingStorePixelRatio || 1;

    return dpr / bsr;
}