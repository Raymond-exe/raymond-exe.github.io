import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerOver;

const dotColor = 0xffffff;
const boundryColor = 0x404040
const maxParticleCount = 1000;
const particleCount = 500;
const minDistance = 150;
const numberOfFaces = 4;
const FOV = 25;

const lerpAlpha = 0.3;
const minScroll = 0;
const maxScroll = 3600 * numberOfFaces + 900;
let currentScroll = 0;
let targetScroll = 0;
let scale = 800;

let group;
let camera, overlayCamera;
let scene, overlay;
let renderer;
let positions, colors;
let particles;
let pointCloud;
let particlePositions;
let linesMesh;

const particlesData = [];

const canvas = document.querySelector('.webgl');

init();
animate();

particles.setDrawRange(0, particleCount);
document.body.style.overflow = 'hidden';

function init() {
    const ratio = screenRatio();

    camera = new THREE.PerspectiveCamera( 45, ratio, 1, 4000 );
    camera.position.z = 1550;

    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add( group );

    // overlay setup
    overlay = new THREE.Scene();
    overlayCamera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 1, 10); // TODO this

    const helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( scale, scale, scale ) ) );
    helper.material.color.setHex( boundryColor );
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    group.add( helper );

    const segments = maxParticleCount * maxParticleCount;

    positions = new Float32Array( segments * 3 );
    colors = new Float32Array( segments * 3 );

    const pMaterial = new THREE.PointsMaterial( {
        color: dotColor,
        size: 2,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    } );

    particles = new THREE.BufferGeometry();
    particlePositions = new Float32Array( maxParticleCount * 3 );

    for ( let i = 0; i < maxParticleCount; i ++ ) {

        const x = Math.random() * scale - scale / 2;
        const y = Math.random() * scale - scale / 2;
        const z = Math.random() * scale - scale / 2;

        particlePositions[ i * 3 ] = x;
        particlePositions[ i * 3 + 1 ] = y;
        particlePositions[ i * 3 + 2 ] = z;

        // add it to the geometry
        particlesData.push( {
            velocity: new THREE.Vector3( - 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2 ),
            numConnections: 0
        } );
    }

    particles.setDrawRange( 0, particleCount );
    particles.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ) );

    // create the particle system
    pointCloud = new THREE.Points( particles, pMaterial );
    group.add( pointCloud );

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    geometry.computeBoundingSphere();
    geometry.setDrawRange( 0, 0 );

    const material = new THREE.LineBasicMaterial( {
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
    } );

    linesMesh = new THREE.LineSegments( geometry, material );
    group.add( linesMesh );

    renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000, 0);

    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener('wheel', onMouseScroll, false);
    window.addEventListener('pointermove', onPointerMove);
}

function onMouseScroll(event) {
    targetScroll = Math.min(Math.max(minScroll, targetScroll+event.deltaY), maxScroll);
    return false;
}

function onWindowResize() {
    camera.aspect = screenRatio();
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for ( let i = 0; i < particleCount; i ++ )
        particlesData[ i ].numConnections = 0;

    for ( let i = 0; i < particleCount; i ++ ) {

        // Get particle
        const particleData = particlesData[ i ];

        // Update positions based on velocity
        particlePositions[ i * 3 ] += particleData.velocity.x;
        particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
        particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

        if ( particlePositions[ i * 3 + 1 ] < - scale/2 || particlePositions[ i * 3 + 1 ] > scale/2 )
            particleData.velocity.y = - particleData.velocity.y;

        if ( particlePositions[ i * 3 ] < - scale/2 || particlePositions[ i * 3 ] > scale/2 )
            particleData.velocity.x = - particleData.velocity.x;

        if ( particlePositions[ i * 3 + 2 ] < - scale/2 || particlePositions[ i * 3 + 2 ] > scale/2 )
            particleData.velocity.z = - particleData.velocity.z;

        // Check for collisions
        for ( let j = i + 1; j < particleCount; j ++ ) {

            const particleDataB = particlesData[ j ];

            const dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
            const dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
            const dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
            const dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

            if ( dist < minDistance ) {

                particleData.numConnections ++;
                particleDataB.numConnections ++;

                const alpha = 1.0 - dist / minDistance;

                positions[ vertexpos ++ ] = particlePositions[ i * 3 ];
                positions[ vertexpos ++ ] = particlePositions[ i * 3 + 1 ];
                positions[ vertexpos ++ ] = particlePositions[ i * 3 + 2 ];

                positions[ vertexpos ++ ] = particlePositions[ j * 3 ];
                positions[ vertexpos ++ ] = particlePositions[ j * 3 + 1 ];
                positions[ vertexpos ++ ] = particlePositions[ j * 3 + 2 ];

                colors[ colorpos ++ ] = alpha;
                colors[ colorpos ++ ] = alpha;
                colors[ colorpos ++ ] = alpha;

                colors[ colorpos ++ ] = alpha;
                colors[ colorpos ++ ] = alpha;
                colors[ colorpos ++ ] = alpha;

                numConnected ++;
            }
        }
    }

    linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
    pointCloud.geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);
    
    // Aligns cube rotation 
    currentScroll = lerp(currentScroll, targetScroll, lerpAlpha);
    group.rotation.x = -currentScroll*Math.PI/7200 + Math.PI/8;

    // Intro: camera rotation
    camera.rotation.x = -Math.min(0, currentScroll*Math.PI/18000-Math.PI/4) - Math.PI/500; // added offset for camera rotation

    // Intro: camera zoom
    camera.setFocalLength(Math.min(FOV, FOV*currentScroll/4500));

    // Assign the object the mouse pointer is over
    raycaster.setFromCamera(pointer, camera);
    pointerOver = raycaster.intersectObjects(scene.children)[0];

    // render background
    renderer.autoClear = true;
    renderer.render( scene, camera );

    // render overlay
    renderer.autoClear = false;
    renderer.render(overlay, overlayCamera);
}

function screenRatio() {
    return window.innerWidth / window.innerHeight;
}

// Linear Interpolation to smooth scrolling
function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
