function createNewBoard(){
    var i;
    var j;
    window.count = 0;
    //Generating 64 Boxes dynamically
    for(j = 1; j < 9; j++) //Row iteration
    {
        var row = document.createElement('div');
        row.classList.add('row');
        row.id = 'row'+j;
        document.getElementById("board").appendChild(row);
        for(i = 1; i < 9; i++){ //For loop to create 8 boxes in a given row
            var box = document.createElement('div'); //creating a box element
            box.classList.add('col', 'box'); //adding classes to the box
            box.id = ((j-1)*8+i);//adding unique ID/box number to each box
            box.setAttribute('onclick', 'showPaths(this.id)');
            box.setAttribute('oncontextmenu', 'moveCoin(this.id, this.count); return false;');
            //setting alternate colors (white and gray) for boxes based on row
            if(j % 2 == 0){
                if(i%2 == 0){
                    box.style.backgroundColor = "white";
                }
                else{
                    box.style.backgroundColor = "gray";
                }
            }
            else{
                if(i%2 == 0){
                    box.style.backgroundColor = "gray";
                }
                else{
                    box.style.backgroundColor = "white";
                }
            }
        
        if((box.id >=1 && box.id <= 16) || (box.id >=49 && box.id <= 64)){
               loadStartBoard(box); //Calling this function to load Chess Coins at the start Position
            }
        else{
            box.classList.add('coinEmptyBox');
        }
        
        document.getElementById('row'+j).appendChild(box); //finally appending the created box to the given row
        }
    }
}

function loadStartBoard(box){
    var coinImage =document.createElement('img');
    coinImage.classList.add ('coinImage');
    if (box.id >=9 && box.id <= 16){
        coinImage.setAttribute('src','Black_Pawn.svg');
        coinImage.setAttribute('draggable', 'true');
        coinImage.classList.add('blackpawn', 'black');
    }
    else if (box.id >=49 && box.id <=56){
        coinImage.setAttribute('src', 'White_Pawn.svg');
        coinImage.setAttribute('draggable', 'true');
        coinImage.classList.add('whitepawn', 'white');
    }
    else if (box.id == 1 || box.id == 8){
        coinImage.setAttribute('src','Black_Rook.svg');
        coinImage.classList.add('blackrook', 'black');
    }
    else if(box.id == 57 || box.id == 64){
        coinImage.setAttribute('src','White_Rook.svg');
        coinImage.classList.add('whiterook','white');
    }
    else if(box.id == 2 || box.id == 7){
        coinImage.setAttribute('src','Black_Knight.svg');
        coinImage.classList.add('knight', 'black');
    }
    else if(box.id == 58 || box.id == 63){
        coinImage.setAttribute('src','White_Knight.svg');
        coinImage.classList.add('knight', 'white');
    }
    else if(box.id == 3 || box.id == 6){
        coinImage.setAttribute('src','Black_Bishop.svg');
        coinImage.classList.add('blackbishop', 'black');
    }
    else if(box.id == 59 || box.id == 62){
        coinImage.setAttribute('src','White_Bishop.svg');
        coinImage.classList.add('whitebishop', 'white');
    }
    else if(box.id == 4 ){
        coinImage.setAttribute('src','Black_Queen.svg');
        coinImage.classList.add('queen', 'black');
    }
    else if(box.id == 5 ){
        coinImage.setAttribute('src','Black_King.svg');
        coinImage.classList.add('king', 'black');
    }
    else if(box.id == 60 ){
        coinImage.setAttribute('src','White_King.svg');
        coinImage.classList.add('king', 'white');
    }
    else if(box.id == 61 ){
        coinImage.setAttribute('src','White_Queen.svg');
        coinImage.classList.add('queen', 'white');
    }

    box.appendChild(coinImage);
    box.classList.add('coinAvailableBox');
}


// function startMove(){
//     var coinBoxArray = document.getElementsByClassName("coinAvailableBox");
//     var myFunction = function() {
//         this.classList.add('selectedBox');
//         var coinImageObj = document.getElementById(this.id).firstChild;
//         document.getElementById(this.id).removeChild(coinImageObj);
//         this.classList.add("coinEmptyBox");
//         this.classList.remove("coinAvailableBox");
//         selectSecondBox(coinImageObj.src,coinImageObj.classList);
//         console.log('hello');
//     };

//     for (var i = 0; i < coinBoxArray.length; i++) {
//         coinBoxArray[i].addEventListener('dblClick', myFunction, false);
//     }
// }

// function selectSecondBox(coinImagePath, coinClassList){
//     var noCoinBoxArray = document.getElementsByClassName("coinEmptyBox");
//     var myFunction = function() {
//         this.classList.add('secondBox');
//         var newImage = document.createElement('img');
//         newImage.setAttribute('src', coinImagePath);
//         newImage.classList.add(coinClassList[0], coinClassList[1]);
//         this.appendChild(newImage);
//         document.getElementsByClassName("selectedBox")[0].classList.remove("selectedBox");
//         this.classList.add("selectedBox", "coinAvailableBox");
//         this.classList.remove("secondBox", "coinEmptyBox");
//         for (var i = 0; i < noCoinBoxArray.length; i++) {
//              noCoinBoxArray[i].removeEventListener('mouseup', myFunction, false);
//          }
//     };

//     for (var i = 0; i < noCoinBoxArray.length; i++) {
//         noCoinBoxArray[i].addEventListener('mouseup', myFunction, false);
//     }
// }

// function clearBoxes(){
//     document.getElementsByClassName('selectedBox')[0].classList.remove('selectedBox');
//     document.getElementsByClassName('secondBox')[0].classList.remove('secondBox');
// }

function showPaths(boxid){
    if(boxid % 8 == 0){
        var rowCalc = boxid / 8;
        var colCalc = 8;
    }
    else{
        var rowCalc = Math.floor(boxid / 8 ) + 1;
        var colCalc = boxid % 8;
    }
    
    //selectedBox is a CSS class defined in chessboard.css file. When a box with a coin is selected, it makes the box border red.
    //Below line empties previously clicked boxes
    if(document.getElementsByClassName('selectedBox')[0] != null){
        document.getElementsByClassName('selectedBox')[0].classList.remove('selectedBox');
    }
    
    //Check if a box has coin or not. If coin is present -> apply CSS selectedBox. Else, do nothing.
    if(document.getElementById(boxid).classList.contains('coinAvailableBox')){
        document.getElementById(boxid).classList.add('selectedBox');//apply red border via class selectedBox
        var x = document.getElementsByClassName('pathHighlight');//Remove highlights of previous boxes
            if(x[0]!= null){
                for(h = x.length-1; h >= 0; h--){
                    x[h].classList.remove('pathHighlight');
                }
            }
        var coin_name = document.getElementById(boxid).firstChild.classList[1]; //Get the coin name - Pawn, Rook etc
        var coin_color = document.getElementById(boxid).firstChild.classList[2];
        
        //Apply movement logic based on coin name
        if(coin_name == 'blackpawn'){
            if(rowCalc == 2){
                document.getElementById(parseInt(boxid)+8).classList.add('pathHighlight');
                document.getElementById(parseInt(boxid)+16).classList.add('pathHighlight');
            }
            else{
                document.getElementById(parseInt(boxid)+8).classList.add('pathHighlight');
            }
        }
        else if(coin_name == 'whitepawn'){
            if(rowCalc == 7){
                document.getElementById(parseInt(boxid)-8).classList.add('pathHighlight');
                document.getElementById(parseInt(boxid)-16).classList.add('pathHighlight');
            }
            else{
                document.getElementById(parseInt(boxid)-8).classList.add('pathHighlight');
            }
        }
        else if(coin_name == 'blackrook' || coin_name == 'whiterook'){ 
           for(i = 1; i <= 8 - rowCalc; i++){ //top down
                document.getElementById(parseInt(boxid) + i * 8).classList.add('pathHighlight');
           }
           for(i = 1; i < rowCalc; i++){ //bottom up
                document.getElementById(parseInt(boxid) - i * 8).classList.add('pathHighlight');
           }
           for(i = 1; i <= 8 - colCalc; i++){ //Right to left
                document.getElementById(parseInt(boxid) + i).classList.add('pathHighlight');
           }
           for(i = 1; i <= colCalc - 1; i++){ //Left to Right
                document.getElementById(parseInt(boxid) - i).classList.add('pathHighlight');
           }
        }
        else if(coin_name == 'blackbishop' || coin_name == 'whitebishop' ){
            var leftdiagup = boxid - 9;
            console.log(leftdiagup);
            var leftdiagdown = boxid + 7;
            var rightdiagup = boxid - 7;
            var rightdiagdown = boxid + 9;

            for(i = 1; i <= colCalc - 1; i++){ //left
                if(leftdiagdown <= 64 && leftdiagup  >= 1){
                    console.log('hi');
                    document.getElementById(parseInt(boxid) - i * 9).classList.add('pathHighlight');
                }
                else{
                    console.log('hi2');
                    document.getElementById(parseInt(boxid) + i * 7).classList.add('pathHighlight');
                }
            }
            for(i = 1; i <= 8 - colCalc; i++){ //right
                if(rowCalc < 1){
                    document.getElementById(parseInt(boxid) - i * 7).classList.add('pathHighlight');
                }
                else{
                document.getElementById(parseInt(boxid) + i * 9).classList.add('pathHighlight');
                }
            }
        }
        
    }
    else{
        console.log('Sorry, this box doesn\'t have a coin');
    } 
}

function moveCoin(boxid)
{
        if(this.count == 0){
            if(document.getElementById(boxid).classList.contains('coinAvailableBox')){
            imageObj = document.getElementById(boxid).firstChild;
            imageName = imageObj.src;
            document.getElementById(boxid).firstChild.remove(imageObj);
            document.getElementById(boxid).classList.remove('coinAvailableBox');
            document.getElementById(boxid).classList.add('coinEmptyBox');
            console.log(imageObj.classList);
            this.count++;
            }
        }
        else{
            if(document.getElementById(boxid).classList.contains('coinEmptyBox')){
                var image = document.createElement('img');
                image.setAttribute('src',imageName);
                image.classList.add(imageObj.classList[0], imageObj.classList[1], imageObj.classList[2]);
                document.getElementById(boxid).appendChild(image);
                document.getElementById(boxid).classList.add('coinAvailableBox');
                document.getElementById(boxid).classList.remove('coinEmptyBox');
                this.count = 0;
            }

        }

}