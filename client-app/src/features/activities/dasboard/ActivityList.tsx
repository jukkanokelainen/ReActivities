import { observer } from 'mobx-react-lite'
import { Fragment } from 'react';
import {Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/Store'
import ActivityItem from './ActivityItem'


function ActivityList() {

        const {activityStore} = useStore();
        const {groupedActivities} = activityStore

    return (
        //loop through date groups and nested loop 
        //to loop all activity items in that date
        <Fragment>
            {groupedActivities.map(([group, activities]) =>  (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityItem 
                                    key={activity.id}
                                    activity={activity} />)
                                )
                            }
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </Fragment>
    )
}

export default observer(ActivityList)
