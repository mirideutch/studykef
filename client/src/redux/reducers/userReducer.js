import { produce } from 'immer'

const initialState = {
    user: {}
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            { debugger; state.user = action.payLoad 
            console.log(state.user) }
            break;
    }
}, initialState)

export default reducer
