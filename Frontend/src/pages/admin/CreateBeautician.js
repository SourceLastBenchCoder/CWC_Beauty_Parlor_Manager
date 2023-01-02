import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert
} from 'react-bootstrap'
import { BsFillPersonFill, BsEnvelope, BsTelephone } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply } from "react-icons/bs"
import { useSelector } from 'react-redux';

function CreateBeautician() {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")
    const [isSuperBeautician, setSuperBeautician] = useState(false);
    const [isActive, setActive] = useState(false);
    const [image, setImage] = useState([])
    const [responseOutput, setResponseOutput] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { admin } = useSelector(state => state.admin)

    useEffect(() => {
        document.title = "BPMS - Create Beautician"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const BeauticianData = new FormData()
        BeauticianData.append("fullname", fullname)
        BeauticianData.append("email", email)
        BeauticianData.append("phone", phone)
        BeauticianData.append("description", description)
        Array.from(image).forEach(item => {
            BeauticianData.append("Beautician", item)
        })
        
        BeauticianData.append("admin._id", admin.id)
        BeauticianData.append("admin.fullname", admin.fullname)
        BeauticianData.append("status", (isActive) ? 'Active' : 'In-Active')

        axios.post(BASE_URL + "Beautician", BeauticianData)
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
                            <h4>Create Beautician</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/beautician/all'>
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
                                <Form.Label>About Beautician</Form.Label>
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
                                    id='IsActive'
                                    label='Is Active'
                                    onChange={() => setActive(!isActive)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Button type='submit' color="primary" className="px-4">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CreateBeautician