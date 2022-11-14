import { Outlet } from "react-router";


// components
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="layout d-flex flex-column justify-content-between">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;