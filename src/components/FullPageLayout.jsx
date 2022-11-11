import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//images
import wrong from '../assets/images/wrong.png';
import goal from '../assets/images/goal.png';
import sended from '../assets/images/sended.png';


const types = {
    error: wrong,
    finished: goal,
    waiting: sended
}

const ButtonBlock = (props) => {
    const { type } = props;
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    return (
        <div>
            {type === 'error' &&
                <div className="text-center d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={backToHome}>回首頁</Button>
                </div>
            }

            {type === 'finished' &&
                <div>
                    <Button variant="primary" size="lg">下載檔案</Button>
                    <Button variant="link" className='text-primary' size="lg">註冊</Button>
                </div>
            }
        </div>
    )
}

const FullPageLayout = (props) => {

    const { type, title, content } = props;

    return (
        <section className="fullPageLayout">
            <Container className='h-100'>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="fullPageLayout__img">
                        <img className='img-flud' src={types[type]} />
                    </div>
                    <div className="fullPageLayout__text">
                        <h2 className='text-primary mb-2'>{title}</h2>
                        <p className="text-dark-grey mb-5" dangerouslySetInnerHTML={{ __html: content }}></p>
                        <ButtonBlock type={type} />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default FullPageLayout;