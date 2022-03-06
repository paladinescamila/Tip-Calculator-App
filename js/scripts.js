// HTML Elements
billElement = document.getElementById("bill");
customTipElement = document.getElementById("custom-tip");
nPeopleElement = document.getElementById("n-people");
tipAmountElement = document.getElementById("tip-amount");
totalElement = document.getElementById("total");
resetButton = document.getElementById("reset");
noZeroElement = document.getElementById("no-zero");

// CSS Variables
const VarsCSS = getComputedStyle(document.documentElement);

// Starting variables
let bill = 0,
	tip = 0,
	nPeople = 1;

// Compute tip amount by person and total by person
const compute = () => {
	const tipAmount = (bill * tip) / 100;
	const tipAmountByPerson = tipAmount / nPeople;
	const totalByPerson = (bill + tipAmount) / nPeople;

	tipAmountElement.innerHTML = "$" + tipAmountByPerson.toFixed(2);
	totalElement.innerHTML = "$" + totalByPerson.toFixed(2);
};

// Events to choose the tip from buttons
const tips = [5, 10, 15, 25, 50];
tips.forEach((tipValue) => {
	let tipElement = document.getElementById(`tip-${tipValue}`);

	tipElement.addEventListener("click", (e) => {
		tip = Number(tipValue);

		// Reset other tip buttons styles
		tips.forEach((t) => {
			document.getElementById(`tip-${t}`).style.backgroundColor = VarsCSS.getPropertyValue("--very-dark-cyan");
			document.getElementById(`tip-${t}`).style.color = VarsCSS.getPropertyValue("--white");
		});

		// Reset custom tip input style
		customTipElement.style.textAlign = "center";
		customTipElement.placeholder = "Custom";
		customTipElement.value = "";

		// Set styles to the selected button
		tipElement.style.backgroundColor = VarsCSS.getPropertyValue("--strong-cyan");
		tipElement.style.color = VarsCSS.getPropertyValue("--very-dark-cyan");
		compute();
	});
});

// Events to choose custom tip
customTipElement.addEventListener("click", (e) => {
	customTipElement.style.textAlign = "end";
	customTipElement.placeholder = "0";

	// Reset tip buttons styles
	tips.forEach((t) => {
		document.getElementById(`tip-${t}`).style.backgroundColor = VarsCSS.getPropertyValue("--very-dark-cyan");
		document.getElementById(`tip-${t}`).style.color = VarsCSS.getPropertyValue("--white");
	});
});

customTipElement.addEventListener("keyup", (e) => {
	tip = Number(customTipElement.value);
	compute();
});

// Event to compute when bill changes
billElement.addEventListener("keyup", (e) => {
	bill = Number(billElement.value);
	compute();
});

// Event to compute when n-people changes
nPeopleElement.addEventListener("keyup", (e) => {
	if (nPeopleElement.value == 0) {
		nPeopleElement.style.borderColor = VarsCSS.getPropertyValue("--red");
		noZeroElement.style.display = "block";
	} else {
		nPeopleElement.style.borderColor = VarsCSS.getPropertyValue("--strong-cyan-2");
		noZeroElement.style.display = "none";
		nPeople = Number(nPeopleElement.value);
		compute();
	}
});

// Event to reset styles for n-people input when click outside the box
document.body.addEventListener("click", function (e) {
	if (!nPeopleElement.contains(e.target)) {
		nPeopleElement.style.borderColor = "transparent";
		noZeroElement.style.display = "none";
	}
});

// Event to reset values and inputs
resetButton.addEventListener("click", (e) => {
	// Reset values
	bill = 0;
	tip = 0;
	nPeople = 1;
	compute();

	// Reset inputs
	billElement.value = "";

	customTipElement.style.textAlign = "center";
	customTipElement.placeholder = "Custom";
	customTipElement.value = "";

	tips.forEach((t) => {
		document.getElementById(`tip-${t}`).style.backgroundColor = VarsCSS.getPropertyValue("--very-dark-cyan");
		document.getElementById(`tip-${t}`).style.color = VarsCSS.getPropertyValue("--white");
	});

	nPeopleElement.value = "";
});

compute();
