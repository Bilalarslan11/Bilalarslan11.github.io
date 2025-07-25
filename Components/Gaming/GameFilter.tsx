import { Game } from "@/models/Game";
import React, { useState, useEffect, useMemo } from "react";

interface GameFilterProps {
    games: Game[];
    onFilterChange: (filteredGames: Game[]) => void;
}

interface Filters {
    company: string[];
    year: string[];
    console: string[];
}

const GameFilter: React.FC<GameFilterProps> = ({ games, onFilterChange }) => {
    const [showFilterPopover, setShowFilterPopover] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        company: [],
        year: [],
        console: [],
    });

    // Get unique companies for filter dropdown
    const getUniqueCompanies = (games: Game[]): string[] => {
        const companies = new Set<string>();
        games.forEach((game) => {
            if (game.company && game.company.trim() !== "") {
                // Split by '/' and add all companies, not just the first one
                const allCompanies = game.company
                    .split("/")
                    .map((c) => c.trim());
                allCompanies.forEach((company) => {
                    if (company !== "") {
                        companies.add(company);
                    }
                });
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
            // Filter by company (OR logic if multiple selected)
            if (filters.company.length > 0) {
                if (!game.company) return false;
                // Split the company field by '/' and check if any of the companies match the filter
                const gameCompanies = game.company
                    .split("/")
                    .map((c) => c.trim());
                const hasMatchingCompany = gameCompanies.some((company) =>
                    filters.company.includes(company)
                );
                if (!hasMatchingCompany) return false;
            }

            // Filter by year (OR logic if multiple selected)
            if (filters.year.length > 0) {
                if (!game.year) return false;
                if (!filters.year.includes(game.year.trim())) return false;
            }

            // Filter by console (OR logic if multiple selected)
            if (filters.console.length > 0) {
                if (!game.console) return false;
                if (!filters.console.includes(game.console.trim()))
                    return false;
            }

            return true;
        });
    }, [games, filters.company, filters.year, filters.console]);

    // Notify parent when filtered games change
    useEffect(() => {
        onFilterChange(filteredGames);
    }, [filteredGames, onFilterChange]);

    const hasActiveFilters =
        filters.company.length > 0 ||
        filters.year.length > 0 ||
        filters.console.length > 0;

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
                            <div
                                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                                onClick={() => setShowFilterPopover(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setShowFilterPopover(false);
                                    }
                                }}
                            >
                                {/* Popover Content */}
                                <div
                                    className="bg-[#1a1a1a] border-2 border-[#ef4444] p-4 rounded-lg shadow-2xl max-w-xs w-full mx-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
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
                                                multiple
                                                value={filters.company}
                                                onChange={(e) => {
                                                    const values = Array.from(
                                                        e.target
                                                            .selectedOptions,
                                                        (option) => option.value
                                                    );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        company: values,
                                                    }));
                                                }}
                                                className="gaming-filter-select-multiple"
                                                size={3}
                                            >
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
                                                className="gaming-filter-field-label"
                                            >
                                                Year:
                                            </label>
                                            <select
                                                id="popover-year-filter"
                                                multiple
                                                value={filters.year}
                                                onChange={(e) => {
                                                    const values = Array.from(
                                                        e.target
                                                            .selectedOptions,
                                                        (option) => option.value
                                                    );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        year: values,
                                                    }));
                                                }}
                                                className="gaming-filter-select-multiple"
                                                size={3}
                                            >
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
                                                multiple
                                                value={filters.console}
                                                onChange={(e) => {
                                                    const values = Array.from(
                                                        e.target
                                                            .selectedOptions,
                                                        (option) => option.value
                                                    );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        console: values,
                                                    }));
                                                }}
                                                className="gaming-filter-select-multiple"
                                                size={3}
                                            >
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
                                        {hasActiveFilters && (
                                            <div className="gaming-filter-clear-section">
                                                <button
                                                    onClick={() => {
                                                        setFilters({
                                                            company: [],
                                                            year: [],
                                                            console: [],
                                                        });
                                                        setShowFilterPopover(
                                                            false
                                                        );
                                                    }}
                                                    className="gaming-filter-clear-button hover:bg-gray-600"
                                                >
                                                    Clear All Filters
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
