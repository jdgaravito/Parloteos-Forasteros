// public/scripts/mindar-script.js
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

console.log('🎯 Iniciando MindAR con 3 targets...');

// Prevenir múltiples inicializaciones
if (window.mindarInitialized) {
  console.warn('⚠️ MindAR ya está inicializado');
} else {
  window.mindarInitialized = true;
  
  // Configuración de los 3 targets
const targets = [
  { name: 'Botilito', videoSrc: '/videos/Botilito.mp4', size: { width: 1, height: 2 } },
  { name: 'Firulais', videoSrc: '/videos/Firulais.mp4', size: { width: 1, height: 2 } }, // 👈 Prueba intercambiando
  { name: 'Seco', videoSrc: '/videos/Seco.mp4', size: { width: 1, height: 2 } }
];

  // Inicializar MindAR con 3 targets
  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: '/targets/combined.mind', // 👈 Usaremos UN solo archivo combinado
  });

  const { renderer, scene, camera } = mindarThree;

  // Agregar luz
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Crear videos y planos para cada target
  const videoElements = [];
  
  targets.forEach((target, index) => {
    // Crear video
    const video = document.createElement('video');
    video.src = target.videoSrc;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.volume = 1.0;
    
    videoElements.push(video);

    // Crear textura
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

    // Crear plano
    const geometry = new THREE.PlaneGeometry(target.size.width, target.size.height);
    const material = new THREE.MeshBasicMaterial({ 
      map: videoTexture,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);

    // Agregar a anchor
    const anchor = mindarThree.addAnchor(index);
    anchor.group.add(plane);

    // Eventos
    anchor.onTargetFound = () => {
      console.log(`✅ ${target.name} encontrado!`);
      if (video.paused) {
        video.play().catch(err => {
          console.warn(`⚠️ Error reproduciendo ${target.name}:`, err);
        });
      }
    };

    anchor.onTargetLost = () => {
      console.log(`⚠️ ${target.name} perdido`);
      if (!video.paused) {
        video.pause();
      }
    };
  });

  // Control del botón de sonido (afecta a todos los videos)
  const unmuteBtn = document.getElementById('unmute-btn');
  let isMuted = true;

  unmuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    
    // Aplicar a todos los videos
    videoElements.forEach(video => {
      video.muted = isMuted;
    });
    
    if (isMuted) {
      unmuteBtn.textContent = '🔇 Activar Sonido';
      unmuteBtn.classList.remove('active');
    } else {
      unmuteBtn.textContent = '🔊 Sonido Activado';
      unmuteBtn.classList.add('active');
    }
    
    console.log(isMuted ? '🔇 Todos los audios silenciados' : '🔊 Todos los audios activados');
  });

  // Loop de animación
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  // Iniciar
  await mindarThree.start();
  console.log('✅ MindAR iniciado con 3 targets');

  // Cleanup
  window.addEventListener('beforeunload', () => {
    videoElements.forEach(video => {
      video.pause();
      video.src = '';
    });
    mindarThree.stop();
    window.mindarInitialized = false;
  });
}