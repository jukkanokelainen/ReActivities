import {Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityItem from './ActivityItem'

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

function ActivityList({activities, selectActivity, deleteActivity} : Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <ActivityItem 
                    key={activity.id} 
                    activity={activity} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}/>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList
