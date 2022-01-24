import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls";

var card_front = "img/card_front.png"
var card_back = "img/card_back.png"

var camera, controls, scene, renderer;
var frustumSize = 1000;
init();
render();
animate();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true, alpha: true });

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var container = document.getElementById( 'world' );
  container.appendChild( renderer.domElement );

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
        
  camera.position.z = 500;

  controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;

  controls.enableZoom = true;
  controls.maxZoom = 3
  controls.minZoom = 2

  // world

  var geometry = new THREE.PlaneGeometry( 200, 300 );
  //var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

  // for ( var i = 0; i < 500; i ++ ) {

    // let x = ( Math.random() - 0.5 ) * 1000;
    // let y = ( Math.random() - 0.5 ) * 1000;
    // let z = ( Math.random() - 0.5 ) * 1000;

    let x = 0;
    let y = 0;
    let z = 0;
    
    mapImage(card_front, (material) => {

      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add( mesh );
    })

    mapImage(card_back, (material) => {

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0, Math.PI, 0);
      //scene.add(mesh);
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add( mesh );
    })
  // }

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
  render();
}

function render() {
  renderer.render( scene, camera );
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