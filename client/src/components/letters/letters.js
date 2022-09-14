import axios from "axios";
import React from "react";

export default function Letters(letterLabel,labelLetters ){


    if(labelLetters.length<4)
    {
      // labelLetters=fourLetters()///להביא מ  NODE 
      labelLetters=['A','B','C','D']
    }
    
    const num=10  
    const copyed= arraycurrent(labelLetters,num,letterLabel)//הפונקציה שתבנה מערך של האותיות במשחק
    //+++++++++++++++++++++++למה הוא לא מוכר?

    
    const arraygame= shuffle(copyed)//שולח את המערך לערבוב
    const objarraygame= finishgame(arraygame,labelLetters)
    console.log("objarraygame  :  "+objarraygame);
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
//??מקבל את מערך כל האותיות
//מגדיר מערך של האותיות עד השלב הזה
//מקבל מספר נסיונות ויוצר מערך כפי המספר
function arraycurrent(arrayL,num,lett){
  const n=num%arrayL.length
  let copyed=arrayL.slice(-n)
  while (copyed.length<num) {
    copyed=copyed.concat(arrayL)
  }
  for (let index = 0; index < 4; index++) {
   copyed.push(lett);  
  }
  return copyed
}
function ob(labelLetters,lett){//מגריל 3 אותיות למערך + האות הנכונה = אפשרויות בחירה
  let arrayletters=labelLetters.slice()//צריך להוציא את האות הנכונה מהרשימה!!!!!!
  arrayletters.splice(labelLetters.lastIndexOf(lett),1)
  const array=[]
  for (let index = 0; index < 3; index++) {
    let theOption=Math.floor(Math.random() * ((arrayletters.length-1) - 0 + 1))
    array[index]=arrayletters[theOption] 
    arrayletters.splice(theOption,1) //צריך להתיחס לאותיות הראשונות שיקבלו מערך כפול 
  }
  array[3]=lett
  const arrayop=shuffle(array)
  return arrayop
}
function finishgame(arraygame,labelLetters){
  let objarraygame=[{}]
  let array=[]
  arraygame.forEach (function(lett,index,arraygame){
    array=ob(labelLetters,lett)
    objarraygame.push({correctLetter:lett,options:array})
  })
  objarraygame.shift()
   return objarraygame 

  
}

function fourLetters(){
  let l = axios.get("http://localhost:3030/letter/getFourLetter")
  return l
}
