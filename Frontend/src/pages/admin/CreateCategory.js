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
import { useSelector } from 'react-redux';

function CreateCategory() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setActive] = useState(false);
    const [image, setImage] = useState([])
    const [responseOutput, setResponseOutput] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { fullname, banner, id } = useSelector(state => state.admin)

    useEffect(() => {
        document.title = "BPMS - Create Category"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const CategoryData = new FormData()
        CategoryData.append("title", title)
        CategoryData.append("description", description)
        Array.from(image).forEach(item => {
            CategoryData.append("Category", item)
        })
        CategoryData.append("status", (isActive) ? 'Active' : 'In-Active')
        CategoryData.append("admin._id", id)
        CategoryData.append("admin.fullname", fullname)

        axios.post(BASE_URL + "/category", CategoryData)
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
                            <h4>Create Category</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/category'>
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
                            <Form.Group controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillPersonFill />
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                        placeholder="Enter Title"
                                        onChange={e => setTitle(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>About Category</Form.Label>
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
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CreateCategory