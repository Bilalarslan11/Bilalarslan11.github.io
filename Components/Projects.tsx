import React from "react";
import Image from "next/legacy/image";

const Certifications = () => {
    return (
        <div className="bg-theme-primary pt-[4rem] md:pt-[8rem] pb-[1rem]">
            <h1 className="heading">
                Certi<span className="text-theme-secondary">fications</span>
            </h1>
            <div className="w-[80%] pt-[2rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                <div>
                    <div
                        className="transform cursor-pointer hover:-translate-y-6 transition-all duration-200 
                    relative w-[100%] h-[200px] md:h-[300px]"
                    >
                        <Image
                            src="/images/UC1.jpg"
                            alt="portfolio"
                            layout="fill"
                            className="object-contain"
                        />
                    </div>
                </div>
                <div>
                    <div
                        className="transform cursor-pointer hover:-translate-y-6 transition-all duration-200 
                    relative w-[100%] h-[200px] md:h-[300px]"
                    >
                        <Image
                            src="/images/UC2.jpg"
                            alt="portfolio"
                            layout="fill"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certifications;
