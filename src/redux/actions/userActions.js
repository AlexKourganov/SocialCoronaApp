import {
    SET_USER,
    SET_ERRORS,
    SETLOGIN_ERRORS,
    SETSIGNUP_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';



export const loginUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });


    axios.post('/login', userData)
        .then(res => {
            // SUCCESS and we want to redirect


            setAuthorizationHeader(res.data.token);

            dispatch(getUserData());
            dispatch({
                type: CLEAR_ERRORS
            });
            history.push('/');
        }).catch(err => {
            dispatch({
                type: SETLOGIN_ERRORS,
                payload: err.response.data
            })
        })
}

// Sign Up
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });


    axios.post('/signup', newUserData)
        .then(res => {
            // SUCCESS and we want to redirect


            setAuthorizationHeader(res.data.token);

            dispatch(getUserData());
            dispatch({
                type: CLEAR_ERRORS
            });
            history.push('/');
        }).catch(err => {
            dispatch({
                type: SETSIGNUP_ERRORS,
                payload: err.response.data
            })
        })
};
// Log Out

export const logoutUser =()=>(dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

// NOTIFICATIONS
export const markNotificationsRead = (notificationIds) =>dispatch =>{
    axios.post('/notifications',notificationIds)
    .then(res => {
        dispatch({type:MARK_NOTIFICATIONS_READ})
    })
    .catch(err => console.log(err));
}

// Helper Func
const setAuthorizationHeader = (token) =>{
    const FBIdToken = `Bearer ${token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
}




export const getUserData = () => (dispatch) => {
    dispatch({type:LOADING_USER});
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        }).catch(err => console.log(err));
}

export const clearUiError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
  
}




// Upload Image
export const uploadImage  = (formData)=> (dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('/user/image',formData)
    .then(()=>{
        dispatch(getUserData())
    }).catch(err=>console.log(err));
}

// Edit Details of the user
export const editUserDetails = (userDetails) => (dispatch) =>{
    dispatch({type:LOADING_USER});
    axios.post('/user',userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=>console.log(err));
}