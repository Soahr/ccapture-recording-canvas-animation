var canvas,
	ctx,
	playing = false,
	recording = false;

var capturer = new CCapture({
	//format: "webm-mediarecorder",
	format: "webm",
	framerate: 60,
	quality: 75,
});

(function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	// Async font loading
	// https://github.com/typekit/webfontloader
	WebFont.load({
		google: {
			families: ["Google Sans", "Google Sans:bold"],
		},
	});

	document.getElementById("start").addEventListener("click", function () {
		console.log("Start capture");
		playing = true;
		lastUpdate = performance.now();
		recording = true;
		capturer.start();
	});

	document.getElementById("stop").addEventListener("click", function () {
		console.log("Stop capture");
		capturer.stop();
		recording = false;
		playing = false;
		capturer.save();
	});

	Update();
})();

function drawText(x, y, zoom) {
	// Draw background
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	// Save context
	ctx.save();

	// Draw text
	scaleCanvasOnPivotPoint(zoom, canvas.width / 2, canvas.height / 2);
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "bold 150px Google Sans";
	ctx.fillStyle = "#000000";
	ctx.fillText("CCapture.js", canvas.width / 2 + x, canvas.height / 2 + y);

	// Restore context
	ctx.restore();
}

var lastUpdate;
var t = 0;
function Update() {
	var now = performance.now();
	var dt = now - lastUpdate;
	lastUpdate = now;

	requestAnimationFrame(function () {
		Update();
	});

	drawText(Math.sin(t) * 100, Math.sin(t * 2) * 50, 1);

	t += 0.05;

	if (recording) {
		capturer.capture(canvas);
	}
}

function scaleCanvasOnPivotPoint(s, p_x, p_y) {
	ctx.translate(p_x, p_y);
	ctx.scale(s, s);
	ctx.translate(-p_x, -p_y);
}
