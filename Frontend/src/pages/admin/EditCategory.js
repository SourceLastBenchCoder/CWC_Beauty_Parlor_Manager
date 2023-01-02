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

function EditCategory() {

    const initialData = {
        fullname: "",
        email: "",
        phone: "",
        description: ""
    }

    const [Category, setCategory] = useState(initialData)
    const [password, setPassword] = useState("")
    const [responseOutput, setResponseOutput] = useState("")
    const [image, setImage] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuperCategory, setSuperCategory] = useState(false);
    const [isActive, setActive] = useState(false);

    const { id } = useParams()
    const { fullname, banner } = useSelector(state => state.admin)

    useEffect(() => {
        document.title = "BPMS - Edit Category"

        axios.get(BASE_URL + "category/" + id)
            .then((response) => {
                setCategory(response.data)
                setActive((response.data.status === "Active") ? true : false)
            })
    }, [])

    const handleStatusChange = () => {
        setActive(!isActive);
    };

    const inputChange = (e) => {
        const { name, value } = e.target
        setCategory({
            ...Category, [name]: value
        })
    }

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault()



        const CategoryData = new FormData()
        CategoryData.append("title", Category.title)
        CategoryData.append("description", Category.description)
        CategoryData.append("status", (isActive) ? 'Active' : 'In-Active')
        Array.from(image).forEach(item => {
            CategoryData.append("Category", item)
        })
        CategoryData.append("admin._id", id)
        CategoryData.append("admin.fullname", fullname)

        axios.put(BASE_URL + "Category/" + id, CategoryData)
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
                            <h4>Edit Categoryistrators</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/category/all'>
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
                                        value={Category.title}
                                        name="title"
                                        onChange={inputChange}
                                        required />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea"
                                    value={Category.description}
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
                                    (image.length > 0 || Category.banner) ? (
                                        <img className='form-control' src={
                                            (Category.banner && !image.length > 0) ? Category.banner : (
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

export default EditCategory