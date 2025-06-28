import React, { useState } from "react";
import Nav from "@/Components/Nav";
import MobileNav from "@/Components/MobileNav";

const Gaming = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    return (
        <div className="overflow-x-hidden bg-theme-primary min-h-screen">
            <MobileNav
                nav={nav}
                closeNav={closeNav}
                scrollToSection={scrollToSection}
            />
            <Nav
                openNav={openNav}
                scrollToSection={scrollToSection}
            />

            <div className="h-screen flex items-center justify-center mt-[12vh]">
                <h1 className="text-[50px] font-bold text-theme-text">
                    GAMING <span className="text-theme-secondary">PAGE</span>
                </h1>
            </div>
        </div>
    );
};

export default Gaming;
