import GameCard from "@/Components/GameCard";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import { Game } from "@/models/Game";
import Box from "@mui/material/Box";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";

const Gaming = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    const [gamesFromCSV, setGamesFromCSV] = useState<Game[]>([]);

    useEffect(() => {
        // Fetch CSV from public folder
        fetch("/salihgames.csv")
            .then((response) => response.text())
            .then((csvData) => {
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (
                        results: Papa.ParseResult<Record<string, string>>
                    ) => {
                        const parsedGames: Game[] = results.data
                            .map(
                                (
                                    row: Record<string, string>,
                                    index: number
                                ) => ({
                                    id: index + 1,
                                    title: row["Game:"] || "",
                                    producer: row["Company"] || "",
                                    hours: parseInt(row["Jul/24"] || "0", 10),
                                    rank: parseInt(
                                        (row["Rank"] || "0").replace(/\D/g, ""),
                                        10
                                    ),
                                    image:
                                        "https://picsum.photos/400/400?random=" +
                                        index,
                                    rating:
                                        Math.round(
                                            (Math.random() * 2 + 8) * 10
                                        ) / 10, // Random rating 8.0-10.0
                                })
                            )
                            .filter((game) => game.title && game.rank); // Filter out invalid entries

                        parsedGames.sort((a, b) => a.rank - b.rank);
                        setGamesFromCSV(parsedGames);
                    },
                });
            })
            .catch((error) => {
                console.error("Error loading CSV:", error);
            });
    }, []);

    const games: Game[] = gamesFromCSV;

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

            <Box></Box>

            <div style={{ paddingTop: "12vh", paddingBottom: "2rem" }}>
                <div style={{ width: "80%", margin: "0 auto" }}>
                    <h1
                        style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        GAMING <span style={{ color: "#ef4444" }}>LIBRARY</span>
                    </h1>
                    <p
                        style={{
                            color: "#d1d5db",
                            textAlign: "center",
                            fontSize: "1.125rem",
                        }}
                    >
                        My favorite gaming experiences
                    </p>
                </div>
            </div>
            <div
                style={{
                    width: "90%",
                    maxWidth: "112rem",
                    margin: "0 auto",
                    paddingBottom: "4rem",
                }}
            >
                <div className="games-grid">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gaming;
