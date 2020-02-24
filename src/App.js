import React, { Component } from 'react';
import * as THREE from 'three';

import Info from './Info';
import Hello from './Hello';


class App extends Component {
  state = {
    displayInfo: false
  };

  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // === Intergrate in React  ===
    this.mount.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xf8dd74 });
    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    var animate = function() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div>
        {this.state.displayInfo ? <Info /> : <Hello />}
        <div ref={ref => (this.mount = ref)} id="threeD"/>
      </div>
    );
  }
}

export default App;
