import {SET_SCREAMS,LIKE_SCREAM,UNLIKE_SCREAM,LOADING_DATA, DELETE_SCREAM, POST_SCREAM,SET_SCREAM} from '../types';


const initialState = {
    screams:[],
    scream:{},
    loading:false
};

export default function (state=initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            };
        case SET_SCREAMS:
            return{
                ...state,
                screams:action.payload,
                loading:false
            }
        case SET_SCREAM:
            return{
                ...state,
                scream:action.payload
                
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:    
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            // we get back updated information about the scream and new like count so we replace it in the state
            state.screams[index] = action.payload;

            return{
                ...state
            }    
       
        case DELETE_SCREAM:
            let deleteIndex = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(deleteIndex,1);
            return{
                ...state
            };

        case  POST_SCREAM:
            return{
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            }    
       
        default:
            return state;      
    }
}