import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { Container, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


//images
import addFiles from '../assets/images/addfile.png';
import circle1 from '../assets/images/circle1.svg';
import circle2 from '../assets/images/circle2.svg';
import circle3 from '../assets/images/circle3.svg';
import fileUpload from '../assets/images/File-upload.png';
import sending from '../assets/images/Sending.png';
import signing from '../assets/images/Signing.png';
import { setFile } from '../actions/file';

const UploadBlock = () => {
    const uploadBlockRef = useRef(null);
    const uploadRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 檢查檔案是否為PDF或是IMG
    const checkFileType = (file) => {
        const fileType = file.type;
        if (!['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(fileType)) {
            navigate('/error', {
                state: {
                    type: 'error',
                    title: '您的檔案無法上傳',
                    content: '請重新上傳檔案。確認檔案大小在10Mb以內，檔案格式為PDF、IMG。<br/>若還是無法上傳檔案，請聯繫'
                }
            })

            return;
        }
        storeSetFile(file);
    }

    // 儲存到 store
    const storeSetFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            dispatch(setFile({
                name: file.name,
                base64Data: reader.result
            }))
        }
    }

    // 綁定上傳按紐
    const clickUploadBtn = () => {
        uploadRef.current.click();
    }

    // 拖曳檔案時背景色互動
    const changeBg = () => {
        const uploadBlock = uploadBlockRef.current;
        if (uploadBlock.classList.contains('bg-third')) {
            uploadBlock.classList.remove('bg-third');
            uploadBlock.classList.add('bg-grey');
        } else {
            uploadBlock.classList.remove('bg-grey');
            uploadBlock.classList.add('bg-third');
        }
    }

    // 拖曳檔案時取消事件
    const dragUpload = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // 接收拖曳檔案
    const dorpUpload = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        checkFileType(file);
        changeBg();
    }

    return (
        <section ref={uploadBlockRef} className="upload bg-third mt-6 py-6 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center"
                onDragEnter={changeBg}
                onDragLeave={changeBg}
                onDragOver={dragUpload}
                onDrop={dorpUpload} >
                <img src={addFiles} className="img-fluid upload__icon" />
                <p className="mt-5 mb-2 text-dark">將檔案拖曳至這裡，或</p>
                <Button variant="primary" className="upload__btn" onClick={clickUploadBtn} >選擇檔案</Button>
                <input ref={uploadRef} id="upload__input" type="file" className="d-none" accept="image/*,.pdf"
                    onChange={(e) => { checkFileType(e.target.files[0]) }} />
                <h5 className='mt-3 text-primary fw-bolder'>檔案大小10Mb以內，檔案格式為PDF、IMG</h5>
            </div>
        </section>
    )
}

// 說明步驟
const IntroStep = (props) => {
    const { data } = props;
    const { label, title, content, illustration } = data;

    return (
        <div className='mt-3 mt-lg-0 d-flex flex-column align-items-center'>
            <img src={label} className="img-fluid" />
            <h3 className='mt-2 text-black'>{title}</h3>
            <p className='text-dark-grey mt-1'>{content}</p>
            <img src={illustration} className="img-fluid" />
        </div>
    )
}

const HomePage = () => {
    const stepData = [
        {
            label: circle1,
            title: '上傳檔案',
            content: '選擇PDF檔或是IMG檔',
            illustration: fileUpload
        },
        {
            label: circle2,
            title: '加入簽名檔',
            content: '手寫、輸入或是上傳簽名檔',
            illustration: sending
        },
        {
            label: circle3,
            title: '下載與傳送',
            content: '完成簽署可立即傳送檔案給對方',
            illustration: signing
        }
    ];

    return (
        <div className="homepage">
            <Container>
                <UploadBlock />
                <section className='intro mt-6 d-flex flex-column align-items-center'>
                    <h1 className='text-dark fw-bold mb-0'>輕鬆幾步驟，完成您的簽署</h1>
                    <section className='intro__steps mt-3 mt-lg-5 w-100 d-flex flex-column flex-md-row align-items-center justify-content-around'>
                        {stepData.map((step, index) => <IntroStep key={index} data={step} />)}
                    </section>
                </section>
            </Container>
        </div>
    )
}

export default HomePage;