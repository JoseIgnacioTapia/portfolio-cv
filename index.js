import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const container = document.getElementById('animation-container');
const loader = document.getElementById('loader');

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

// Change background color scene
scene.background = new THREE.Color(0x87ceeb);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
// Reduce the object scale by 25%
mesh.scale.set(0.8, 0.8, 0.8);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}
animate();

// Show the animation container and hide the loader when Three.js is ready
window.addEventListener('load', () => {
  loader.style.display = 'none';
  container.style.display = 'block';
});
