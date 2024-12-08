import React from "react";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

const About = () => {
    return (
        <div className="bg-[#121121] pb-[4rem] md:pt-[8rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] mx-auto gap-[3rem] items-center">
                <div>
                    <h1 className="text-[20px] font-bold uppercase text-[#55e6a5] mb-[1rem]">
                        ABOUT ME
                    </h1>
                    <h2 className="text-[25px] md:text-[35px] lg:text-[45px] md:leading-[3rem] leading-[2rem] capitalize mb-[3rem] font-bold text-white">
                        Transforming{" "}
                        <span className="text-yellow-400">Visions</span>
                    </h2>
                    <div className="mb-[3rem] flex items-center md:space-x-10">
                        <span className="w-[100px] hidden md:block h-[5px] bg-slate-400 rouded-sm"></span>
                        <p className="text-[19px] text-slate-300 w-[80%]">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Suscipit velit dicta laborum? Tenetur incidunt
                            perferendis error aspernatur, culpa voluptatibus
                            iusto nihil doloribus laboriosam explicabo
                            cupiditate nam excepturi eveniet voluptatum
                            corporis.
                        </p>
                    </div>
                    <button className="px-[2rem] hover:bg-yellow-400 transition-all duration-200 py-[1rem] text-[18px] font-extrabold uppercase bg-[#55e6a5] text-black flex items-center space-x-2">
                        <p>Download CV</p>
                        <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-black" />
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
                    <div className="absolute w-[100%] h-[100%] z-[10] bg-[#55e6a5] top-[-2rem] right-[-2rem]"></div>
                </div>
            </div>
        </div>
    );
};

export default About;
