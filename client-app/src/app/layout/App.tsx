import React, {Fragment} from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, useLocation } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route 
       path={'/(.+)'} //This path is rendered if there is anything else than "/"
       render={() => ( //instead of rendering component, render everything inside:
         <Fragment>
          <NavBar/>
          <Container style={{marginTop: '7em'}}>
            <Route exact path='/Activities' component={ActivityDashboard} />
            <Route path='/Activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/CreateActivity', '/manage/:id']} component={ActivityForm} />
          </Container> 
        </Fragment>)
        } />
    </Fragment>
  );
}

export default observer(App);
