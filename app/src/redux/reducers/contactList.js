import {RECUP_CONTACT_LIST} from '../actionsType';

const defaultState = {a:{mobile:'0634584159'}};

export const contactList = (state = defaultState, action) =>{
        switch(action.type){
                case RECUP_CONTACT_LIST :
                        state = action.payload.a;
                        return state;
                default:
                        return state;
        }
      
}