import {Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityItem from './ActivityItem'

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

function ActivityList({
    activities, 
    selectActivity, 
    deleteActivity,
    submitting} : Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <ActivityItem 
                    key={activity.id} 
                    activity={activity} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting/>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList
