import React from 'react'
import { Button, Form, FormInput, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
}

function ActivityForm({activity, closeForm} : Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity?.title}/>
                <Form.TextArea placeholder='Description' value={activity?.description}/>
                <Form.Input placeholder='Category' value={activity?.category}/>
                <Form.Input placeholder='Date' value={activity?.date}/>
                <Form.Input placeholder='City' value={activity?.city}/>
                <Form.Input placeholder='Venue' value={activity?.venue}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
            </Form>
        </Segment>
    )
}

export default ActivityForm
