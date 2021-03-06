!(function () {
	"use strict";
	function t(t) {
		return t && t.Object === Object ? t : null;
	}
	function e(t) {
		return String("0000000" + t).slice(-7);
	}
	function i() {
		function t() {
			return Math.floor(65536 * (1 + Math.random()))
				.toString(16)
				.substring(1);
		}
		return (
			t() +
			t() +
			"-" +
			t() +
			"-" +
			t() +
			"-" +
			t() +
			"-" +
			t() +
			t() +
			t()
		);
	}
	function n(t) {
		var e = {};
		(this.settings = t),
			(this.on = function (t, i) {
				e[t] = i;
			}),
			(this.emit = function (t) {
				var i = e[t];
				i && i.apply(null, Array.prototype.slice.call(arguments, 1));
			}),
			(this.filename = t.name || i()),
			(this.extension = ""),
			(this.mimeType = "");
	}
	function o(t) {
		n.call(this, t),
			(this.extension = ".tar"),
			(this.mimeType = "application/x-tar"),
			(this.fileExtension = ""),
			(this.baseFilename = this.filename),
			(this.tape = null),
			(this.count = 0),
			(this.part = 1),
			(this.frames = 0);
	}
	function r(t) {
		o.call(this, t),
			(this.type = "image/png"),
			(this.fileExtension = ".png");
	}
	function a(t) {
		o.call(this, t),
			(this.type = "image/jpeg"),
			(this.fileExtension = ".jpg"),
			(this.quality = t.quality / 100 || 0.8);
	}
	function s(t) {
		var e = document.createElement("canvas");
		"image/webp" !== e.toDataURL("image/webp").substr(5, 10) &&
			console.log("WebP not supported - try another export format"),
			n.call(this, t),
			(this.quality = t.quality / 100 || 0.8),
			(this.extension = ".webm"),
			(this.mimeType = "video/webm"),
			(this.baseFilename = this.filename),
			(this.framerate = t.framerate),
			(this.frames = 0),
			(this.part = 1),
			(this.videoWriter = new WebMWriter({
				quality: this.quality,
				fileWriter: null,
				fd: null,
				frameRate: this.framerate,
			}));
	}
	function c(t) {
		n.call(this, t),
			(t.quality = t.quality / 100 || 0.8),
			(this.encoder = new FFMpegServer.Video(t)),
			this.encoder.on(
				"process",
				function () {
					this.emit("process");
				}.bind(this)
			),
			this.encoder.on(
				"finished",
				function (t, e) {
					var i = this.callback;
					i && ((this.callback = void 0), i(t, e));
				}.bind(this)
			),
			this.encoder.on(
				"progress",
				function (t) {
					this.settings.onProgress && this.settings.onProgress(t);
				}.bind(this)
			),
			this.encoder.on(
				"error",
				function (t) {
					alert(JSON.stringify(t, null, 2));
				}.bind(this)
			);
	}
	function p(t) {
		n.call(this, t),
			(this.framerate = this.settings.framerate),
			(this.type = "video/webm"),
			(this.extension = ".webm"),
			(this.stream = null),
			(this.mediaRecorder = null),
			(this.chunks = []);
	}
	function h(t) {
		n.call(this, t),
			(t.quality = 31 - ((30 * t.quality) / 100 || 10)),
			(t.workers = t.workers || 4),
			(this.extension = ".gif"),
			(this.mimeType = "image/gif"),
			(this.canvas = document.createElement("canvas")),
			(this.ctx = this.canvas.getContext("2d")),
			(this.sizeSet = !1),
			(this.encoder = new GIF({
				workers: t.workers,
				quality: t.quality,
				workerScript: t.workersPath + "gif.worker.js",
			})),
			this.encoder.on(
				"progress",
				function (t) {
					this.settings.onProgress && this.settings.onProgress(t);
				}.bind(this)
			),
			this.encoder.on(
				"finished",
				function (t) {
					var e = this.callback;
					e && ((this.callback = void 0), e(t));
				}.bind(this)
			);
	}
	function m(t) {
		function e() {
			function t() {
				return (
					this._hooked ||
						((this._hooked = !0),
						(this._hookedTime = this.currentTime || 0),
						this.pause(),
						it.push(this)),
					this._hookedTime + B.startTime
				);
			}
			b("Capturer start"),
				(j = window.Date.now()),
				(C = j + B.startTime),
				(I = window.performance.now()),
				(q = I + B.startTime),
				(window.Date.prototype.getTime = function () {
					return C;
				}),
				(window.Date.now = function () {
					return C;
				}),
				(window.setTimeout = function (t, e) {
					var i = { callback: t, time: e, triggerTime: C + e };
					return E.push(i), b("Timeout set to " + i.time), i;
				}),
				(window.clearTimeout = function (t) {
					for (var e = 0; e < E.length; e++)
						E[e] != t || (E.splice(e, 1), b("Timeout cleared"));
				}),
				(window.setInterval = function (t, e) {
					var i = { callback: t, time: e, triggerTime: C + e };
					return L.push(i), b("Interval set to " + i.time), i;
				}),
				(window.clearInterval = function (t) {
					return b("clear Interval"), null;
				}),
				(window.requestAnimationFrame = function (t) {
					P.push(t);
				}),
				(window.performance.now = function () {
					return q;
				});
			/*try {
				Object.defineProperty(
					HTMLVideoElement.prototype,
					"currentTime",
					{ get: t }
				),
					Object.defineProperty(
						HTMLAudioElement.prototype,
						"currentTime",
						{ get: t }
					);
			} catch (t) {
				b(t);
			}*/
		}
		function i() {
			e(), O.start(), (M = !0);
		}
		function n() {
			(M = !1), O.stop(), d();
		}
		function o(t, e) {
			K(t, 0, e);
		}
		function m() {
			o(g);
		}
		function d() {
			b("Capturer stop"),
				(window.setTimeout = K),
				(window.setInterval = Q),
				(window.clearInterval = X),
				(window.clearTimeout = Y),
				(window.requestAnimationFrame = Z),
				(window.Date.prototype.getTime = et),
				(window.Date.now = $),
				(window.performance.now = tt);
		}
		function u() {
			var t = R / B.framerate;
			((B.frameLimit && R >= B.frameLimit) ||
				(B.timeLimit && t >= B.timeLimit)) &&
				(n(), v());
			var e = new Date(null);
			e.setSeconds(t),
				B.motionBlurFrames > 2
					? (z.textContent =
							"CCapture " +
							B.format +
							" | " +
							R +
							" frames (" +
							A +
							" inter) | " +
							e.toISOString().substr(11, 8))
					: (z.textContent =
							"CCapture " +
							B.format +
							" | " +
							R +
							" frames | " +
							e.toISOString().substr(11, 8));
		}
		function l(t) {
			(H.width === t.width && H.height === t.height) ||
				((H.width = t.width),
				(H.height = t.height),
				(U = new Uint16Array(H.height * H.width * 4)),
				(V.fillStyle = "#0"),
				V.fillRect(0, 0, H.width, H.height));
		}
		function f(t) {
			V.drawImage(t, 0, 0), (_ = V.getImageData(0, 0, H.width, H.height));
			for (var e = 0; e < U.length; e += 4)
				(U[e] += _.data[e]),
					(U[e + 1] += _.data[e + 1]),
					(U[e + 2] += _.data[e + 2]);
			A++;
		}
		function w() {
			for (var t = _.data, e = 0; e < U.length; e += 4)
				(t[e] = (2 * U[e]) / B.motionBlurFrames),
					(t[e + 1] = (2 * U[e + 1]) / B.motionBlurFrames),
					(t[e + 2] = (2 * U[e + 2]) / B.motionBlurFrames);
			V.putImageData(_, 0, 0),
				O.add(H),
				R++,
				(A = 0),
				b("Full MB Frame! " + R + " " + C);
			for (var e = 0; e < U.length; e += 4)
				(U[e] = 0), (U[e + 1] = 0), (U[e + 2] = 0);
			gc();
		}
		function y(t) {
			M &&
				(B.motionBlurFrames > 2
					? (l(t), f(t), A >= 0.5 * B.motionBlurFrames ? w() : m())
					: (O.add(t), R++, b("Full Frame! " + R)));
		}
		function g() {
			var t = 1e3 / B.framerate,
				e = (R + A / B.motionBlurFrames) * t;
			(C = j + e),
				(q = I + e),
				it.forEach(function (t) {
					t._hookedTime = e / 1e3;
				}),
				u(),
				b("Frame: " + R + " " + A);
			for (var i = 0; i < E.length; i++)
				C >= E[i].triggerTime && (o(E[i].callback), E.splice(i, 1));
			for (var i = 0; i < L.length; i++)
				C >= L[i].triggerTime &&
					(o(L[i].callback), (L[i].triggerTime += L[i].time));
			P.forEach(function (t) {
				o(t, C - T);
			}),
				(P = []);
		}
		function v(t) {
			t ||
				(t = function (t) {
					return (
						download(t, O.filename + O.extension, O.mimeType), !1
					);
				}),
				O.save(t);
		}
		function b(t) {
			S && console.log(t);
		}
		function F(t, e) {
			W[t] = e;
		}
		function x(t) {
			var e = W[t];
			e && e.apply(null, Array.prototype.slice.call(arguments, 1));
		}
		function k(t) {
			x("progress", t);
		}
		var S,
			D,
			C,
			j,
			q,
			I,
			m,
			O,
			B = t || {},
			E = (new Date(), []),
			L = [],
			R = 0,
			A = 0,
			P = [],
			M = !1,
			W = {};
		(B.framerate = B.framerate || 60),
			(B.motionBlurFrames = 2 * (B.motionBlurFrames || 1)),
			(S = B.verbose || !1),
			(D = B.display || !1),
			(B.step = 1e3 / B.framerate),
			(B.timeLimit = B.timeLimit || 0),
			(B.frameLimit = B.frameLimit || 0),
			(B.startTime = B.startTime || 0);
		var z = document.createElement("div");
		(z.style.position = "absolute"),
			(z.style.left = z.style.top = 0),
			(z.style.backgroundColor = "black"),
			(z.style.fontFamily = "monospace"),
			(z.style.fontSize = "11px"),
			(z.style.padding = "5px"),
			(z.style.color = "red"),
			(z.style.zIndex = 1e5),
			B.display && document.body.appendChild(z);
		var U,
			_,
			H = document.createElement("canvas"),
			V = H.getContext("2d");
		b("Step is set to " + B.step + "ms");
		var G = {
				gif: h,
				webm: s,
				ffmpegserver: c,
				png: r,
				jpg: a,
				"webm-mediarecorder": p,
			},
			J = G[B.format];
		if (!J)
			throw (
				"Error: Incorrect or missing format: Valid formats are " +
				Object.keys(G).join(", ")
			);
		if (
			((O = new J(B)),
			(O.step = m),
			O.on("process", g),
			O.on("progress", k),
			"performance" in window == 0 && (window.performance = {}),
			(Date.now =
				Date.now ||
				function () {
					return new Date().getTime();
				}),
			"now" in window.performance == 0)
		) {
			var N = Date.now();
			performance.timing &&
				performance.timing.navigationStart &&
				(N = performance.timing.navigationStart),
				(window.performance.now = function () {
					return Date.now() - N;
				});
		}
		var K = window.setTimeout,
			Q = window.setInterval,
			X = window.clearInterval,
			Y = window.clearTimeout,
			Z = window.requestAnimationFrame,
			$ = window.Date.now,
			tt = window.performance.now,
			et = window.Date.prototype.getTime,
			it = [];
		return { start: i, capture: y, stop: n, save: v, on: F };
	}
	var d = { function: !0, object: !0 },
		u =
			(parseFloat,
			parseInt,
			d[typeof exports] && exports && !exports.nodeType
				? exports
				: void 0),
		l = d[typeof module] && module && !module.nodeType ? module : void 0,
		f = l && l.exports === u ? u : void 0,
		w = t(u && l && "object" == typeof global && global),
		y = t(d[typeof self] && self),
		g = t(d[typeof window] && window),
		v = t(d[typeof this] && this),
		b =
			w ||
			(g !== (v && v.window) && g) ||
			y ||
			v ||
			Function("return this")();
	"gc" in window || (window.gc = function () {}),
		HTMLCanvasElement.prototype.toBlob ||
			Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
				value: function (t, e, i) {
					for (
						var n = atob(this.toDataURL(e, i).split(",")[1]),
							o = n.length,
							r = new Uint8Array(o),
							a = 0;
						a < o;
						a++
					)
						r[a] = n.charCodeAt(a);
					t(new Blob([r], { type: e || "image/png" }));
				},
			}),
		(function () {
			if (
				("performance" in window == 0 && (window.performance = {}),
				(Date.now =
					Date.now ||
					function () {
						return new Date().getTime();
					}),
				"now" in window.performance == 0)
			) {
				var t = Date.now();
				performance.timing &&
					performance.timing.navigationStart &&
					(t = performance.timing.navigationStart),
					(window.performance.now = function () {
						return Date.now() - t;
					});
			}
		})();
	var T = window.Date.now();
	(n.prototype.start = function () {}),
		(n.prototype.stop = function () {}),
		(n.prototype.add = function () {}),
		(n.prototype.save = function () {}),
		(n.prototype.dispose = function () {}),
		(n.prototype.safeToProceed = function () {
			return !0;
		}),
		(n.prototype.step = function () {
			console.log("Step not set!");
		}),
		(o.prototype = Object.create(n.prototype)),
		(o.prototype.start = function () {
			this.dispose();
		}),
		(o.prototype.add = function (t) {
			var i = new FileReader();
			(i.onload = function () {
				this.tape.append(
					e(this.count) + this.fileExtension,
					new Uint8Array(i.result)
				),
					this.settings.autoSaveTime > 0 &&
					this.frames / this.settings.framerate >=
						this.settings.autoSaveTime
						? this.save(
								function (t) {
									(this.filename =
										this.baseFilename +
										"-part-" +
										e(this.part)),
										download(
											t,
											this.filename + this.extension,
											this.mimeType
										);
									var i = this.count;
									this.dispose(),
										(this.count = i + 1),
										this.part++,
										(this.filename =
											this.baseFilename +
											"-part-" +
											e(this.part)),
										(this.frames = 0),
										this.step();
								}.bind(this)
						  )
						: (this.count++, this.frames++, this.step());
			}.bind(this)),
				i.readAsArrayBuffer(t);
		}),
		(o.prototype.save = function (t) {
			t(this.tape.save());
		}),
		(o.prototype.dispose = function () {
			(this.tape = new Tar()), (this.count = 0);
		}),
		(r.prototype = Object.create(o.prototype)),
		(r.prototype.add = function (t) {
			t.toBlob(
				function (t) {
					o.prototype.add.call(this, t);
				}.bind(this),
				this.type
			);
		}),
		(a.prototype = Object.create(o.prototype)),
		(a.prototype.add = function (t) {
			t.toBlob(
				function (t) {
					o.prototype.add.call(this, t);
				}.bind(this),
				this.type,
				this.quality
			);
		}),
		(s.prototype = Object.create(n.prototype)),
		(s.prototype.start = function (t) {
			this.dispose();
		}),
		(s.prototype.add = function (t) {
			this.videoWriter.addFrame(t),
				this.settings.autoSaveTime > 0 &&
				this.frames / this.settings.framerate >=
					this.settings.autoSaveTime
					? this.save(
							function (t) {
								(this.filename =
									this.baseFilename +
									"-part-" +
									e(this.part)),
									download(
										t,
										this.filename + this.extension,
										this.mimeType
									),
									this.dispose(),
									this.part++,
									(this.filename =
										this.baseFilename +
										"-part-" +
										e(this.part)),
									this.step();
							}.bind(this)
					  )
					: (this.frames++, this.step());
		}),
		(s.prototype.save = function (t) {
			this.videoWriter.complete().then(t);
		}),
		(s.prototype.dispose = function (t) {
			(this.frames = 0),
				(this.videoWriter = new WebMWriter({
					quality: this.quality,
					fileWriter: null,
					fd: null,
					frameRate: this.framerate,
				}));
		}),
		(c.prototype = Object.create(n.prototype)),
		(c.prototype.start = function () {
			this.encoder.start(this.settings);
		}),
		(c.prototype.add = function (t) {
			this.encoder.add(t);
		}),
		(c.prototype.save = function (t) {
			(this.callback = t), this.encoder.end();
		}),
		(c.prototype.safeToProceed = function () {
			return this.encoder.safeToProceed();
		}),
		(p.prototype = Object.create(n.prototype)),
		(p.prototype.add = function (t) {
			this.stream ||
				((this.stream = t.captureStream(this.framerate)),
				(this.mediaRecorder = new MediaRecorder(this.stream)),
				this.mediaRecorder.start(),
				(this.mediaRecorder.ondataavailable = function (t) {
					this.chunks.push(t.data);
				}.bind(this))),
				this.step();
		}),
		(p.prototype.save = function (t) {
			(this.mediaRecorder.onstop = function (e) {
				var i = new Blob(this.chunks, { type: "video/webm" });
				(this.chunks = []), t(i);
			}.bind(this)),
				this.mediaRecorder.stop();
		}),
		(h.prototype = Object.create(n.prototype)),
		(h.prototype.add = function (t) {
			this.sizeSet ||
				(this.encoder.setOption("width", t.width),
				this.encoder.setOption("height", t.height),
				(this.sizeSet = !0)),
				(this.canvas.width = t.width),
				(this.canvas.height = t.height),
				this.ctx.drawImage(t, 0, 0),
				this.encoder.addFrame(this.ctx, {
					copy: !0,
					delay: this.settings.step,
				}),
				this.step();
		}),
		(h.prototype.save = function (t) {
			(this.callback = t), this.encoder.render();
		}),
		((g || y || {}).CCapture = m),
		"function" == typeof define &&
		"object" == typeof define.amd &&
		define.amd
			? define(function () {
					return m;
			  })
			: u && l
			? (f && ((l.exports = m).CCapture = m), (u.CCapture = m))
			: (b.CCapture = m);
})();
