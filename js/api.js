const searchLoad = () => {
  document.getElementById("spinner").style.display = "block";
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  console.log(searchText);
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoad(data.player));
};

const displayLoad = (players) => {
  if (players) {
    document.getElementById("spinner").style.display = "none";
  } else {
    document.getElementById("spinner").style.display = "block";
  }
  const playerContain = document.getElementById("players");
  playerContain.textContent = "";
  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div class="card">
          <img src="${player.strThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
           <h5 class="card-title">${player.strPlayer}</h5>
               <p class="card-text">${player.strNationality}. ${player.strSport}</p>     
          </div>
          <div onclick="playerLoad('${player.idPlayer}')" class="card-footer text-center">
          <span >Details</span>
        </div>
      </div>
      `;
    playerContain.appendChild(div);
  });
};

const playerLoad = (playerId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayer(data.players[0]));
};

const displayPlayer = (players) => {
  const playerDetail = document.getElementById("player-detail");
  playerDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <img src="${players.strThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title">Name : ${players.strPlayer}</h4>
        <h5 class="card-title">country : ${players.strNationality}</h5>
        <hr>
        <p class="card-text">Sports : ${players.strSport} / ${
    players.strPosition
  } . </p>
        <p class="card-text">Team : ${players.strTeam2} / Club :  ${
    players.strTeam
  } . T-shirt Number : ${players.strNumber}</p>
        <p class="card-text">Height : ${players.strHeight} / weight : ${
    players.strWeight
  }</p>
  <hr>
        <p class="card-text">Player Info : ${players.strDescriptionEN.slice(
          0,
          1000
        )}</p>
       
        
    </div>
    `;
  playerDetail.appendChild(div);
};
