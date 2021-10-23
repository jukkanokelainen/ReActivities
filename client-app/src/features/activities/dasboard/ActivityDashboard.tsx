import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/Store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


function ActivityDashboard() {

    const {activityStore} = useStore();
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {activityStore.selectedActivity && !activityStore.editMode &&
                <ActivityDetails/>}
                {activityStore.editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
