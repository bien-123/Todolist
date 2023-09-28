import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/todos';

async function axiosTest() {
    let promiseAxios = axios.get(url)

    return await promiseAxios
    .then(function (response) {
        return response.data;})
}

const dataApi = await axiosTest()

export const listHits = dataApi;