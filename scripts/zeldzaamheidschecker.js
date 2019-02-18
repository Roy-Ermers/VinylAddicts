// Retrieve all important elements from the document.
let albumCover = document.querySelector(".album-cover");
let artistInput = document.getElementById("Artist");
let yearInput = document.getElementById("Year");
let collectorsEdition = document.querySelectorAll("[name=Collectors]");
let button = document.querySelector("button");
let touchedCollectorEdition = false;

//make a  little lookup table to determine which score belongs to the lP
let artists = {
	"vader abraham": 4,
	"bzn": 4,
	"kamahl": 4,
	"heintje": 4,
	"supertramp": 6,
	"queen": 6,
	"metallica": 6,
	"lionel richie": 6,
	"the beatles": 7,
	"rolling stones": 7,
	"madonna": 7
};
//define functions
function calculateProgress() {
	albumCover.querySelector(".sleeve").textContent = "?";
	let progress = 0;
	if (artistInput.value != "")
		progress++;
	if (yearInput.value != "")
		progress++;
	if (touchedCollectorEdition)
		progress++;

	albumCover.style.setProperty("--exposure", 25 * progress + "%");
	return progress;
}


function calculateScore() {
	let progress = calculateProgress();
	let scoreDisplay = albumCover.querySelector(".sleeve");
	if (progress == 3) {
		let score = 0;
		if (artists[artistInput.value.toLowerCase()])
			score += artists[artistInput.value.toLowerCase()];
		else score += 5;

		score += (new Date().getFullYear() - yearInput.value) * 0.1;

		if (document.querySelector("[name=Collectors]:checked").value == "yes")
			score += 5;
		displayScore(score);
	} else {
		scoreDisplay.textContent = "?";
	}
}

function displayScore(score) {
	let currentValue = 0;
	let scoreDisplay = albumCover.querySelector(".sleeve");
	let interval = setInterval(() => {
		if (currentValue < score)
			scoreDisplay.textContent = "€" + currentValue++;
		else
			clearInterval(interval);
	}, 100);

}
//attach events to the elements.
artistInput.addEventListener("input", calculateProgress);
yearInput.addEventListener("input", calculateProgress);
collectorsEdition.forEach(el => {
	el.addEventListener("input", calculateProgress);
	el.addEventListener("click", () => touchedCollectorEdition = true);
});

button.addEventListener("click", () => {
	touchedCollectorEdition = true;
	calculateScore();
});