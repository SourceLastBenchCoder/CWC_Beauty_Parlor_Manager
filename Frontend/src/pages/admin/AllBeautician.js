import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsPlusCircle } from "react-icons/bs"

function AllBeautician() {

    const [Beautician, setBeautician] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        document.title = "BPMS - ALL Beautician"

        try {
            axios.get(BASE_URL + "Beautician")
                .then((response) => {
                    setIsLoading(false)
                    setError(null)
                    setBeautician(response.data)
                    console.log(response.data)
                }).catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                })
        } catch (error) {
            setError(error.message)
        }

    }, [])

    const tblColumns = [
        {
            name: '#ID',
            selector: row => <Link to={{ pathname: '/admin/beautician/detail/' + row._id }}>{row._id}</Link>,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => <img src={row.banner} height={20} />,
            sortable: true,
        },
        {
            name: 'Fullname',
            selector: row => <Link to={{ pathname: '/admin/beautician/detail/' + row._id }}>{row.fullname}</Link>,
            sortable: true,
        },
        {
            name: 'EmailId',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => (row.status.toLowerCase() === "active") ? (<Badge bg="success">
                ACTIVE
            </Badge>) : (<Badge bg="danger">
                IN-ACTIVE
            </Badge>),
            sortable: true,
        }
    ]

    return (
        <Container>
            <Card style={{ marginTop: '10px' }}>
                <Card.Header>
                    <Row>
                       
                    </Row>
                    <div className="row">
                        <div className="col-8">
                            <h4>All Beauticianistrators</h4>
                        </div>
                        <div className="col-4 float-right">
                            <Link to='/admin/beautician/create'>
                                <Button color="primary" size='sm'>
                                    <BsPlusCircle />&nbsp;Create Beautician
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    {(!isLoading) ? (
                        (!error) ? (
                            <DataTable
                                pagination
                                columns={tblColumns}
                                data={Beautician}
                                noRowsPerPage={7}
                            />
                        ) : (
                            { error }
                        )
                    ) :
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
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AllBeautician