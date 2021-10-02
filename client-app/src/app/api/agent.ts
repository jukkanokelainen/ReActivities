import React from 'react';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

//koska data luetaan aina response.data:sta niin tämä vähentää kirjoitusta
const responseBody = (response: AxiosResponse) => response.data;

//store common requests in object
const requests = {
    //ottaa parametrina urlin, joka on string ja osa ottaa bodyn, joka on object
    //palauttaa datan, joka on responseBodyssä eli tässä tapauksessa
    //response.data:ssa.
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
}

//objekti, jossa activityihin liittyvät kyselyt
const Activities = {
    list: () => requests.get('/activities')
}

const agent = {
    Activities
}

export default agent
