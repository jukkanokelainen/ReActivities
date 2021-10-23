import {  makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;
    
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

    selectActivity = (id : string) => {
        let res = this.activities.find(x => x.id === id);
        this.selectedActivity = res;   
      }

    handleAddOrEditActivity = async (activity : Activity) => {
        this.submitting = true;
        if(activity.id) {
            try {
                await agent.Activities.update(activity);

                this.setActivities([...this.activities.filter(x => x.id !== activity.id), activity]);
                this.setEditMode(false);
                this.setSelectedActivity(activity);
                this.setSubmitting(false);
            }
            catch (error) {
                this.submitting = false;
            }
        }
        else {
            activity.id = uuid();
            await agent.Activities.create(activity);
            this.setActivities([...this.activities, activity]);
            this.setEditMode(false);
            this.setSelectedActivity(activity);  
            this.setSubmitting(false);
        }
      }
      
    setActivities = (Activities: Activity[]) => {
        this.activities = Activities;
    }
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }
    setSelectedActivity = (Activity: Activity | undefined) => {
        this.selectedActivity = Activity;
    }
    setSubmitting = (state: boolean) => {
        this.submitting = state;
    }

    cancelSelectedActivity= () => {
        this.selectedActivity=undefined;
      }
    
      openForm = (id? : string) => {
        id !== undefined ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode=true;
      }
    
      closeForm = () => {
        this.editMode = false;
      }
    
    
      deleteActivity = async (id : string) => {
        this.setSubmitting(true);
        try {
            await agent.Activities.delete(id);
            this.setActivities([...this.activities.filter(x => x.id !== id)]);
            this.setSubmitting(false);
        }
        catch (error){
            this.setSubmitting(false);
        }
      }
}

