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
    // new:'F',
    // now:''
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case 'UPDATE_LEBELS':
            {debugger
                state.myLebels= action.payLoad.a
                // if(state.myLebels=null)
                state.new=action.payLoad.b   
                console.log(state.myLebels)}
            break;
        case 'INSERT_LEBEL':
            {debugger
                state.new =action.payLoad 
                
                console.log(state.new);
            }
            break;   
        case 'START_GAME':
            {debugger
                state.new =action.payLoad 
                // state.now =action.payLoad
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
            case 'RESET':
            {state.myLebels=['a']}
    }
},initialState)

export default reducer