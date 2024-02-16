const width = 3;
const height = 3;

let selX = 1;
let selY = 1;
let turn = true;
let over = false;

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    up();
  } else if (event.key === "ArrowDown") {
    down();
  } else if (event.key === "ArrowLeft") {
    left();
  } else if (event.key === "ArrowRight") {
    right();
  } else if (event.key === "Enter") {
    mark();
  } else if (event.key === "Escape") {
    clear();
  } else {
    return;
  }

  event.preventDefault();
});

function selectedCell() {
	return document.getElementsByClassName("cell")[selY * width + selX];
}

function createTable() {
	let table = document.getElementById("game");
	for (let i = 0; i < height; i++) {
		let row = table.insertRow(0);
		for (let j = 0; j < width; j++) {
			let cell = row.insertCell(0);
			cell.classList.add("cell");
		}
	}
}

createTable();

function getCells() {
	return Array.from(document.getElementsByClassName("cell"));
}
	
function up() {
	if (!over) {
		deselect();
		selY = (selY - 1 + height) % height;
		select();
	}
}

function down() {
	if (!over) {
		deselect();
		selY = (selY + 1) % height;
		select();
	}
}

function left() {
	if (!over) {
		deselect();
		selX = (selX - 1 + width) % width;
		select();
	}
}

function right() {
	if (!over) {
		deselect();
		selX = (selX + 1) % width;
		select();
	}
}

function select() {
	selectedCell().classList.add("selected");
}

function deselect() {
	selectedCell().classList.remove("selected");
}
	
function mark()	{
	let cell = selectedCell();
	if (cell.innerHTML == '' && !over) {
		cell.innerHTML = turn ? 'X' : 'O';
		turn = !turn;
		check();
	}
}

function check() {
	let cells = getCells();
	let lines = [
		[cells[0],cells[1],cells[2]],
		[cells[3],cells[4],cells[5]],
		[cells[6],cells[7],cells[8]],
		[cells[0],cells[3],cells[6]],
		[cells[1],cells[4],cells[7]],
		[cells[2],cells[5],cells[8]],
		[cells[0],cells[4],cells[8]],
		[cells[2],cells[4],cells[6]]
	];
	
	for (let line of lines) {
		if (line[0].innerHTML != '' && 
			line[0].innerHTML == line[1].innerHTML && 
			line[1].innerHTML == line[2].innerHTML) 
		{
			line.forEach((cell) => cell.classList.add('won'));
			over = true;
		}
	}
}

function clear() {
	deselect();
	selX = 1;
	selY = 1;
	turn = true;
	over = false;
	getCells().forEach((cell) => {
		cell.innerHTML = '';
		cell.classList.remove('won');
	});
	select();
}

clear();
