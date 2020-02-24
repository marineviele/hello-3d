import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Cube extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();

    // === resize for resposiveness
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("mousewheel", this.mousewheel.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("mousewheel", this.mousewheel);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // === scene, camera, renderer
  sceneSetup = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientWidth;
    // const width = window.innerWidth - 20;
    // const height = window.innerWidth - 20;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.camera.position.z = 5;
    this.camera.position.y = 1;
    this.camera.position.x = 1;

    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.zoomSpeed = 5;
    this.controls.maxDistance = 20;

    // === alpha: true sets canvas transparent
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);

    // ===  give color to canvas
    // this.renderer.setClearColor( 0x7dffcf, 1);

    // === Intergrate in React  ===
    // document.body.appendChild( renderer.domElement );
    this.mount.appendChild(this.renderer.domElement);
  };

  resetCamera = () => {
    this.camera.position.z = 5;
    this.camera.position.y = 1;
    this.camera.position.x = 1;
  };

  addCustomSceneObjects = () => {
    // === geometry
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshPhongMaterial({
      color: 0xf8dd74,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
      wireframe: true,
      skinning: true
    });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

    // === lights
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  mousewheel = e => {
    let camPosition = this.camera.position;

    if (camPosition.y < 0.5) {
      this.props.onDisplayInfo();
      this.scene.remove(this.cube);
    } else if (camPosition.y > 6) {
      this.resetCamera();
    }
  };

  render() {
    return <div ref={ref => (this.mount = ref)} id="threeD" />;
  }
}

export default Cube;
