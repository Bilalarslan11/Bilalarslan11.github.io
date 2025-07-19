import GameFilter from "@/Components/Gaming/GameFilter";
import GamingPageLayout from "@/Components/Gaming/GamingPageLayout";
import GamesList from "@/Components/Gaming/GamesList";
import { Game } from "@/models/Game";
import { loadGameData } from "@/utils/gameDataParser";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
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
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);

    useEffect(() => {
        const loadGames = async () => {
            const games = await loadGameData({
                csvFileName: "salihgames2.csv",
                useNewFormat: true,
            });
            setGamesFromCSV(games);
        };

        const loadStatuses = () => {
            try {
                const statuses = loadGameStatuses();
                setGameStatuses(statuses);
            } catch (error) {
                console.error("Error loading game statuses:", error);
            }
        };

        loadGames();
        loadStatuses();
    }, []);

    const refreshStatuses = () => {
        try {
            const statuses = loadGameStatuses();
            setGameStatuses(statuses);
        } catch (error) {
            console.error("Error refreshing game statuses:", error);
        }
    };

    const handleFilterChange = (filtered: Game[]) => {
        setFilteredGames(filtered);
    };

    return (
        <GamingPageLayout
            nav={nav}
            openNav={openNav}
            closeNav={closeNav}
            scrollToSection={scrollToSection}
        >
            <GameFilter
                games={gamesFromCSV}
                onFilterChange={handleFilterChange}
            />
            <GamesList
                games={filteredGames}
                gameStatuses={gameStatuses}
                onStatusUpdate={refreshStatuses}
            />
        </GamingPageLayout>
    );
};

export default Gaming;
