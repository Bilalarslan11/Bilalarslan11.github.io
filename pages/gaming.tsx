import GameCard from "@/Components/GameCard";
import MobileNav from "@/Components/MobileNav";
import Nav from "@/Components/Nav";
import { Game } from "@/models/Game";
import { loadGameData } from "@/utils/gameDataParser";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useMemo } from "react";

const Gaming = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    const scrollToSection = () => {
        closeNav();
    };

    const [gamesFromCSV, setGamesFromCSV] = useState<Game[]>([]);
    const [gameStatuses, setGameStatuses] = useState<GameStatusEntry[]>([]);
    const [showFilterPopover, setShowFilterPopover] = useState(false);
    const [filters, setFilters] = useState({
        company: "All",
        year: "All",
        console: "All",
    });

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

    // Get unique consoles for filter dropdown
    const getUniqueConsoles = (games: Game[]): string[] => {
        const consoles = new Set<string>();
        games.forEach((game) => {
            if (game.console && game.console.trim() !== "") {
                consoles.add(game.console.trim());
            }
        });
        return Array.from(consoles).sort((a, b) => a.localeCompare(b));
    };

    // Get filter options based on filter type
    const getFilterOptions = (
        filterType: "Company" | "Year" | "Console"
    ): string[] => {
        if (filterType === "Company") {
            return getUniqueCompanies(gamesFromCSV);
        } else if (filterType === "Year") {
            return getUniqueYears(gamesFromCSV);
        } else {
            return getUniqueConsoles(gamesFromCSV);
        }
    };

    // Filter games based on multiple filters using useMemo for performance
    const filteredGames = useMemo(() => {
        return gamesFromCSV.filter((game) => {
            // Filter by company
            if (filters.company !== "All") {
                if (!game.company) return false;
                const mainCompany = game.company.split("/")[0].trim();
                if (mainCompany !== filters.company) return false;
            }

            // Filter by year
            if (filters.year !== "All") {
                if (!game.year) return false;
                if (game.year.trim() !== filters.year) return false;
            }

            // Filter by console
            if (filters.console !== "All") {
                if (!game.console) return false;
                if (game.console.trim() !== filters.console) return false;
            }

            return true;
        });
    }, [gamesFromCSV, filters.company, filters.year, filters.console]);

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

            {/* Multi-Filter Section */}
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Results Counter - Left Side */}
                    <div style={{ minWidth: "fit-content" }}>
                        {(filters.company !== "All" ||
                            filters.year !== "All" ||
                            filters.console !== "All") && (
                            <span
                                style={{
                                    color: "#d1d5db",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                ({filteredGames.length} game
                                {filteredGames.length !== 1 ? "s" : ""})
                            </span>
                        )}
                    </div>

                    {/* Filter Icon and Popover */}
                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <button
                            onClick={() =>
                                setShowFilterPopover(!showFilterPopover)
                            }
                            style={{
                                padding: "0.5rem",
                                borderRadius: "0.375rem",
                                border: "2px solid #ef4444",
                                backgroundColor: "#7f1d1d",
                                color: "#ffffff",
                                fontSize: "1rem",
                                fontWeight: "500",
                                cursor: "pointer",
                                outline: "none",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                            className="hover:bg-theme-dark focus:border-theme-accent"
                        >
                            {/* Filter Icon */}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
                            </svg>
                            Filter
                            {/* Active filter indicator */}
                            {(filters.company !== "All" ||
                                filters.year !== "All" ||
                                filters.console !== "All") && (
                                <span
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ef4444",
                                        marginLeft: "0.25rem",
                                    }}
                                />
                            )}
                        </button>

                        {/* Filter Popover */}
                        {showFilterPopover && (
                            <>
                                {/* Backdrop */}
                                <button
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        zIndex: 40,
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowFilterPopover(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setShowFilterPopover(false);
                                        }
                                    }}
                                    aria-label="Close filter popover"
                                />

                                {/* Popover Content */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "calc(100% + 0.5rem)",
                                        right: 0,
                                        minWidth: "300px",
                                        backgroundColor: "#1a1a1a",
                                        border: "2px solid #ef4444",
                                        borderRadius: "0.5rem",
                                        boxShadow:
                                            "0 10px 25px rgba(0, 0, 0, 0.5)",
                                        zIndex: 50,
                                        padding: "1rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1rem",
                                        }}
                                    >
                                        {/* Popover Header */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    color: "#ffffff",
                                                    fontSize: "1rem",
                                                    fontWeight: "600",
                                                    margin: 0,
                                                }}
                                            >
                                                Filter Games
                                            </h3>
                                            <button
                                                onClick={() =>
                                                    setShowFilterPopover(false)
                                                }
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#d1d5db",
                                                    fontSize: "1.25rem",
                                                    cursor: "pointer",
                                                    padding: "0.25rem",
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>

                                        {/* Company Filter */}
                                        <div>
                                            <label
                                                htmlFor="popover-company-filter"
                                                style={{
                                                    display: "block",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                Company:
                                            </label>
                                            <select
                                                id="popover-company-filter"
                                                value={filters.company}
                                                onChange={(e) => {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        company: e.target.value,
                                                    }));
                                                    setShowFilterPopover(false);
                                                }}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.5rem",
                                                    paddingRight: "2.5rem",
                                                    borderRadius: "0.375rem",
                                                    border: "2px solid #ef4444",
                                                    backgroundColor: "#7f1d1d",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                    appearance: "none",
                                                    backgroundImage:
                                                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right 0.75rem center",
                                                    backgroundSize: "0.75rem",
                                                }}
                                            >
                                                <option value="All">
                                                    All Companies
                                                </option>
                                                {getFilterOptions(
                                                    "Company"
                                                ).map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Year Filter */}
                                        <div>
                                            <label
                                                htmlFor="popover-year-filter"
                                                style={{
                                                    display: "block",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                Year:
                                            </label>
                                            <select
                                                id="popover-year-filter"
                                                value={filters.year}
                                                onChange={(e) => {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        year: e.target.value,
                                                    }));
                                                    setShowFilterPopover(false);
                                                }}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.5rem",
                                                    paddingRight: "2.5rem",
                                                    borderRadius: "0.375rem",
                                                    border: "2px solid #ef4444",
                                                    backgroundColor: "#7f1d1d",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                    appearance: "none",
                                                    backgroundImage:
                                                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right 0.75rem center",
                                                    backgroundSize: "0.75rem",
                                                }}
                                            >
                                                <option value="All">
                                                    All Years
                                                </option>
                                                {getFilterOptions("Year").map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        {/* Console Filter */}
                                        <div>
                                            <label
                                                htmlFor="popover-console-filter"
                                                style={{
                                                    display: "block",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                Console:
                                            </label>
                                            <select
                                                id="popover-console-filter"
                                                value={filters.console}
                                                onChange={(e) => {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        console: e.target.value,
                                                    }));
                                                    setShowFilterPopover(false);
                                                }}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.5rem",
                                                    paddingRight: "2.5rem",
                                                    borderRadius: "0.375rem",
                                                    border: "2px solid #ef4444",
                                                    backgroundColor: "#7f1d1d",
                                                    color: "#ffffff",
                                                    fontSize: "0.875rem",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                    appearance: "none",
                                                    backgroundImage:
                                                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundPosition:
                                                        "right 0.75rem center",
                                                    backgroundSize: "0.75rem",
                                                }}
                                            >
                                                <option value="All">
                                                    All Consoles
                                                </option>
                                                {getFilterOptions(
                                                    "Console"
                                                ).map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Clear All Button */}
                                        {(filters.company !== "All" ||
                                            filters.year !== "All" ||
                                            filters.console !== "All") && (
                                            <div
                                                style={{
                                                    paddingTop: "0.5rem",
                                                    borderTop:
                                                        "1px solid #374151",
                                                }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setFilters({
                                                            company: "All",
                                                            year: "All",
                                                            console: "All",
                                                        });
                                                        setShowFilterPopover(
                                                            false
                                                        );
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        padding: "0.5rem",
                                                        borderRadius:
                                                            "0.375rem",
                                                        border: "1px solid #6b7280",
                                                        backgroundColor:
                                                            "#374151",
                                                        color: "#ffffff",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "500",
                                                        cursor: "pointer",
                                                        outline: "none",
                                                        transition: "all 0.2s",
                                                    }}
                                                    className="hover:bg-gray-600"
                                                >
                                                    Clear All Filters
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
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
