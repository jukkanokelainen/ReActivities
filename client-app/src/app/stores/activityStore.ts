import {  makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    //activities: Activity[] = [];
    activityregistry: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    submitting = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityregistry.values()).sort((a, b) =>
        Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        //object entries turns the key value object into array
        return Object.entries(
            //reduce method executes a user-supplied callback function on each element on the array, 
            //passing in the return value from the calculation on the preceding element.
            //third parameter defines the initial value for the calculation. Here we define a object having a 
            //string key and value is list of activities.
            //in practice we move activities having same date in a list under the same key date.
            this.activitiesByDate.reduce(
            (activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }
    
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            //handle datetime
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            //need to use action because using async method here
            this.setLoadingInitial(false);
        }
        catch (error)
        {
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity){
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
        
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        //In mobex we can mutate the state directly
        this.activityregistry.set(activity.id, activity);
    }

    private  getActivity = (id: string) => {
        return this.activityregistry.get(id); 
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id : string) => {
        let res = this.activityregistry.get(id);
        this.selectedActivity = res;   
      }

    editActivity = async (activity : Activity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityregistry.set(activity.id, activity);
                this.editMode=false;
                this.selectedActivity=activity;  
                this.submitting=false;
            })
        }
        catch (error) {
            this.submitting = false;
        }
    }

    createActivity = async (activity : Activity) => {
        this.setSubmitting(true);
        await agent.Activities.create(activity);
        runInAction(() => {
            this.activityregistry.set(activity.id, activity);
            this.editMode=false;
            this.selectedActivity=activity;  
            this.setSubmitting(false);
        })
    }
      
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }
  
    setSubmitting = (state: boolean) => {
        this.submitting = state;
    }

    deleteActivity = async (id : string) => {
    this.setSubmitting(true);
    try {
        await agent.Activities.delete(id);
        runInAction(() => {
            this.activityregistry.delete(id);
            this.submitting=false;
        })
    }
    catch (error){
        runInAction(() => {
            this.submitting = false;
        })
    }
    }
}

