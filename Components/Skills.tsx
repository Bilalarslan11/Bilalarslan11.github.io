import React from "react";
import SkillsItem from "./SkillsItem";
import SkillsLanguage from "./SkillsLanguage";

const Skills = () => {
    return (
        <div className="pt-[4rem] md:pt-[8rem] pb-[5rem] bg-theme-primary">
            <h1 className="heading">
                Education & <span className="text-theme-secondary">Skill</span>
            </h1>
            <div className="w-[80%] mx-auto pt-[4rem] md:pt-[8rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem] items-center">
                <div>
                    <SkillsItem
                        title="Game Developer"
                        year="2013 - 2014"
                        description="During my times at DTU, I have worked with several people and participated in a half-year project with DADIU, which is a Danish organization for educating game developers, designers, leaders and artists."
                    />
                    <SkillsItem
                        title="Graduate Developer"
                        year="2014 - 2014"
                        description="I have worked as a graduate developer at a company called 2ndC, where I have been working with Microsoft products and learning how to develop software in a professional environment."
                    />
                    <SkillsLanguage
                        skill1="html, ccs and javascript"
                        skill2="unity and scripting"
                        skill3=".NET, C#"
                        level1="w-[90%]"
                        level2="w-[80%]"
                        level3="w-[100%]"
                    />
                </div>
                <div>
                    <SkillsItem
                        title="Developer"
                        year="2014 - 2022"
                        description="As my development career progressed, I learned all sorts of ways of developing software. Always striving for new technologies, alignning with the new laws and regulations and securing software in the best and recommended way."
                    />
                    <SkillsItem
                        title="Senior Developer"
                        year="2022 - Present"
                        description="To this day, I am working as a senior developer where I am more focusing my tasks on managing and guiding others while also developing software for customers with robust and secure solutions. "
                    />
                    <SkillsLanguage
                        skill1="React TypeScript & Angular"
                        skill2="Dynamics 365 and MIM"
                        skill3="Azure and Kubernetes"
                        level1="w-[100%]"
                        level2="w-[90%]"
                        level3="w-[85%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Skills;
