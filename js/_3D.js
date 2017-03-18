
// Here we build the initial scene using three.js

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

var scene3d,camera3d,renderer3d,directional3d,ambient3d,col3d,materialType,lastAngle;
var cameraDepth = 7.1;
var building;
var destAngle = -TAU/8;
var camera;

function setup3d() {

    // setup renderer //
    renderer3d = new THREE.WebGLRenderer({antialias: true});
    renderer3d.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer3d.domElement );


    // setup view //
    scene3d = new THREE.Scene();
    //camera3d = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 50 );


    // point camera //
    if (device==='mobile') {
        cameraDepth = 8.5;
    }
    camera = new Camera(cameraDepth,new THREE.Vector3(0,0,0));
    //camera3d.position.z = cameraDepth; // distance
    //camera3d.position.y = 2.2; // height
    //camera3d.rotation.x = -((TAU/360)*18); // angle


    // create fog & background color //
    col3d = new THREE.Color( colToHex(color.processRGBA(bgCols[2],true)) );
    scene3d.background = col3d;
    scene3d.fog = new THREE.Fog(col3d,cameraDepth,cameraDepth + 4);


    // lighting //
    materialType = THREE.MeshBasicMaterial;
    addlighting();

    // create building //
    building = new Building();

    // start angle //
    scene3d.rotation.y = -TAU/8;
}


function addlighting() {
    materialType = THREE.MeshLambertMaterial;

    var balance = lightBalance;

    // directional //
    directional3d = new THREE.DirectionalLight( 0xddddff, 1.02 - balance );
    directional3d.position.set( 2, 3, 2.2 );

    directional3d.castShadow = true;
    renderer3d.shadowMap.enabled = true;
    renderer3d.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
    renderer3d.toneMapping = THREE.NoToneMapping;

    //Set up shadow properties for the light
    var s = 1024;
    s = 2048;
    directional3d.shadow.mapSize.width = s;
    directional3d.shadow.mapSize.height = s;
    directional3d.shadow.camera.near = 0.05;
    directional3d.shadow.camera.far = 9;


    scene3d.add( directional3d );

    // ambient //
    ambient3d = new THREE.AmbientLight( 0xffffdd, balance );
    scene3d.add( ambient3d );
}

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

function render3d() {
    if (renderer3d) {

        // set destination angle for rotation if dragging //
        if (!mouseIsDown) {
            //var speed = 0.15;
            //destAngle += ((TAU/360) * speed);
            lastAngle = scene3d.rotation.y;
        }
        else {
            destAngle = lastAngle + ((TAU/2) - ((TAU/fullX) * mouseX));

        }

        // 'lerp' / smoothly move to destination angle //
        scene3d.rotation.y = lerp(scene3d.rotation.y,destAngle, 5);


        building.update();
        renderer3d.render( scene3d, camera.cam );
    }
}


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

// draw the webgl rendering to the canvas

function draw3d(ctx) {
    if (renderer3d) {
        ctx.drawImage(renderer3d.domElement,0,0,fullX,fullY);
    }
}

//-------------------------------------------------------------------------------------------
//  RESIZE
//-------------------------------------------------------------------------------------------


function resize3d() {

}


//-------------------------------------------------------------------------------------------
//  CAMERA
//-------------------------------------------------------------------------------------------

function Camera(depth,focus) {

    this.depth = depth;
    this.focus = focus;

    this.cam = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 50 );
    this.cam.position.set(0,2.2,depth);
    this.cam.lookAt(focus);
}
var proto = Camera.prototype;

proto.update = function() {

};

proto.resize = function(depth) {
    this.cam.aspect = fullX / (fullX*1.2);
    this.cam.aspect = halfX / halfY;
    this.cam.updateProjectionMatrix();
    cameraDepth = depth;
    this.cam.position.z = cameraDepth;
};

