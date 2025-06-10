import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";

interface Props {
    nav: boolean;
    closeNav: () => void;
    scrollToSection: (sectionId: string) => void;
}

const MobileNav = ({ nav, closeNav, scrollToSection }: Props) => {
    const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";

    return (
        <div
            className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0
             z-[1000000] bg-theme-primary`}
        >
            <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
                <div
                    className="relative mb-[2rem] font-semibold text-theme-text cursor-pointer text-[27px] w-fit block after:block after:content-[''] 
                after:absolute after:h-[3px] after:bg-theme-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 
                after:transition after:duration-300 after:origin-center"
                    onClick={() => scrollToSection("home")}
                >
                    HOME
                </div>
                <div
                    className="relative mb-[2rem] font-semibold text-theme-text cursor-pointer text-[27px] w-fit block after:block after:content-[''] 
                after:absolute after:h-[3px] after:bg-theme-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 
                after:transition after:duration-300 after:origin-center"
                    onClick={() => scrollToSection("about")}
                >
                    ABOUT
                </div>
                <div
                    className="relative mb-[2rem] font-semibold text-theme-text cursor-pointer text-[27px] w-fit block after:block after:content-[''] 
                after:absolute after:h-[3px] after:bg-theme-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 
                after:transition after:duration-300 after:origin-center"
                    onClick={() => scrollToSection("focus")}
                >
                    FOCUS
                </div>
                <div
                    className="relative mb-[2rem] font-semibold text-theme-text cursor-pointer text-[27px] w-fit block after:block after:content-[''] 
                after:absolute after:h-[3px] after:bg-theme-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 
                after:transition after:duration-300 after:origin-center"
                    onClick={() => scrollToSection("xp")}
                >
                    XP
                </div>
                <div
                    className="relative mb-[2rem] font-semibold text-theme-text cursor-pointer text-[27px] w-fit block after:block after:content-[''] 
                after:absolute after:h-[3px] after:bg-theme-secondary after:w-full after:scale-x-0 after:hover:scale-x-100 
                after:transition after:duration-300 after:origin-center"
                    onClick={() => scrollToSection("contact")}
                >
                    CONTACT
                </div>
            </div>
            <div
                onClick={closeNav}
                className="absolute z-[10000000] cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-theme-secondary"
            >
                <XMarkIcon />
            </div>
        </div>
    );
};

export default MobileNav;
