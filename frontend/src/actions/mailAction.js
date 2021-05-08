import axios from 'axios'

export default (obj) => async (dispatch, getState) =>
{
    console.log(obj)
    await axios.post(`/api/contactmail`, obj)
}
