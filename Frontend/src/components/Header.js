import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import { useSelector,useDispatch  } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { logout } from '../reducer/AdminSlice'
import { Link } from "react-router-dom";

function Header() {

    const submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(logout())
                },
                {
                    label: 'No',
                    onClick: () => false
                }
            ]
        });
    };

    const { fullname, banner ,id} = useSelector(state => state.admin)
    const welcomeMessage = <><img src={banner} height={20} /> Welcome : {fullname}</>;
    const dispatch = useDispatch()

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>

                    <NavDropdown title={welcomeMessage}
                        id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Nav>
                                <Link to={{ pathname: '/admin/detail/' + id }}>
                                    Account Settings
                                </Link>
                            </Nav>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <a onClick={submit}>Logout</a>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar >
    )
}

export default Header