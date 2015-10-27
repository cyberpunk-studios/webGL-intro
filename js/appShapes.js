/// <reference path="babylon.2.1.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function() {
    //get the canvas
    var canvas = document.getElementById('renderCanvas');

    //create a BabylonJS engine object
    var engine = new BABYLON.Engine(canvas, true);

    //create scene
    var scene = new BABYLON.Scene(engine);

    //create camera
    var camera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(0, 2, -15), scene);

    //let the player move the camera with arrow keys and mouse
    camera.attachControl(canvas);

    //light environment light (comes from above)
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    /*
     * materials
     */
    var redMaterial = new BABYLON.StandardMaterial('redMat', scene);
    redMaterial.diffuseColor = new BABYLON.Color3(.8, .3, .3);
    redMaterial.alpha = .9;

    var greenMaterial = new BABYLON.StandardMaterial('greenMat', scene);
    greenMaterial.diffuseColor = new BABYLON.Color3(.2, .8, .2);
    greenMaterial.alpha = .3;

    var sphereMaterial = new BABYLON.StandardMaterial('sphereMat', scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(.2, .4, .8);
    sphereMaterial.specularColor = new BABYLON.Color3(.5, .5, 1);
    sphereMaterial.specularPower = 5;

    var boxMaterial = new BABYLON.StandardMaterial('boxMat', scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(.8, .8, .4);
    boxMaterial.alpha = .5;

    // grass texture for ground
    var grass = new BABYLON.StandardMaterial('grass', scene);
    grass.diffuseTexture = new BABYLON.Texture('assets/images/grass.png', scene);
    grass.diffuseTexture.uScale = 10; //repeat
    grass.diffuseTexture.vScale = 6;
    grass.specularColor = new BABYLON.Color3(0, 0, 0); // grass does not reflect light

    var emissiveMaterial = new BABYLON.StandardMaterial('emissiveMat', scene);
    emissiveMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

    /*
     * add objects
     */

    //create ground
    var ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 4, scene);
    ground.material = grass;

    //create spheres
    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
    sphere.position.y = 1;
    sphere.material = sphereMaterial;
    var sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 16, 4, scene);
    sphere2.position = new BABYLON.Vector3(3, 3, 3);
    sphere2.material = greenMaterial;

    var box = BABYLON.Mesh.CreateBox('box', 1, scene);
    box.position = new BABYLON.Vector3(2, 2, -2);
    box.scaling.x = 2;
    box.scaling.y = 2;
    box.scaling.z = 2;
    box.rotation.x = 45;
    box.material = boxMaterial;

    var cylinder = BABYLON.Mesh.CreateCylinder('cyl', 5, 1, 3, 30, scene);
    cylinder.position = new BABYLON.Vector3(-2, 3, 5);
    cylinder.material = emissiveMaterial;

    var lines = BABYLON.Mesh.CreateLines('lines', [
        new BABYLON.Vector3(0, 5, 0),
        new BABYLON.Vector3(1, 5, 0),
        new BABYLON.Vector3(0, 5, 1),
        new BABYLON.Vector3(2, 2, 0),
        new BABYLON.Vector3(1, 5, -5),
        new BABYLON.Vector3(0, 5, 0) // back to start
    ], scene);

    //render the scene
    engine.runRenderLoop(function() {
        scene.render();
    });

    //call back to resize scene on browser window (fix aspect ratio when resizing)
    window.addEventListener('resize', function() {
        engine.resize();
    });

};
