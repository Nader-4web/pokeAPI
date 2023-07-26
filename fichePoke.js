const typeParam=new URL(location.href).searchParams.get("type"),capitalizedType=typeParam.charAt(0).toUpperCase()+typeParam.slice(1);let pokemonList=[],batchSize=18,currentIndex=0,allDisplayedPokemonsHTML="",isFetchingData=!1;function apiCall(){!isFetchingData&&(isFetchingData=!0,Promise.all(Array.from({length:1010},(e,t)=>fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${t+1}`).then(e=>{if(!e.ok)throw Error("Network response was not ok");return e.json()}).catch(e=>{console.error("Error:",e)}))).then(e=>{pokemonList=e.filter(e=>void 0!==e),window.addEventListener("popstate",e=>{let t=e.state?.page;void 0!==t?(first=t*numbersOfItems,displayData()):location.reload()}),isFetchingData=!1,displayPokemonsByType(),search(e)}))}apiCall(),closeCard();const colours={Normal:"#A8A77A",Feu:"#EE8130",Eau:"#6390F0",Électrik:"#F7D02C",Plante:"#7AC74C",Glace:"#96D9D6",Combat:"#C22E28",Poison:"#A33EA1",Sol:"#E2BF65",Vol:"#A98FF3",Psy:"#F95587",Insecte:"#A6B91A",Roche:"#B6A136",Spectre:"#735797",Dragon:"#6F35FC",Ténèbres:"#705746",Acier:"#B7B7CE",Fée:"#D685AD"};let type=document.querySelector(".type"),pokemonType=document.getElementById("pokemon-type");switch(capitalizedType){case"Plante":type.innerHTML='<img class="types" src="images/plante.png" alt="type plante">',pokemonType.style.color=`${colours.Plante}`,pokemonType.innerHTML="Plante";break;case"Feu":type.innerHTML='<img class="types" src="images/feu.png" alt="type feu">',pokemonType.style.color=`${colours.Feu}`,pokemonType.innerHTML="Feu";break;case"Eau":type.innerHTML='<img class="types" src="images/eau.png" alt="type eau">',pokemonType.style.color=`${colours.Eau}`,pokemonType.innerHTML="Eau";break;case"F\xe9e":type.innerHTML='<img class="types" src="images/fee.png" alt="type f\xe9e">',pokemonType.style.color=`${colours.Fée}`,pokemonType.innerHTML="F\xe9e";break;case"Psy":type.innerHTML='<img class="types" src="images/psy.png" alt="type psy">',pokemonType.style.color=`${colours.Psy}`,pokemonType.innerHTML="Psy";break;case"T\xe9n\xe8bres":type.innerHTML='<img class="types" src="images/tenebres.png" alt="type t\xe9n\xe8bres">',pokemonType.style.color=`${colours.Ténèbres}`,pokemonType.innerHTML="T\xe9n\xe8bres";break;case"Vol":type.innerHTML='<img class="types" src="images/vol.png" alt=type vol"">',pokemonType.style.color=`${colours.Vol}`,pokemonType.innerHTML="Vol";break;case"Poison":type.innerHTML='<img class="types" src="images/poison.png" alt="type poison">',pokemonType.style.color=`${colours.Poison}`,pokemonType.innerHTML="Poison";break;case"Insecte":type.innerHTML='<img class="types" src="images/insecte.png" alt="type insecte">',pokemonType.style.color=`${colours.Insecte}`,pokemonType.innerHTML="Insecte";break;case"Dragon":type.innerHTML='<img class="types" src="images/dragon.png" alt="type dragon">',pokemonType.style.color=`${colours.Dragon}`,pokemonType.innerHTML="Dragon";break;case"Glace":type.innerHTML='<img class="types" src="images/glace.png" alt="type glace">',pokemonType.style.color=`${colours.Glace}`,pokemonType.innerHTML="Glace";break;case"Normal":type.innerHTML='<img class="types" src="images/normal.png" alt="type normal">',pokemonType.style.color=`${colours.Normal}`,pokemonType.innerHTML="Normal";break;case"Combat":type.innerHTML='<img class="types" src="images/combat.png" alt="type combat">',pokemonType.style.color=`${colours.Combat}`,pokemonType.innerHTML="Combat";break;case"Spectre":type.innerHTML='<img class="types" src="images/spectre.png" alt="type spectre">',pokemonType.style.color=`${colours.Spectre}`,pokemonType.innerHTML="Spectre";break;case"Sol":type.innerHTML='<img class="types" src="images/sol.png" alt=type sol"">',pokemonType.style.color=`${colours.Sol}`,pokemonType.innerHTML="Sol";break;case"Roche":type.innerHTML='<img class="types" src="images/roche.png" alt="type roche">',pokemonType.style.color=`${colours.Roche}`,pokemonType.innerHTML="Roche";break;case"Acier":type.innerHTML='<img class="types" src="images/acier.png" alt="type acier">',pokemonType.style.color=`${colours.Acier}`,pokemonType.innerHTML="Acier";break;case"\xc9lectrik":type.innerHTML='<img class="types" src="images/electrik.png" alt="type \xe9lectrik">',pokemonType.style.color=`${colours.Électrik}`,pokemonType.innerHTML="\xc9lectrik";break;default:type.innerHTML="",pokemonType.innerHTML=""}let selectedPokemon;function displayPokemonsByType(){let e=document.getElementById("wrapper"),t=pokemonList.filter(e=>e.types.some(e=>e.name===capitalizedType)),s=t.slice(currentIndex,currentIndex+batchSize),n="";s.forEach(e=>{n+=`<div class="pokemon" style="background-color: ${colours[e.types[0].name]};">
        <p id="name">${e.name.fr}</p>
        <div id="img-container">
          <img id="imgPoke" src="${e.sprites.regular}">
        </div>
      </div>`}),e.innerHTML+=n,allDisplayedPokemonsHTML+=n,currentIndex+=batchSize,e.removeEventListener("click",handlePokemonClick),e.addEventListener("click",handlePokemonClick);let o=window.scrollY+290;o<550&&window.scrollTo(0,0),window.addEventListener("scroll",()=>{let e=window.innerHeight,t=document.body.scrollHeight,s=window.scrollY;s+e>=t&&displayPokemonsByType()})}function closeCard(){document.querySelector(".overlay").addEventListener("click",()=>{document.querySelector(".fiche").style.display="none",document.body.style.backgroundColor="#445",document.body.style.position="inherit",document.querySelector(".overlay").style.display="none"});document.getElementById("close-card").addEventListener("click",()=>{document.querySelector(".fiche").style.display="none",document.body.style.backgroundColor="#445",document.body.style.position="inherit",document.querySelector(".overlay").style.display="none"})}function handlePokemonClick(e){let t=e.target;if(t.closest(".pokemon")){let s=t.closest(".pokemon").querySelector("#name").innerText;selectedPokemon=pokemonList.find(e=>e.name.fr===s);let n=document.querySelector(".fiche");n.classList.add("fade-in");let o=window.scrollY+340;o<550&&(o=550),n.style.display="block",n.style.top=`${o}px`,document.querySelector(".overlay").style.display="block",getStats(selectedPokemon),getColorType(selectedPokemon),displayPokeInfo(selectedPokemon)}}function checkSearchBarPosition(){let e=document.getElementById("search-bar"),t=document.getElementById("top-of-page");e.offsetHeight;let s=window.scrollY;s>=300?(t.style.display="block",e.classList.add("fixed")):(e.classList.remove("fixed"),t.style.display="none")}function handleScroll(){window.scrollY,window.addEventListener("scroll",handleScroll)}function normalizeString(e){return e.toLowerCase().replace(/[^a-z0-9]/g,"")}function search(e){let t=document.getElementById("not-found");function s(){let s=document.getElementById("textvalue").value,n=e.find(e=>normalizeString(e.name.fr)===normalizeString(s)||e.pokedexId.toString()===s);if(n){let o=document.querySelector(".fiche"),r=window.scrollY+340;r<550&&(r=550),o.style.display="block",o.classList.add("fade-in"),o.style.top=`${r}px`,document.querySelector(".overlay").style.display="block",displayCardSearch(n),getColorTypeSearch(n),getStatsSearch(n),t.textContent=""}else t.classList.add("fade-in"),t.innerText="Pok\xe9mon introuvable !",setTimeout(()=>{t.innerText="",t.classList.remove("fade-in")},3e3)}document.getElementById("textvalue").addEventListener("keypress",e=>{"Enter"===e.key&&s()});document.getElementById("submit").addEventListener("click",s)}function getStats(e){let t=e.stats.atk,s=e.stats.def,n=e.stats.hp,o=e.stats.spe_atk,r=e.stats.spe_def,l=e.stats.vit,a=document.querySelector(".range-atk"),i=document.querySelector(".range-def"),c=document.querySelector(".range-hp"),p=document.querySelector(".range-spe-atk"),y=document.querySelector(".range-spe-def"),d=document.querySelector(".range-vit");document.querySelector(".stat-desc-atk").innerHTML="Atk: "+e.stats.atk,document.querySelector(".stat-desc-def").innerHTML="Def: "+e.stats.def,document.querySelector(".stat-desc-hp").innerHTML="Hp: "+e.stats.hp,document.querySelector(".stat-desc-spe-atk").innerHTML="Spe-atk: "+e.stats.spe_atk,document.querySelector(".stat-desc-spe-def").innerHTML="Spe-def: "+e.stats.spe_def,document.querySelector(".stat-desc-vit").innerHTML="Vit: "+e.stats.vit,a.style.width=`${t}%`,a.style.transition="width 0.5s ease-in-out",i.style.width=`${s}%`,i.style.transition="width 0.5s ease-in-out",c.style.width=`${n}%`,c.style.transition="width 0.5s ease-in-out",p.style.width=`${o}%`,p.style.transition="width 0.5s ease-in-out",y.style.width=`${r}%`,y.style.transition="width 0.5s ease-in-out",d.style.width=`${l}%`,d.style.transition="width 0.5s ease-in-out"}function displayPokeInfo(e){document.querySelector(".fiche").classList.add("fade-in");document.getElementById("img-poke-fiche").src=e.sprites.regular,document.getElementById("name-fiche").innerHTML=e.pokedexId.toString().padStart(3,"0")+"# "+e.name.fr;let t=document.querySelector(".block-img-element"),s=e.types.map(e=>{if(!e.image)return null;{let t=document.createElement("img");return t.src=e.image,t}});t.innerHTML="",s.forEach(e=>{e&&(t.appendChild(e),e.classList.add("img-element"))});let n=document.querySelector(".block-type");n.innerHTML="";let o=e.types.map(e=>{if(!e.name)return null;{let t=document.createElement("p");return t.classList.add("element"),t.innerHTML=e.name,t}});o.forEach(e=>{e&&n.appendChild(e)})}function getColorType(e){let t=document.querySelector(".fiche"),s=e.types[0].name;t.style.backgroundColor=colours[s]}function displayCardSearch(e){document.getElementById("name-fiche").innerHTML=e.pokedexId.toString().padStart(3,"0")+"# "+e.name.fr;document.getElementById("img-poke-fiche").src=e.sprites.regular;let t=document.querySelector(".block-img-element"),s=e.types.map(e=>{if(!e.image)return null;{let t=document.createElement("img");return t.src=e.image,t}});t.innerHTML="",s.forEach(e=>{e&&(t.appendChild(e),e.classList.add("img-element"))});let n=document.querySelector(".block-type");n.innerHTML="";let o=e.types.map(e=>{if(!e.name)return null;{let t=document.createElement("p");return t.classList.add("element"),t.innerHTML=e.name,t}});o.forEach(e=>{e&&n.appendChild(e)})}function getStatsSearch(e){let t=e.stats.atk,s=e.stats.def,n=e.stats.hp,o=e.stats.spe_atk,r=e.stats.spe_def,l=e.stats.vit,a=document.querySelector(".range-atk"),i=document.querySelector(".range-def"),c=document.querySelector(".range-hp"),p=document.querySelector(".range-spe-atk"),y=document.querySelector(".range-spe-def"),d=document.querySelector(".range-vit");document.querySelector(".stat-desc-atk").innerHTML="Atk: "+e.stats.atk,document.querySelector(".stat-desc-def").innerHTML="Def: "+e.stats.def,document.querySelector(".stat-desc-hp").innerHTML="Hp: "+e.stats.hp,document.querySelector(".stat-desc-spe-atk").innerHTML="Spe-atk: "+e.stats.spe_atk,document.querySelector(".stat-desc-spe-def").innerHTML="Spe-def: "+e.stats.spe_def,document.querySelector(".stat-desc-vit").innerHTML="Vit: "+e.stats.vit,a.style.width=`${t}%`,i.style.width=`${s}%`,c.style.width=`${n}%`,p.style.width=`${o}%`,y.style.width=`${r}%`,d.style.width=`${l}%`}function getColorTypeSearch(e){let t=document.querySelector(".fiche"),s=e.types[0].name;t.style.backgroundColor=colours[s]}document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("top-of-page");e.addEventListener("click",function(e){e.preventDefault();let t=document.getElementById("header");t.scrollIntoView({behavior:"smooth"})})}),window.addEventListener("scroll",checkSearchBarPosition);