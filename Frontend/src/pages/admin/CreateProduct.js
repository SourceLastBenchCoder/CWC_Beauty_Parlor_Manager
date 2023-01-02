import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert
} from 'react-bootstrap'
import { BsFillPersonFill, BsFillLockFill, BsEnvelope, BsTelephone, BsFillChatSquareDotsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply } from "react-icons/bs"
import { useSelector } from 'react-redux';

function CreateProduct() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [smallDescription, setSmallDescription] = useState("")
    const [price, setPrice] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryTitle, setCatTitle] = useState("")
    const [category, setCategory] = useState([])
    const [isActive, setActive] = useState(false);
    const [image, setImage] = useState([])
    const [responseOutput, setResponseOutput] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { fullname, banner, id } = useSelector(state => state.admin)

    useEffect(() => {
        document.title = "BPMS - Create Product"

        try {
            axios.get(BASE_URL + "Category")
                .then((response) => {
                    setCategory(response.data)
                }).catch((error) => {
                    setError(error.message)
                })
        } catch (error) {
            setError(error.message)
        }
    }, [])

    const catDataforUI = category.map((item, index) => {
        return (
            <option value={item._id} key={index}>{item.title}</option>
        )
    })

    const handleCatDropdown = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setCategoryId(e.target.value)
        setCatTitle( e.nativeEvent.target[index].text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const ProductData = new FormData()
        ProductData.append("title", title)
        ProductData.append("description", description)
        ProductData.append("smalldesc", smallDescription)
        ProductData.append("price", price)
        ProductData.append("totaltime", totalTime)
        Array.from(image).forEach(item => {
            ProductData.append("Product", item)
        })
        ProductData.append("status", (isActive) ? 'Active' : 'In-Active')
        ProductData.append("admin._id", id)
        ProductData.append("admin.fullname", fullname)
        ProductData.append("category._id", categoryId)
        ProductData.append("category.title", categoryTitle)
        alert(categoryTitle)
        axios.post(BASE_URL + "/Product", ProductData)
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
                            <h4>Create Product</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/Product'>
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
                                        placeholder="Enter Title"
                                        onChange={e => setTitle(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <select className='form-control'
                                    required onChange={handleCatDropdown}>
                                    <option value="">...Select Category...</option>
                                    {catDataforUI}
                                </select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillPersonFill />
                                    </InputGroup.Text>
                                    <Form.Control type="Number"
                                        placeholder="Enter Price"
                                        onChange={e => setPrice(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillPersonFill />
                                    </InputGroup.Text>
                                    <Form.Control type="Number"
                                        placeholder="Enter Total Time"
                                        onChange={e => setTotalTime(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillChatSquareDotsFill />
                                    </InputGroup.Text>
                                    <Form.Control as="textarea"
                                        rows={3} value={smallDescription}
                                        placeholder="Enter Small Descripttion"
                                        onChange={e => setSmallDescription(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsFillChatSquareDotsFill />
                                    </InputGroup.Text>
                                    <Form.Control as="textarea"
                                        rows={3} value={description}
                                        placeholder="Enter Descripttion"
                                        onChange={e => setDescription(e.target.value)}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="formBasicPhone">
                                <Form.Control type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files)
                                    }}
                                    multiple
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                {
                                    Array.from(image).map(item => {
                                        return (
                                            <img className='mr-3' src={image[0] ? URL.createObjectURL(item) : null}
                                                style={{ height: "100px", width: "100px" }} />
                                        )
                                    })
                                }
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

export default CreateProduct