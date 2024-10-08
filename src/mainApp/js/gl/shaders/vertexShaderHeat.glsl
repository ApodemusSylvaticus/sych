#version 300 es
layout (location = 0) in vec2 a_position;
layout (location = 1) in vec2 a_texCoord;

out vec2 uv;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    uv = vec2(a_texCoord.x, a_texCoord.y);
}
