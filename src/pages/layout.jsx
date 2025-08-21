import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Login from "../components/login";
import Footer from "../components/footer";

const Layout = () => {
    return (
        <div className="flex flex-col justify-between bg-amber-50" style={{ minHeight: '100dvh' }}>
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
