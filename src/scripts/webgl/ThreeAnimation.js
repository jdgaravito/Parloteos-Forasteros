import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// cursor

const cursor = { x: 0, y: 0 };


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

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera - use FOV 35 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);
// camera.lookAt(cube.position);

//controls and damping
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});


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
    group.rotation.y = elapsedTime;

    //Render
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

tick();


export { scene };
 