import Image from "next/legacy/image";

const About = () => {
    return (
        <div className="bg-theme-primary pt-[4rem] md:pt-[8rem] pb-[4rem]">
            <h1 className="heading">
                About <span className="text-theme-secondary">Me</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] mx-auto gap-[3rem] items-center mt-[4rem]">
                <div>
                    <h2 className="text-[25px] md:text-[35px] lg:text-[45px] md:leading-[3rem] leading-[2rem] capitalize mb-[3rem] font-bold text-theme-text">
                        Engineering{" "}
                        <span className="text-theme-secondary">Visions</span>
                    </h2>
                    <div className="mb-[3rem] flex items-center md:space-x-10">
                        <span className="w-[100px] hidden md:block h-[5px] bg-theme-dark rounded-sm"></span>
                        <p className="text-[19px] text-theme-text-muted w-[80%]">
                            I’m a Copenhagen-based software engineer with a
                            Master’s from DTU and over a decade of experience
                            building reliable, user-focused solutions. I care
                            about clean design, efficient systems, and
                            continuous improvement.
                            <br />
                            <br />
                            Recently, I’ve been exploring AI in depth—using it
                            to enhance development workflows and diving into LLM
                            engineering. It’s part of my focus on building a
                            future-ready mindset and staying ahead in a rapidly
                            evolving tech landscape.
                            <br />
                            <br />
                            Outside work, I bring the same focus to fitness and
                            gaming, where strategy and performance matter.
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex justify-center items-center w-full h-full">
                    <div className="w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] relative">
                        <Image
                            src="/images/about.jpg"
                            alt="user"
                            layout="fill"
                            objectFit="contain"
                            className="relative z-[11] w-[100%] h-[100%] object-contain"
                        />
                        <div className="absolute w-[75%] h-[100%] z-[10] bg-theme-accent top-[-1rem] right-[1rem]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
