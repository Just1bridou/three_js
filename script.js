import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls";

var card_front = "img/card_front.png"
var card_back = "img/card_back.png"


var scene,
  camera,
  renderer,
  controls,
  frontcard,
  backcard;

var options = {
  isanimate: false,
};

// var gui = new dat.GUI();
// var isanim = gui.addFolder("Animate");
// isanim.add(options, "isanimate").name("Animate");
// isanim.open();

// gui.close()

function init() {
  var container = document.getElementById("world");

  camera = new THREE.PerspectiveCamera(
    30,
    1301 / 2 / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true, alpha: true });
 
  renderer.setPixelRatio(2);
  renderer.setSize(1301 / 2, window.innerHeight);

  controls = new OrbitControls(camera, renderer.domElement);

  /**
   * Inertia
   */
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  /**
   * Zoom
   */
  controls.enableZoom = true;
  controls.maxDistance = 150
  controls.minDistance = 70

  controls.update();
  document.getElementById("world").appendChild(renderer.domElement);
  
  cardFront();
  cardBack();

  animate();
}

function cardFront() {
  var geometry = new THREE.PlaneGeometry(20, 30);

  mapImage(card_front, (material) => {
    frontcard = new THREE.Mesh(geometry, material);
    scene.add(frontcard);
  })
}

function cardBack() {
  var geometry = new THREE.PlaneGeometry(20, 30);

  mapImage(card_back, (material) => {
    backcard = new THREE.Mesh(geometry, material);
    backcard.rotation.set(0, Math.PI, 0);
    scene.add(backcard);
  })
}

function mapImage(url, cb) {
  var img = new Image()
  var canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d")

  img.crossOrigin = "Anonymous";

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage( img, 0, 0 );

    var mat=new THREE.MeshBasicMaterial();
    mat.map = new THREE.CanvasTexture(canvas);

    cb(mat)
  }
  img.src = url;
}
var modelgroup = new THREE.Group();

var matrix = new THREE.Matrix4();
var period = 5;
var clock = new THREE.Clock();

function updateDraw(deltaTime) {
  modelgroup.rotation.set(-camera.rotation._x, -camera.rotation._y, 0);
  if (options.isanimate) {
    matrix.makeRotationY((clock.getDelta() * 0.7 * Math.PI) / period);
    camera.position.applyMatrix4(matrix);
    camera.lookAt(frontcard.position);
  }
}

function animate(deltaTime) {
  requestAnimationFrame(animate);
  updateDraw(deltaTime);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("load", init, false);