import React, {useState, useEffect, Fragment} from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);//<-- | voi olla activity tai undefined-tyyppiä
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  function handleSelectedActivity(id : string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function openForm(id? : string) {
    id !== undefined ? handleSelectedActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }

  function closeForm() {
    setEditMode(false);
  }

  function handleAddOrEditActivity(activity : Activity) {
    setSubmitting(true)
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
    else {
      activity.id = uuid()
      agent.Activities.create(activity).then( () => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity (id : string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'} />;
  return (
    <Fragment>
      <NavBar openForm={openForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activityStore.activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectedActivity={cancelSelectedActivity}
        openForm={openForm}
        closeForm={closeForm}
        editMode={editMode}
        addOrEditActivity={handleAddOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>   
    </Fragment>
  );
}

export default observer(App);
