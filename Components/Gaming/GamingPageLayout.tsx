import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import React, { ReactNode } from "react";

interface GamingPageLayoutProps {
    children: ReactNode;
    nav: boolean;
    openNav: () => void;
    closeNav: () => void;
    scrollToSection: () => void;
}

const GamingPageLayout: React.FC<GamingPageLayoutProps> = ({
    children,
    nav,
    openNav,
    closeNav,
    scrollToSection,
}) => {
    return (
        <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#16213e] to-[#2d1b4e]">
            <MobileNav
                nav={nav}
                closeNav={closeNav}
                scrollToSection={scrollToSection}
            />
            <Nav
                openNav={openNav}
                scrollToSection={scrollToSection}
            />

            <div className="pt-[12vh] pb-8">
                <div className="w-[80%] mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center mb-4 mt-12">
                        PLAY <span className="text-theme-secondary">TIME</span>
                    </h1>
                    <p className="text-gray-300 text-center text-lg hidden md:block">
                        List of lifetime gaming experiences.
                    </p>
                </div>
            </div>

            {children}
        </div>
    );
};

export default GamingPageLayout;
