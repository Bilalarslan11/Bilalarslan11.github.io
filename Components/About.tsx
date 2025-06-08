import React from "react";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

const About = () => {
    return (
        <div className="bg-theme-primary pb-[4rem] md:pt-[8rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] mx-auto gap-[3rem] items-center">
                <div>
                    <h1 className="text-[20px] font-bold uppercase text-theme-secondary mb-[1rem]">
                        ABOUT ME
                    </h1>
                    <h2 className="text-[25px] md:text-[35px] lg:text-[45px] md:leading-[3rem] leading-[2rem] capitalize mb-[3rem] font-bold text-theme-text">
                        Transforming{" "}
                        <span className="text-theme-secondary">Visions</span>
                    </h2>
                    <div className="mb-[3rem] flex items-center md:space-x-10">
                        <span className="w-[100px] hidden md:block h-[5px] bg-theme-dark rounded-sm"></span>
                        <p className="text-[19px] text-theme-text-muted w-[80%]">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Suscipit velit dicta laborum? Tenetur incidunt
                            perferendis error aspernatur, culpa voluptatibus
                            iusto nihil doloribus laboriosam explicabo
                            cupiditate nam excepturi eveniet voluptatum
                            corporis.
                        </p>
                    </div>
                    <button className="btn-primary flex items-center space-x-2">
                        <p>Download CV</p>
                        <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-theme-text" />
                    </button>
                </div>
                <div className="lg:w-[350px] mx-auto md:mx-0 mt-[2rem] lg:mt-0 lg:h-[350px] w-[200px] h-[200px] relative">
                    <Image
                        src="/images/about.png"
                        alt="user"
                        layout="fill"
                        objectFit="contain"
                        className="relative z-[11] w-[100%] h-[100%] object-contain"
                    />
                    <div className="absolute w-[100%] h-[100%] z-[10] bg-theme-accent top-[-2rem] right-[-2rem]"></div>
                </div>
            </div>
        </div>
    );
};

export default About;
