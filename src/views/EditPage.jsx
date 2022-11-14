import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fabric } from "fabric";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import { PDFDocument } from "pdf-lib";
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');

import Steps from "../components/Steps";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Base64Prefix = "data:application/pdf;base64,";

const PreviewBlock = ({ base64Data }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const canvas = new fabric.Canvas(canvasRef.current)
    GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const printPDFCanvas = async () => {
        let pdfDoc = await PDFDocument.load(base64Data);
        const data = atob(base64Data.substring(Base64Prefix.length));
        pdfDoc = await getDocument({ data }).promise;
        const pdfPage = await pdfDoc.getPage(1);
        const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport,
        };
        const renderTask = pdfPage.render(renderContext);
        return renderTask.promise.then(() => canvas);
    };

    const pdf2Image = (pdfData) => new fabric.Image(pdfData, {
        id: 'rendPDF',
        scaleX: 1 / window.devicePixelRatio,
        scaleY: 1 / window.devicePixelRatio
    })

    const renderPDF = async () => {
        canvas.requestRenderAll();
        const pdfData = await printPDFCanvas();
        const pdfImage = await pdf2Image(pdfData);
        canvas.setWidth(pdfImage.width);
        canvas.setHeight(pdfImage.height);
        canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
        canvas.sendToBack();
    }

    useEffect(() => {
        renderPDF();
    }, [base64Data])

    return (
        <div className='preview bg-light-grey mx-auto'>
            <canvas ref={canvasRef} />
        </div>
    )
}

const ToolBlock = () => {
    const [showSignModal, setShowSignModal] = useState(false);

    const openSignModal = () => setShowSignModal(true);
    const closeSignModal = () => setShowSignModal(false);

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

                <Form.Group className="mb-6" controlId="input__email">
                    <Form.Label className="text-dark mb-2">我的簽名</Form.Label><br />
                    <Button variant="white" size="lg" className='text-black border-grey tool__create__sign 
                            d-flex align-items-center justify-content-center'
                        onClick={openSignModal}>
                        <span class="material-symbols-outlined">
                            add
                        </span>
                        創建簽名檔
                    </Button>
                    <SignModal show={showSignModal} close={closeSignModal} />
                </Form.Group>
            </Form>
        </div>
    )
}

const EditPage = () => {
    const base64Data = useSelector(state => state.fileReducer.targetFile.base64Data);

    return (
        <div className='editorPage'>
            <Steps current={2} />
            <section>
                <Container>
                    <Row>
                        <Col md={8}>
                            <PreviewBlock base64Data={base64Data} />
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

const SignModal = ({ show, close }) => {
    return (
        <>
            <Modal size="lg" centered show={show} onHide={close}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditPage;