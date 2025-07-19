import About from "@/Components/About";
import Contact from "@/Components/Contact";
import Hero from "@/Components/Hero";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import Services from "@/Components/Services";
import Skills from "@/Components/Skills";
import Head from "next/head";
import React, { useState } from "react";

const HomePage = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = (sectionId: string) => {
        // Close mobile nav first if it's open
        if (nav) {
            closeNav();
        }

        // Add small delay to ensure mobile nav is closed before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight =
                    document.querySelector("nav")?.offsetHeight || 0;
                const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }, 50); // Wait for mobile nav animation to complete
    };

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>
                    Bilal Arslan - Senior Software Developer | Copenhagen
                </title>
                <meta
                    name="description"
                    content="Senior Software Developer with 10+ years experience in .NET, C#, React, TypeScript, and Azure. Based in Copenhagen, seeking new opportunities in software development."
                />
                <meta
                    name="keywords"
                    content="Senior Software Developer, .NET, C#, React, TypeScript, Angular, Azure, Kubernetes, Copenhagen, Denmark, Software Engineer, Full Stack Developer"
                />
                <meta
                    name="author"
                    content="Bilal Arslan"
                />
                <meta
                    name="robots"
                    content="index, follow"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="canonical"
                    href="https://bilalarslan11.github.io/civi/"
                />

                {/* Open Graph Meta Tags for Social Media */}
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="Bilal Arslan - Senior Software Developer"
                />
                <meta
                    property="og:description"
                    content="Experienced Software Engineer with 10+ years at the same company, blending strong technical skills with a passion for design and usability. Former professional gamer with a competitive edge."
                />
                <meta
                    property="og:url"
                    content="https://bilalarslan11.github.io/civi/"
                />
                <meta
                    property="og:site_name"
                    content="Bilal Arslan Portfolio"
                />
                <meta
                    property="og:image"
                    content="https://bilalarslan11.github.io/civi/images/u1.png"
                />
                <meta
                    property="og:image:width"
                    content="400"
                />
                <meta
                    property="og:image:height"
                    content="400"
                />
                <meta
                    property="og:image:alt"
                    content="Bilal Arslan - Senior Software Developer"
                />
                <meta
                    property="og:locale"
                    content="en_US"
                />

                {/* Twitter Card Meta Tags */}
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    name="twitter:title"
                    content="Bilal Arslan - Senior Software Developer"
                />
                <meta
                    name="twitter:description"
                    content="Senior Software Developer with 10+ years experience in .NET, C#, React, TypeScript. Based in Copenhagen."
                />
                <meta
                    name="twitter:image"
                    content="https://bilalarslan11.github.io/civi/images/u1.png"
                />
                <meta
                    name="twitter:image:alt"
                    content="Bilal Arslan - Senior Software Developer"
                />

                {/* Additional SEO Meta Tags */}
                <meta
                    name="theme-color"
                    content="#1a1a1a"
                />
                <meta
                    name="msapplication-TileColor"
                    content="#1a1a1a"
                />
                <meta
                    name="format-detection"
                    content="telephone=no"
                />

                {/* Structured Data (JSON-LD) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Bilal Arslan",
                            jobTitle: "Senior Software Developer",
                            description:
                                "Experienced Software Engineer with over 10 years at the same company, specializing in .NET, C#, React, TypeScript, and Azure technologies.",
                            url: "https://bilalarslan11.github.io/civi/",
                            image: "https://bilalarslan11.github.io/civi/images/u1.png",
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Copenhagen",
                                addressCountry: "Denmark",
                            },
                            knowsAbout: [
                                ".NET Framework",
                                "C# Programming",
                                "React",
                                "TypeScript",
                                "Angular",
                                "Azure Cloud Services",
                                "Kubernetes",
                                "Microsoft Dynamics 365",
                                "HTML5",
                                "CSS3",
                                "JavaScript",
                                "Unity Game Development",
                                "Software Architecture",
                                "Full Stack Development",
                            ],
                            alumniOf: "DTU (Technical University of Denmark)",
                            workLocation: "Copenhagen, Denmark",
                            seeks: {
                                "@type": "JobPosting",
                                title: "Senior Software Developer Position",
                                description:
                                    "Seeking opportunities as a Senior Software Developer in Copenhagen",
                            },
                        }),
                    }}
                />
            </Head>
            <div className="overflow-x-hidden">
                <div>
                    <MobileNav
                        nav={nav}
                        closeNav={closeNav}
                        scrollToSection={scrollToSection}
                    />
                    <Nav
                        openNav={openNav}
                        scrollToSection={scrollToSection}
                    />
                    <main>
                        <section
                            id="home"
                            aria-label="Hero Section"
                        >
                            <Hero />
                        </section>
                        <div className="relative z-[30]">
                            <section
                                id="about"
                                aria-label="About Me"
                            >
                                <About />
                            </section>
                            <section
                                id="focus"
                                aria-label="Focus Areas"
                            >
                                <Services />
                            </section>
                            <section
                                id="xp"
                                aria-label="Experience and Skills"
                            >
                                <Skills />
                            </section>
                            <section
                                id="contact"
                                aria-label="Contact Information"
                            >
                                <Contact />
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default HomePage;
