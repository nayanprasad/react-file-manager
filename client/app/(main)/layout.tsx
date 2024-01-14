import Header from "@/components/header";

const MainLayout = async ({ children  }: {children: React.ReactNode}) => {
    return (
        <div className="h-full">
            <main className="h-full">
                <Header />
                {children}
            </main>
        </div>
    );
}

export default MainLayout;


