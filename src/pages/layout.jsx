import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Login from "../components/login";
import Footer from "../components/footer";

const Layout = () => {
    return (
        <div className="bg-gradient-to-t from-sky-900 from-40% to-black to-120% flex flex-col justify-between" style={{ minHeight: '100dvh' }}>
            <Login />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
