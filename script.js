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
  // controls.addEventListener( 'change', render );

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;

  controls.autoRotate = true

  // controls.enableZoom = true;
  // controls.maxZoom = 3
  // controls.minZoom = 2

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

    // var materialRed =  new THREE.MeshBasicMaterial( { color:0xff0000 } );
    // var front = new THREE.Mesh(geometry, materialRed);

    // front.position.x = x;
    // front.position.y = y;
    // front.position.z = z;
    // front.updateMatrix();
    // front.matrixAutoUpdate = false;
    // scene.add( front );

    
    // var text = new THREE.PlaneGeometry( 300, 50 );

    // var canvas = document.createElement("canvas"),
    // ctx = canvas.getContext("2d")

    // ctx.font = "30px Arial";
    // ctx.fillText("RISITAS", 50, 100); 

    // var mat=new THREE.MeshBasicMaterial({ side:THREE.DoubleSide, transparent:false, opacity:1.0 });
    // mat.map = new THREE.CanvasTexture(canvas);

    // var mesh = new THREE.Mesh(text, mat);


    // mesh.rotation.z = 3 * Math.PI / 6

    // mesh.position.x = x;
    // mesh.position.y = y;
    // mesh.position.z = z + 1;
    // mesh.updateMatrix();
    // mesh.matrixAutoUpdate = false;
    // scene.add( mesh );



    

    mapImage(card_back, (material) => {

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0, Math.PI, 0);
      //scene.add(mesh);
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z //- 5;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add( mesh );
    })


    // var vertical = new THREE.PlaneGeometry( 7, 300 );
    // var horizontal = new THREE.PlaneGeometry( 200, 7 );
    // var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

    /* var left = new THREE.Mesh(vertical, material);
    left.rotation.y = 90
    left.position.x = x + 100;
    left.position.z = z - 3.5;
    left.updateMatrix();
    left.matrixAutoUpdate = false;
    scene.add( left );

    var right = new THREE.Mesh(vertical, material);
    right.rotation.y = -90
    right.position.x = x - 100;
    right.position.z = z - 3.5;
    right.updateMatrix();
    right.matrixAutoUpdate = false;
    scene.add( right );

    var top = new THREE.Mesh(horizontal, material);
    top.rotation.x = -90
    top.position.y = y + 150;
    top.position.z = z - 3.5;
    top.updateMatrix();
    top.matrixAutoUpdate = false;
    scene.add( top );

    var bottom = new THREE.Mesh(horizontal, material);
    bottom.rotation.x = 90
    bottom.position.y = y - 150;
    bottom.position.z = z - 3.5;
    bottom.updateMatrix();
    bottom.matrixAutoUpdate = false;
    scene.add( bottom ); */
  // }

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame(animate);
  //controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
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
// var modelgroup = new THREE.Group();

// var matrix = new THREE.Matrix4();
// var period = 5;
// var clock = new THREE.Clock();

// function updateDraw(deltaTime) {
//   modelgroup.rotation.set(-camera.rotation._x, -camera.rotation._y, 0);
//   if (options.isanimate) {
//     matrix.makeRotationY((clock.getDelta() * 0.7 * Math.PI) / period);
//     camera.position.applyMatrix4(matrix);
//     camera.lookAt(frontcard.position);
//   }
// }

// function animate(deltaTime) {
//   requestAnimationFrame(animate);
//   updateDraw(deltaTime);
//   controls.update();
//   renderer.render(scene, camera);
// }