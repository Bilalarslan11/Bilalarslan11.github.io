import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/models/Game";
import { loadGameData } from "@/utils/gameDataParser";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";

const GameDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [nav, setNav] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        console: "",
        producer: "",
        rating: 0,
        hours: 0,
        lastUpdated: "",
        year: "",
        originConsole: "",
        originYear: "",
        genre: "",
        company: "",
        credits: "",
        hundredPercent: "",
        dlc: "",
    });

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    useEffect(() => {
        if (!id) return;

        const loadGameDetails = async () => {
            try {
                // Use the new format (salihgames2.csv) to match the main gaming page
                const parsedGames = await loadGameData({
                    csvFileName: "salihgames2.csv",
                    useNewFormat: true,
                });

                const foundGame = parsedGames.find(
                    (g) => g.id === parseInt(id as string)
                );
                setGame(foundGame || null);

                if (foundGame) {
                    setFormData({
                        console: foundGame.console || "",
                        producer: foundGame.producer || "",
                        rating: foundGame.rating || 0,
                        hours: foundGame.hours || 0,
                        lastUpdated: "",
                        year: foundGame.year || "",
                        originConsole: foundGame.originConsole || "",
                        originYear: foundGame.originYear || "",
                        genre: foundGame.genre || "",
                        company: foundGame.company || "",
                        credits: foundGame.credits || "",
                        hundredPercent: foundGame.hundredPercent || "",
                        dlc: foundGame.dlc || "",
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading CSV:", error);
                setLoading(false);
            }
        };

        loadGameDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="overflow-x-hidden bg-theme-primary min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-theme-text text-2xl">Loading...</div>
                </div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="overflow-x-hidden bg-theme-primary min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-theme-text text-2xl">
                        Game not found
                    </div>
                    <Link
                        href="/gaming"
                        className="text-theme-secondary ml-4 underline"
                    >
                        Back to Gaming Library
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden bg-theme-darker min-h-screen">
            <MobileNav
                nav={nav}
                closeNav={closeNav}
                scrollToSection={scrollToSection}
            />
            <Nav
                openNav={openNav}
                scrollToSection={scrollToSection}
            />

            <div className="pt-32 pb-16">
                <div className="w-[90%] max-w-7xl mx-auto">
                    {/* Back button */}
                    <Link
                        href="/gaming"
                        className="inline-flex items-center text-theme-secondary hover:text-theme-accent mb-8 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Gaming Library
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {/* Left side - Game Image */}
                        <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col items-center">
                            <div className="relative w-56 h-56 rounded-lg overflow-hidden shadow-2xl">
                                {game.image.startsWith('http') ? (
                                    // Use regular img tag for external URLs to avoid CORS issues
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="text-theme-text-secondary text-lg mt-4 text-center">
                                <p className="mb-1">Rank #{game.rank}</p>
                                <p>Hours: {game.hours}</p>
                            </div>
                        </div>

                        {/* Right side - Game Title and Form */}
                        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 space-y-8">
                            {/* Game Title */}
                            <div>
                                <h1 className="text-4xl font-bold text-theme-text mb-2">
                                    {game.title}
                                </h1>
                            </div>

                            {/* Game Details Display */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Console:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.console || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Year:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.year || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Origin Console:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.originConsole || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Origin Year:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.originYear || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Genre:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.genre || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Company:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.company || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Credits:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.credits || "\u00A0"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            100%:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.hundredPercent ||
                                                "\u00A0"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            DLC:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600 min-h-[3rem]">
                                            {formData.dlc || "\u00A0"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
