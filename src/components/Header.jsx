import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

//images
import logo from '../assets/images/logo.svg';

const Header = () => {
    return (
        <Navbar sticky="top" className="border-bottom border-grey bg-white px-4 px-lg-auto" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </Navbar.Brand>
                <h2 className='navbar__text text-dark-grey text-center mb-0 mx-auto d-none d-lg-block w-100'>快速省時的電子簽署工具</h2>
                <Navbar.Toggle aria-controls="navbar__menu" />
                <Navbar.Collapse id="navbar__menu" >
                    <Nav className='flex-column flex-lg-row align-items-center ms-auto'>
                        <Nav.Item>
                            <Button variant="link" className="text-primary text-decoration-none" nowrap>登入</Button>
                        </Nav.Item>
                        <Nav.Item className="mt-3 mt-lg-0 ms-lg-4">
                            <Button variant="primary">註冊</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;