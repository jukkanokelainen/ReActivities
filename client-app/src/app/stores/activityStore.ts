import {  makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

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
    
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            //handle datetime
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                //In mobex we can mutate the state directly
                this.activityregistry.set(activity.id, activity);
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
        let res = this.activityregistry.get(id);
        this.selectedActivity = res;   
      }

    handleAddOrEditActivity = async (activity : Activity) => {
        this.submitting = true;
        if(activity.id) {
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
        else {
            activity.id = uuid();
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityregistry.set(activity.id, activity);
                this.editMode=false;
                this.selectedActivity=activity;  
                this.submitting=false;
            })
            
        }
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

