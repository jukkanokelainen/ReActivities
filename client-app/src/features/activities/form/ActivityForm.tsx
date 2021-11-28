import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import {  useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/Store'

function ActivityForm() {

    const {activityStore} = useStore();
    const {loadActivity, handleAddOrEditActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        loadActivity(id).then(
            (returnedActivity) => setActivity(returnedActivity!));
            // {/*esclamateion mark to show it is not undefined*/}
 
    }, [loadActivity, id])
    
    

    const handleChange = (event : ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;

            setActivity({...activity, [name]:value});
    }

    const handleSubmit = () => {
        handleAddOrEditActivity(activity);
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity' />
    return (
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} autoComplete='off' >
                <Form.Input placeholder='Title' value={activity?.title} name='title' onChange={handleChange}/>
                <Form.TextArea placeholder='Description' value={activity?.description} name='description' onChange={handleChange}/>
                <Form.Input placeholder='Category' value={activity?.category} name='category' onChange={handleChange}/>
                <Form.Input type='date' placeholder='Date' value={activity?.date} name='date' onChange={handleChange}/>
                <Form.Input placeholder='City' value={activity?.city} name='city' onChange={handleChange}/>
                <Form.Input placeholder='Venue' value={activity?.venue} name='venue' onChange={handleChange}/>
                <Button loading={activityStore.submitting} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={'/Activities'} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
