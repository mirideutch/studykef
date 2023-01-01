import axios , { useState, useEffect } from "axios";
import React from "react";




export default function Letters(letterLevel,levelLetters ,fourLetter){
let lettersOption
    if(levelLetters.length<4)
    { 
      lettersOption=fourLetter
    }
    else{
      lettersOption=levelLetters
    }
    const num=20  
    const GameLetters= createGameLetters(levelLetters,num,letterLevel)//הפונקציה שתבנה מערך של האותיות במשחק  
    const MixedGameLetters= shuffle(GameLetters)//שולח את המערך לערבוב
    const objarraygame= finishgame(MixedGameLetters,lettersOption)//
    return objarraygame
}
//מקבלת מערך ומערבבת אותו
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function createGameLetters(arrayL,num,lett){
  let n=num%arrayL.length
  let copyed=arrayL.slice(-n)
  while (copyed.length<num) {
    copyed=copyed.concat(arrayL)
  }
  for (let index = 0; index < 5; index++) {
   copyed.push(lett);  
  }
  return copyed
}

function getoptions(labelLetters,lett){//מגריל 3 אותיות למערך + האות הנכונה = אפשרויות בחירה
  let arrayletters=labelLetters.slice()//צריך להוציא את האות הנכונה מהרשימה!
  arrayletters.splice(labelLetters.lastIndexOf(lett),1)
  const array=[]
  for (let index = 0; index < 3; index++) {
    let theOption=Math.floor(Math.random() * ((arrayletters.length-1) - 0 + 1))
    array[index]=arrayletters[theOption] 
    arrayletters.splice(theOption,1) 
  }
  array[3]=lett
  const arrayoptions=shuffle(array)
  return arrayoptions
}
function finishgame(arraygame,labelLetters){
  let objarraygame=[{}]
  let array=[]
  arraygame.forEach (function(lett,index,arraygame){
    array=getoptions(labelLetters,lett)//
    objarraygame.push({correctLetter:lett,options:array})//
  })
  objarraygame.shift()
   return objarraygame  
}




 