import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert
} from 'react-bootstrap'
import { BsFillPersonFill, BsFillLockFill, BsEnvelope, BsTelephone } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/AppConstants';

const Register = () => {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [responseOutput, setResponseOutput] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        document.title = "Register"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const adminData = new FormData()
        adminData.append("fullname", fullname)
        adminData.append("email", email)
        adminData.append("phone", phone)
        adminData.append("description", "This sample about info added from application, you can change content any time.")
        adminData.append("password", password)
        adminData.append("isSuperAdmin", false)
        adminData.append("status", "in-active")

        axios.post(BASE_URL + "admin", adminData)
            .then((response) => {
                setError(null)
                setIsSubmitted(true)
                setResponseOutput(response.data)
            }).catch((error) => {
                setError(error.message)
                setIsSubmitted(true)
            })
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container>
                {

                    (responseOutput) ? (
                        (responseOutput.status === "error") ? (
                            <Alert key="danger" variant="danger">
                                {responseOutput.message}
                            </Alert>)
                            :
                            (
                                <Alert key="success" variant="success">
                                    {responseOutput.message}
                                </Alert>
                            )) : ""
                }
                <Row className="justify-content-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="p-4">
                                <Card.Body>
                                    <h1>Register</h1>
                                    <p className="text-medium-emphasis">Please fill the below details to Register</p>
                                    <Form onSubmit={handleSubmit}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BsFillPersonFill />
                                            </InputGroup.Text>
                                            <Form.Control type="text"
                                                placeholder="Fullname"
                                                onChange={e => setFullname(e.target.value)}
                                                required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BsEnvelope />
                                            </InputGroup.Text>
                                            <Form.Control type="email"
                                                placeholder="name@example.com"
                                                onChange={e => setEmail(e.target.value)}
                                                required />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BsTelephone />
                                            </InputGroup.Text>
                                            <Form.Control type="text"
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="Phone Number"
                                                required />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Text>
                                                <BsFillLockFill />
                                            </InputGroup.Text>
                                            <Form.Control type="password"
                                                onChange={e => setPassword(e.target.value)}
                                                placeholder="Password"
                                                required />
                                        </InputGroup>
                                        <Row>
                                            <Col xs={6}>
                                                <Button type='submit' color="primary" className="px-4">
                                                    Register
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <Card.Body className="text-center">
                                    <div>
                                        <h2>Sign in</h2>
                                        <p>
                                            Do you account already, Then just go to login page and login to your account.
                                            You just need to enter the email id and password.
                                        </p>
                                        <Link to='/'>
                                            <Button color="primary" className="mt-3" active tabIndex={-1}>
                                                Sign in!
                                            </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
