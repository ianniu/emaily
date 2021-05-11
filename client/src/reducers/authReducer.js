import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            // when user isn't login, payload is '', '' || false = false
            return action.payload || false;
        default:
            return state;
    }
}