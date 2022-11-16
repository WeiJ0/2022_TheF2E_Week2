import { useState, useRef, useEffect } from 'react';
import { Modal, Tab, Tabs, Button } from 'react-bootstrap';
import { fabric } from "fabric";

const TypeBlock = () => {
    const canvasRef = useRef(null);
    const [selectFont, setSelectFont] = useState('Noto Sans TC');
    const [selectColor, setSelectColor] = useState('#000000');
    const [typeName, setTypeName] = useState('');
    const canvas = new fabric.Canvas(canvasRef.current)

    const btnClass = (font) => selectFont === font ? 'border-secondary' : 'border-dark-grey';

    const initCanvas = () => {
        let preview = document.querySelector('.type__input');
        canvas.requestRenderAll();
        canvas.setWidth(preview.offsetWidth);
        canvas.setHeight(preview.offsetHeight);
    }

    const fontChange = (font) => {
        if(selectFont === font) return;
        setSelectFont(font);
    }

    const colorChange = (color) => {
        if(selectColor === color) return;
        setSelectColor(color);
    }

    const typeNameChange = (e) => {
        if(typeName === e.target.value) return;
        setTypeName(e.target.value);
    }

    const renderCanvas = () => {
        canvas.requestRenderAll();
        canvas.add(new fabric.Text(typeName, {
            fontFamily: selectFont,
            fill: selectColor,
            fontSize: 20,
            originX: 'center',
            originY: 'center',
            left: canvas.width * 0.5,
            top: canvas.height * 0.5,
            id: 'typeName'
        }))
    }

    useEffect(() => {
        renderCanvas();
    }, [selectFont, selectColor, typeName])

    useEffect(() => {
        initCanvas();
    }, []);

    return (
        <div className="type p-3">
            <div className="type__fonts d-flex">
                <Button variant={selectFont === 'Noto Sans TC' ? 'third' : 'white'}
                    className={`type__fonts-san text-black ${btnClass('Noto Sans TC')}`}
                    onClick={() => { fontChange('Noto Sans TC') }}>
                    思源黑體</Button>
                <Button variant={selectFont === 'Noto Serif TC' ? 'third' : 'white'}
                    className={`type__fonts-ser text-black ${btnClass('Noto Serif TC')}`}
                    onClick={() => { fontChange('Noto Serif TC') }}>
                    思源宋體</Button>
                <input id='type__fonts__input' className='ms-3 px-3'
                    type="text" placeholder="請輸入您的姓名"
                    onChange={(e) => typeNameChange(e)} />
            </div>
            <div className="type__input border border-dark-grey p-2 pb-3 mt-3">
                <canvas ref={canvasRef}></canvas>
                <div className='type__colors d-flex'>
                    <span className='type__color-black bg-black ms-2'></span>
                    <span className='type__color-blue bg-blue ms-2'></span>
                    <span className='type__color-red bg-danger ms-2'></span>
                </div>
            </div>
        </div>
    )
}

const SignModal = ({ show, close }) => {
    const [canSave, setCanSave] = useState(false);
    return (
        <Modal className='signModal' centered show={show} onHide={close}>
            <Modal.Header closeButton className='border-0'></Modal.Header>
            <Modal.Body className="px-0">
                <Tabs defaultActiveKey="輸入" className="mb-3" justify >
                    <Tab eventKey="輸入" title="輸入">
                        <TypeBlock />
                    </Tab>
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