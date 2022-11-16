import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fabric } from "fabric";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import { PDFDocument } from "pdf-lib";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
//components
import Steps from "../components/Steps";
import SignModal from "../components/SignModal";

const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
const Base64Prefix = "data:application/pdf;base64,";

const PreviewBlock = ({ base64Data }) => {
    const canvasRef = useRef(null);
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
        return renderTask.promise.then(() => {
            console.log('printPDFCanvas');
            return canvas;
        });
    };

    const pdf2Image = (pdfData) => {
        return new fabric.Image(pdfData, {
            id: 'rendPDF',
            scaleX: 1 / window.devicePixelRatio,
            scaleY: 1 / window.devicePixelRatio
        })
    }

    const renderPDF = async (canvas) => {
        canvas.requestRenderAll();
        const pdfData = await printPDFCanvas();
        const pdfImage = await pdf2Image(pdfData);
        await canvas.setWidth(pdfImage.width);
        await canvas.setHeight(pdfImage.height);
        await canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
        await canvas.sendToBack();
        await setPdf(true)
    }

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current)
        renderPDF(canvas);
    }, [])

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
                    <Form.Label className="text-dark mb-2">基本資料</Form.Label><br />
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

            <section className="mt-10">
                <Button className="tool__next__btn" variant="primary">下一步</Button>
            </section>

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

export default EditPage;