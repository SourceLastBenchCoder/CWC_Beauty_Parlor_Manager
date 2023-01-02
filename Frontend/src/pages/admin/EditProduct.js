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
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply, BsSave } from "react-icons/bs"
import { useSelector } from 'react-redux';

function EditProduct() {

    const initialData = {
        fullname: "",
        email: "",
        phone: "",
        description: ""
    }

    const [Product, setProduct] = useState(initialData)
    const [password, setPassword] = useState("")
    const [responseOutput, setResponseOutput] = useState("")
    const [image, setImage] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuperProduct, setSuperProduct] = useState(false);
    const [isActive, setActive] = useState(false);

    const { id } = useParams()
    const { fullname, banner } = useSelector(state => state.admin)

    useEffect(() => {
        document.title = "BPMS - Edit Product"

        axios.get(BASE_URL + "Product/" + id)
            .then((response) => {
                setProduct(response.data)
                setActive((response.data.status === "Active") ? true : false)
            })
    }, [])

    const handleStatusChange = () => {
        setActive(!isActive);
    };

    const inputChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...Product, [name]: value
        })
    }

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault()



        const ProductData = new FormData()
        ProductData.append("title", Product.title)
        ProductData.append("description", Product.description)
        ProductData.append("status", (isActive) ? 'Active' : 'In-Active')
        Array.from(image).forEach(item => {
            ProductData.append("Product", item)
        })
        ProductData.append("admin._id", id)
        ProductData.append("admin.fullname", fullname)

        axios.put(BASE_URL + "Product/" + id, ProductData)
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
                            <h4>Edit Productistrators</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/Product/all'>
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
                                        value={Product.title}
                                        name="title"
                                        onChange={inputChange}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea"
                                    value={Product.description}
                                    name="description"
                                    rows={4}
                                    onChange={inputChange}
                                    required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                {
                                    (image.length > 0 || Product.banner) ? (
                                        <img className='form-control' src={
                                            (Product.banner && !image.length > 0) ? Product.banner : (
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

export default EditProduct