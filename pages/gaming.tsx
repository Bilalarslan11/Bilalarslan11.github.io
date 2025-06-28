import React, { useState } from "react";
import Nav from "@/Components/Nav";
import MobileNav from "@/Components/MobileNav";
import Box from "@mui/material/Box";

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

            <Box></Box>
        </div>
    );
};

export default Gaming;
