import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert, Badge
} from 'react-bootstrap'
import { BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply } from "react-icons/bs"
import { useParams } from 'react-router-dom'

function DetailCategory() {

    const [Category, setCategory] = useState({})
    const [error, setError] = useState({})
    const { id } = useParams()

    useEffect(() => {
        document.title = "BPMS : Category Detail"

        axios.get(BASE_URL + "category/" + id)
            .then((response) => {
                setCategory(response.data)
            })
            .catch((error) => {
                setError(error.message)
            })
    }, [id])

    return (
        <Container>
            <Card style={{ marginTop: '10px' }}>
                <Card.Header>
                    <div className="row">
                        <div className="col-10">
                            <h4>Category Detail</h4>
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
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={Category.banner} height={180} />
                                    <Card.Body>
                                        <Card.Title>{Category.title}</Card.Title>
                                        <Card.Text>
                                            <b>ID : </b>{Category._id}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={8}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{Category.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <b>Id:</b>{Category._id}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <p>
                                                {Category.description}
                                            </p>
                                            <p>
                                                <b>Status : </b>{(Category.status === "Active")
                                                    ?
                                                    (<Badge bg="success">
                                                        ACTIVE
                                                    </Badge>)
                                                    :
                                                    (<Badge bg="danger">
                                                        IN-ACTIVE
                                                    </Badge>)
                                                }
                                            </p>
                                        </Card.Text>
                                        <Link to={{ pathname: '/admin/category/edit/' + Category._id }}>
                                            <Button color="primary" size='sm'>
                                                <BsPencilSquare />&nbsp;Edit Info
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default DetailCategory