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
}

function ActivityDashboard({activities, 
    selectedActivity, 
    selectActivity, 
    cancelSelectedActivity, 
    openForm,
    closeForm,
    editMode,
    addOrEditActivity} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities}
                selectActivity={selectActivity}
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
                addOrEditActivity={addOrEditActivity}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
