import { Container, Row, Col, Form, Button } from 'react-bootstrap';

//components
import Steps from "../components/Steps";
import SignModal from "../components/SignModal";

const PreviewBlock = () => {
    return (
        <>
        </>
    )
}

const ToolBlock = () => {
    return (
        <div className="tool p-4">
            <Form>
                <Form.Group className="mb-2" controlId="input__name">
                    <Form.Label className="text-dark mb-2">基本資料</Form.Label>
                    <Form.Control type="text" placeholder="請輸入您的姓名" />
                </Form.Group>

                <Form.Group className="mb-6" controlId="input__email">
                    <Form.Control type="email" inputMode="email" placeholder="請輸入您的電子信箱" />
                </Form.Group>

                <Form.Group controlId="input__name">
                    <Form.Label className="text-dark mb-2">基本資料</Form.Label>
                </Form.Group>
                <Button className="tool__create__btn text-black border-grey" variant="white">創建簽名檔</Button>
            </Form>

            <section className="mt-10">
                <Button className="tool__next__btn" variant="primary">下一步</Button>
            </section>

        </div>
    )
}

const EditPage = () => {
    return (
        <div className='editorPage'>
            <SignModal isShow={true} />
            <Steps current={2} />
            <section>
                <Container>
                    <Row>
                        <Col md={8}>
                            <PreviewBlock />
                        </Col>
                        <Col md={4}>
                            <ToolBlock />
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default EditPage;