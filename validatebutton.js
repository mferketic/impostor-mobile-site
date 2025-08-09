const numPlayersInput = document.getElementById("num_players");
const numImpostorsInput = document.getElementById("num_impostors");
const categoryCheckboxes = document.querySelectorAll(
  "input[name='categories']"
);
const startGameButton = document.getElementById("start_game_button");
const selectAllButton = document.getElementById("select_all_button");
const presetButtons = document.querySelectorAll(".preset-btn");

function validateForm() {
  const numPlayers = parseInt(numPlayersInput.value, 10);
  const numImpostors = parseInt(numImpostorsInput.value, 10);
  const isCategorySelected = Array.from(categoryCheckboxes).some(
    (checkbox) => checkbox.checked
  );

  startGameButton.disabled = !(
    numPlayers > 0 &&
    numImpostors > 0 &&
    numImpostors < numPlayers &&
    isCategorySelected
  );

  updateSelectAllButtonText();
}

function updateSelectAllButtonText() {
  const allChecked = Array.from(categoryCheckboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAllButton.textContent = allChecked ? "Poništi sve" : "Označi sve";
}

function toggleAllCategories() {
  const allChecked = Array.from(categoryCheckboxes).every(
    (checkbox) => checkbox.checked
  );

  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = !allChecked;
  });

  validateForm();
}

function handlePresetClick(event) {
  const players = event.target.getAttribute("data-players");
  const impostors = event.target.getAttribute("data-impostors");

  numPlayersInput.value = players;
  numImpostorsInput.value = impostors;

  validateForm();
}

numPlayersInput.addEventListener("input", validateForm);
numImpostorsInput.addEventListener("input", validateForm);
categoryCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", validateForm)
);
selectAllButton.addEventListener("click", toggleAllCategories);
presetButtons.forEach((button) =>
  button.addEventListener("click", handlePresetClick)
);

validateForm();
