uniform float uTime;
uniform sampler2D texture1;

varying vec2 vUv;
varying vec3 vPosition;

void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}