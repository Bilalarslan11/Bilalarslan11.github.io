import {
    CommandLineIcon,
    PaintBrushIcon,
    RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const Services = () => {
    return (
        <div className="bg-theme-primary pt-[4rem] md:pt-[8rem] pb-[5rem]">
            <p className="text-center font-bold uppercase text-[20px] sm:text-[33px] md:text-[45px] text-theme-text">
                Focus <span className="text-theme-secondary">areas</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto items-center gap-[3rem] mt-[4rem] text-theme-text">
                <div>
                    <div className="bg-theme-darker p-8 uppercase font-semibold text-center transition-transform duration-300 transform hover:scale-110 hover:-rotate-6">
                        <PaintBrushIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Frontend
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            I focus on building clean, responsive interfaces
                            with attention to detail in design and user
                            experience.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-theme-dark p-8 uppercase font-semibold text-center transition-transform duration-300 transform hover:scale-110">
                        <RocketLaunchIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Backend
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            I develop scalable, maintainable systems with a
                            strong emphasis on performance, security, and clear
                            architecture.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-theme-accent p-8 uppercase font-semibold text-center transition-transform duration-300 transform hover:scale-110 hover:rotate-6">
                        <CommandLineIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Fullstack
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            I enjoy bridging frontend and backend to deliver
                            complete, cohesive solutions that work seamlessly
                            end to end.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
