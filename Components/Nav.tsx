import React from "react";

interface Props {
    openNav: () => void;
    scrollToSection: (sectionId: string) => void;
}

const Nav = ({ openNav, scrollToSection }: Props) => {
    return (
        <div className="w-[100%] fixed z-[10000] top-0 h-[12vh] bg-theme-primary shadow-md">
            <div className="flex items-center justify-between w-[80%] mx-auto h-[100%]">
                <div className="w-[4rem] h-[4rem] bg-theme-secondary rounded-full flex items-center justify-center">
                    <img
                        src="/images/lionC.jpg"
                        alt="Lion Logo"
                        className="w-[3.2rem] h-[3.2rem] object-contain"
                    />
                </div>
                <h1 className="flex-[0.6] cursor-pointer text-[25px] text-theme-text font-bold">
                    ZE
                    <span className="text-theme-secondary">HAI</span>
                </h1>
                <div
                    className="nav-link"
                    onClick={() => scrollToSection("home")}
                >
                    HOME
                </div>
                <div
                    className="nav-link"
                    onClick={() => scrollToSection("about")}
                >
                    ABOUT
                </div>
                <div
                    className="nav-link"
                    onClick={() => scrollToSection("focus")}
                >
                    FOCUS
                </div>
                <div
                    className="nav-link"
                    onClick={() => scrollToSection("xp")}
                >
                    SKILLS
                </div>
                <div
                    className="nav-link"
                    onClick={() => scrollToSection("contact")}
                >
                    CONTACT
                </div>
                <div onClick={openNav}></div>
            </div>
        </div>
    );
};

export default Nav;
