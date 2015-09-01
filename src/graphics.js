var c = null;
var gl = null;
var prog = null;

var vs = null;
var fs = null;


c = document.getElementById("c");
var wgl = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
for (var n = 0; n < wgl.length; ++n) {
	try { gl = c.getContext(wgl[n]); }
	catch (e) {}
	if (this.gl) { break; }
}

if (gl == null) { alert("panic at gl context"); }

vs = grep_shader();
fs = grep_shader();
prog = create_prog(vs, fs, gl);