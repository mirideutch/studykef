import {produce} from 'immer'

const initialState = {
     myLebels:{  
    //    'A':{ 1:99,
    //                  2:98,
    //                  3:90,
    //                  4:91},
    //             'B':{ 1:99,
    //                  2:98,
    //                  3:90,
    //                  4:91},
    //             'C':{ 1:99,
    //                 2:98,
    //                 3:90,
    //                 4:91},
    //             'D':{ 1:99,
    //                 2:98,
    //                 3:90,
    //                 4:91},
    //             'E':{ 1:99,
    //                 2:98,
    //                 3:90,
    //                 4:91}
                },           
    new:'',
    now:'',
    fourLetter:[]
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case 'UPDATE_LEBELS':
            {debugger
                state.myLebels= action.payLoad.a
                state.new=action.payLoad.b 
                if(action.payLoad.b != "")
                    state.now=action.payLoad.b
                else
                    state.now=Object.keys(action.payLoad.a)[Object.keys(action.payLoad.a).length-1]
                state.fourLetter=action.payLoad.fourLetter
                    // state.now= action.payLoad.a[ action.payLoad.a.length-1] 
                console.log(state.now+"     state.now")}
            break;
        case 'INSERT_LEBEL':
            {debugger
                state.new =action.payLoad 
                state.now =action.payLoad
                state.fourLetter=action.payLoad.fourLetter///////////
                console.log(state.new);
            }
            break;   
        case 'START_GAME':
            {debugger
                state.new =action.payLoad
                state.now =action.payLoad
                state.fourLetter=action.payLoadb

                console.log(state.new);
            }
            break;       
        case 'LEARND_NEW':
            {
                debugger
                state.myLebels[state.new] = {}
                state.new = ''
            }
            
            break;
        case 'INSERT_GAME':
            state.myLebels[action.payLoad.exerciseUser.label][action.payLoad.exerciseUser.gameExercise]=action.payLoad.exerciseUser.mark
            break;
        case 'UPDATE_GAME':
            state.myLebels[action.payLoad.exerciseUser.label][action.payLoad.exerciseUser.gameExercise]=action.payLoad.exerciseUser.mark
            break;
            // case 'RESET':
            // {state.myLebels=['a']}
    }
},initialState)

export default reducer