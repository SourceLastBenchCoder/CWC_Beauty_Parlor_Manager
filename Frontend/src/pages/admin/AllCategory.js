import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/AppConstants';
import { BsPlusCircle } from "react-icons/bs"

function AllCategory() {

    const [Category, setCategory] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        document.title = "BPMS - ALL Category"

        try {
            axios.get(BASE_URL + "Category")
                .then((response) => {
                    setIsLoading(false)
                    setError(null)
                    setCategory(response.data)
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
            selector: row => <Link to={{ pathname: '/admin/category/detail/' + row._id }}>{row._id}</Link>,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => <img src={row.banner} height={20} />,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => <Link to={{ pathname: '/admin/category/detail/' + row._id }}>{row.title}</Link>,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => <Link to={{ pathname: '/admin/detail/' + row.admin._id }}>{row.admin.fullname}</Link>,
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
                    <div className="row">
                        <div className="col-10">
                            <h4>All Category</h4>
                        </div>
                        <div className="col-2 justify-content-end">
                            <Link to='/admin/category/create'>
                                <Button color="primary" size='sm'>
                                    <BsPlusCircle />&nbsp;Create Category
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
                                data={Category}
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

export default AllCategory