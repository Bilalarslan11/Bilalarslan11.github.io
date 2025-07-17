import GameCard from "@/Components/GameCard";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import { Game } from "@/models/Game";
import { loadGameData } from "@/utils/gameDataParser";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

const Gaming = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    const [gamesFromCSV, setGamesFromCSV] = useState<Game[]>([]);
    const [gameStatuses, setGameStatuses] = useState<GameStatusEntry[]>([]);

    useEffect(() => {
        const loadGames = async () => {
            const games = await loadGameData({
                csvFileName: "salihgames2.csv",
                useNewFormat: true,
            });
            setGamesFromCSV(games);
        };

        const loadStatuses = async () => {
            try {
                const statuses = await loadGameStatuses();
                setGameStatuses(statuses);
            } catch (error) {
                console.error("Error loading game statuses:", error);
            }
        };

        loadGames();
        loadStatuses();
    }, []);

    const refreshStatuses = async () => {
        try {
            const statuses = await loadGameStatuses();
            setGameStatuses(statuses);
        } catch (error) {
            console.error("Error refreshing game statuses:", error);
        }
    };

    const games: Game[] = gamesFromCSV;

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
                            marginTop: "3rem",
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
                            gameStatuses={gameStatuses}
                            onStatusUpdate={refreshStatuses}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gaming;
