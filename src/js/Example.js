import * as THREE from 'three'; 
//import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
//creates namespace and imports everything into it
// run by saying parcel ./src/index.html
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
//types parcel ./src/index.html  also install the addon for parcel-reporter-static-files-copy  npm install @parcel/config-default --save-dev
//const testurl = new URL("../assets/Soldier.glb", import.meta.url); //../assets/Soldier.glb
import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3
} from 'three';

const xwing = new URL("../assets/x-wing/scene.gltf", import.meta.url)
var player = { height:1.8, speed:0.1, turnSpeed: Math.PI*0.01 };
var keyboard = {};
var gun = {bulletspeed:0.02};

//const positionofcamera = new THREE.Vector3( 0, 0, 0 );

let automove = 0.0;
//let xwingf;
const xwingf = new THREE.Object3D();
let destroyerf;
let a;
//var model;
var model1;
var destroyer;

var rotateval = 0;

var velocityrotation = 0;

var velocity = 0.0;

var rotatevelo = 0;


//var mixer;
var pubtime = 0;

//onst model3 = null; stays as property null because of const
//const mixer3 = null;

euler = new THREE.Euler(0, 0, 0, 'YXZ'); //180 * (Math.PI/180) // ZYX for experimentation
euler1 = new THREE.Euler(0, 180 * (Math.PI/180), 0, 'YXZ');
rotationSpeed = Math.PI / 180;

let movementX = 0;
let movementY = 0;

let bulsavex =0;
let bulsavey =0;

// walkDirection = new THREE.Vector3()
// cameraTarget = new THREE.Vector3()


var canvas = document.getElementById("canvasID");

//const scene = new THREE.Scene();

const clock = new THREE.Clock();









scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );
				//scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 3, 10, 10 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 5;
				dirLight.shadow.camera.bottom = - 5;
				dirLight.shadow.camera.left = - 5;
				dirLight.shadow.camera.right = 5;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				scene.add( dirLight );

const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

const bullet = new THREE.Mesh( new THREE.BoxGeometry( 1, 1 ,1), new THREE.MeshPhongMaterial( { color: 0x543569, depthWrite: false } ) );
				bullet.receiveShadow = false;
				scene.add( mesh );

const childGeometry = new THREE.BoxGeometry(1, 1, 1);
const childMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
var childMesh = new THREE.Mesh(childGeometry, childMaterial);
const thingGeometry = new THREE.BoxGeometry(5, 5, 5);
const thingMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
var thingMesh = new THREE.Mesh(thingGeometry, thingMaterial);
scene.add(thingMesh);
thingMesh.position.x = 20;
thingMesh.position.y = 20;


//scene.add(positionofcamera);
// cube.position.x = 1;
// cube.position.y = 3;
// cube.position.z = 1;

let y = 0;
let x = 0;
let keyactivate = false;
let accelerationEF = 0;


console.log("made it to the loader");
    const loader = new GLTFLoader();
    

    

   


    loader.load("./assets/venator_class_star_destroyer/scene.gltf", function ( gltf ) {
        
        destroyer = gltf.scene;

        destroyer.traverse( function ( object ) {

            if ( object.isMesh ) object.castShadow = true;

        } );

        
        
        destroyer.scale.set(15, 15, 15);
        //destroyer.postion.x(0);
        scene.add( destroyer );
        destroyerf = destroyer;
        destroyerf.rotation.y = 180 * (Math.PI / 180);
        destoryerf.position.y = 3;
        //destroyer.postion.x(0);
        
        
        
        

});

// loader.load("./assets/scene.gltf", function ( gltf ) {
        
//     model1 = gltf.scene;

//     model1.traverse( function ( object ) {

//         if ( object.isMesh ) object.castShadow = true;

//     } );

    
//     // animations = gltf.animations;

//     // mixer = new THREE.AnimationMixer( model );

//     // // play the first animation
    
//     // console.log(animations  );

//     // // const action = mixer.clipAction( animations[ 0 ] );
//     // // action.play();
//     // mixer.clipAction( animations[ 0 ] ).play();
//     model1.scale.set(0.01, 0.01, 0.01);
//     //scene.add( model1 );
//     xwingf = model1;
//     xwingf.rotation.y = 180 * (Math.PI / 180);
//     //const a = new THREE.Vector3( 0, 1, 0 );
//     //xwingf.add(positionofcamera);
//     // const gridHelper = new THREE.GridHelper( 100, 10);
//     // positionofcamera.add( gridHelper);
//     //xwingf.add(positionofcamera);
//     //positionofcamera.position.y = 0.3;
//     xwingf.add(positionofcamera);
    
//     animate();
//     scene.add( xwingf );
    
    
    
//     // animate();

// });
loader.load("./assets/scene.gltf", function ( gltf ) {
        
    //const xwingf = new THREE.Object3D();
    
    scene.add(xwingf);

    gltf.scene.traverse( function ( object ) {

        if ( object.isMesh ) object.castShadow = true;

    } );
    xwingf.position.y = 0.3;
    xwingf.add(gltf.scene);
    //childMesh.position.set(0, 30, -70);
    xwingf.add(childMesh);
    camera.position.set(0, 20, -140);
    xwingf.add(camera);
    
    

    
    // animations = gltf.animations;

    // mixer = new THREE.AnimationMixer( model );

    // // play the first animation
    
    // console.log(animations  );

    // // const action = mixer.clipAction( animations[ 0 ] );
    // // action.play();
    // mixer.clipAction( animations[ 0 ] ).play();
    xwingf.scale.set(0.01, 0.01, 0.01);
    //scene.add( model1 );
    //xwingf = model1;
    xwingf.rotation.y = 180 * (Math.PI / 180);
    
    camera.rotation.y = 180 * (Math.PI / 180);
    //const a = new THREE.Vector3( 0, 1, 0 );
    //xwingf.add(positionofcamera);
    // const gridHelper = new THREE.GridHelper( 100, 10);
    // positionofcamera.add( gridHelper);
    //xwingf.add(positionofcamera);
    //positionofcamera.position.y = 0.3;
    // const childGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const childMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    // const suuss = new THREE.Mesh(childGeometry, childMaterial);
    //parentObject.add(childMesh);
    
    
    
    animate();
    //scene.add( xwingf );
    
    
    
    // animate();

});



    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
    camera.position.set(0.5,player.height/25, 0);
    // camera.lookAt(new THREE.Vector3(0, player.height, 0));
    //const controls = new OrbitControls( camera, renderer.domElement );
    //controls.update();
    
    




function animate(time) {
    requestAnimationFrame(animate);

    //console.log(childMesh.getParent());
    
    
    speed = 0.0;
    
    const delta = clock.getDelta();
    

    //for ( const mixer of mixers ) mixer.update( delta );
    //mixer.update(delta);
    renderer.setSize(window.innerWidth-0, window.innerHeight-3);
    //camera.position.set(0,player.height,10);
    //xwingf.add(positionofcamera);

    
  
    //a = new THREE.Vector3( xwingf.position.x, xwingf.position.y, xwingf.position.z );
    //const a = new THREE.Vector3( 3, 2, 3 );
    //controls.target = a;
    //controls.update();
    //camera.lookAt( xwingf.position );
    
    
    //controls.update( clock.getDelta() );
    //if(xwingf){
    //    xwingf.rotation.y =  - time / 3000;
    //}
    //model.position.x = camera.position.x;
    //model.position.y = camera.position.y - 1.5;
    //model.position.z = camera.position.z;
    //model.quaternion.setFromEuler(euler);
    //model.position.set(0, 5, 0)
    // cube.rotation.y += 0.01;
    // cube.rotation.x += 0.01;
    pubtime = time;
        if(keyactivate == true){
        
        if(keyboard[87]){
        // xwingf.position.x += Math.sin(euler.y) * player.speed;
        // xwingf.position.z += Math.cos(euler.y) * player.speed;
        // xwingf.position.y -= Math.sin(euler.x) * player.speed;
        if (automove < 1){
            automove += 0.05;
        } 
        if (accelerationEF > -6){
            accelerationEF -= 0.3;
        }
       
        

        // camera.position.x += Math.sin(euler.y) * player.speed;
        // camera.position.z += Math.cos(euler.y) * player.speed; //camera.y is eazy to configure because all you do is move it up,
        // // is there anyway to do that with the transformed cordinate at the start of the loop or the cos and sine funcitons
        // camera.position.y -= Math.sin(euler.x) * player.speed;
        speed = 0.03;

        //mixer.clipAction( animations[ 3 ] ).play();
        
        }
        if(keyboard[83]){
            // xwingf.position.x -= Math.sin(euler.y) * (player.speed/2);
            // xwingf.position.z -= Math.cos(euler.y) * (player.speed/2);
            // xwingf.position.y += Math.sin(euler.x) * (player.speed/2);
            if (automove > -0.3){
                automove -= 0.05;
            }
            if (accelerationEF < 2){
                accelerationEF += 0.1;
            }
            
            

            // camera.position.x -= Math.sin(euler.y) * (player.speed/2);
            // camera.position.z -= Math.cos(euler.y) * (player.speed/2);
            // camera.position.y += Math.sin(euler.x) * (player.speed/2);
            // use the euler to make a metrix for position x, y, z. for the camera based off of the existing xwing position
            speed = -0.03;
        //mixer.clipAction( animations[ 3 ] ).play();
        }
        if(keyboard[65]){
        rotateval -= *rotationSpeed;
        //rotatevelo += 0.2;
        xwingf.rotateZ(-0.05);
        //camera.rotateZ(0.05);
        //xwingf.rotateZ(rotatevelo);

        //velocityrotation += ( rotatevelo - velocityrotation ) * .5;
        euler.z -= -2 * rotationSpeed * -1;

        xwingf.quaternion.setFromEuler(euler);



        // camera.position.x -= Math.sin(euler.y + Math.PI/2) * player.speed;
        // camera.position.z -= Math.cos(euler.y + Math.PI/2) * player.speed;
        //mixer.clipAction( animations[ 3 ] ).play();
        }
        if(keyboard[68]){
        
        rotateval += 2*rotationSpeed;
        //rotatevelo -= 0.2;
        xwingf.rotateZ(0.05);
        //camera.rotateZ(-0.05);
        //xwingf.rotateZ(rotatevelo);

        //  velocityrotation += ( rotatevelo - velocityrotation ) * .5;
        euler.z -= 2 * rotationSpeed * -1;

        xwingf.quaternion.setFromEuler(euler);



        // camera.position.x -= Math.sin(euler.y - Math.PI/2) * player.speed;
        // camera.position.z -= Math.cos(euler.y - Math.PI/2) * player.speed;
        //mixer.clipAction( animations[ 3 ] ).play();
        }
        // if(keyboard[32]){
        //     camera.position.y += .05;
        
        
        // }
        // if(keyboard[16]){
        //     camera.position.y -= .05;
        
        
        // }
        }
        // camera.position.x = xwingf.position.x - Math.sin(euler.y);
        // camera.position.y = xwingf.position.y + 0.3;
        // camera.position.z = xwingf.position.z - Math.cos(euler.y);

        //camera.position.y + 0.3;
        //camera.position.y = positionofcamera.y + 0.3;
        
        //childMesh.position.set(x - xwingf.position.x, y - xwingf.position.y, z - xwingf.position.z);

        //console.log(xwingf.position);
        //console.log(childMesh.position);

        // camera.position.y = positionofcamera.position.y + 0.3 ;
        // camera.position.x = positionofcamera.position.x;
        // camera.position.z = positionofcamera.position.z;
        
        
            xwingf.position.x += automove * (Math.sin(euler.y) * player.speed); // use tangent on rotate or something
            xwingf.position.z += automove * (Math.cos(euler.y) * player.speed);
            xwingf.position.y -= automove * (Math.tan(euler.x) * player.speed);//make it realitive to the xwing's position
            xwingf.updateMatrixWorld();


        




         
        // velocity += ( speed - velocity ) * .05;
        // xwingf.translateZ( velocity );  
        // camera.translateZ( velocity );
        camera.position.set(0, 20, -140 + accelerationEF); //-140
        


        //velocityrotation += ( rotatevelo - velocitrtyrotation ) * .5;
        
        //xwingf.rotateZ(rotateval);
    


        //xwingf.rotateZ(rotateval);
        
        
        renderer.render(scene, camera);
        
    }


    //for your sanity don't look at this part
    canvas.requestPointerLock = canvas.requestPointerLock ||
                    canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
                    document.mozExitPointerLock;
                    keyactivate = false;

    canvas.onclick = function() {
        canvas.requestPointerLock();
        keyactivate = true;
    };
    // pointer lock event listeners

    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        
        document.addEventListener("mousemove", updatePosition, false);
        keyactivate = true;
        } else {
        console.log('The pointer lock status is now unlocked');  
        document.removeEventListener("mousemove", updatePosition, false);
        keyactivate = false;

    }
    }
    //ok the crazyness is over


    function keyDown(event){

    keyboard[event.keyCode] = true;
    //console.log(event.keyCode);

    }

    function keyUp(event){

    keyboard[event.keyCode] = false;
    
    console.log("keyup");
    //for(var i = 0; i<4; i++){
    //    mixer.clipAction( animations[ i ] ).stop();
    //}
    //mixer.clipAction( animations[ 0 ] ).play()

    }



    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('resize',onWindowResize);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }
    
    canvas.addEventListener('click', (event) => {
        if(keyactivate == true){
            console.log("mouseclicked");
            // const bullet = new THREE.Mesh(geometry, material);

            // bullet.scale.x = 0.3;
            // bullet.scale.y = 0.3;
            // bullet.scale.z = 0.3;

            bullet.clone();

            // bullet.rotation.y = euler.y; // current state of camera passed to bullet
            // bullet.rotation.x = euler.x;
            // bullet.position.z = camera.position.z;
            bulsavex = euler.x;
            bulsavey = euler.y;

            bullet.position.z = camera.position.z;
            bullet.position.y = camera.position.y;
            bullet.position.x = camera.position.x;
            bullet.quaternion.setFromEuler(euler);
                for(let i = 0; i < 1000; i++){
                    
                    
                    setTimeout(function(){
                        bullet.position.x -= Math.sin(bulsavey) * gun.bulletspeed;
                        bullet.position.z -= Math.cos(bulsavey) * gun.bulletspeed;
                        bullet.position.y -= Math.sin(-bulsavex) * gun.bulletspeed;
                        console.log("wait");
                        // camera.position.x -= Math.sin(euler.y - Math.PI/2) * player.speed;
                        // camera.position.z -= Math.cos(euler.y - Math.PI/2) * player.speed;
                    }, 10 * i);
                    
                    console.log("go");
                    
                    
                }
                //scene.remove(bullet); // might have to remove material and geometry, this could make program slow
        }
    })


    
function updatePosition(e) {
    // x += event.movementX;
    // y += event.movementY;
    // console.log(x);
    // console.log(y);
    //camera.rotation.y = x * Math.PI / -180;
    //camera.rotation.x = y * Math.PI / -180;
    //camera.rotation.z = 0 * Math.PI / -180;
    // movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    // movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    // euler.y -= movementX * rotationSpeed;
    // euler.x -= movementY * rotationSpeed;
    // euler.x = Math.min(Math.max(euler.x, -1.0472), 1.0472);
    // //sphericalDelta.theta -= angle;
    // //sphericalDelta.phi -= angle;

    // camera.quaternion.setFromEuler(euler);
    // //model.rotation.y = euler.y;
    movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    //euler.rotateZ(rotateval);

    euler.y -= movementX * rotationSpeed;

    euler.x -= movementY * rotationSpeed * -1;
    
    euler.x = Math.min(Math.max(euler.x, -1.0472), 1.0472);

    //euler.z = rotateval;
    //const rotation = new THREE.Euler(euler.x, euler.y, euler.z);
    //xwingf.rotation.copy(rotation);

    xwingf.quaternion.setFromEuler(euler);
    //xwingf.rotation.copy(euler);
    //xwingf.rotateZ(rotateval);// USE ROTATE Z FOR THE AXIS OF THE XWINGF AND WITH THE EULER LINE 

    euler1.y -= movementX * rotationSpeed;
    euler1.x -= movementY * rotationSpeed;
    euler1.x = Math.min(Math.max(euler1.x, -1.0472), 1.0472);

    console.log(euler);

    //camera.quaternion.setFromEuler(euler1);
    //camera.rotateZ(-rotateval);
    
    

    
    //make a vector that comes out of the xwing, that way the camera can move parallel to it and not skrew up

}
