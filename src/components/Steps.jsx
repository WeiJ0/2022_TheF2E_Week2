import { Container } from 'react-bootstrap';

//images
import stepSuccess from '../assets/images/step-success.png';
import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';
import step3 from '../assets/images/step3.png';
import step4 from '../assets/images/step4.png';
import step1Active from '../assets/images/step1-active.png';
import step2Active from '../assets/images/step2-active.png';
import step3Active from '../assets/images/step3-active.png';
import step4Active from '../assets/images/step4-active.png';

const StepItem = (props) => {
    const { step, icon, iconActive, text, isActive, isFinished } = props.data;
    const img = isFinished ? stepSuccess : isActive ? iconActive : icon;

    return (
        <div className='step__item d-flex align-items-center me-3'>
            <div className='step__item__img'>
                <img src={img} alt={`Step${step}-${text}`} />
            </div>
            <p className='step__item__text mx-3 mb-0 text-dark-grey'>{text}</p>
            <span className='step__item__line'></span>
        </div>
    )
}

const Steps = (props) => {
    const { current } = props;
    const stepData = [
        {
            step: 1,
            icon: step1,
            iconActive: step1Active,
            text: '成功上傳檔案',
            isFinished: current > 1,
            isActive: current === 1
        },
        {
            step: 2,
            icon: step2,
            iconActive: step2Active,
            text: '加入簽名檔',
            isFinite: current > 2,
            isActive: current === 2
        },
        {
            step: 3,
            icon: step3,
            iconActive: step3Active,
            text: '確認檔案',
            isFinished: current > 3,
            isActive: current === 3
        },
        {
            step: 4,
            icon: step4,
            iconActive: step4Active,
            text: '下載檔案',
            isFinished: current > 4,
            isActive: current === 4
        }
    ];

    return (
        <div className='steps border-bottom border-grey py-3'>
            <Container>
                <div className='d-flex justify-content-center align-items-center'>
                    {stepData.map((item, index) => {
                        return <StepItem key={index} data={item} />
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Steps
