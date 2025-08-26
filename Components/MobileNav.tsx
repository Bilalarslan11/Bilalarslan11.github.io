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
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
                    onClick={() => scrollToSection("home")}
                >
                    HOME
                </div>
                <div
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
                    onClick={() => scrollToSection("about")}
                >
                    ABOUT
                </div>
                <div
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
                    onClick={() => scrollToSection("focus")}
                >
                    FOCUS
                </div>
                <div
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
                    onClick={() => scrollToSection("xp")}
                >
                    SKILLS
                </div>
                <div
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
                    onClick={() => scrollToSection("certifications")}
                >
                    CERTS
                </div>
                <div
                    className="mb-8 font-semibold text-theme-text cursor-pointer text-[27px] w-fit border-b-2 border-transparent hover:border-theme-secondary transition"
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
