import About from "@/Components/About";
import Contact from "@/Components/Contact";
import Hero from "@/Components/Hero";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import Services from "@/Components/Services";
import Skills from "@/Components/Skills";
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
                <section id="home">
                    <Hero />
                </section>
                <div className="relative z-[30]">
                    <section id="about">
                        <About />
                    </section>
                    <section id="focus">
                        <Services />
                    </section>
                    <section id="xp">
                        <Skills />
                    </section>
                    <section id="contact">
                        <Contact />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
