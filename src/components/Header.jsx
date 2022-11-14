import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { setFileName } from '../actions/file';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

//images
import logo from '../assets/images/logo.svg';

const HomeNavbar = () => {
    return (
        <>
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
        </>
    )
}

const EditNameModal = (props) => {
    const dispatch = useDispatch();
    const { isShow, close } = props;
    const [canSave, setCanSave] = useState(false);
    const [editName, setEditName] = useState('');

    const checkCanSave = (e) => {
        setEditName(e.target.value);
        setCanSave(e.target.value.length > 0);
    }

    const saveName = () => {
        dispatch(setFileName(editName))
    }
    return (
        <>
            <Modal centered show={isShow} onHide={close}>
                <Modal.Header closeButton className='border-primary'>
                    <Modal.Title className='text-primary text-center fw-normal'>重新命名檔案</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="fileName">
                            <Form.Label>檔案</Form.Label>
                            <Form.Control type="text" autoComplete="off" placeholder="請輸入檔案名稱" onChange={(e) => { checkCanSave(e) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                    <Button variant={canSave ? "primary" : "grey"}
                        disabled={!canSave ? "disabled" : ""}
                        onClick={saveName}>
                        儲存
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const EditNavbar = () => {
    const targetFile = useSelector(state => state.fileReducer.targetFile);
    const [showEditName, setShowEditName] = useState(false);

    const openEditName = () => setShowEditName(true);
    const closeEditName = () => setShowEditName(false);

    return (
        <>
            <div className='navbar__edit d-flex'>
                <span className="navbar__edit__btn material-symbols-outlined text-dark-grey cursor-pointer">
                    arrow_back
                </span>
                <div className='d-flex align-items-center'>
                    <h5 className='text-dark mb-0 ms-4 me-2'>{targetFile.name}</h5>
                    <span className="navbar__edit__btn material-symbols-outlined text-dark-grey cursor-pointer" onClick={openEditName}>
                        edit
                    </span>
                </div>
            </div>
            <EditNameModal isShow={showEditName} close={closeEditName} />
        </>
    )
}

const Header = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Navbar sticky="top" className="border-bottom border-grey bg-white px-4 px-lg-auto" expand="lg">
            <Container>
                {location.pathname === '/' ? <HomeNavbar /> : <EditNavbar />}
            </Container>
        </Navbar>
    )
}

export default Header;