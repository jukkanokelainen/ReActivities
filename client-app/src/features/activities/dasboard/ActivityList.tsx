import { observer } from 'mobx-react-lite'
import {Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/Store'
import ActivityItem from './ActivityItem'


function ActivityList() {

        const {activityStore} = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activities.map(activity => (
                    <ActivityItem 
                    key={activity.id}
                    activity={activity}/>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)
