import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './login2.css'

const LoginForm = () => {

    function save() {
        alert("hfghjfgj")
    }
    return(

        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                {/* <Header as='h2' color='teal' textAlign='center' className='Header'>
                    <Image src='https://react.semantic-ui.com/logo.png' /> Log-in to your account
                </Header> */}
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='שם משתמש' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='סיסמא'
                            type='password'
                            />

                        <Button onClick={save} color='teal' fluid size='large'>
                            התחברות
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    חדש? <a href='#'>הרשמה</a>
                </Message>
            </Grid.Column>
        </Grid>
    

    )
}
export default LoginForm