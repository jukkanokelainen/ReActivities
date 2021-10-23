import {  makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        
        try {
            const activities = await agent.Activities.list();
            //handle datetime
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                //In mobex we can mutate the state directly
                this.activities.push(activity);
            })
            //need to use action because using async method here
            this.setLoadingInitial(false);
        }
        catch (error)
        {
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}