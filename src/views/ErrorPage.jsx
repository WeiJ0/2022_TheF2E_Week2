import { useNavigate, useLocation } from "react-router-dom";
import FullPageLayout from "../components/FullPageLayout";

const ErrorPage = () => {

    const location = useLocation();
    console.log(location);

    const { type, title, content } = location.state;

    return (
        <>
            <FullPageLayout type={type} title={title} content={content} />
        </>
    )
}

export default ErrorPage;