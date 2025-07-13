import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/models/Game";
import Papa from "papaparse";
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
        platforms: "",
        genres: "",
        developer: "",
        publisher: "",
        naReleaseDate: "",
        euReleaseDate: "",
        jpReleaseDate: "",
        lastUpdated: "",
    });

    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    const parseGameData = (csvData: string) => {
        return new Promise<Game[]>((resolve) => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (
                    results: Papa.ParseResult<Record<string, string>>
                ) => {
                    const parsedGames: Game[] = results.data
                        .map((row: Record<string, string>, index: number) => ({
                            id: index + 1,
                            title: row["Game:"] || "",
                            producer: row["Company"] || "",
                            hours: parseInt(row["Jul/24"] || "0", 10),
                            rank: parseInt(
                                (row["Rank"] || "0").replace(/\D/g, ""),
                                10
                            ),
                            image:
                                "https://picsum.photos/400/400?random=" + index,
                            rating:
                                Math.round((Math.random() * 2 + 8) * 10) / 10,
                        }))
                        .filter((game) => game.title && game.rank);
                    resolve(parsedGames);
                },
            });
        });
    };

    useEffect(() => {
        if (!id) return;

        const loadGameData = async () => {
            try {
                const response = await fetch("/salihgames.csv");
                const csvData = await response.text();
                const parsedGames = await parseGameData(csvData);

                const foundGame = parsedGames.find(
                    (g) => g.id === parseInt(id as string)
                );
                setGame(foundGame || null);

                if (foundGame) {
                    setFormData({
                        platforms: "PC, PlayStation 5, Xbox Series X/S",
                        genres: "Third-Person, Turn-Based, Action, Role-Playing",
                        developer: "Sandfall Interactive",
                        publisher: "Kepler Interactive",
                        naReleaseDate: "April 24th, 2025",
                        euReleaseDate: "April 24th, 2025",
                        jpReleaseDate: "April 24th, 2025",
                        lastUpdated: "25 Mins Ago",
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading CSV:", error);
                setLoading(false);
            }
        };

        loadGameData();
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
        <div className="overflow-x-hidden bg-theme-primary min-h-screen">
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

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left side - Game Image */}
                        <div className="lg:col-span-2 flex justify-end">
                            <div className="relative w-96 h-96 rounded-lg overflow-hidden shadow-2xl">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right side - Game Title and Form */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Game Title */}
                            <div>
                                <h1 className="text-4xl font-bold text-theme-text mb-2">
                                    {game.title}
                                </h1>
                                <p className="text-theme-text-secondary text-lg">
                                    Rank #{game.rank} • Rating: {game.rating}/10
                                </p>
                            </div>

                            {/* Game Details Display */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Platforms */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Platforms:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.platforms}
                                        </div>
                                    </div>

                                    {/* Genres */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Genres:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.genres}
                                        </div>
                                    </div>

                                    {/* Developer */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Developer:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.developer}
                                        </div>
                                    </div>

                                    {/* Publisher */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Publisher:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.publisher}
                                        </div>
                                    </div>

                                    {/* NA Release Date */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            NA:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.naReleaseDate}
                                        </div>
                                    </div>

                                    {/* EU Release Date */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            EU:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.euReleaseDate}
                                        </div>
                                    </div>

                                    {/* JP Release Date */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            JP:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.jpReleaseDate}
                                        </div>
                                    </div>

                                    {/* Last Updated */}
                                    <div>
                                        <div className="block text-theme-text font-semibold mb-2">
                                            Updated:
                                        </div>
                                        <div className="w-full p-3 rounded bg-gray-800 text-theme-text border border-gray-600">
                                            {formData.lastUpdated}
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
