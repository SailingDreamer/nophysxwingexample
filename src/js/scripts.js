import * as THREE from 'three'; 
//import Ammo from '../../static/builds/ammo.wasm.js';
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

// class physicsEngine {
//     constructor() {

//     }
    


// }
var canvas = document.getElementById("canvasID");






    //function init(){
        var player = { height:1.8, speed:0.1, turnSpeed: Math.PI*0.01 };
        var keyboard = {};
        var gun = {bulletspeed:0.02};

        let angleY = 0;
        let angleX = 0;
        let angleZ = 0;

        //const positionofcamera = new THREE.Vector3( 0, 0, 0 );

        const quaternion = new THREE.Quaternion();
        let automove = 0.0;
        //let xwingf;
        const xwingf = new THREE.Object3D();
        //let a;
        //var model;
        //let model1;
        let destroyerf;
        let destroyer;
        let lucrehulk;
        let lucrehulkf;

        // var rotateval = 0;

        // var velocityrotation = 0;

        // var velocity = 0.0;

        // var rotatevelo = 0;


        //var mixer;
        let pubtime = 0;

        //onst model3 = null; stays as property null because of const
        //const mixer3 = null;

        
        rotationSpeed = Math.PI / 180;

        let movementX = 0;
        let movementY = 0;

        let bulsavex =0;
        let bulsavey =0;

        let keyactivate = false;

        // walkDirection = new THREE.Vector3()
        // cameraTarget = new THREE.Vector3()


      

        //const scene = new THREE.Scene();

        const clock = new THREE.Clock();





        
        //3D stuff past here

        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
        camera.position.set(0.5,player.height/25, 0);

        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        document.body.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;

        userinput();
        



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

        

        // const bullet = new THREE.Mesh( new THREE.BoxGeometry( 1, 1 ,1), new THREE.MeshPhongMaterial( { color: 0x543569, depthWrite: false } ) );
        //                 bullet.receiveShadow = false;
        //                 scene.add( mesh );

        // const childGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const childMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        // var childMesh = new THREE.Mesh(childGeometry, childMaterial);
        // const thingGeometry = new THREE.BoxGeometry(5, 5, 5);
        // const thingMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        // var thingMesh = new THREE.Mesh(thingGeometry, thingMaterial);
        // scene.add(thingMesh);
        // thingMesh.position.x = 20;
        // thingMesh.position.y = 20;


        //scene.add(positionofcamera);
        // cube.position.x = 1;
        // cube.position.y = 3;
        // cube.position.z = 1;

        let y = 0;
        let x = 0;
        let accelerationEF = 0;


        const loader = new GLTFLoader();
            
            loader.load("./assets/star_wars_lucrehulk_model_22.09.2016/scene.gltf", function ( gltf ) {
                
                lucrehulk = gltf.scene;

                lucrehulk.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                } );

                
                
                lucrehulk.scale.set(0.1, 0.1, 0.1);
                //destroyer.postion.x(0);
                scene.add( lucrehulk );
                lucrehulkf = lucrehulk;
                lucrehulkf.rotation.y = 180 * (Math.PI / 180);
                lucrehulkf.position.y = 6;
                lucrehulkf.position.z = 100;
                //destroyer.postion.x(0);
                console.log("lucrehulkprinted")
                
                
                
                

            });

            loader.load("./assets/venator_class_star_destroyer/scene.gltf", function ( gltf ) {
                
                destroyer = gltf.scene;

                destroyer.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                } );

                
                
                destroyer.scale.set(15, 15, 15);
                //destroyer.postion.x(0);
                scene.add( destroyer );
                destroyerf = destroyer;
                destroyerf.rotation.y = 4 * (Math.PI / 180);
                destroyerf.position.y = 3;
                destroyerf.position.z = -25;
                //destroyer.postion.x(0);
            });

            

        
            loader.load("./assets/scene.gltf", function ( gltf ) {
                
                
                scene.add(xwingf);

                gltf.scene.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                } );
                xwingf.position.y = 0.3;
                xwingf.add(gltf.scene);
                //childMesh.position.set(0, 30, -70);
                //xwingf.add(childMesh);
                camera.position.set(0, 20, -140);
                xwingf.add(camera);
                
                xwingf.scale.set(0.01, 0.01, 0.01);
                
                xwingf.rotation.y = 180 * (Math.PI / 180);
                
                camera.rotation.y = 180 * (Math.PI / 180);
                

            });


        
            
            animate();
    //}



    function animate() {
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
        //pubtime = time;
            if(keyactivate == true){
                
                if(keyboard[87]){
                    
                    if (automove < 1){
                        automove += 0.05;
                    } 
                    if (accelerationEF > -6){
                        accelerationEF -= 0.3;
                    }
            
                    speed = 0.03;

                    //mixer.clipAction( animations[ 3 ] ).play();
                
                }
                if(keyboard[83]){
                    
                    if (automove > -0.3){
                        automove -= 0.05;
                    }
                    if (accelerationEF < 2){
                        accelerationEF += 0.1;
                    }
                
                    speed = -0.03;
                }
                if(keyboard[65]){
                    //rotateval -= *rotationSpeed;
                    angleZ -= 0.04;
                
                }
                if(keyboard[68]){
                
                    //rotateval += 2*rotationSpeed;
                    angleZ += 0.04;
                
                }
                // if(keyboard[32]){
                //     camera.position.y += .05;
                
                
                // }
                // if(keyboard[16]){
                //     camera.position.y -= .05;
                
                
                // }
            }
            
            
            
            xwingf.position.x += automove * (Math.sin(angleY) * player.speed); // use tangent on rotate or something
            xwingf.position.z += automove * (Math.cos(angleY) * player.speed);
            xwingf.position.y -= automove * (Math.tan(angleX) * player.speed);//make it realitive to the xwing's position
            xwingf.updateMatrixWorld();
            //xwingf.quaternion.z = 1;
            //xwingf.quaternion.normalize();


            //console.log(angleZ);

            const quaternionX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angleX);
            const quaternionY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angleY);
            const quaternionZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleZ);
        
            // Multiply the two quaternions to get the final rotation quaternion
            //quaternion.multiplyQuaternions(quaternionY, quaternionX);
            //let quaternion.premultiply(quaternionZ);
            const quaternion = quaternionY.clone().multiply(quaternionX).multiply(quaternionZ);
            //const quaternion = quaternionY.clone().multiply(quaternionX);
            //mesh.matrix.makeRotationFromQuaternion(quaternion);
            //const quaternion = quaternionZ.clone().multiply(quaternionX).multiply(quaternionZ);
            
        
            // Update the camera's orientation based on the quaternion
            xwingf.setRotationFromQuaternion(quaternion);
            //xwingf.quaternion.premultiply(quaternionZ);
            //xwingf.setRotationFromQuaternion(quaternionZ);


            
            // velocity += ( speed - velocity ) * .05;
            // xwingf.translateZ( velocity );  
            // camera.translateZ( velocity );
            camera.position.set(0, 20, -140 + accelerationEF); //
            
            
            renderer.render(scene, camera);
            
    }


    function userinput(){

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

            renderer();

        }
        
        canvas.addEventListener('click', (event) => {
            // if(keyactivate == true){
            //     console.log("mouseclicked");
            //     // const bullet = new THREE.Mesh(geometry, material);

            //     // bullet.scale.x = 0.3;
            //     // bullet.scale.y = 0.3;
            //     // bullet.scale.z = 0.3;

            //     bullet.clone();

            //     // bullet.rotation.y = euler.y; // current state of camera passed to bullet
            //     // bullet.rotation.x = euler.x;
            //     // bullet.position.z = camera.position.z;
            //     //bulsavex = euler.x;
            //     //bulsavey = euler.y;

            //     bullet.position.z = camera.position.z;
            //     bullet.position.y = camera.position.y;
            //     bullet.position.x = camera.position.x;
            //     bullet.quaternion.setFromEuler(euler);
            //         for(let i = 0; i < 1000; i++){
                        
                        
            //             setTimeout(function(){
            //                 bullet.position.x -= Math.sin(bulsavey) * gun.bulletspeed;
            //                 bullet.position.z -= Math.cos(bulsavey) * gun.bulletspeed;
            //                 bullet.position.y -= Math.sin(-bulsavex) * gun.bulletspeed;
            //                 console.log("wait");
            //                 // camera.position.x -= Math.sin(euler.y - Math.PI/2) * player.speed;
            //                 // camera.position.z -= Math.cos(euler.y - Math.PI/2) * player.speed;
            //             }, 10 * i);
                        
            //             console.log("go");
                        
                        
            //         }
            //         //scene.remove(bullet); // might have to remove material and geometry, this could make program slow
            // }
        })


        
        function updatePosition(e) {
         
            const { movementX, movementY } = e;
            //console.log(movementX + movementY);

        // Calculate the rotation angles based on the mouse movement
        const deltaX = movementX;// - window.innerWidth / 2) / window.innerWidth
        const deltaY = movementY;// - window.innerWidth / 2) / window.innerWidth
        angleX += deltaY * (Math.PI/180);// * Math.PI
        angleY -= deltaX * (Math.PI/180);
        
        console.log(angleY);
        console.log(angleX);
        angleX = Math.min(Math.max(angleX, -1.0472), 1.0472);

        }
    }

//userinput()
//init()
//animate()
