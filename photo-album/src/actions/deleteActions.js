import CONSTANTS from '../constants/constants';

const { AXIOS_DELETE_USER } = CONSTANTS.ACTIONS;

export const deleteUser = (id) => dispatch => dispatch({
    type: AXIOS_DELETE_USER,
    id: id
})