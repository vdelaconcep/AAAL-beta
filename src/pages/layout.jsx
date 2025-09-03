import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Whatsapp from "../components/botones/whatsapp";

const Layout = () => {
    return (
        <div className="bg-gray-800 min-h-screen flex justify-center">
            <div className="flex flex-col justify-between w-full max-w-[1024px]" style={{ minHeight: '100dvh' }}>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
                <Whatsapp />
            </div>
        </div>
    );
};

export default Layout;
