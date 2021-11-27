import React, {Fragment} from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/Activities' component={ActivityDashboard} />
        <Route path='/Activities/:id' component={ActivityDetails} />
        <Route path='/CreateActivity' component={ActivityForm} />
      </Container>   
    </Fragment>
  );
}

export default observer(App);
