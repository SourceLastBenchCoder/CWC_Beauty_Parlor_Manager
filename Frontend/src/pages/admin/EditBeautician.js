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
import { useSelector } from 'react-redux';

function EditBeautician() {

    const initialData = {
        fullname: "",
        email: "",
        phone: "",
        description: ""
    }

    const [Beautician, setBeautician] = useState(initialData)
    const [password, setPassword] = useState("")
    const [responseOutput, setResponseOutput] = useState("")
    const [image, setImage] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuperBeautician, setSuperBeautician] = useState(false);
    const [isActive, setActive] = useState(false);
    const admin = useSelector(state => state.admin)

    const { id } = useParams()

    useEffect(() => {
        document.title = "BPMS - Edit Beautician"

        axios.get(BASE_URL + "Beautician/" + id)
            .then((response) => {
                setBeautician(response.data)
                setActive((response.data.status === "Active") ? true : false)
                setSuperBeautician(response.data.isSuperBeautician)
                console.log(response.data.status)
                console.log(response.data.isSuperBeautician)
            })
    }, [])

    const handleSuperBeauticianChange = () => {
        setSuperBeautician(!isSuperBeautician);
    };

    const handleStatusChange = () => {
        setActive(!isActive);
    };

    const inputChange = (e) => {
        const { name, value } = e.target
        setBeautician({
            ...Beautician, [name]: value
        })
    }

    const handleSubmit = (e) => {
        debugger;
        console.log(admin)
        e.preventDefault()
        const BeauticianData = new FormData()
        BeauticianData.append("fullname", Beautician.fullname)
        BeauticianData.append("email", Beautician.email)
        BeauticianData.append("phone", Beautician.phone)
        BeauticianData.append("description", Beautician.description)
        BeauticianData.append("status", (isActive) ? 'Active' : 'In-Active')
        Array.from(image).forEach(item => {
            BeauticianData.append("Beautician", item)
        })
        BeauticianData.append("admin._id", admin.id)
        BeauticianData.append("admin.fullname", admin.fullname)

        axios.put(BASE_URL + "Beautician/" + id, BeauticianData)
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
                            <h4>Edit Beauticianistrators</h4>
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
                                        value={Beautician.fullname}
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
                                        value={Beautician.email}
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
                                    value={Beautician.description}
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
                                            value={Beautician.phone}
                                            onChange={inputChange}
                                            placeholder="Phone Number"
                                            name="phone"
                                            required />
                                    </InputGroup>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                {
                                    (image.length > 0 || Beautician.banner) ? (
                                        <img className='form-control' src={
                                            (Beautician.banner && !image.length > 0) ? Beautician.banner : (
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

export default EditBeautician