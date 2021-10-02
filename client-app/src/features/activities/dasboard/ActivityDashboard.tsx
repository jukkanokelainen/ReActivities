import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props { 
    activities: Activity[],
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
    openForm: (id?: string) => void;
    closeForm: () => void;
    editMode: boolean;
    addOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: (boolean)
}

function ActivityDashboard({activities, 
    selectedActivity, 
    selectActivity, 
    cancelSelectedActivity, 
    openForm,
    closeForm,
    editMode,
    addOrEditActivity,
    deleteActivity,
    submitting} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities}
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} 
                cancelSelectedActivity={cancelSelectedActivity}
                openForm={openForm}/>}
                {editMode &&
                <ActivityForm activity={selectedActivity} 
                closeForm={closeForm} 
                addOrEditActivity={addOrEditActivity}
                submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
