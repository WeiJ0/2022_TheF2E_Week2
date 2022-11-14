import { useState } from 'react';
import { Modal, Tab, Tabs, Button } from 'react-bootstrap';

const SignModal = (props) => {
    const { isShow, close } = props;
    const [canSave, setCanSave] = useState(false);

    return (
        <Modal className='signModal' centered show={isShow} onHide={close}>
            <Modal.Header closeButton className='border-0'></Modal.Header>
            <Modal.Body className="px-0">
                <Tabs defaultActiveKey="輸入" className="mb-3" justify >
                    <Tab eventKey="輸入" title="輸入"></Tab>
                    <Tab eventKey="手寫" title="手寫"></Tab>
                    <Tab eventKey="上傳" title="上傳"></Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer className='border-0'>
                <Button variant={canSave ? "primary" : "grey"}
                    disabled={!canSave ? "disabled" : ""}>
                    儲存
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignModal;