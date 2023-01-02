import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardGroup,
    Col,
    Container, InputGroup, Row, Form, Button, Alert, Badge, Spinner
} from 'react-bootstrap'
import { BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsReply } from "react-icons/bs"
import { useParams } from 'react-router-dom'
import InnerImageZoom from 'react-inner-image-zoom';

function DetailProduct() {

    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({})
    const { id } = useParams()

    useEffect(() => {
        document.title = "BPMS : Product Detail"

        axios.get(BASE_URL + "product/" + id)
            .then((response) => {
                setProduct(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [id])

    return (
        <Container>
            <Card style={{ marginTop: '10px' }}>
                <Card.Header>
                    <div className="row">
                        <div className="col-10">
                            <h4>Product Detail</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/product/all'>
                                <Button color="primary" size='sm'>
                                    <BsReply />&nbsp;Go Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Container>
                        {
                            (!isLoading) ? (
                                <Row>
                                    <Col sm={4}>
                                        <Card style={{ width: '18rem' }}>
                                            {
                                                product.banner.map((item, index) => {
                                                    return (
                                                        <InnerImageZoom src={item} zoomSrc={item} className="mt-3 p-2" />
                                                    )
                                                })
                                            }
                                        </Card>
                                    </Col>
                                    <Col sm={8}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <b>Id:</b>{product._id}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    <p>
                                                        {product.description}
                                                    </p>
                                                    <p>
                                                        <b>Price : </b>{product.price}
                                                        &nbsp;&nbsp;
                                                        <b>Total Time : </b>{product.totaltime} Mins
                                                    </p>
                                                    <p>
                                                        <b>Status : </b>{(product.status === "Active")
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
                                                            <h5>Product Category</h5>
                                                            <hr />
                                                            <b>Category Id: </b> {(product.category._id) ? product.category._id : "Not Available"}
                                                            <br />
                                                            <b>Category Title: </b> {(product.category.title) ? product.category.title : "Not Available"}
                                                        </Card>
                                                    </p>
                                                    <p>
                                                        <Card body>
                                                            <h5>Product Created By</h5>
                                                            <hr />
                                                            <b>Admin Id: </b> {(product.admin) ? product.admin._id : "Not Available"}
                                                            <br />
                                                            <b>Admin Id: </b> {(product.admin) ? product.admin.fullname : "Not Available"}
                                                        </Card>
                                                    </p>
                                                </Card.Text>

                                                <Link to={{ pathname: '/admin/product/edit/' + product._id }}>
                                                    <Button color="primary" size='sm'>
                                                        <BsPencilSquare />&nbsp;Edit Info
                                                    </Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ) : (
                                <p>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    &nbsp;
                                    <span>Loading...</span>
                                </p>
                            )
                        }
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default DetailProduct