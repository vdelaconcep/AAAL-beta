import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Whatsapp from "../components/botones/whatsapp";

const Layout = () => {
    return (
        <div className="flex flex-col justify-between fondo-crema" style={{ minHeight: '100dvh' }}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <Whatsapp />
        </div>
    );
};

export default Layout;
