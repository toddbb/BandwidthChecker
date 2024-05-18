/////////////////////////////////
/// ....
///
/// .....
///
const Ui = {
	els: {},

	init() {
		this.els.buttonRun = document.getElementById("runTest");
		this.els.result = document.getElementById("result");

		this.els.buttonRun.addEventListener("click", () => Test.run());
	},
};

const Test = {
	async run() {
		const fileUrl =
			"https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=2400"; // URL of a known file size
		const fileSize = 0.98; // File size in bytes (1MB)
		const fetchOptions = {
			mode: "no-cors",
			cache: "no-cache",
		};

		try {
			const startTime = performance.now();

			const response = await fetch(fileUrl, fetchOptions);
			const blob = await response.blob();

			const endTime = performance.now();
			const duration = (endTime - startTime) / 1000; // Convert to seconds

			const speedMbps = (fileSize * 8) / duration; // Convert to Mbps

			Ui.els.result.innerText = `${speedMbps.toFixed(2)}`;
		} catch (error) {
			Ui.els.result.getElementById("result").innerText = "Error testing bandwidth: " + error.message;
		}
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
