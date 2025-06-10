import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Particle from "./Particle";
import TextEffect from "./TextEffect";

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
                        Experienced Software Engineer based in Copenhagen with
                        many years at the same company, blending strong
                        technical skills with a passion for design and
                        usability. Former professional gamer with a competitive
                        edge and a problem-solving mindset.
                    </p>
                    <div className="mt-[2rem] flex-col space-y-6 sm:space-y-0 sm:flex sm:flex-row items-center sm:space-x-6">
                        <a
                            href="/Profile.pdf"
                            download="Profile.pdf"
                            className="btn-primary flex items-center space-x-2"
                        >
                            <p>Download CV</p>
                            <ArrowDownTrayIcon className="w-[1.6rem] h-[1.7rem] text-theme-text" />
                        </a>
                        {/* <button className="flex items-center space-x-2">
                            <PlayCircleIcon className="w-[4rem] h-[4rem] hover:text-theme-accent transition-all duration-200 text-theme-secondary" />
                            <p className="text-[20px] italic font-semibold text-theme-text">
                                Coming soon
                            </p>
                        </button> */}
                    </div>
                </div>

                <div className="hidden lg:flex justify-center items-center w-full h-full">
                    <div className="w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] bg-theme-dark relative rounded-full flex items-center justify-center">
                        <Image
                            src="/images/u1.png"
                            alt="user"
                            layout="fill"
                            className="object-cover rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
