import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container,
    InputGroup,
    Row,
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import { BsFillPersonFill, BsFillLockFill, BsEnvelope, BsTelephone } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply, BsSave } from "react-icons/bs"

function EditAdmin() {

    const initialData = {
        fullname: "",
        email: "",
        phone: "",
        description: ""
    }

    const [admin, setAdmin] = useState(initialData)
    const [password, setPassword] = useState("")
    const [responseOutput, setResponseOutput] = useState("")
    const [image, setImage] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuperAdmin, setSuperAdmin] = useState(false);
    const [isActive, setActive] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        document.title = "BPMS - Edit Admin"

        axios.get(BASE_URL + "admin/" + id)
            .then((response) => {
                setAdmin(response.data)
                setActive((response.data.status === "Active") ? true : false)
                setSuperAdmin(response.data.isSuperAdmin)
                console.log(response.data.status)
                console.log(response.data.isSuperAdmin)
            })
    }, [])

    const handleSuperAdminChange = () => {
        setSuperAdmin(!isSuperAdmin);
    };

    const handleStatusChange = () => {
        setActive(!isActive);
    };

    const inputChange = (e) => {
        const { name, value } = e.target
        setAdmin({
            ...admin, [name]: value
        })
    }

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault()
        const adminData = new FormData()
        adminData.append("fullname", admin.fullname)
        adminData.append("email", admin.email)
        adminData.append("phone", admin.phone)
        adminData.append("description", admin.description)
        adminData.append("isSuperAdmin", isSuperAdmin)
        adminData.append("status", (isActive) ? 'Active' : 'In-Active')
        if (password)
            adminData.append("password", password)
        Array.from(image).forEach(item => {
            adminData.append("admin", item)
        })

        axios.put(BASE_URL + "admin/" + id, adminData)
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
                            <h4>Edit Administrators</h4>
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
                                        value={admin.fullname}
                                        name="fullname"
                                        onChange={inputChange}
                                        required />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPhone">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsEnvelope />
                                    </InputGroup.Text>
                                    <Form.Control type="email"
                                        value={admin.email}
                                        placeholder="name@example.com"
                                        name="email"
                                        onChange={inputChange}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea"
                                    value={admin.description}
                                    name="description"
                                    rows={4}
                                    onChange={inputChange}
                                    required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPhone">
                                <Row>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <BsTelephone />
                                        </InputGroup.Text>
                                        <Form.Control type="text"
                                            value={admin.phone}
                                            onChange={inputChange}
                                            placeholder="Phone Number"
                                            name="phone"
                                            required />
                                    </InputGroup>
                                </Row>
                                <Row className='mt-4'>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <BsFillLockFill />
                                        </InputGroup.Text>
                                        <Form.Control type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Password"
                                            name="password" />
                                    </InputGroup>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                {
                                    (image.length > 0 || admin.banner) ? (
                                        <img className='form-control' src={
                                            (admin.banner  && !image.length > 0) ? admin.banner : (
                                                image[0] ? URL.createObjectURL(image[0]) : null
                                            )
                                        }
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
                                    checked={isSuperAdmin}
                                    label='Is Super Admin'
                                    onChange={handleSuperAdminChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Check
                                    type='checkbox'
                                    id='IsActive'
                                    checked={isActive}
                                    label='Is Active'
                                    onChange={handleStatusChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Button color="primary" size='sm' type='submit'>
                                    <BsSave />&nbsp;Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default EditAdmin