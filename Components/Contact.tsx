import { Mail, LinkedIn, Instagram } from "@mui/icons-material";
import React from "react";

const Contact = () => {
    return (
        <div className="pt-[8rem] pb-[4rem] text-theme-accent">
            <h1 className="text-center font-bold uppercase text-[20px] sm:text-[33px] md:text-[45px] text-theme-text">
                Contact <span className="text-theme-secondary">Me</span>
            </h1>
            <br />
            <div className="grid border-b-[1px] pb-[6rem] border-theme-dark grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-[80%] mx-auto gap-[3rem]">
                <div className="flex items-center space-x-6">
                    <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center rounded-full bg-theme-dark">
                        <LinkedIn
                            className="text-black"
                            sx={{
                                fontSize: { xs: "3.5rem", md: "4rem" },
                            }}
                        />
                    </div>
                    <div>
                        <h1 className="text-[25px] mb-[0.2rem] font-semibold text-white">
                            LinkedIn
                        </h1>
                        <p className="text-[17px] w-[90%] text-white opacity-60">
                            <a href="https://linkedin.com/in/bilal-arslan-23199057">
                                bilal-arslan-23199057
                            </a>
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center rounded-full bg-theme-dark">
                        <Mail
                            className="text-black"
                            sx={{
                                fontSize: { xs: "3.5rem", md: "4rem" },
                            }}
                        />
                    </div>
                    <div>
                        <h1 className="text-[25px] mb-[0.2rem] font-semibold text-white">
                            Email
                        </h1>
                        <p className="text-[17px] w-[90%] text-white opacity-60">
                            <a href="mailto:bilalarslan11@gmail.com">
                                bilalarslan11@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="md:w-[6.5rem] md:h-[6.5rem] w-[5rem] h-[5rem] flex items-center justify-center rounded-full bg-theme-dark">
                        <Instagram
                            className="text-black"
                            sx={{
                                fontSize: { xs: "3.5rem", md: "4rem" },
                            }}
                        />
                    </div>
                    <div>
                        <h1 className="text-[25px] mb-[0.2rem] font-semibold text-white">
                            Instagram
                        </h1>
                        <p className="text-[17px] w-[90%] text-white opacity-60">
                            <a href="https://www.instagram.com/bilalarslan11/">
                                bilalarslan11
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
