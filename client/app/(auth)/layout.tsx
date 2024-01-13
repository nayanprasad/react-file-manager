
const MainLayout = async ({ children  }: {children: React.ReactNode}) => {
    return (
        <div className="h-screen w-1/3 flex items-center justify-center m-auto">
                {children}
        </div>
    );
}

export default MainLayout;



