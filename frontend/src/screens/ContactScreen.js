import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import mailAction from '../actions/mailAction'

const ContactScreen = ({ history }) =>
{
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const submitHandler = (e) =>
    {
        e.preventDefault()
        const obj = { name, email, phone, message }
        dispatch(mailAction(obj))
        history.push('/')
    }

    return (
        <Container>
            <h1 className="text-center">Contact us</h1>
            <Form style={{ maxWidth: 600, margin: 'auto' }} onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                </Form.Group>

                <Button style={{ background: '#c60062' }} type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ContactScreen
