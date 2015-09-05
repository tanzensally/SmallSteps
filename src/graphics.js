// core graphics global vars
var c = null;
var gl = null;
var prog = null;

var vert_buff = null;
var tex_cord_buff = null;

var vec_pos = null;
var tex_cord = null;

var obj_pos = null;
var frag_tex0 = null;
var test_texture = null;

// init function called on page load
function gl_init() {
	c = document.getElementById("cgl");
	if (c == null) { alert("no context passed in"); }

	var wgl = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	for (var n = 0; n < wgl.length; ++n) {
		try { gl = c.getContext(wgl[n]); }
		catch (e) {}
		if (gl) { break; }
	}

	if (gl == null) { alert("panic at gl context"); }

	var vs = grep_shader("shader-vs", gl);
	var fs = grep_shader("shader-fs", gl);
	prog = create_prog(vs, fs, gl);

	// shader atrabutes
	vec_pos = gl.getAttribLocation(prog, "vec_pos");
	gl.enableVertexAttribArray(vec_pos);
	tex_cord = gl.getAttribLocation(prog, "tex_cord_raw");
	gl.enableVertexAttribArray(tex_cord);

	//shader uniforms
	obj_pos = gl.getUniformLocation(prog, "obj_pos");

	//establish textures


	gl.useProgram(prog);


	var quad_vertex = [
		0.5, 0.5, 0,
		-0.5, 0.5, 0,
		0.5, -0.5, 0,
		-0.5, -0.5, 0
	];
	
	vert_buff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vert_buff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quad_vertex), gl.STATIC_DRAW);
	gl.vertexAttribPointer(vec_pos, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);


	var tex_cord_data = [
		1, 0,
		0, 0,
		1, 1,
		0, 1
	];

	tex_cord_buff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, tex_cord_buff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tex_cord_data), gl.STATIC_DRAW);
	gl.vertexAttribPointer(tex_cord, 2, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	test_texture = gl.createTexture();
	var test_img = new Image();
	test_img.onLoad = function() { texture_resolve(text_img, test_texture); }
	test_img.src = "ast/board_tiles.png";

	

	render_loop();
}

// render loop called every frame
function render_loop() {
	window.requestAnimationFrame(render_loop);

	gl.viewport(0, 0, 512, 512);

	gl.clearColor(0.05, 0.05, 0.05, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.bindTexture(gl.TEXTURE_2D, test_texture);

	gl.uniform3fv(obj_pos, new Float32Array([0, 0, 0]));

	gl.bindBuffer(gl.ARRAY_BUFFER, vert_buff);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}