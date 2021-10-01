import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormInput, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
}

function ActivityForm({activity : selectedActivity, closeForm} : Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialState)

    const handleChange = (event : ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;

        setActivity({...activity, [name]:value});

    }
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity?.title} name='title' onChange={handleChange}/>
                <Form.TextArea placeholder='Description' value={activity?.description} name='description' onChange={handleChange}/>
                <Form.Input placeholder='Category' value={activity?.category} name='category' onChange={handleChange}/>
                <Form.Input placeholder='Date' value={activity?.date} name='date' onChange={handleChange}/>
                <Form.Input placeholder='City' value={activity?.city} name='city' onChange={handleChange}/>
                <Form.Input placeholder='Venue' value={activity?.venue} name='venue' onChange={handleChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
            </Form>
        </Segment>
    )
}

export default ActivityForm
