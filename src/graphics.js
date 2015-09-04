// core graphics global vars
var c = null;
var gl = null;
var prog = null;

var vert_buff = null;

var vec_pos = null;
var obj_pos = null;

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

	//shader uniforms
	obj_pos = gl.getUniformLocation(prog, "obj_pos");

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

	render_loop();
}

// render loop called every frame
function render_loop() {
	window.requestAnimationFrame(render_loop);

	gl.clearColor(0.05, 0.05, 0.05, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.uniform3fv(obj_pos, new Float32Array([0, 0, 0]));

	gl.bindBuffer(gl.ARRAY_BUFFER, vert_buff);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}