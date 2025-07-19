import React from "react";
import Image from "next/legacy/image";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";

interface Props {
    openNav: () => void;
    scrollToSection: (sectionId: string) => void;
}

const Nav = ({ openNav, scrollToSection }: Props) => {
    const router = useRouter();

    return (
        <div className="w-[100%] fixed z-[10000] top-0 h-[12vh] bg-theme-primary shadow-md">
            <div className="flex items-center justify-between w-[80%] mx-auto h-[100%]">
                <div className="w-[4rem] h-[4rem] bg-theme-secondary rounded-full flex items-center justify-center relative overflow-hidden">
                    <Image
                        src="/images/lionC.jpg"
                        alt="Lion Logo"
                        width={51}
                        height={51}
                        className="object-contain"
                        onClick={() => router.push("/")}
                    />
                </div>

                <h1 className="cursor-pointer text-[25px] text-theme-text font-bold flex-[0.6] pl-4">
                    ZE<span className="text-theme-secondary">HAI</span>
                </h1>

                <div className="flex items-center space-x-6 flex-1 justify-end mr-8">
                    {router.pathname !== "/gaming" && (
                        <>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection("home")}
                            >
                                HOME
                            </button>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection("about")}
                            >
                                ABOUT
                            </button>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection("focus")}
                            >
                                FOCUS
                            </button>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection("xp")}
                            >
                                SKILLS
                            </button>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection("contact")}
                            >
                                CONTACT
                            </button>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-4 group">
                    {/* {router.pathname !== "/gaming" && (
                        <button
                            onClick={() => router.push("/gaming")}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <SportsEsportsIcon
                                className="cursor-pointer text-theme-secondary"
                                style={{ fontSize: "2.5rem" }}
                            />
                        </button>
                    )} */}

                    <button
                        onClick={openNav}
                        className="md:hidden"
                    >
                        <Bars3Icon className="w-[2rem] h-[2rem] cursor-pointer text-theme-secondary" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Nav;
