import * as THREE from 'three';

//canvas
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();


//object
// const geometry = new THREE.BoxGeometry(2, 1, 3);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);

// cube.position.set(-0.6,-0.6,1);
// scene.add(cube);

// //Scale
// cube.scale.set(1,1,1);

const group = new THREE.Group();
group.position.set(0,0,0);
group.scale.set(1,1,1);
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff00ff })
);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xf00ff0 })
);

cube2.position.x = -2;
cube3.position.x =  2;

group.add(cube1, cube2, cube3);

//Rotation
// cube.rotation.reorder('ZYX'); this resets to avoid gimbal lock befor changing the rotation

// cube.rotation.y = Math.PI / 2;

//AxesHelper
const axesHelper = new THREE.AxesHelper(3);
axesHelper.position.set(0,0,0);
scene.add(axesHelper);

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera - use FOV 35 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);
// camera.lookAt(cube.position);


//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

export { scene };
