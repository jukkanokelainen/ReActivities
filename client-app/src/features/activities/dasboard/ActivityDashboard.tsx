import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/Store'
import ActivityList from './ActivityList'


function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityregistry} = activityStore

    useEffect(() => {
        if (activityregistry.size <= 1) {
           activityStore.loadActivities(); 
        }
    }, [activityregistry.size, loadActivities, activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities'} />;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
