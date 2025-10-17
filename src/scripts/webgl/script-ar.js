import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import gsap from 'gsap';

console.log('🎯 Cargando MindAR...');

document.addEventListener('DOMContentLoaded', () => {
  const sceneEl = document.querySelector('a-scene');
  const target = document.querySelector('[mindar-image-target]');
  
  if (!sceneEl || !target) {
    console.error('❌ No se encontró la escena o el target');
    return;
  }

  // Cuando se detecta la imagen
  target.addEventListener('targetFound', () => {
    console.log('✅ Target encontrado!');
  });

  target.addEventListener('targetLost', () => {
    console.log('⚠️ Target perdido');
  });

  // Escena lista
  sceneEl.addEventListener('renderstart', () => {
    console.log('✅ AR listo - apunta a tu imagen objetivo');
  });
});