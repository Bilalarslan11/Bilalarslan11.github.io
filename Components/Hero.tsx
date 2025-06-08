import React from "react";
import Particle from "./Particle";
import TextEffect from "./TextEffect";
import Image from "next/image";
import { ArrowDownTrayIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const Hero = () => {
    return (
        <div className="h-[88vh] bg-gradient-to-br from-theme-primary to-theme-darker mt-[10vh] bg-cover bg-center">
            <Particle />
            <div className="w-[80%] grid-cols-1 mx-auto grid lg:grid-cols-2 gap-[3rem] h-[100%] items-center">
                <div>
                    <h1 className="text-[35px] md-text-[50px] text-theme-text font-bold">
                        HI, I AM{" "}
                        <span className="text-theme-secondary">BILAL!</span>
                    </h1>
                    <TextEffect />
                    <p className="mt-[2rem] text-[20px] text-theme-text-secondary">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nisi eveniet harum ullam tempora cum quos rerum,
                        voluptatum pariatur, nam nostrum similique repellendus
                        eos consequatur eaque voluptas magni quae doloribus
                        quam.
                    </p>
                    <div className="mt-[2rem] flex-col space-y-6 sm:space-y-0 sm:flex sm:flex-row items-center sm:space-x-6">
                        <button className="btn-primary flex items-center space-x-2">
                            <p>Download CV</p>
                            <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-theme-text" />
                        </button>
                        <button className="flex items-center space-x-2">
                            <PlayCircleIcon className="w-[4rem] h-[4rem] hover:text-theme-accent transition-all duration-200 text-theme-secondary" />
                            <p className="text-[20px] font-semibold text-theme-text">
                                Watch the video
                            </p>
                        </button>
                    </div>
                </div>

                <div className="w-[300px] hidden bg-theme-dark relative lg:flex items-center rounded-full h-[300px]">
                    <Image
                        src="/images/u1.png"
                        alt="user"
                        layout="fill"
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
