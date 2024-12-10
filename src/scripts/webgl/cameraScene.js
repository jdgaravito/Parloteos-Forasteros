import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// cursor

const cursor = { x: 0, y: 0 };

//Sizes
const sizes = {
    width: 800,
    height: 600
}
window.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});

//canvas
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const group = new THREE.Group();
group.position.set(0,0,0);
group.scale.set(1,1,1);
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);


group.add(cube1);

//Rotation
// cube.rotation.reorder('ZYX'); this resets to avoid gimbal lock befor changing the rotation

// cube.rotation.y = Math.PI / 2;

//AxesHelper
const axesHelper = new THREE.AxesHelper(3);
axesHelper.position.set(0,0,0);
scene.add(axesHelper);


//Camera - use FOV 35 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height , 0.1 , 1000);

camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;





//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

//Clock
const clock = new THREE.Clock();

// let time = Date.now();
//Animation
const tick = () => {

    //Elapsed time
    const elapsedTime = clock.getElapsedTime();
    
    // const Currenttime = Date.now();
    // const deltaTime = Currenttime - time;
    // time = Currenttime;


    //Update objects regardles of the frame rate
    // group.rotation.y += 0.001 * deltaTime;
    // group.rotation.y = elapsedTime;

    //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI*2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI*2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
    
    // controls damping
    controls.update();
    //Render
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();


export { scene };
 