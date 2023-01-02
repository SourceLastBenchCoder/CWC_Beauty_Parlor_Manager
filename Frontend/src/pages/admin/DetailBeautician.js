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

function DetailBeautician() {

    const [Beautician, setBeautician] = useState({})
    const [error, setError] = useState({})
    const { id } = useParams()

    useEffect(() => {
        document.title = "BPMS : Beautician Detail"

        axios.get(BASE_URL + "Beautician/" + id)
            .then((response) => {
                setBeautician(response.data)
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
                            <h4>Beautician Detail</h4>
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
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={Beautician.banner} height={180} />
                                    <Card.Body>
                                        <Card.Title>{Beautician.fullname}</Card.Title>
                                        <Card.Text>
                                            <b>Email ID : </b>{Beautician.email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={8}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{Beautician.fullname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <b>Email Id:</b>{Beautician.email}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <p>
                                                {Beautician.description}
                                            </p>
                                            <p>
                                                <b>Phone : </b>{Beautician.phone}
                                            </p>
                                            <p>
                                                <b>Status : </b>{(Beautician.status === "Active")
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
                                            <p>
                                                <Card body>
                                                    <h5>Beauticial Created By</h5>
                                                    <hr/>
                                                    <b>Admin Id: </b> {(Beautician.admin) ? Beautician.admin._id : "Not Available"}
                                                    <br />
                                                    <b>Admin Id: </b> {(Beautician.admin) ? Beautician.admin.fullname : "Not Available"}
                                                </Card>
                                            </p>
                                        </Card.Text>
                                        <Link to={{ pathname: '/admin/beautician/edit/' + Beautician._id }}>
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

export default DetailBeautician