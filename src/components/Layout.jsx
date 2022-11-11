import { Outlet } from "react-router";

//redux
import { Provider } from "react-redux";
import store from "../stores";

// components
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <Provider store={store}>
            <div className="layout d-flex flex-column justify-content-between">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </Provider>
    );
}

export default Layout;