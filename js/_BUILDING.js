
// Here we create the building and add it to the 3d scene created in _3D.js


//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

var meters = 0.1; // unit for building measurement

function Building() {

    // create container object //
    this.obj = new THREE.Object3D();
    scene3d.add( this.obj );

    this.particleList = [];
    this.grassSprites = [];

    this.generateGrassTexture(grassCols[2]);

    //this.simplex = new SimplexNoise();

    // generate the building //
    this.generate();


}
var proto = Building.prototype;


//-------------------------------------------------------------------------------------------
//  GENERATE
//-------------------------------------------------------------------------------------------

proto.generate = function() {

    var geometry,material,mesh;






    ////// GENERATING ... //////
    ////////////////////////////

    // MAIN BUILDING BLOCK //
    var col = new THREE.Color( colToHex(color.processRGBA(concreteCols[0],true)) );
    material = new materialType( {color: col} );



    geometry = new THREE.BoxGeometry( 5 * meters, 12 * meters, 7 * meters ); // w, h, d
    assignUVs( geometry );

    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.obj.add( mesh );
    mesh.position.x = -10 * meters;


    geometry = new THREE.BoxGeometry( 7 * meters, 5 * meters, 10 * meters ); // w, h, d
    assignUVs( geometry );

    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.obj.add( mesh );
    mesh.position.x = 10 * meters;


    this.particles(300);

    col = grassCols[2];
    var clump = new GrassClump(this.obj, new Point3D(-10 * meters,-6*meters,4.1*meters), 4*meters, 0, col);
    clump = new GrassClump(this.obj, new Point3D(-11 * meters,-6*meters,4.1*meters), 6*meters, 0, col);
    clump = new GrassClump(this.obj, new Point3D(-10.5 * meters,-6*meters,5*meters), 5*meters, 0, col);
    clump = new GrassClump(this.obj, new Point3D(-11.5 * meters,-6*meters,5*meters), 5*meters, 0, col);
    clump = new GrassClump(this.obj, new Point3D(-13 * meters,-6*meters,3.5*meters), 3*meters, 0, col);
    clump = new GrassClump(this.obj, new Point3D(-14 * meters,-6*meters,3*meters), 3.5*meters, -0.1, grassCols[1]);
    clump = new GrassClump(this.obj, new Point3D(-15 * meters,-6*meters,4*meters), 3*meters, -0.1, col);
    clump = new GrassClump(this.obj, new Point3D(-12.6 * meters,-6*meters,5*meters), 9*meters, -0.1, grassCols[3]);
    clump = new GrassClump(this.obj, new Point3D(-16 * meters,-6*meters,2*meters), 9*meters, -0.15, grassCols[1]);
    clump = new GrassClump(this.obj, new Point3D(-15 * meters,-6*meters,6*meters), 6*meters, -0.15, grassCols[4]);
    clump = new GrassClump(this.obj, new Point3D(-15 * meters,-6*meters,-4*meters), 6*meters, -0.4, grassCols[0]);

    clump = new GrassPatch(this.obj, new Point3D(-16 * meters,-6*meters,-5*meters), 2*meters, 20, grassCols[0]);
    clump = new GrassPatch(this.obj, new Point3D(-15.5 * meters,-6*meters,6*meters), 2*meters, 15, grassCols[4]);
    clump = new GrassPatch(this.obj, new Point3D(-10 * meters,-6*meters,6*meters), 2*meters, 20, grassCols[5]);
    clump = new GrassPatch(this.obj, new Point3D(-11.5 * meters,-6*meters,7*meters), 2*meters, 20, grassCols[5]);
    clump = new GrassPatch(this.obj, new Point3D(-16 * meters,-6*meters,7.5*meters), 2*meters, 20, grassCols[5]);

    //var bill = new GrassBillboard(this.obj,new Point3D(-10.5 * meters,-6*meters,4.1*meters), 1.5*meters, 3*meters, this.grassSprites[0]);
};



proto.particles = function(n) {

    var size = 8; // power of 2
    var scale = 0.07 * meters;

    var canvas = document.createElement('canvas');
    var canvasCtx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    var alpha = document.createElement('canvas');
    var alphaCtx = alpha.getContext('2d');
    alpha.width = size;
    alpha.height = size;

    drawSpriteTri(canvasCtx, alphaCtx, alpha, size, new RGBA(255,255,255,1));

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material = new THREE.SpriteMaterial( { map: texture } );
    /*material.blending = THREE.CustomBlending;
    material.blendSrc = THREE.OneFactor;*/

    var range = 30 * meters;


    for (var i=0; i<n; i++) {
        var sprite = new THREE.Sprite( material );
        sprite.position.set( tombola.rangeFloat(-range,range), tombola.rangeFloat(0,range/2), tombola.rangeFloat(-range,range) );
        sprite.scale.set( scale, scale, 1 );
        this.obj.add( sprite );
        this.particleList.push(new Particle(sprite));
    }

};

//-------------------------------------------------------------------------------------------
//  GRASS TEXTURE
//-------------------------------------------------------------------------------------------

proto.generateGrassTexture = function(col) {

    var size = 32; // power of 2

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    drawGrassTexture(ctx,size,col);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material = new THREE.SpriteMaterial( { map: texture } );
    /*material.blending = THREE.CustomBlending;
    material.blendSrc = THREE.OneFactor;*/

    this.grassSprites.push( material );
};

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

    // move particles //
    var l = this.particleList.length;
    for (var i=0; i<l; i++) {
        this.particleList[i].update();
    }
};

//-------------------------------------------------------------------------------------------
//  GRASS
//-------------------------------------------------------------------------------------------


function GrassBillboard(parent,position,width,height,texture) {
    var sprite = new THREE.Sprite( texture );
    sprite.position.set( position.x, position.y + (height/2), position.z );
    sprite.scale.set( width, height, 1 );
    parent.add( sprite );
}


function GrassClump(parent,position,height,angle,color) {
    this.obj = new THREE.Object3D();
    this.obj.position.set(position.x,position.y,position.z);
    this.obj.rotateY(angle * TAU);
    this.build(height,color);

    parent.add( this.obj );
}
proto = GrassClump.prototype;



proto.build = function(height,col) {

    var mergedGeo	= new THREE.Geometry();
    var matCol = new THREE.Color( colToHex(color.processRGBA(col,true)) );
    var material = new THREE.MeshBasicMaterial( {color: matCol} );
    material.side = THREE.DoubleSide;
    var i, geometry, mesh;

    var r = 0.06 * TAU;

    for (i=0; i<6; i++) {
        geometry = meshBlade1(0.3*meters, height);
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotateY(tombola.rangeFloat(-r, r));
        THREE.GeometryUtils.merge( mergedGeo, mesh );
    }

    for (i=0; i<6; i++) {
        geometry = meshBlade3(0.2*meters, height);
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotateY(tombola.rangeFloat(-r, r));
        THREE.GeometryUtils.merge( mergedGeo, mesh );
    }

    r = 0.02 * TAU;
    mesh = new THREE.Mesh( mergedGeo, material );
    mesh.rotateY(tombola.rangeFloat(-r, r));
    this.obj.add( mesh );
};


function GrassPatch(parent,position,height,number,color) {
    this.obj = new THREE.Object3D();
    this.obj.position.set(position.x,position.y,position.z);
    this.build(height,number,color);

    parent.add( this.obj );
}
proto = GrassPatch.prototype;



proto.build = function(height,number,col) {

    var mergedGeo	= new THREE.Geometry();
    var matCol = new THREE.Color( colToHex(color.processRGBA(col,true)) );
    var material = new THREE.MeshBasicMaterial( {color: matCol} );
    material.side = THREE.DoubleSide;
    var i, geometry, mesh;

    var r = 0.5 * TAU;
    var r2 = (Math.sqrt(number)/8)*meters;

    for (i=0; i<number; i++) {
        geometry = meshBlade4(0.2*meters, height);
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotateY(tombola.rangeFloat(-r, r));
        mesh.position.set(tombola.rangeFloat(-r2,r2),0,tombola.rangeFloat(-r2,r2));
        THREE.GeometryUtils.merge( mergedGeo, mesh );
    }

    r = 0.02 * TAU;
    mesh = new THREE.Mesh( mergedGeo, material );
    mesh.rotateY(tombola.rangeFloat(-r, r));
    this.obj.add( mesh );
};


// simple tri //
function meshBlade1(w,h){

    var hw = w / 2; // half width
    var th = tombola.rangeFloat((h*0.6),h*1.2); // top height
    var tx = tombola.rangeFloat(-(h/4),h/4);    // top x offset
    var tz = tombola.rangeFloat(-(h/8),h/6);    // top z offset
    var bo = tombola.rangeFloat(-w,w);          // base offset angle
    var xo = tx / 3;                            // base x offset


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( xo + tx,  th,  tz),    // top
        new THREE.Vector3( xo - hw,  0,   bo),    // base left
        new THREE.Vector3( xo + hw,  0,   0)      // base right
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    //geometry.faces.push( new THREE.Face3( 0, 2, 1 ) );

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    return geometry;
}

// 2 plane bend //
function meshBlade2(w,h){

    var hw = w / 2;                             // half width
    var th = tombola.rangeFloat((h/2),h);       // top height
    var bo = tombola.rangeFloat(-w,w);          // base offset angle
    var tx = tombola.rangeFloat(-(h/4),h/4);    // top x offset
    var tz = tombola.rangeFloat(-(h/8),h/8);    // top z offset
    var bend = tombola.rangeFloat((h/6),(h/3)); // bend offset for top
    var elbow = th / 2;                         // bend point
    var ex = tx / 2;                            // bend x offset
    var ez = tz / 2;                            // bend z offset
    var xo = tx / 3;                            // base x offset


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(  xo + tx,      th,     tz + bend), // top
        new THREE.Vector3(  xo + ex - hw, elbow,  ez+bo),     // elbow left
        new THREE.Vector3(  xo + ex + hw, elbow,  ez),        // elbow right
        new THREE.Vector3(  xo,           0,      0)          // base
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); // top faces
    //geometry.faces.push( new THREE.Face3( 0, 2, 1 ) );

    geometry.faces.push( new THREE.Face3( 3, 1, 2 ) ); // bottom faces
    //geometry.faces.push( new THREE.Face3( 3, 2, 1 ) );

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    return geometry;
}


// 2 plane bend //
function meshBlade3(w,h){

    var hw = w / 2;                             // half width
    var th = tombola.rangeFloat((h/2),h);       // top height
    var bo = tombola.rangeFloat(-w,w);          // base offset angle
    var tx = tombola.rangeFloat(-(h/4),h/4);    // top x offset
    var tz = tombola.rangeFloat(-(h/8),h/8);    // top z offset
    var bend = tombola.rangeFloat((h/6),(h/3)); // bend offset for top
    var elbow = th / 2;                         // bend point
    var ex = tx / 2;                            // bend x offset
    var ez = tz / 2;                            // bend z offset
    var xo = tx / 3;                            // base x offset


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(  xo + tx,      th,     tz + bend), // top
        new THREE.Vector3(  xo + ex - hw, elbow,  ez+bo),     // elbow left
        new THREE.Vector3(  xo + ex + hw, elbow,  ez),        // elbow right
        new THREE.Vector3(  xo - hw,      0,      0),         // base left
        new THREE.Vector3(  xo + hw,      0,      0)          // base right
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); // top faces

    geometry.faces.push( new THREE.Face3( 3, 1, 2 ) ); // bottom faces
    geometry.faces.push( new THREE.Face3( 3, 2, 4 ) );

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    return geometry;
}

// 2 plane v tri //
function meshBlade4(w,h){

    var hw = w / 2; // half width
    var th = tombola.rangeFloat((h*0.6),h*1.2); // top height
    var tx = tombola.rangeFloat(-(h/4),h/4);    // top x offset
    var tz = tombola.rangeFloat(-(h/8),h/6);    // top z offset
    var xo = tx / 3;                            // base x offset


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( xo + tx,  th,  tz),    // top
        new THREE.Vector3( xo - hw,  0,   0),    // base left
        new THREE.Vector3( xo,  0,   hw),     // base center
        new THREE.Vector3( xo + hw,  0,   0)      // base right
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    return geometry;
}




//-------------------------------------------------------------------------------------------
//  REUSABLE ELEMENTS
//-------------------------------------------------------------------------------------------


function Particle(sprite) {
    var m = 0.001;
    this.xSpeed = tombola.rangeFloat(-m,m);
    this.ySpeed = tombola.rangeFloat(-m,m);
    this.zSpeed = tombola.rangeFloat(-m,m);
    this.sprite = sprite;
}

Particle.prototype.update = function() {
    var s = 0.0001;
    var m = 0.0015;
    this.xSpeed += tombola.rangeFloat(-s,s);
    this.ySpeed += tombola.rangeFloat(-s,s);
    this.zSpeed += tombola.rangeFloat(-s,s);
    this.xSpeed = valueInRange(this.xSpeed,-m,m);
    this.ySpeed = valueInRange(this.ySpeed,-m,m);
    this.zSpeed = valueInRange(this.zSpeed,-m,m);

    this.sprite.position.x += this.xSpeed;
    this.sprite.position.y += this.ySpeed;
    this.sprite.position.z += this.zSpeed;

};



// WHITE RECTANGULAR LIGHT //
function lightPanel(x,y,z,orientation) {
    var w = 1 * meters;
    var h = 0.6 * meters;
    var geometry = new THREE.PlaneGeometry( w, h );
    var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var p = new THREE.Mesh( geometry, material );
    p.position.set(x,y,z);
    switch (orientation) {
        case 'left':
            p.rotation.y = -TAU/4;
            p.position.x -= 0.001;
            break;
        case 'right':
            p.rotation.y = TAU/4;
            p.position.x += 0.001;
            break;
        case 'back':
            p.rotation.y = TAU/2;
            p.position.z -= 0.001;
            break;
        case 'front':
            p.position.z += 0.001;
            break;
    }

    return p;
}


// DRAW WALL BETWEEN 2 POINTS //
function wall(x1,z1,x2,z2,t,h,y,col) {
    var w, d, x, z;

    // x axis //
    if (x1===x2) {
        w = t;
        d = z2 - z1;
        x = x1;
        z = z2 - (d/2);
    }

    // z axis //
    else {
        w = x2 - x1;
        d = t;
        x = x2 - (w/2);
        z = z1;
    }

    var material = new materialType( {color: col} );
    var geometry = new THREE.BoxGeometry( w, h, d );

    var wall = new THREE.Mesh( geometry, material );
    wall.castShadow = true;
    wall.receiveShadow = true;
    wall.position.set(x,y,z);
    return wall;
}



//-------------------------------------------------------------------------------------------
//  SPAWNER
//-------------------------------------------------------------------------------------------

// experimenting with a positioning helper, not really there yet, but you might see the idea.

function Spawner(w,h,d,mesh) {
    this.w = w;
    this.h = h;
    this.d = d;
    this.mesh = mesh;
}
Spawner.prototype.spawn = function( obj ) {
    obj.add (this.mesh);
    // null references here?
};

Spawner.prototype.shadow = function( cast, receive ) {
    this.mesh.castShadow = cast;
    this.mesh.receiveShadow = receive;
};

Spawner.prototype.position = function(x,y,z) {
    this.mesh.position.set(x,y,z);
};

Spawner.prototype.align = function(origin,padding) {
    padding = padding || 0;

    switch (origin) {

        case 'back':
            this.mesh.position.z += ((this.d / 2) + padding);
            break;

        case 'front':
            this.mesh.position.z -= ((this.d / 2) + padding);
            break;

        case 'left':
            this.mesh.position.x -= ((this.w / 2) + padding);
            break;

        case 'right':
            this.mesh.position.x += ((this.w / 2) + padding);
            break;

        case 'top':
            this.mesh.position.y -= ((this.h / 2) + padding);
            break;

        case 'bottom':
        case 'base':
            this.mesh.position.y += ((this.h / 2) + padding);
            break;
    }
};





//-------------------------------------------------------------------------------------------
//  MATHS
//-------------------------------------------------------------------------------------------

// not using any of these here, from an older project.

function meshRotate(mesh) {
    mesh.rotation.y = tombola.rangeFloat(0,TAU);
    meshUpdate(mesh);
}

function meshUpdate(mesh) {
    mesh.updateMatrix();
    mesh.geometry.applyMatrix( mesh.matrix );
    mesh.matrix.identity();
    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( 1, 1, 1 );
}

function scale3D( obj, scale ) {
    obj.scale.x = scale;
    obj.scale.y = scale;
    obj.scale.z = scale;
}

function pointDistance(p1, p2) {
    return Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.z-p2.z)*(p1.z-p2.z) );
}


function assignUVs( geometry ){

    geometry.computeBoundingBox();

    var max     = geometry.boundingBox.max;
    var min     = geometry.boundingBox.min;

    var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);

    geometry.faceVertexUvs[0] = [];
    var faces = geometry.faces;

    for (var i = 0; i < geometry.faces.length ; i++) {

        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),
            new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),
            new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )
        ]);

    }

    geometry.uvsNeedUpdate = true;
    //console.log(geometry.faceVertexUvs[0]);
}