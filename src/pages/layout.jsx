import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
    return (
        <div className="flex flex-col justify-between fondo-crema" style={{ minHeight: '100dvh' }}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
