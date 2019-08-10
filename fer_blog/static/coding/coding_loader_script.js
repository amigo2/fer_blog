
var whale, texture_url;

var container, controls;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var object;

init();
animate();


function init() 
{

	/*const ctx = document.createElement('canvas').getContext('2d');
	document.body.appendChild(ctx.canvas);
	ctx.canvas.width = 1200;
	ctx.canvas.height = 1200;
	//ctx.fillStyle = '#FFF';
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);*/


	container = document.createElement( 'div' );
	//container.height = 1200;
	document.body.appendChild( container );
	//tweaked the height to be avle to rich a decent scroll down..
	//Should be done with canvas but this is quick work around
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight * 0.5, 1, 5000 );

	camera.position.set( 500, 0, -1700 );//Change distance to fit

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xa0a0a0 );
	scene.fog = new THREE.Fog( 0xa0a0a0, 0, 3000 );

	light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	light.position.set( 0, 600, 0 );
	light.castShadow = true;
	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 200, 100 );
	light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = - 100;
	light.shadow.camera.left = - 120;
	light.shadow.camera.right = 120;
	//scene.add( light );
	

	var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	ground.rotation.x = - Math.PI / 2;
	ground.position.y = -0;
	ground.receiveShadow = true;
	scene.add( ground );



	// manager

	function loadModel() {

		object.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );
		//Object position
		object.position.y = -700;
		object.position.x = -20;//160 for mobile
		object.position.z = -400;
		scene.add( object );

	}

	var manager = new THREE.LoadingManager( loadModel );

	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	// texture

	var textureLoader = new THREE.TextureLoader( manager );

	var texture = textureLoader.load( texture_url );

	// model

	function onProgress( xhr ) {

		if ( xhr.lengthComputable ) {

			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

		}

	}

	function onError() {}

	var loader = new THREE.OBJLoader( manager );

	// loading the file 'whale' form the html file
	loader.load( whale, function ( obj ) 
	{

		object = obj;

	}, onProgress, onError );

	//
	//renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas : document.getElementById('canvas') });
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );

	renderer.setSize( window.innerWidth, window.innerHeight * 2);
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	controls = new THREE.TrackballControls( camera, renderer.domElement );

	//window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - 100 ) ;
	mouseY = ( event.clientY - 100 );

}

function resize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	//object.rotation.x += 0.01;
	requestAnimationFrame( animate );
	render();
}

function render() {

	//controls.update();
	object.rotation.y += 0.004;

	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.lookAt( scene.position );

	renderer.render( scene, camera );
	
	//postprocessing.composer.render( 0.1 );

}