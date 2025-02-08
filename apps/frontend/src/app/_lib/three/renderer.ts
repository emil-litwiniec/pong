import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

export class Renderer {
  public renderer = new THREE.WebGLRenderer();

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public controls!: OrbitControls;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    window.addEventListener('resize', this.resize);
    this.setSize();

    this.initControls();
    this.configureRenderer();
  }

  private configureRenderer() {
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;
  }

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  private setSize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.setSize();
  };

  public render = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  public animate = () => {
    this.renderer.setAnimationLoop(this.render);
  };

  public dispose() {
    this.renderer.dispose();
    window.removeEventListener('resize', this.resize);
  }
}
