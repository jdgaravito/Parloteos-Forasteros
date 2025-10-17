// public/scripts/mindar-script.js
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

console.log('🎯 Iniciando MindAR...');

// Inicializar MindAR
const mindarThree = new MindARThree({
  container: document.body,
  imageTargetSrc: 'targets/botilito.mind',
});

const { renderer, scene, camera } = mindarThree;

// Agregar luz
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// Crear cubo
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);

// Agregar al anchor (imagen objetivo)
const anchor = mindarThree.addAnchor(0);
anchor.group.add(cube);

// Eventos
anchor.onTargetFound = () => {
  console.log('✅ Target encontrado!');
};

anchor.onTargetLost = () => {
  console.log('⚠️ Target perdido');
};

// Loop de animación
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});

// Iniciar
await mindarThree.start();
console.log('✅ MindAR iniciado - apunta a tu imagen objetivo');