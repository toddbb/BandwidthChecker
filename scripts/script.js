const Ui = {
	els: {},

	updateValues(speed) {
		this.els.result.innerText = `${speed.toFixed(0)}`;
	},

	async startBandwidthTest() {
		_hide(this.els.errorContainer);
		this.showLoader();
		const response = await FastApi.run();
		this.hideLoader();
		if (response.averageSpeed) {
			this.updateValues(response.averageSpeed);
		} else {
			this.errorHandler(response.error);
		}
	},

	showLoader() {
		_hide(this.els.resultContainer);
		_show(this.els.loaderContainer);
	},

	hideLoader() {
		_hide(this.els.loaderContainer);
		_show(this.els.resultContainer);
	},

	errorHandler(error) {
		_hide(this.els.resultContainer);
		_show(this.els.errorContainer);
		this.els.errorSub.innerText = error;
	},

	init() {
		this.els.buttonRun = document.getElementById("runTest");
		this.els.resultContainer = document.getElementsByClassName("resultContainer")[0];
		this.els.result = document.getElementById("result");
		this.els.loaderContainer = document.getElementsByClassName("loaderContainer")[0];
		this.els.errorContainer = document.getElementsByClassName("errorContainer")[0];
		this.els.errorMain = document.getElementsByClassName("errorMain")[0];
		this.els.errorSub = document.getElementsByClassName("errorSub")[0];
		this.els.buttonRun.addEventListener("click", () => this.startBandwidthTest());
	},
};

const FastApi = {
	baseUrl: "https://api.fast.com/netflix/speedtest/v2?token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=",
	count: 1,
	averageSpeed: 0,

	async getFastComConfiguration() {
		try {
			const response = await fetch(this.baseUrl + this.count);
			const data = await response.json();
			return data.targets.map((target) => target.url);
		} catch (error) {
			console.error("Problem configuring API: " + error.message);
			Ui.errorHandler(error.message);
		}
	},

	async run() {
		let totalSpeed = 0;
		let testCount = 0;

		try {
			const testUrls = await this.getFastComConfiguration();

			for (let i = 0; i < this.count; i++) {
				const url = testUrls[i];

				const startTime = performance.now();

				const response = await fetch(url);
				const blob = await response.blob();

				const endTime = performance.now();
				const duration = (endTime - startTime) / 1000; // Convert to seconds

				const fileSize = blob.size; // Get the size of the downloaded file in bytes

				const speedMbps = (fileSize * 8) / (duration * 1000000); // Convert to Mbps
				totalSpeed += speedMbps;
				testCount++;

				this.averageSpeed = totalSpeed / testCount; // Calculate the average speed so far
			}
		} catch (error) {
			console.error("Error testing bandwidth: " + error.message);
			return {
				averageSpeed: null,
				error: error.message,
			};
		}

		return { averageSpeed: this.averageSpeed };
	},
};

/////////////////////////////////
/// Function: init
///
/// Initializes the DOM after it is loaded
///
const init = () => {
	console.log("The DOM is loaded.");
	Ui.init();
};

document.addEventListener("DOMContentLoaded", () => init());

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/************************         HELPER FUNCTIONS            ****************************/
//
/// hide entire HTML collections, nodes, or single elements by adding class 'nodisplay'
function _hide(el) {
	const func = (element) => {
		if (!element.classList.contains("nodisplay")) {
			element.classList.add("nodisplay");
		}
	};

	if (el instanceof HTMLCollection || el instanceof NodeList) {
		Array.from(el).forEach(func);
	} else {
		func(el);
	}
}

/// show entire HTML collections, nodes, or single elements by adding class 'nodisplay'
function _show(el) {
	const func = (element) => {
		element.classList.remove("nodisplay");
	};
	if (el instanceof HTMLCollection || el instanceof NodeList) {
		Array.from(el).forEach(func);
	} else {
		func(el);
	}
}

/// add class 'string' to HTML collections, nodes, or single elements
function _addClass(el, string) {
	const func = (element) => {
		if (!element.classList.contains(string)) {
			element.classList.add(string);
		}
	};
	if (el instanceof HTMLCollection || el instanceof NodeList) {
		Array.from(el).forEach(func);
	} else {
		func(el);
	}
}

/// remove a class 'string' to HTML collections, nodes, or single elements
function _removeClass(el, string) {
	const func = (element) => {
		element.classList.remove(string);
	};
	if (el instanceof HTMLCollection || el instanceof NodeList) {
		Array.from(el).forEach(func);
	} else {
		func(el);
	}
}

/// toggle class 'string' of HTML collections, nodes, or single elements
function _toggleClass(el, string) {
	const func = (element) => {
		element.classList.toggle(string);
	};
	if (el instanceof HTMLCollection || el instanceof NodeList) {
		Array.from(el).forEach(func);
	} else {
		func(el);
	}
}
