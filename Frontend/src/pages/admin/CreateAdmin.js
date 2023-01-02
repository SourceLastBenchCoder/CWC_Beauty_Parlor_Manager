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
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply } from "react-icons/bs"

function CreateAdmin() {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")
    const [isSuperAdmin, setSuperAdmin] = useState(false);
    const [isActive, setActive] = useState(false);
    const [image, setImage] = useState([])
    const [responseOutput, setResponseOutput] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        document.title = "BPMS - Create Admin"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const adminData = new FormData()
        adminData.append("fullname", fullname)
        adminData.append("email", email)
        adminData.append("phone", phone)
        adminData.append("description", description)
        Array.from(image).forEach(item => {
            adminData.append("admin", item)
        })
        adminData.append("password", 'admin')
        adminData.append("isSuperAdmin", isSuperAdmin)
        adminData.append("status", (isActive) ? 'Active' : 'In-Active')

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
        <Container>
            <Card style={{ marginTop: '10px' }}>
                <Card.Header>
                    <div className="row">
                        <div className="col-10">
                            <h4>Create Administrators</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/all'>
                                <Button color="primary" size='sm'>
                                    <BsReply />&nbsp;Go Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
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
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillPersonFill />
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                        placeholder="Fullname"
                                        onChange={e => setFullname(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPhone">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsEnvelope />
                                    </InputGroup.Text>
                                    <Form.Control type="email"
                                        placeholder="name@example.com"
                                        onChange={e => setEmail(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPhone">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsTelephone />
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>About Admin</Form.Label>
                                <Form.Control as="textarea"
                                    rows={3} value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                {
                                    (image.length > 0) ? (
                                        <img className='form-control' src={image[0] ? URL.createObjectURL(image[0]) : null}
                                            style={{ height: "100px", objectFit: "cover" }} />
                                    ) :
                                        (
                                            <img className='form-control' src="/images/inf.png"
                                                style={{ height: "100px" }} />
                                        )
                                }
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPhone">
                                <Form.Label></Form.Label>
                                <Form.Control type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files)
                                    }} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Check
                                    type='checkbox'
                                    id='isSuperAdmin'
                                    label='Is Super Admin'
                                    onChange={() => setSuperAdmin(!isSuperAdmin)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Check
                                    type='checkbox'
                                    id='IsActive'
                                    label='Is Active'
                                    onChange={() => setActive(!isActive)}
                                />
                            </Form.Group>
                        </Row>
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
        </Container>
    )
}

export default CreateAdmin