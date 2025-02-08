import * as THREE from 'three';

import { RefObject } from 'react';
import { Renderer } from './renderer';
import { Ball, Paddle } from './objects';

type TargetRef = RefObject<HTMLDivElement | null>;

export class Scene {
  ref: TargetRef;

  renderer: Renderer | null = null;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );

  constructor(ref: TargetRef) {
    this.ref = ref;

    if (!ref) return;

    this.renderer = new Renderer(this.scene, this.camera);
    ref.current?.appendChild(this.renderer.renderer.domElement);
    this.renderer.animate();

    this.camera.position.set(0, 20, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.init();
  }

  async init() {
    this.initLights();
    this.initSurface();
    await this.loadPaddles();
    await this.loadBall();
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xf7fed9, 1);
    dirLight1.position.set(10, 10, 10);
    dirLight1.castShadow = true;
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfd91e1, 1);
    dirLight2.position.set(-10, 8, -10);
    dirLight2.castShadow = true;
    this.scene.add(dirLight2);
  }

  private initSurface() {
    const dim = 100;
    const planeGeometry = new THREE.PlaneGeometry(dim, dim);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: '#7AA4FF' });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    this.scene.add(plane);
  }

  async loadPaddles() {
    const paddle = await new Paddle().load();
    if (!paddle.model) {
      // TODO: Better Error handling
      console.error('Paddle model does not exist.');
      return;
    }

    await this.renderer?.renderer.compileAsync(
      paddle.model,
      this.camera,
      this.scene
    );

    this.scene.add(paddle.model);
    this.renderer?.render();
  }

  async loadBall() {
    const ball = await new Ball().load();
    if (!ball.model) {
      // TODO: Better Error handling
      console.error('Ball model does not exist.');
      return;
    }

    await this.renderer?.renderer.compileAsync(
      ball.model,
      this.camera,
      this.scene
    );

    this.scene.add(ball.model);
    this.renderer?.render();
  }

  public dispose() {
    if (!this.renderer || !this.ref) return;

    this.ref.current?.removeChild(this.renderer.renderer.domElement);

    this.renderer.dispose();
  }
}
