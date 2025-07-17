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
    const [filterType, setFilterType] = useState<"Company" | "Year" | "Genre">(
        "Company"
    );
    const [selectedFilter, setSelectedFilter] = useState<string>("All");

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

    // Get unique companies for filter dropdown
    const getUniqueCompanies = (games: Game[]): string[] => {
        const companies = new Set<string>();
        games.forEach((game) => {
            if (game.company && game.company.trim() !== "") {
                // Handle companies that might have multiple names like "Nintendo / Game Freak"
                const mainCompany = game.company.split("/")[0].trim();
                companies.add(mainCompany);
            }
        });
        return Array.from(companies).sort((a, b) => a.localeCompare(b));
    };

    // Get unique years for filter dropdown
    const getUniqueYears = (games: Game[]): string[] => {
        const years = new Set<string>();
        games.forEach((game) => {
            if (game.year && game.year.trim() !== "") {
                years.add(game.year.trim());
            }
        });
        return Array.from(years).sort((a, b) => b.localeCompare(a)); // Newest first
    };

    // Get unique genres for filter dropdown
    const getUniqueGenres = (games: Game[]): string[] => {
        const genres = new Set<string>();
        games.forEach((game) => {
            if (game.genre && game.genre.trim() !== "") {
                genres.add(game.genre.trim());
            }
        });
        return Array.from(genres).sort((a, b) => a.localeCompare(b));
    };

    // Get filter options based on filter type
    const getFilterOptions = (): string[] => {
        if (filterType === "Company") {
            return getUniqueCompanies(gamesFromCSV);
        } else if (filterType === "Year") {
            return getUniqueYears(gamesFromCSV);
        } else {
            return getUniqueGenres(gamesFromCSV);
        }
    };

    // Filter games based on selected filter type and value
    const filteredGames =
        selectedFilter === "All"
            ? gamesFromCSV
            : gamesFromCSV.filter((game) => {
                  if (filterType === "Company") {
                      if (!game.company) return false;
                      const mainCompany = game.company.split("/")[0].trim();
                      return mainCompany === selectedFilter;
                  } else if (filterType === "Year") {
                      if (!game.year) return false;
                      return game.year.trim() === selectedFilter;
                  } else {
                      // Genre
                      if (!game.genre) return false;
                      return game.genre.trim() === selectedFilter;
                  }
              });

    const filterOptions = getFilterOptions();
    const games: Game[] = filteredGames;

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

            {/* Filter Section */}
            <div
                style={{
                    width: "90%",
                    maxWidth: "112rem",
                    margin: "0 auto",
                    paddingBottom: "2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    {/* Filter Type Selector */}
                    <select
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(
                                e.target.value as "Company" | "Year" | "Genre"
                            );
                            setSelectedFilter("All"); // Reset filter when type changes
                        }}
                        style={{
                            padding: "0.5rem 1rem",
                            paddingRight: "2.5rem",
                            borderRadius: "0.375rem",
                            border: "2px solid #ef4444",
                            backgroundColor: "#7f1d1d",
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            outline: "none",
                            minWidth: "120px",
                            appearance: "none",
                            backgroundImage:
                                'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "0.75rem",
                        }}
                        className="hover:bg-theme-dark focus:border-theme-accent transition-all duration-200"
                    >
                        <option value="Company">Company</option>
                        <option value="Year">Year</option>
                        <option value="Genre">Genre</option>
                    </select>

                    <label
                        htmlFor="filter-dropdown"
                        style={{
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                    >
                        Filter by {filterType}:
                    </label>
                    <select
                        id="filter-dropdown"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        style={{
                            padding: "0.5rem 1rem",
                            paddingRight: "2.5rem",
                            borderRadius: "0.375rem",
                            border: "2px solid #ef4444",
                            backgroundColor: "#7f1d1d",
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            outline: "none",
                            minWidth: "150px",
                            appearance: "none",
                            backgroundImage:
                                'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "0.75rem",
                        }}
                        className="hover:bg-theme-dark focus:border-theme-accent transition-all duration-200"
                    >
                        <option value="All">
                            All{" "}
                            {(() => {
                                if (filterType === "Company")
                                    return "Companies";
                                if (filterType === "Year") return "Years";
                                return "Genres";
                            })()}
                        </option>
                        {filterOptions.map((option) => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                    {selectedFilter !== "All" && (
                        <span
                            style={{ color: "#d1d5db", fontSize: "0.875rem" }}
                        >
                            ({filteredGames.length} game
                            {filteredGames.length !== 1 ? "s" : ""})
                        </span>
                    )}
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
