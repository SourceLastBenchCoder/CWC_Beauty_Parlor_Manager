import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert
} from 'react-bootstrap'
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducer/AdminSlice'
import axios from 'axios';
import { BASE_URL } from '../constants/AppConstants';

const Login = () => {

    const [admin, setAdmin] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Login"
    })

    const dispatch = useDispatch()

    const hadleLogin = (e) => {
        e.preventDefault()

        const loginData = {
            "email": email,
            "password": password
        }

        axios.post(BASE_URL + "admin/login", loginData)
            .then(resp => {
                setIsSubmitted(true)
                if (resp.data != null && resp.data.status != "error") {
                    setError("")
                    setAdmin(resp)
                    dispatch(login({
                        id: resp.data._id,
                        fullname: resp.data.fullname,
                        email: resp.data.email,
                        phone: resp.data.phone,
                        banner: resp.data.banner
                    }))
                    navigate('/admin/dashboard');
                }
                else {
                    setError(resp.data.message)
                }
            })
            .catch((error) => {
                setIsSubmitted(true)
                setError(error.message)
            })
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container>
                {
                    (isSubmitted) ? (
                        (!error) ? ("") : (
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        )
                    ) : ""
                }
                <Row className="justify-content-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="p-4">
                                <Card.Body>
                                    <h1>Login</h1>
                                    <p className="text-medium-emphasis">Sign In to your account</p>
                                    <Form onSubmit={hadleLogin}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BsFillPersonFill />
                                            </InputGroup.Text>
                                            <Form.Control type="email"
                                                placeholder="name@example.com"
                                                onChange={e => setEmail(e.target.value)}
                                                required />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Text>
                                                <BsFillLockFill />
                                            </InputGroup.Text>
                                            <Form.Control type="password"
                                                placeholder="Password"
                                                onChange={e => setPassword(e.target.value)}
                                                required />
                                        </InputGroup>
                                        <Row>
                                            <Col xs={6}>
                                                <Button color="primary" className="px-4" type="submit">
                                                    Login
                                                </Button>
                                            </Col>
                                            <Col xs={6} className="text-right">
                                                <a color="link" className="px-0">
                                                    Forgot password?
                                                </a>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <Card.Body className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Don't worry, if you are not able to login or you do not have account.
                                            Please Sign up here and get the access for the application.
                                        </p>
                                        <Link to='/register'>
                                            <Button color="primary" className="mt-3" active tabIndex={-1}>
                                                Sign up!
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

export default Login
