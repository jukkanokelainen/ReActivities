import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);//<-- | voi olla activity tai undefined-tyyppiä
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {;
      setActivities(response.data);
    })
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
    activity.id === ''
    ? setActivities([...activities, {...activity, id: uuid()}]) 
    : setActivities([...activities.filter(x => x.id !== activity.id), activity])

    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <Fragment>
      <NavBar openForm={openForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectedActivity={cancelSelectedActivity}
        openForm={openForm}
        closeForm={closeForm}
        editMode={editMode}
        addOrEditActivity={handleAddOrEditActivity}
        />
      </Container>   
    </Fragment>
  );
}

export default App;
