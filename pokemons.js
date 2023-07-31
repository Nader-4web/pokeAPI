// let numbersOfItems = 26;
let pokemonList = [];
let batchSize = 18; // Le nombre de Pokémon à afficher à la fois
let currentIndex = 0;
let allDisplayedPokemonsHTML = "";

let isFetchingData = false; // Variable de contrôle pour indiquer si l'appel à l'API est en cours

function apiCall() {
  if (isFetchingData) {
    return; // Si un appel à l'API est déjà en cours, on ne lance pas une nouvelle requête
  }

  isFetchingData = true; // Définit le drapeau pour indiquer que l'appel à l'API est en cours

  Promise.all(
    Array.from({ length: 1010 }, (_, i) =>
      fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${i + 1}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    )
  )
    .then((data) => {
      pokemonList = data.filter((pokemon) => pokemon !== undefined);      
      
      isFetchingData = false; // Réinitialise le drapeau une fois que les données sont prêtes
       
      displayData();
      search(data)
    });
 
}

apiCall()
closeCard()


const colours = {
	Normal: '#A8A77A',
	Feu: '#EE8130',
	Eau: '#6390F0',
	Électrik: '#F7D02C',
	Plante: '#7AC74C',
	Glace: '#96D9D6',
	Combat: '#C22E28',
	Poison: '#A33EA1',
	Sol: '#E2BF65',
	Vol: '#A98FF3',
	Psy: '#F95587',
	Insecte: '#A6B91A',
	Roche: '#B6A136',
	Spectre: '#735797',
	Dragon: '#6F35FC',
  Ténèbres: '#705746',
	Acier: '#B7B7CE',
	Fée: '#D685AD',
};


let selectedPokemon; // Déclaration de la variable à l'extérieur de la fonction displayData()

function displayData() {
 
  const displayedPokemons = pokemonList.slice(currentIndex, currentIndex + batchSize);
  let htmlContent = "";
  displayedPokemons.forEach((pokemon) => {
    let type = pokemon.types[0].name;
    htmlContent +=
      `<div class="pokemon" style="background-color: ${colours[type]};">
        <p id="name">${pokemon.name.fr}</p>
        <div id="img-container">
          <img id="imgPoke" src="${pokemon.sprites.regular}">
        </div>
      </div>`;
  });

  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML += htmlContent;
  allDisplayedPokemonsHTML += htmlContent;
  currentIndex += batchSize;

  // Remove the click event listener from all previous Pokémon cards
  wrapper.removeEventListener("click", handlePokemonClick);

  // Add the click event listener using event delegation
  wrapper.addEventListener("click", handlePokemonClick);
  
  const scrollValue = window.scrollY + 290;
  if (scrollValue < 550) {
    window.scrollTo(0, 0);
  }
  
  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight; // Hauteur de la fenêtre visible
    const totalHeight = document.body.scrollHeight; // Hauteur totale du contenu de la page
    const scrollPosition = window.scrollY; // Position de défilement actuelle
  
    // Si l'utilisateur a atteint la fin de la page, affichez le prochain groupe de Pokémon
    if (scrollPosition + windowHeight >= totalHeight) {
      displayData();
    }
  });

}

  
function closeCard(){
  let overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", () => {
     document.querySelector(".fiche").style.display ="none";
     document.body.style.backgroundColor = "#445";
     document.body.style.position = "inherit";
     document.querySelector(".overlay").style.display = "none";
   });
   let close = document.getElementById("close-card");
   close.addEventListener("click", ()=>{
    document.querySelector(".fiche").style.display ="none";
    document.body.style.backgroundColor = "#445";
    document.body.style.position = "inherit";
    document.querySelector(".overlay").style.display = "none";
  
   })

 }
 
//////////////////  GO TOP OF THE PAGE LINK ////////////////

 document.addEventListener("DOMContentLoaded", function () {
  const topOfPageLink = document.getElementById("top-of-page");
  topOfPageLink.addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (rechargement de la page)
    const header = document.getElementById("header");
    header.scrollIntoView({ behavior: "smooth" }); // Fait défiler la page jusqu'à la section cible avec une animation fluide
  });

});


function handlePokemonClick(event) {
  const target = event.target;
  if (target.closest(".pokemon")) {
    const name = target.closest(".pokemon").querySelector("#name").innerText;
    selectedPokemon = pokemonList.find((p) => p.name.fr === name);
    let fiche = document.querySelector(".fiche");
    fiche.classList.add("fade-in");
    let scrollValue = window.scrollY + 340;
    if (scrollValue < 550) {
      scrollValue = 550; // Set the minimum value to 550px
    }
    
    fiche.style.display = "block";
    fiche.style.top = `${scrollValue}px`;
    document.querySelector(".overlay").style.display = "block";
    getStats(selectedPokemon);
    getColorType(selectedPokemon);
    displayPokeInfo(selectedPokemon);
  }

}

// Fonction pour vérifier la position de la barre de recherche lors du scroll
function checkSearchBarPosition() {
  const searchBar = document.getElementById("search-bar");
  let topOfPage = document.getElementById("top-of-page");
  const searchBarHeight = searchBar.offsetHeight;
  const scrollPosition = window.scrollY;
  
  // La position à partir de laquelle la barre de recherche devient en position fixed (ajustez cette valeur selon vos besoins)
  const fixedPositionThreshold = 300;
  if (scrollPosition >= fixedPositionThreshold) {
    topOfPage.style.display = "block"
    searchBar.classList.add("fixed");
  } else {
    searchBar.classList.remove("fixed");
    topOfPage.style.display = "none"

  }
}

// Ajoutez un événement de scroll pour exécuter la fonction checkSearchBarPosition lors du scroll
window.addEventListener("scroll", checkSearchBarPosition);


function handleScroll() {
  const scrollValue = window.scrollY;
  window.addEventListener("scroll", handleScroll);
}


function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}


function search(data) {
  let notFoundBloc = document.getElementById("not-found");
  function performSearch() {
    let textValue = document.getElementById("textvalue").value;
    let searchResult = data.find((item) => {
      return normalizeString(item.name.fr) === normalizeString(textValue) || item.pokedexId.toString() === textValue;
    });

    if (searchResult) {
      let fiche = document.querySelector(".fiche");
      let scrollValue = window.scrollY + 340;
      if (scrollValue < 550) {
        scrollValue = 550;
      }
      fiche.style.display = "block";
      fiche.classList.add("fade-in")
      fiche.style.top = `${scrollValue}px`;
      document.querySelector(".overlay").style.display = "block";
      displayCardSearch(searchResult);
      getColorTypeSearch(searchResult);
      getStatsSearch(searchResult);

      notFoundBloc.textContent = "";
    } else {
      // Afficher le message si le pokémon n'est pas trouvé
      notFoundBloc.classList.add("fade-in");
      notFoundBloc.innerText = "Pokémon introuvable !";

      setTimeout(() => {
        notFoundBloc.innerText=""
        notFoundBloc.classList.remove("fade-in");
      }, 3000);
    }
  }

  // Ajouter l'écouteur d'événements "keypress" à l'élément textValue
  let textValue = document.getElementById("textvalue");
  textValue.addEventListener("keypress", (event) => {
    // Si la touche enfoncée est "Enter" (code 13), lancez la recherche
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Écouteur d'événements pour le bouton de soumission (si nécessaire)
  let submit = document.getElementById("submit");
  submit.addEventListener("click", performSearch);
}

  /////////////// section fiche pokemon//////////////////

function getStats(selectedPokemon) {
  const atk = selectedPokemon.stats.atk;
  const def = selectedPokemon.stats.def;
  const hp = selectedPokemon.stats.hp;
  const speAtk = selectedPokemon.stats.spe_atk;
  const speDef = selectedPokemon.stats.spe_def;
  const vit = selectedPokemon.stats.vit;

  const rangeAtk = document.querySelector(".range-atk");
  const rangeDef = document.querySelector(".range-def");
  const rangeHp = document.querySelector(".range-hp");
  const rangeSpeAtk = document.querySelector(".range-spe-atk");
  const rangeSpeDef = document.querySelector(".range-spe-def");
  const rangeVit = document.querySelector(".range-vit");

  document.querySelector(".stat-desc-atk").innerHTML = "Atk: " + selectedPokemon.stats.atk;
  document.querySelector(".stat-desc-def").innerHTML = "Def: " + selectedPokemon.stats.def;
  document.querySelector(".stat-desc-hp").innerHTML = "Hp: " + selectedPokemon.stats.hp;
  document.querySelector(".stat-desc-spe-atk").innerHTML = "Spe-atk: " + selectedPokemon.stats.spe_atk;
  document.querySelector(".stat-desc-spe-def").innerHTML = "Spe-def: " + selectedPokemon.stats.spe_def;
  document.querySelector(".stat-desc-vit").innerHTML = "Vit: " + selectedPokemon.stats.vit;

  // Appliquer la largeur et l'effet de transition pour chaque barre de statistiques
  rangeAtk.style.width = `${atk}%`;
  rangeAtk.style.transition = "width 0.5s ease-in-out";

  rangeDef.style.width = `${def}%`;
  rangeDef.style.transition = "width 0.5s ease-in-out";

  rangeHp.style.width = `${hp}%`;
  rangeHp.style.transition = "width 0.5s ease-in-out";

  rangeSpeAtk.style.width = `${speAtk}%`;
  rangeSpeAtk.style.transition = "width 0.5s ease-in-out";

  rangeSpeDef.style.width = `${speDef}%`;
  rangeSpeDef.style.transition = "width 0.5s ease-in-out";

  rangeVit.style.width = `${vit}%`;
  rangeVit.style.transition = "width 0.5s ease-in-out";
}


function displayPokeInfo(selectedPokemon) {
  let fiche = document.querySelector(".fiche");
  fiche.classList.add("fade-in")


  let imgPoke = document.getElementById("img-poke-fiche");
  imgPoke.src = selectedPokemon.sprites.regular;
  document.getElementById("name-fiche").innerHTML =  selectedPokemon.pokedexId.toString().padStart(3, "0") + "# " + selectedPokemon.name.fr;
  
  const containerElement = document.querySelector(".block-img-element");
  const imageElements = selectedPokemon.types.map((type) => {
    if (type.image && type.name) {
      const imgElement = document.createElement("img");
      imgElement.src = type.image;
      return imgElement;
    } else {
      return null;
    }
  });

  // Effacer le contenu existant du conteneur
  containerElement.innerHTML = "";

  const blockType = document.querySelector(".block-type");
  imageElements.forEach((imgElement) => {
    if (imgElement) {
      containerElement.appendChild(imgElement);
      imgElement.classList.add("img-element");
    }
  });

  
  // Effacer le contenu existant du conteneur
  blockType.innerHTML = "";

  const elements = selectedPokemon.types.map((type) => {
    if (type.name) {
      const element = document.createElement("p");
      element.classList.add("element");
      element.innerHTML = type.name;
      return element;
    } else {
      return null;
    }
  });

  elements.forEach((el) => {
    if (el) {
      blockType.appendChild(el);
    }
  });
  
}

function getColorType(selectedPokemon){
  const card = document.querySelector(".fiche");
  let firstType = selectedPokemon.types[0].name
  card.style.backgroundColor= colours[firstType]

}

////////////////    BLOCK SEARCH   /////////////////////

function displayCardSearch(pkmName) {
  document.getElementById("name-fiche").innerHTML = pkmName.pokedexId.toString().padStart(3, "0") +"# " + pkmName.name.fr  
  let imgPoke = document.getElementById("img-poke-fiche");
  imgPoke.src = pkmName.sprites.regular;
  
  const containerElement = document.querySelector(".block-img-element");
  const imageElements = pkmName.types.map((type) => {
    if (type.image) {
      const imgElement = document.createElement("img");
      imgElement.src = type.image;
      return imgElement;
    } else {
      return null;
    }
  });

  // Effacer le contenu existant du conteneur
  containerElement.innerHTML = "";

  imageElements.forEach((imgElement) => {
    if (imgElement) {
      containerElement.appendChild(imgElement);
      imgElement.classList.add("img-element");
    }
  });

  const blockType = document.querySelector(".block-type");
  
  // Effacer le contenu existant du conteneur
  blockType.innerHTML = "";

  const elements = pkmName.types.map((type) => {
    if (type.name) {
      const element = document.createElement("p");
      element.classList.add("element");
      element.innerHTML = type.name;
      return element;
    } else {
      return null;
    }
  });

  elements.forEach((el) => {
    if (el) {
      blockType.appendChild(el);
    }
  });

}


  function getStatsSearch(pkmName){
    const atk = pkmName.stats.atk;
    const def =  pkmName.stats.def
    const hp =  pkmName.stats.hp
    const speAtk =  pkmName.stats.spe_atk
    const speDef =  pkmName.stats.spe_def
    const vit =  pkmName.stats.vit

    let rangeAtk = document.querySelector(".range-atk")
    let rangeDef =  document.querySelector(".range-def")
    let rangeHp =  document.querySelector(".range-hp")
    let rangeSpeAtk =  document.querySelector(".range-spe-atk")
    let rangeSpeDef =  document.querySelector(".range-spe-def")
    let rangeVit =  document.querySelector(".range-vit")
    document.querySelector(".stat-desc-atk").innerHTML= "Atk: "+ pkmName.stats.atk
    document.querySelector(".stat-desc-def").innerHTML= "Def: "+ pkmName.stats.def
    document.querySelector(".stat-desc-hp").innerHTML= "Hp: "+ pkmName.stats.hp
    document.querySelector(".stat-desc-spe-atk").innerHTML= "Spe-atk: "+ pkmName.stats.spe_atk
    document.querySelector(".stat-desc-spe-def").innerHTML= "Spe-def: "+ pkmName.stats.spe_def
    document.querySelector(".stat-desc-vit").innerHTML= "Vit: "+ pkmName.stats.vit
    rangeAtk.style.width= `${atk}%`
    rangeDef.style.width= `${def}%`
    rangeHp.style.width= `${hp}%`
    rangeSpeAtk.style.width= `${speAtk}%`
    rangeSpeDef.style.width= `${speDef}%`
    rangeVit.style.width= `${vit}%`

}


function getColorTypeSearch(pkmName){
  const card = document.querySelector(".fiche");
  let firstType = pkmName.types[0].name
  card.style.backgroundColor= colours[firstType]

}