// public/scripts/mindar-script.js
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

console.log('🎯 Iniciando MindAR...');

// Prevenir múltiples inicializaciones
if (window.mindarInitialized) {
  console.warn('⚠️ MindAR ya está inicializado');
} else {
  window.mindarInitialized = true;
  
  // Inicializar MindAR
  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: 'targets/botilito.mind',
  });

  const { renderer, scene, camera } = mindarThree;

  // Agregar luz
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Crear elemento de video UNA SOLA VEZ
  const video = document.createElement('video');
  video.src = '/videos/Botilito.mp4';
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.crossOrigin = 'anonymous';
  video.volume = 1.0;

  // Crear textura de video
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBAFormat;

  // Crear plano con textura de video
  const geometry = new THREE.PlaneGeometry(1, 2);
  const material = new THREE.MeshBasicMaterial({ 
    map: videoTexture,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(geometry, material);

  // Agregar al anchor UNA SOLA VEZ
  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(plane);

  // Control del botón de sonido
  const unmuteBtn = document.getElementById('unmute-btn');
  let isMuted = true;

  unmuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    video.muted = isMuted;
    
    if (isMuted) {
      unmuteBtn.textContent = '🔇 Activar Sonido';
      unmuteBtn.classList.remove('active');
    } else {
      unmuteBtn.textContent = '🔊 Sonido Activado';
      unmuteBtn.classList.add('active');
    }
    
    console.log(isMuted ? '🔇 Audio silenciado' : '🔊 Audio activado');
  });

  // Eventos con verificación de estado
  anchor.onTargetFound = () => {
    console.log('✅ Target encontrado!');
    
    if (video.paused) {
      video.play().catch(err => {
        console.warn('⚠️ No se pudo reproducir el video:', err);
      });
      console.log('▶️ Reproduciendo video...');
    }
  };

  anchor.onTargetLost = () => {
    console.log('⚠️ Target perdido');
    
    if (!video.paused) {
      video.pause();
      console.log('⏸️ Video pausado');
    }
  };

  // Loop de animación
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  // Iniciar
  await mindarThree.start();
  console.log('✅ MindAR iniciado - apunta a tu imagen objetivo');

  // Cleanup cuando se cierre
  window.addEventListener('beforeunload', () => {
    video.pause();
    video.src = '';
    mindarThree.stop();
    window.mindarInitialized = false;
  });
}