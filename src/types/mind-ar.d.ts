declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  export class MindARThree {
    constructor(config: {
      container: HTMLElement;
      imageTargetSrc: string;
    });
    
    renderer: any;
    scene: any;
    camera: any;
    
    addAnchor(targetIndex: number): any;
    start(): Promise<void>;
    stop(): void;
  }
}