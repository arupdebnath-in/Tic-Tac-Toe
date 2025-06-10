let first_player = true;
let board = document.querySelector(".board");
let cells = document.querySelectorAll(".cell");
let result = document.querySelector(".result");
let reset = document.querySelector(".result button");
let isClickEnable = true;
let CrossMoves = [];
let CircleMoves = [];

function isEmptyCell(cell){
    let cross = cell.querySelector(".cross");
    let circle = cell.querySelector(".circle");
    if(cross.style.display == "inline" || circle.style.display == "inline") return false;
    return true;
}

for(const cell of cells){
    cell.addEventListener("click", () => {
        if(!isClickEnable) return;
        if(isEmptyCell(cell)){
            if(first_player){
                if(CrossMoves.length === 3){
                    CrossMoves[0].style.display = "none";
                    CrossMoves.shift();
                }
                CrossMoves.push(cell.querySelector(".cross"));
                cell.querySelector(".cross").style.display = "inline";
            }else{
                if(CircleMoves.length == 3){
                    CircleMoves[0].style.display = "none";
                    CircleMoves.shift();
                }
                CircleMoves.push(cell.querySelector(".circle"));
                cell.querySelector(".circle").style.display = "inline";
            }
            if(isGameFinished(cell)){
                GameOver(first_player);
            }
            first_player = !first_player;
        }else{
            alert("This cell is not empty");
        }
            
    })
}

function GameOver(Player){
    isClickEnable = false;
    if(Player){
        result.querySelector(".messege").innerHTML = "Cross Win.";
    }else{
        result.querySelector(".messege").innerHTML = "Circle Win.";
    }
    result.style.display = "flex";
}

reset.addEventListener("click", () => {
    console.log("Reset clicked");
    ClearAllCell();
    CrossMoves = [];
    CircleMoves = [];
    isClickEnable = true;
    result.style.display = "none";
    first_player = true;
});

function ClearAllCell(){
    for(const cell of cells){
        cell.querySelector(".cross").style.display = "none";
        cell.querySelector(".circle").style.display = "none";
    }
}

function isGameFinished(cell){
    let row = cell.dataset.row;
    let column = cell.dataset.column;
    if(CheckRowWise(row)) return true;
    if(CheckColumWise(column)) return true;
    if((row == "row1" && column == "column1") 
    || (row == "row2" && column == "column2") 
    || (row == "row3" && column == "column3")){
        if(ChechDiagonal(1)) return true;
    }
    if((row == "row1" && column == "column3") 
    || (row == "row2" && column == "column2") 
    || (row == "row3" && column == "column1")){
        if(ChechDiagonal(2)) return true;
    }
    return false;
}

function isCross(cell){
    if(cell.querySelector(".cross").style.display == "inline") return true;
    return false;
}
function isCircle(cell){
    if(cell.querySelector(".circle").style.display == "inline") return true;
    return false;
}

function CheckRowWise(row){
    let cell1 = document.querySelector(`.${row} .column1`);
    let cell2 = document.querySelector(`.${row} .column2`);
    let cell3 = document.querySelector(`.${row} .column3`);
    if(isCross(cell1) && isCross(cell2) && isCross(cell3)) return true;
    if(isCircle(cell1) && isCircle(cell2) && isCircle(cell3)) return true;
    return false;
}
function CheckColumWise(column){
    let cell1 = document.querySelector(`.row1 .${column}`);
    let cell2 = document.querySelector(`.row2 .${column}`);
    let cell3 = document.querySelector(`.row3 .${column}`);
    if(isCross(cell1) && isCross(cell2) && isCross(cell3)) return true;
    if(isCircle(cell1) && isCircle(cell2) && isCircle(cell3)) return true;
    return false;
}
function ChechDiagonal(num){
    let cell1 = document.querySelector(`.row1 .column1`);
    let cell2 = document.querySelector(`.row2 .column2`);
    let cell3 = document.querySelector(`.row3 .column3`);
    if(num == 2){
        cell1 = document.querySelector(`.row1 .column3`);
        cell3 = document.querySelector(`.row3 .column1`);
    }
    if(isCross(cell1) && isCross(cell2) && isCross(cell3)) return true;
    if(isCircle(cell1) && isCircle(cell2) && isCircle(cell3)) return true;
    return false;
}

