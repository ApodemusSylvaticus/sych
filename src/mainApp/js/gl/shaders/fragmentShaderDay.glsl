#version 300 es
precision highp float;
in vec2 uv;

uniform sampler2D u_textureDay;
uniform sampler2D u_textureHeat;

out vec4 outFrag;

void main() {
    vec4 dayColor = texture(u_textureDay, uv);
    outFrag = dayColor;
}
