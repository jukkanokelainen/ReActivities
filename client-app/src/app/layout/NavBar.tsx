import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {
    return (
        <Menu inverted fixed= 'top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header> {/*exact to fix higlight. only highlighted if route is /. not /activities for instanse.*/}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/Activities' exact name='Activities' />
                <Menu.Item>
                    <Button positive as={NavLink} to='/CreateActivity' content='Create Activity!'/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}