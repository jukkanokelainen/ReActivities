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
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
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

