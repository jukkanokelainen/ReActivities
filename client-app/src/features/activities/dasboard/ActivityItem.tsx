import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/Store';

interface Props {
    activity: Activity;
}

function ActivityItem({
    activity} : Props) {
        
        const {activityStore} = useStore();

        //state that stores info on what button was clicked
        const [target, setTarget] = useState('');

        function handleActivityDelete(e : SyntheticEvent<HTMLButtonElement>){
            setTarget(activity.id);
            activityStore.deleteActivity(activity.id)
        }

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
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                    <Button 
                    floated='right' 
                    content='Delete' 
                    color='red' 
                    onClick={(e) => handleActivityDelete(e)} 
                    loading={activityStore.submitting && target===activity.id}/>
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </ Item>
    )
}

export default ActivityItem
