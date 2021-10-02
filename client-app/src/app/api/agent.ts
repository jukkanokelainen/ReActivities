import React from 'react';
import axios, { AxiosResponse } from 'axios';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

//koska data luetaan aina response.data:sta niin tämä vähentää kirjoitusta
//<T> on generic type. oikea tyyppi kerrotaan sitten esim
//Activities-objektissa, jossa aktivitieihin liittyvät kyselyt.
//eli siis nyt axiosresponse-parametrillä on joku tyyppi T ja response datalla
//on joku tyyppi T
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

//store common requests in object
const requests = {
    //ottaa parametrina urlin, joka on string ja osa ottaa bodyn, joka on object
    //palauttaa datan, joka on responseBodyssä eli tässä tapauksessa
    //response.data:ssa.
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

//objekti, jossa activityihin liittyvät kyselyt
const Activities = {
    list: () => requests.get<Activity[]>('/activities')
}

const agent = {
    Activities
}

export default agent
