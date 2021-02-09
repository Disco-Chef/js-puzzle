// todo
const hintButton = document.getElementById("show-hint");
const hintDiv = document.querySelector(".hint");

hintButton.addEventListener("click", () => {
  hintDiv.classList.toggle("active");
});

// 1. Select all tiles
const tiles = document.querySelectorAll("tbody td");
// 2. For each tile
tiles.forEach((tile) => {
  // 3. Add an event listener
  tile.addEventListener('click', (event) => {
    // 4. Check if clicked tile can move
    if (canMove(event.currentTarget)) {
      // event.currentTarget represents the tile we clicked on!
      console.log("can move");
      // 5. Move the tile (swap empty tile with the tile we clicked on)
      moveTile(event.currentTarget);
      // 6. Check if player won
      checkIfWon();
    }

  })
})

// Return true of false, base on if the tile can move
const canMove = (tile) => {
  // Clicked Tile
  const tileColumn = tile.cellIndex;
  const tileRow = tile.parentElement.rowIndex;
  // Empty tile
  const emptyTile = document.querySelector(".empty");
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;
          // clicked tile is above or below the emptyTile and same column
  return (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) ||
         (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1) ||
         // clicked tile is left or right the emptyTile and same row
         (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1) ||
         (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1)
}
// tileElement = event.currentTarget when called. Represent the tile we clicked on.
const moveTile = (tileElement) => {
  // 1. Select the emptyTile
  const emptyTile = document.querySelector(".empty");
  // 2. Replace the content of the emptyTile with that of the tileElement
  emptyTile.innerHTML = tileElement.innerHTML;
  // 3. Remove the "empty" class from the emptyTile
  emptyTile.classList.remove('empty');
  // 4. Replace the content of tileElement with ""  (innerHTML)
  tileElement.innerHTML = '';
  // 5. Add "empty" class to the tileElement
  tileElement.classList.add('empty');
}

const checkIfWon = () => {
  // const orderedTiles = document.querySelectorAll("td").map(tile => Number.parseInt(tile.innerHTML, 10));
  // Can't call .map on a nodelist, so, convert to array!
  const orderedTiles = Array.from(document.querySelectorAll("td")).map(tile => Number.parseInt(tile.innerHTML, 10));

  if (orderedTiles.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
    alert("You have won!");
  }
}
