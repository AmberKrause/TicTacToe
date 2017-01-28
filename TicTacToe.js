"use strict"
/*
	Amber Krause
	March 29, 2016
	CISC 131

	Javascript for assignment due March 31, 2016. This assignment
    creates a Tic-Tac-Toe board.
*/

var markCount;
 //values from 0 to 9
 //even value indicates the next mark should be an X
 //odd value indicates the next mark should be an O
var winningCombinations;
 //string of winning combinations of square numbers
var boardState;
 //indicate the state of the board and progress toward a win

window.onload=function()
{
 var elementReference;
 var i;//suffix for html id
 setMarkCount(0);
 setWinningCombinations("012 345 678 036 147 258 048 246");
 setBoardState(getWinningCombinations());
 i=0;
 while(i<9)
 {
  //associate each square with marking function
  elementReference=document.getElementById("square"+i);
  elementReference.onclick=markTheSquare;
  i=i+1;
 }
}

function getMarkCount()
{
 //access global variable markCount
 return markCount;
}

function setMarkCount(newValue)
{
 //mutate global variable markCount
 markCount=newValue;
}

function getWinningCombinations()
{
 //access global variable winningCombinations
 return winningCombinations;
}

function setWinningCombinations(newValue)
{
 //mutate global variable winningCombinations
 winningCombinations=newValue;
}

function getBoardState()
{
 //access global variable boardState
 return boardState;
}

function setBoardState(newValue)
{
 //mutate global variable boardState
 boardState=newValue;
}

function markTheSquare()
{
 //display mark inside html element
 var boardState;
 var elementId;
 var foundAt;
 var i;
 var playerMark;
 var winningCombinations;
 this.onclick=null;
 this.innerHTML=getXorO();
 updateBoardState(getXorO(), this.id.substring(6));
 playerMark=getXorO()+getXorO()+getXorO();
 boardState=getBoardState();
 winningCombinations=getWinningCombinations();
 foundAt=boardState.indexOf(playerMark);
 i=Math.abs(Math.min(Math.max(foundAt, -1)*9, 0));
 while(i<9)
 {
  document.getElementById(this.id.substring(0, this.id.length-1)+i).onclick=null;
  i=i+1;
 }
 while(foundAt>=0)
 {
  i=0;
  while(i<3)
  {
   elementId=this.id.substring(0, 6)+winningCombinations.charAt(foundAt+i);
   document.getElementById(elementId).style.color="red";
   i=i+1;
  }
  foundAt=boardState.indexOf(playerMark, foundAt+3);
 }
 setMarkCount(getMarkCount()+1);
}

function getXorO()
{
 //return correct mark according to markCount being even or odd
 var characters;
 characters="XO";
 return characters.charAt(getMarkCount()%2);
}

function replaceCharacterInString(source, where, what)
{
 var result;
 result=source.substring(0, where);
 result=result+what+source.substring(where+1, source.length);
 return result;
}

function updateBoardState(playerMark, squareNumber)
{
 var boardState;
 var location;
 var winners;
 winners=getWinningCombinations();
 boardState=getBoardState();
 location=winners.indexOf(squareNumber);
 while(location>=0)
 {
  boardState=replaceCharacterInString(boardState, location, playerMark);
  location=winners.indexOf(squareNumber, location+1);
 }
 setBoardState(boardState);
}