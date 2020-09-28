
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;


function init() {

    container = document.querySelector( '#scene-container' );
  
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );
  
    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();
  
    renderer.setAnimationLoop( () => {
  
      update();
      render();
  
    } );
  
  }
  
  function createCamera() {
  
    camera = new THREE.PerspectiveCamera(
      35, // FOV
      container.clientWidth / container.clientHeight, // aspect
  
      0.1, // near clipping plane
      100, // far clipping plane
    );
  
    camera.position.set( -5, 5, 7 );
  
  }

  function createControls(){
    controls = new THREE.OrbitControls( camera, container );

  }
  
  function createLights() {
  
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // sky color
        0x202020, // ground color
        5, // intensity
      );
    
      const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
      mainLight.position.set( 10, 10, 10 );
    
      scene.add( ambientLight, mainLight );
    
  
  }
  
  function createMaterials() {
    const body = new THREE.MeshStandardMaterial( {
      color: 0xff3333, // red
      flatShading: true,
    } );

    body.color.convertSRGBToLinear();

    const detail = new THREE.MeshStandardMaterial( {
      color: 0x333333,
      flatShading: true,
    } );

    detail.color.convertSRGBToLinear();

    return{
      body,
      detail,

    }
  
  }

  function createGeomaterials(){
    const nose = new THREE.CylinderBufferGeometry( 0.75, 0.75, 3, 12 );

    const cabin = new THREE.BoxBufferGeometry(2,2.25,1.5);

    const chimney = new THREE.CylinderBufferGeometry(0.3, 0.1, 0.5);

    const wheel =new THREE.CylinderBufferGeometry(0.4,0.4,1.75,16);
    wheel.rotateX(Math.PI /2);

    return{
      nose,
      cabin,
      chimney,
      wheel

    }
  }

  function createMeshes(){

    const train = new THREE.Group;
    scene.add(train);

    const material = createMaterials();
    const geomaterials = createGeomaterials();

    const nose = new THREE.Mesh(geomaterials.nose, material.body);
    nose.rotation.z = Math.PI / 2;
    nose.position.x = -1;

    const cabin = new THREE.Mesh(geomaterials.cabin, material.body);
    cabin.position.set(1.5,0.4,0);

    const chimney = new THREE.Mesh(geomaterials.chimney, material.detail);
    chimney.position.set(-2, 0.9, 0);

    const smallWheelRear = new THREE.Mesh(geomaterials.wheel, material.detail)
    smallWheelRear.position.set(0,-0.5,0);
    
    const smallWheelCenter = smallWheelRear.clone();
    smallWheelCenter.position.x = -1;

    const smallWheelFront = smallWheelRear.clone();
    smallWheelFront.position.x = -2;

    const bigWheel = smallWheelRear.clone();
    bigWheel.scale.set(2,2,1.25);
    bigWheel.position.set(1.5, -0.1, 0);


    train.add(

      nose,
      cabin,
      chimney,
  
      smallWheelRear,
      smallWheelCenter,
      smallWheelFront,
      bigWheel,
  
    );
  }
  
  function createRenderer() {
  
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( container.clientWidth, container.clientHeight );
  
    renderer.setPixelRatio( window.devicePixelRatio );
  
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
  
    container.appendChild( renderer.domElement );
  
  }



function update(){

}

function render(){
    renderer.render( scene, camera );// segir renderinum að rendera senuna og myndavélina
}



function onWindowResize(){
    camera.aspect = container.clientWidth /container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( container.clientWidth, container.clientHeight );
}
window.addEventListener("resize", onWindowResize);



init();

