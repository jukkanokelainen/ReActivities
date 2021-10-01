import {Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityItem from './ActivityItem'

interface Props {
    activities: Activity[];
}

function ActivityList({activities} : Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList
