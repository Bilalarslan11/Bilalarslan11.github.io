import React from "react";

interface Props {
    skill1: string;
    skill2: string;
    skill3: string;
    level1: string;
    level2: string;
    level3: string;
}

const SkillsLanguage = ({
    skill1,
    skill2,
    skill3,
    level1,
    level2,
    level3,
}: Props) => {
    return (
        <div>
            <div className="relative mb-[3rem]">
                <h1 className="p-5 w-[100%] uppercase bg-theme-darker rounded-sm text-theme-text text-[20px] font-bold">
                    {skill1}
                </h1>
                <span
                    className={`${level1} bottom-0 h-[6px] absolute bg-theme-secondary`}
                ></span>
            </div>
            <div className="relative mb-[3rem]">
                <h1 className="p-5 w-[100%] uppercase bg-theme-darker rounded-sm text-theme-text text-[20px] font-bold">
                    {skill2}
                </h1>
                <span
                    className={`${level2} bottom-0 h-[6px] absolute bg-theme-secondary`}
                ></span>
            </div>
            <div className="relative mb-[3rem]">
                <h1 className="p-5 w-[100%] uppercase bg-theme-darker rounded-sm text-theme-text text-[20px] font-bold">
                    {skill3}
                </h1>
                <span
                    className={`${level3} bottom-0 h-[6px] absolute bg-theme-secondary`}
                ></span>
            </div>
        </div>
    );
};

export default SkillsLanguage;
