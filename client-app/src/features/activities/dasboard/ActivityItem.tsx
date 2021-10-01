import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}
function ActivityItem({activity, selectActivity, deleteActivity} : Props) {
    return (
        <Item>
            <Item.Content>
                <Item.Header as='a'> {activity.title} </Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button floated='right' content='View' color='blue' 
                    onClick={()=>selectActivity(activity.id)}/>
                    <Button floated='right' content='Delete' color='red' 
                    onClick={()=>deleteActivity(activity.id)}/>
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </ Item>
    )
}

export default ActivityItem
