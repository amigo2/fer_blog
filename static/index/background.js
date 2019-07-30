if ( WEBGL.isWebGLAvailable() === false ) {

    document.body.appendChild( WEBGL.getWebGLErrorMessage() );

}

//var container, stats;
var camera, scene, renderer, light;
var controls, water, sphere, zeth, waterurl, waternormals;

init();
animate();

function init() {

    //waternormals.src = waterurl;

    container = document.getElementById( 'container' );
    //

    renderer = new THREE.WebGLRenderer();
    //renderer.setSize( window.innerWidth, window.innerHeight/2 );
    renderer.setSize( window.innerWidth, 500 );
    container.appendChild( renderer.domElement );

    //
    scene = new THREE.Scene();
    //
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 30, 30, 100 );

    //

    light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    scene.add( light );

    // Water

    var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );

    

    water = new THREE.Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( waternormals, function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            alpha: 1.0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            //waterColor: 0x001e0f,//Original
            waterColor: 0x00cc99,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    // Skybox

    var sky = new THREE.Sky();

    var uniforms = sky.material.uniforms;

    uniforms[ 'turbidity' ].value = 10;
    uniforms[ 'rayleigh' ].value = 2;
    uniforms[ 'luminance' ].value = 1;
    uniforms[ 'mieCoefficient' ].value = 0.005;
    uniforms[ 'mieDirectionalG' ].value = 0.8;

    var parameters = {
        distance: 400,
        inclination: 0.49,
        azimuth: 0.205
    };

    var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
    cubeCamera.renderTarget.texture.generateMipmaps = true;
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

    scene.background = cubeCamera.renderTarget;

    function updateSun() {

    theta = Math.PI * ( parameters.inclination - 5);
        var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

        light.position.x = parameters.distance * Math.cos( phi );
        light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
        light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

        sky.material.uniforms[ 'sunPosition' ].value = light.position.copy( light.position );
        water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();

    

        cubeCamera.update( renderer, sky );

    }

    updateSun();
    

    // world
    //cubes
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    geometry.translate( 0, 0.5, 0 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffcc, flatShading: true } );

    for ( var i = 0; i < 500; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 4800 - 4800;
        mesh.position.y = Math.random() * -10 - 10;
        mesh.position.z = Math.random() * 4800 - 800;
        mesh.scale.x = 20;
        mesh.scale.y = Math.random() * 80 + 10;
        mesh.scale.z = 20;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add( mesh );

    }

    //Icosaedro
    var geometry = new THREE.IcosahedronBufferGeometry( 20, 1 );
    var count = geometry.attributes.position.count;

    var colors = [];
    var color = new THREE.Color();

    for ( var i = 0; i < count; i += 3 ) {

        color.setHex( Math.random() * 0xffffff );

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

    }

    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    var material = new THREE.MeshStandardMaterial( {
        vertexColors: THREE.VertexColors,
        roughness: 0.0,
        flatShading: true,
        envMap: cubeCamera.renderTarget.texture,
        side: THREE.DoubleSide
    } );

    sphere = new THREE.Mesh( geometry, material );
    //scene.add( sphere );

    //

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 10, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    //


}

window.addEventListener( 'resize', function()
{
    var width  = window.innerWidth;
    var height = 500;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

)

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );
    render();


}

function render() {

    var time = performance.now() * 0.001;

    sphere.position.y = Math.sin( time ) * 20 + 5;
    sphere.rotation.x = time * 0.5;
    sphere.rotation.z = time * 0.51;

    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

    renderer.render( scene, camera );

}
