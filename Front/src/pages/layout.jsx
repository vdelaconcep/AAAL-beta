import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header";
import Navegacion from '@/components/layout/navegacion';
import Footer from "@/components/layout/footer";
import Whatsapp from "@/components/botones/whatsapp";

const Layout = () => {
    return (
        <div className="bg-gray-800 min-h-screen flex justify-center">
            <div className="relative flex flex-col w-full max-w-[1250px]" style={{ minHeight: '100dvh' }}>
                <div>
                    <Header />
                    <Navegacion />
                </div>
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
