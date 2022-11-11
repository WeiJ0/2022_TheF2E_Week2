import Steps from "../components/Steps";

import { Container, Row, Col, Form } from 'react-bootstrap';

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
            </Form>
        </div>
    )
}

const EditPage = () => {
    return (
        <div className='editorPage'>
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