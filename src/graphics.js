var c = null;
var gl = null;
var prog = null;

var vs = null;
var fs = null;


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

	vs = grep_shader("shader-vs", gl);
	fs = grep_shader("shader-fs", gl);
	prog = create_prog(vs, fs, gl);

	gl.useProgram(prog);

	render_loop();
}

function render_loop() {
	window.requestAnimationFrame(render_loop);

	gl.clearColor(0.05, 0.05, 0.05, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}