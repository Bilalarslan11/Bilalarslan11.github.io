import React from "react";
import SkillsItem from "./SkillsItem";
import SkillsLanguage from "./SkillsLanguage";

const Skills = () => {
    return (
        <div className="pt-[4rem] md:pt-[8rem] pb-[5rem] bg-[#09101a]">
            <h1 className="heading">
                Education & <span className="text-yellow-400">Skill</span>
            </h1>
            <div className="w-[80%] mx-auto pt-[4rem] md:pt-[8rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem] items-center">
                <div>
                    <SkillsItem
                        title="Game Developer"
                        year="2013 - 2014"
                    />
                    <SkillsItem
                        title="Graduate Developer"
                        year="2014 - 2014"
                    />
                    <SkillsLanguage
                        skill1="html"
                        skill2="ccs"
                        skill3="javascript"
                        level1="w-[88%]"
                        level2="w-[80%]"
                        level3="w-[91%]"
                    />
                </div>
                <div>
                    <SkillsItem
                        title="Developer"
                        year="2014 - 2022"
                    />
                    <SkillsItem
                        title="Senior Developer"
                        year="2022 - 2024"
                    />
                    <SkillsLanguage
                        skill1="Angular & React TypeScript"
                        skill2="Dynamics 365, Microsoft Identity Management"
                        skill3=".NET, Azure and Kubernetes"
                        level1="w-[95%]"
                        level2="w-[100%]"
                        level3="w-[100%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Skills;
