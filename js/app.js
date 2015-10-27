/// <reference path="babylon.2.1.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function() {
    // get the canvas
    var canvas = document.getElementById('renderCanvas');

    // create a BabylonJS engine object, true for antialias
    var engine = new BABYLON.Engine(canvas, true);

    // create a scene
    var scene = new BABYLON.Scene(engine);

    // create a camera
    var camera = new BABYLON.TouchCamera('camera', BABYLON.Vector3.Zero(), scene);
    // let the user move the camera
    camera.attachControl(canvas);

    // ambient light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    // HemisphericLight has groundColor
    light.groundColor = new BABYLON.Color3(0, 0, .8);
    // background color
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // the sun
    var sun = BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
    var sunMaterial = new BABYLON.StandardMaterial('sunMat', scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('assets/images/sun.jpg', scene); // creates light
    sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); // do not reflect light
    sun.material = sunMaterial;

    // sunlight
    var sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
    sunLight.intensity = 1.5;

    // planets
    var planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.jpg', scene);
    planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var planetMaterialBlue = new BABYLON.StandardMaterial('planetMatB', scene);
    planetMaterialBlue.diffuseTexture = new BABYLON.Texture('assets/images/bluesand.jpg', scene);
    planetMaterialBlue.specularColor = new BABYLON.Color3(0, 0, 0);

    var planet1 = BABYLON.Mesh.CreateSphere('planet1', 16, 1, scene);
    planet1.position.x = 4;
    planet1.material = planetMaterial;
    planet1.orbit = {
        radius: planet1.position.x,
        speed: 0.01,
        angle: 0
    };

    var planet2 = BABYLON.Mesh.CreateSphere('planet2', 16, 1, scene);
    planet2.position.x = 8;
    planet2.material = planetMaterialBlue;
    planet2.scaling.x = 1.5;
    planet2.scaling.y = 1.5;
    planet2.scaling.z = 1.5;
    planet2.orbit = {
        radius: planet2.position.x,
        speed: -0.01,
        angle: 0
    };

    var planet3 = BABYLON.Mesh.CreateSphere('planet3', 16, 1, scene);
    planet3.position.x = 12;
    planet3.material = planetMaterial;
    planet3.orbit = {
        radius: planet3.position.x,
        speed: 0.02,
        angle: 0
    };

    // skybox
    var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);
    // do not render what we can't see
    skyboxMaterial.backFaceCulling = false;
    // remove reflection
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // move with camera
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;


    //animate/move
    scene.beforeRender = function() {
        planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
        planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
        planet1.orbit.angle += planet1.orbit.speed;

        planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
        planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
        planet2.orbit.angle += planet2.orbit.speed;

        planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
        planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
        planet3.orbit.angle += planet3.orbit.speed;
    };

    engine.runRenderLoop(function() {
        scene.render();
    });

    // the canvas/window resize event handler (for aspect correction)
    window.addEventListener('resize', function() {
        engine.resize();
    });
};
