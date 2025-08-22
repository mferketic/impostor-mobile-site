const cat_voce = [
  "jabuka",
  "kruška",
  "šljiva",
  "trešnja",
  "višnja",
  "breskva",
  "kajsija",
  "grožđe",
  "lubenica",
  "dinja",
  "narandža",
  "limun",
  "grejpfrut",
  "banana",
  "kivi",
  "mango",
  "ananas",
  "jagoda",
  "malina",
  "borovnica",
  "kupina",
];

const cat_drzave = [
  "Srbija",
  "Hrvatska",
  "Bosna i Hercegovina",
  "Crna Gora",
  "Slovenija",
  "Severna Makedonija",
  "Mađarska",
  "Rumunija",
  "Bugarska",
  "Grčka",
  "Italija",
  "Austrija",
  "Nemačka",
  "Francuska",
  "Španija",
  "Portugal",
  "Velika Britanija",
  "Sjedinjene Američke Države",
  "Kanada",
  "Australija",
  "Japan",
];

const cat_povrce = [
  "paradajz",
  "krastavac",
  "paprika",
  "crni luk",
  "beli luk",
  "šargarepa",
  "krompir",
  "kupus",
  "brokoli",
  "karfiol",
  "tikvica",
  "patlidžan",
  "celer",
  "spanać",
  "grašak",
  "boranija",
  "peršun",
  "rotkva",
  "cvekla",
  "origano",
  "bundeva",
];

const cat_javnamesta = [
  "pozorište",
  "bolnica",
  "biblioteka",
  "škola",
  "univerzitet",
  "muzej",
  "galerija",
  "park",
  "stadion",
  "tržni centar",
  "restoran",
  "kafić",
  "aerodrom",
  "železnička stanica",
  "autobuska stanica",
  "pošta",
  "bankomat",
  "supermarket",
  "teretana",
  "bioskop",
];

const cat_sportovi = [
  "fudbal",
  "košarka",
  "tenis",
  "odbojka",
  "rukomet",
  "plivanje",
  "atletika",
  "biciklizam",
  "skijanje",
  "stoni tenis",
  "gimnastika",
  "hokej",
  "bejzbol",
  "ragbi",
  "karate",
  "boks",
  "kriket",
  "golf",
  "odbojka na pesku",
  "američki fudbal",
  "vaterpolo",
];

const cat_zivotinje = [
  "pas",
  "mačka",
  "konj",
  "krava",
  "ovca",
  "koza",
  "svinja",
  "zec",
  "ptica",
  "riba",
  "lav",
  "tigar",
  "slon",
  "medved",
  "vuk",
  "zebra",
  "žirafa",
  "krokodil",
  "kengur",
  "majmun",
  "kornjača",
];

const cat_zanimanja = [
  "doktor",
  "advokat",
  "mehaničar",
  "učitelj",
  "inženjer",
  "medicinska sestra",
  "arhitekta",
  "farmaceut",
  "električar",
  "vodoinstalater",
  "kuvar",
  "pilot",
  "zubar",
  "naučnik",
  "umetnik",
  "muzičar",
  "programer",
  "novinar",
  "menadžer",
  "prodavac",
  "grafički dizajner",
];

const cat_predmeti = [
  "stampač",
  "olovka",
  "telefon",
  "računar",
  "sto",
  "stolica",
  "knjiga",
  "sveska",
  "torba",
  "sat",
  "lampica",
  "miš",
  "tastatura",
  "ekran",
  "fascikla",
  "papir",
  "marker",
  "lepljiva traka",
  "leptir mašna",
  "šestar",
  "aparat za gašenje požara",
];

const cat_dublje_troll = [
  "devojka u roze",
  "winx",
  "kurcaki",
  "devojka u plavo",
  "corsa ružan auto",
  "alfa mito ružan auto",
  "grdatija",
  "kiča",
  "čekaj da ispušim cigaru",
  "bakarni montenegro",
  "kolica za lidl iz grčke",
  "kvačilo u corsi",
  "na kurca petkov",
  "avada kedabra",
  "dejko (dzoni)",
];

const player_number_label = document.getElementById("player_number");
var playerCounter = 0;
var numPl = 0;
var rec = "UNDEFINED";
var wordList = [];

document.addEventListener("DOMContentLoaded", () => {
  const start_button = document.getElementById("start_game_button");

  start_button.addEventListener("click", () => {
    const numPlayers = document.getElementById("num_players").value;
    numPl = numPlayers;
    const numImpostors = document.getElementById("num_impostors").value;

    const first_part_div = document.getElementById("first_part");
    first_part_div.style.display = "none";
    const last_form = document.getElementById("last_form");
    last_form.style.display = "flex";

    const selectedCategories = [];
    const checkboxes = document.querySelectorAll(
      "input[name='categories']:checked"
    );
    checkboxes.forEach((checkbox) => {
      selectedCategories.push(checkbox.value);
    });
    const categoryLists = {
      cat_voce,
      cat_povrce,
      cat_javnamesta,
      cat_sportovi,
      cat_zivotinje,
      cat_zanimanja,
      cat_predmeti,
      cat_drzave,
    };
    let selectedLists = selectedCategories.map(
      (category) => categoryLists[category]
    );
    if (
      document
        .getElementById("presets_label")
        .classList.contains("dublje-troll-active")
    ) {
      selectedLists = [cat_dublje_troll];
    }

    rec = getRandomWord(...selectedLists);
    console.log("Random Word:", rec);

    createWordList(numPlayers, numImpostors, rec);
    const wordLabel = document.getElementById("word");
    wordLabel.textContent = wordList[0];

    increasePlayerCounter();
    console.log("Number of Players:", numPlayers);
    console.log("Number of Impostors:", numImpostors);
    console.log("Selected Categories:", selectedCategories);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const daljeButton = document.getElementById("dalje_button");
  const wordLabel = document.getElementById("word");

  daljeButton.addEventListener("click", () => {
    increasePlayerCounter();
    wordLabel.textContent = "";
    daljeButton.disabled = true;
    setTimeout(() => {
      wordLabel.textContent = wordList[playerCounter - 1];
      daljeButton.disabled = false;
    }, 3500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const refreshButton = document.getElementById("refresh_button");

  refreshButton.addEventListener("click", () => {
    location.reload();
  });
});

function increasePlayerCounter() {
  if (playerCounter < numPl) {
    player_number_label.textContent = playerCounter + 1 + " / " + numPl;
    playerCounter++;
  } else {
    const last_form = document.getElementById("last_form");
    const game_end_form = document.getElementById("game_end_form");
    last_form.style.display = "none";
    game_end_form.style.display = "flex";
  }
}

function getRandomWord(...lists) {
  const allWords = lists.flat();
  if (allWords.length === 0) {
    throw new Error("No words available in the provided lists.");
  }
  const randomIndex = Math.floor(Math.random() * allWords.length);
  return allWords[randomIndex];
}

function createWordList(player_number, impostor_number, rec) {
  if (impostor_number <= 0 || player_number <= 0) {
    throw new Error("Invalid number of impostors or players.");
  }
  for (let i = 0; i < player_number; i++) {
    wordList[i] = rec;
  }
  let impostorCount = 0;
  while (impostorCount < impostor_number) {
    const randomIndex = Math.floor(Math.random() * player_number);
    if (wordList[randomIndex] !== "Impostor") {
      wordList[randomIndex] = "Impostor";
      impostorCount++;
    }
  }
  console.log(wordList);
}

document.addEventListener("DOMContentLoaded", () => {
  const presetsLabel = document.getElementById("presets_label");
  presetsLabel.addEventListener("click", () => {
    presetsLabel.classList.toggle("dublje-troll-active");
    if (presetsLabel.classList.contains("dublje-troll-active")) {
      presetsLabel.style.color = "gray";
    } else {
      presetsLabel.style.color = "";
    }
  });
});
