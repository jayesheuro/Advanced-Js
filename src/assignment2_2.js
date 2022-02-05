document.getElementById("queenForm").addEventListener("submit", renderA2ans2);

class QueenAttack {
  constructor(x1, y1, x2, y2) {
    //default position
    this.queen1 = {
      x: 0,
      y: 0,
    };
    this.queen2 = {
      x: 0,
      y: 0,
    };
  }
  //position setters as per users input
  setQueen1(x, y) {
    this.queen1.x = x;
    this.queen1.y = y;
  }
  setQueen2(x, y) {
    this.queen2.x = x;
    this.queen2.y = y;
  }

  getQueens() {
    return [this.queen1, this.queen2];
  }

  //checking if they can attack horizontally
  horizontalAttack() {
    let res = this.queen1.y === this.queen2.y ? true : false;
    return res;
  }

  //checking if they can attack vertically
  verticalAttack() {
    let res = this.queen1.x === this.queen2.x ? true : false;
    return res;
  }

  //checking if they can attack diagonally
  diagonalAttack() {
    let dx = this.queen1.x - this.queen2.x;
    let dy = this.queen1.y - this.queen2.y;
    let res = dx === dy || dx === -dy ? true : false;
    return res;
  }

  canAttack() {
    return (
      this.horizontalAttack() || this.verticalAttack() || this.diagonalAttack()
    );
  }
}
function renderA2ans2(e) {
  e.preventDefault();
  document.getElementById("ass2ans2").classList.remove("hide");
  let x1 = parseInt(document.getElementById("x1").value);
  let y1 = parseInt(document.getElementById("y1").value);
  let x2 = parseInt(document.getElementById("x2").value);
  let y2 = parseInt(document.getElementById("y2").value);

  let chessGame = new QueenAttack();
  chessGame.setQueen1(x1, y1);
  chessGame.setQueen2(x2, y2);
  chessGame.canAttack() === true
    ? $("#ass2ans2").html("The Queens will attack each other ⚔⚔")
    : $("#ass2ans2").html("The Queens can't attack each other");
}
