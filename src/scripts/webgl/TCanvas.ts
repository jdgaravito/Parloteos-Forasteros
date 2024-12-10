import * as THREE from 'three';
import { gl } from './threeRenderer';

export class TCanvas {
  private cube!: THREE.Mesh;

  constructor() {
    this.init();
    this.render();
  }

  private init(): void {
    // Objeto
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    gl.scene.add(this.cube);

    // Tamaños
    const sizes = {
      width: 800,
      height: 600
    };

    // Cámara
    gl.camera.fov = 35;
    gl.camera.aspect = sizes.width / sizes.height;
    gl.camera.updateProjectionMatrix();
    gl.camera.position.z = 5;

    // Configurar el renderizador
    const canvas = document.querySelector('.webgl') as HTMLCanvasElement;
    gl.setup(canvas);
    gl.renderer.setSize(sizes.width, sizes.height);

    // Manejar el redimensionamiento
    gl.setResizeCallback(() => {
      const { width, height } = gl.size;
      gl.renderer.setSize(width, height);
      gl.camera.aspect = width / height;
      gl.camera.updateProjectionMatrix();
    });
  }

  private render(): void {
    gl.render();
  }
}

export { gl as scene };