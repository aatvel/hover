import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'


import img1 from '../static/textures/1.jpg'
import img2 from '../static/textures/2.jpg'
import img3 from '../static/textures/3.jpg'
import img4 from '../static/textures/4.jpg'
import img5 from '../static/textures/5.jpg'
import img6 from '../static/textures/6.jpg'
import img7 from '../static/textures/7.jpg'
import img8 from '../static/textures/8.jpg'
import img9 from '../static/textures/9.jpg'
import img10 from '../static/textures/10.jpg'
import img11 from '../static/textures/11.jpg'
import img12 from '../static/textures/12.jpg'

import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Meshes
*/

// Geometry
const geometry = new THREE.PlaneBufferGeometry(1.6, 0.9, 32, 32)

// Material
const images = [img1, img2, img3, img4, img5,img6, img7, img8, img9, img10, img11, img12]
const textures = images.map(img=> new TextureLoader().load(img))


/*
 * Model
*/

var model;
const loader = new GLTFLoader();
loader.load("models/EVR_Planes_v01.glb",
      (gltf) => {   
        
        model = gltf.scene;
        model.scale.set(0.02, 0.02, 0.02)
        model.quaternion.setFromAxisAngle(
            new THREE.Vector3(1, 0, 1),
            Math.PI * 1
        );

        const plane01 = gltf.scene.getObjectByName("Plane_01")
        plane01.traverse(function ( child ) {
            if ( child.isMesh ) {
                child.material = new THREE.MeshBasicMaterial({ color: '#323332'})
                const front = plane01.children.find(child => child.name === 'Plane_01-Plane_front_01')
                front.material = new THREE.MeshBasicMaterial({
                        map:textures[0]
                    }) 

                const back = plane01.children.find(child => child.name === 'Plane_01-Plane_back_01')
                back.material = new THREE.MeshBasicMaterial({
                        map:textures[1]
                    }) 
            }}
        )
        
        const plane02 = gltf.scene.getObjectByName("Plane_02")
        plane02.traverse(function ( child ) {
            if ( child.isMesh ) {
                child.material = new THREE.MeshBasicMaterial({ color: '#323332'})

                const front = plane02.children.find(child => child.name === 'Plane_02-Plane_front_02')
                front.material = new THREE.MeshBasicMaterial({
                        map:textures[4]
                    }) 

                const back = plane02.children.find(child => child.name === 'Plane_02-Plane_back_02')
                back.material = new THREE.MeshBasicMaterial({
                        map:textures[3]
                    }) 
            }}
        ) 

        const plane03 = gltf.scene.getObjectByName("Plane_03")
        plane03.traverse(function ( child ) {
            if ( child.isMesh ) {

                child.material = new THREE.MeshBasicMaterial({ color: '#323332'})

                const front = plane03.children.find(child => child.name === 'Plane_03-Plane_front_03')
                front.material = new THREE.MeshBasicMaterial({
                        map:textures[6]
                    }) 

                const back = plane03.children.find(child => child.name === 'Plane_03-Plane_back_03')
                back.material = new THREE.MeshBasicMaterial({
                        map:textures[5]
                    }) 
            }}
        ) 

        const plane04 = gltf.scene.getObjectByName("Plane_04")
        plane04.traverse(function ( child ) {
            if ( child.isMesh ) {
                child.material = new THREE.MeshBasicMaterial({ color: '#323332'})

                const front = plane04.children.find(child => child.name === 'Plane_04-Plane_front_04')
                front.material = new THREE.MeshBasicMaterial({
                        map:textures[8]
                    }) 

                const back = plane04.children.find(child => child.name === 'Plane_04-Plane_back_04')
                back.material = new THREE.MeshBasicMaterial({
                        map:textures[7]
                    })
            }}
        )

        const plane05 = gltf.scene.getObjectByName("Plane_05")
        plane05.traverse(function ( child ) {
            if ( child.isMesh ) {
                child.material = new THREE.MeshBasicMaterial({ color: '#323332'})

                const front = plane05.children.find(child => child.name === 'Plane_05-Plane_front_05')
                front.material = new THREE.MeshBasicMaterial({
                        map:textures[10]
                    }) 

                const back = plane05.children.find(child => child.name === 'Plane_05-Plane_back_05')
                back.material = new THREE.MeshBasicMaterial({
                        map:textures[9]
                    })
            }}
        )
    
        
        scene.add(gltf.scene);        
      }
);


/*
* Lights
*/


/**
 * Scroll
*/
let scroll = 0;
let scrollTarget = 0;
let currentScroll = 0;


//2
let speed = 0;
let position = 0;
let rounded = 0;
window.addEventListener('wheel', (e) => {
    speed -= e.deltaY * 0.0003;
})


// window.addEventListener('mousewheel', (e)=>{
//     scrollTarget = e.wheelDelta * 0.5;
// })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0.25, 0, 10)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000)

/*
* POST PROCESS
*/
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const myEffect = {
    uniforms: {
      "tDiffuse": { value: null },
      "resolution": { value: new THREE.Vector2(1.,window.innerHeight/window.innerWidth) },
      "uMouse": { value: new THREE.Vector2(-10,-10) },
      "uVelo": { value: 0 },
    },
    vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
    fragmentShader: `
    uniform float time;
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;

    varying vec2 vUv;

    uniform vec2 uMouse;

    float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
      uv -= disc_center;
      uv*=resolution;
      float dist = sqrt(dot(uv, uv));
      return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
    }

    void main()  {
        vec2 newUV = vUv;
        float c = circle(vUv, uMouse, 0.0, 0.08);
        float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * 0.1)).x;
        float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * 0.125)).y;
        float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * 0.15)).z;
        vec4 color = vec4(r, g, b, 1.);
        gl_FragColor = color;
    }`
  }

const  customPass = new ShaderPass(myEffect);
customPass.renderToScreen = true;
composer.addPass(customPass);


const uMouse = new THREE.Vector2()

document.addEventListener('mousemove', (e) => {
    // mousemove / touchmove
    uMouse.x = ( e.clientX / window.innerWidth ) ;
    uMouse.y = 1. - ( e.clientY/ window.innerHeight );
});



/**
 * Animate
*/

 const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // if (model) model.rotation.y = 0.1 * elapsedTime + currentScroll * 0.3;
  
    
    // //scroll
    // scroll += (scrollTarget - scroll) * 0.2
    // scroll *= 0.9
    // scrollTarget *= 0.9
    // currentScroll += scroll * 0.02
    // console.log(currentScroll)


    if (model) model.rotation.y = 0.15 * elapsedTime + position

    //2
    position += speed;
    speed *= 0.9;
    rounded = Math.round(position);

    let diff = (rounded - position);
    // let diff = (2 * Math.PI) / 5;

    position +=  Math.pow(Math.abs(diff), 0.95)* 0.015;


    //shader
    customPass.uniforms.uMouse.value = uMouse;

    // Render
    renderer.render(scene, camera)
    composer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()