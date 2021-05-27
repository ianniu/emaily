import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY, FETCH_SURVEYS } from './types';

// action creator
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data})
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    // payload will be an array that contains all the surveys
    // that current user has made
    dispatch({ type: FETCH_SURVEYS, payload: res.data});
}