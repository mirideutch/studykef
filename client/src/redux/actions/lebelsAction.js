export function updateLebels(theLebels) {
    return { type: 'UPDATE_LEBELS', payLoad: theLebels }
}

export function insertLebel(newLebel){
    debugger
    console.log(newLebel);
    return{type:'INSERT_LEBEL',payLoad:newLebel}
}
export function insertGame(newGame){
    debugger
    
    return{type:'INSERT_GAME',payLoad:newGame}
}
export function updateGame(game){
    return{type:'UPDATE_GAME',payLoad:game}
}
export function startGame(newLebel){
    debugger
    console.log(newLebel);
    return{type:'START_GAME',payLoad:newLebel}
}
export function learndNew (){
    return{type:'LEARND_NEW'}
}
export function reset(){
    return{type:'RESET'}
}
