import Footer from "@/components/home/footer";
import Navbar from "@/components/shared/navbar/navbar";


function homeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

export default homeLayout;