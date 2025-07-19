import { Game } from "@/models/Game";
import React, { useState, useEffect, useMemo } from "react";

interface GameFilterProps {
    games: Game[];
    onFilterChange: (filteredGames: Game[]) => void;
}

interface Filters {
    company: string;
    year: string;
    console: string;
}

const GameFilter: React.FC<GameFilterProps> = ({ games, onFilterChange }) => {
    const [showFilterPopover, setShowFilterPopover] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        company: "All",
        year: "All",
        console: "All",
    });

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
            return getUniqueCompanies(games);
        } else if (filterType === "Year") {
            return getUniqueYears(games);
        } else {
            return getUniqueConsoles(games);
        }
    };

    // Filter games based on multiple filters using useMemo for performance
    const filteredGames = useMemo(() => {
        return games.filter((game) => {
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
    }, [games, filters.company, filters.year, filters.console]);

    // Notify parent when filtered games change
    useEffect(() => {
        onFilterChange(filteredGames);
    }, [filteredGames, onFilterChange]);

    const hasActiveFilters =
        filters.company !== "All" ||
        filters.year !== "All" ||
        filters.console !== "All";

    return (
        <div className="gaming-filter-container">
            <div className="gaming-filter-flex">
                {/* Results Counter - Left Side */}
                <div className="gaming-filter-results">
                    {hasActiveFilters && (
                        <span className="gaming-filter-results-text">
                            ({filteredGames.length} game
                            {filteredGames.length !== 1 ? "s" : ""})
                        </span>
                    )}
                </div>

                {/* Filter Icon and Popover */}
                <div className="gaming-filter-button-container">
                    <button
                        onClick={() => setShowFilterPopover(!showFilterPopover)}
                        className="gaming-filter-button hover:bg-theme-dark focus:border-theme-accent"
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
                        {hasActiveFilters && (
                            <span className="gaming-filter-active-indicator" />
                        )}
                    </button>

                    {/* Filter Popover */}
                    {showFilterPopover && (
                        <>
                            {/* Backdrop */}
                            <button
                                className="gaming-filter-backdrop"
                                onClick={() => setShowFilterPopover(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setShowFilterPopover(false);
                                    }
                                }}
                                aria-label="Close filter popover"
                            />

                            {/* Popover Content */}
                            <div className="gaming-filter-popover">
                                <div className="gaming-filter-popover-content">
                                    {/* Popover Header */}
                                    <div className="gaming-filter-popover-header">
                                        <h3 className="gaming-filter-popover-title">
                                            Filter Games
                                        </h3>
                                        <button
                                            onClick={() =>
                                                setShowFilterPopover(false)
                                            }
                                            className="gaming-filter-close-button"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Company Filter */}
                                    <div>
                                        <label
                                            htmlFor="popover-company-filter"
                                            className="gaming-filter-field-label"
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
                                            className="gaming-filter-select"
                                        >
                                            <option value="All">
                                                All Companies
                                            </option>
                                            {getFilterOptions("Company").map(
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

                                    {/* Year Filter */}
                                    <div>
                                        <label
                                            htmlFor="popover-year-filter"
                                            className="gaming-filter-field-label"
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
                                            className="gaming-filter-select"
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
                                            className="gaming-filter-field-label"
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
                                            className="gaming-filter-select"
                                        >
                                            <option value="All">
                                                All Consoles
                                            </option>
                                            {getFilterOptions("Console").map(
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

                                    {/* Clear All Button */}
                                    {hasActiveFilters && (
                                        <div className="gaming-filter-clear-section">
                                            <button
                                                onClick={() => {
                                                    setFilters({
                                                        company: "All",
                                                        year: "All",
                                                        console: "All",
                                                    });
                                                    setShowFilterPopover(false);
                                                }}
                                                className="gaming-filter-clear-button hover:bg-gray-600"
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
    );
};

export default GameFilter;
