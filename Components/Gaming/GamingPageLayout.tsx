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
        <div className="overflow-x-hidden min-h-screen space-background">
            <MobileNav
                nav={nav}
                closeNav={closeNav}
                scrollToSection={scrollToSection}
            />
            <Nav
                openNav={openNav}
                scrollToSection={scrollToSection}
            />

            <div className="gaming-page-header">
                <div className="gaming-page-header-content">
                    <h1 className="gaming-page-title">
                        PLAY
                        <span className="gaming-page-title-accent">TIME</span>
                    </h1>
                    <p className="gaming-page-subtitle">
                        List of lifetime gaming experiences.
                    </p>
                </div>
            </div>

            {children}
        </div>
    );
};

export default GamingPageLayout;
