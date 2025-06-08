import {
    CommandLineIcon,
    PaintBrushIcon,
    RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const Services = () => {
    return (
        <div className="bg-theme-primary pt-[4rem] md:pt-[8rem] pb-[5rem]">
            <p className="heading">
                My <span className="text-theme-secondary">Services</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto items-center gap-[3rem] mt-[4rem] text-theme-text">
                <div>
                    <div className="bg-theme-darker card-service hover:-rotate-6">
                        <PaintBrushIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Frontend
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam magnam ullam amet ex quam repudiandae
                            velit laudantium eaque voluptas ad eius ut,
                            assumenda consequatur ipsa et dignissimos explicabo
                            provident sed.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-theme-dark card-service">
                        <RocketLaunchIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Backend
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam magnam ullam amet ex quam repudiandae
                            velit laudantium eaque voluptas ad eius ut,
                            assumenda consequatur ipsa et dignissimos explicabo
                            provident sed.
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-theme-accent card-service hover:rotate-6">
                        <CommandLineIcon className="w-[6rem] h-[6rem] mx-auto text-theme-text" />
                        <h1 className="text-[20px] md:text-[30px] mt-[1.5rem] mb-[1.5rem]">
                            Fullstack
                        </h1>
                        <p className="text-[15px] text-theme-text-muted font-normal">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam magnam ullam amet ex quam repudiandae
                            velit laudantium eaque voluptas ad eius ut,
                            assumenda consequatur ipsa et dignissimos explicabo
                            provident sed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
