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
        <div className="w-[90%] max-w-[112rem] mx-auto pb-8">
            <div className="flex justify-between items-center gap-3 flex-wrap">
                {/* Results Counter - Left Side */}
                <div className="min-w-fit">
                    {hasActiveFilters && (
                        <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
                            ({filteredGames.length} game
                            {filteredGames.length !== 1 ? "s" : ""})
                        </span>
                    )}
                </div>

                {/* Filter Icon and Popover */}
                <div className="relative inline-block">
                    <button
                        onClick={() => setShowFilterPopover(!showFilterPopover)}
                        className="p-2 rounded-md border-2 border-theme-secondary bg-theme-darker text-white text-base font-medium cursor-pointer outline-none transition-all flex items-center gap-2 hover:bg-theme-dark focus:border-theme-accent"
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
                            <span className="w-2 h-2 rounded-full bg-theme-secondary ml-1" />
                        )}
                    </button>

                    {/* Filter Popover */}
                    {showFilterPopover && (
                        <>
                            {/* Backdrop */}
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                                {/* Popover Content */}
                                <dialog
                                    open
                                    className="bg-transparent p-0 border-0 m-0"
                                >
                                    <div className="bg-[#1a1a1a] border-2 border-[#ef4444] p-4 rounded-lg shadow-2xl max-w-xs w-full mx-2">
                                        <div className="flex flex-col gap-4">
                                            {/* Popover Header */}
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-white text-base font-semibold m-0">
                                                    Filter Games
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        setShowFilterPopover(
                                                            false
                                                        )
                                                    }
                                                    className="bg-transparent border-none text-gray-300 text-xl cursor-pointer p-1"
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            {/* Company Filter */}
                                            <div>
                                                <label
                                                    htmlFor="popover-company-filter"
                                                    className="block text-white text-sm font-medium mb-2"
                                                >
                                                    Company:
                                                </label>
                                                <select
                                                    id="popover-company-filter"
                                                    multiple
                                                    value={filters.company}
                                                    onChange={(e) => {
                                                        const values =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                                (option) =>
                                                                    option.value
                                                            );
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            company: values,
                                                        }));
                                                    }}
                                                    className="w-full p-1.5 rounded-md border-2 border-theme-secondary bg-gray-800 text-white text-xs cursor-pointer outline-none min-h-[90px] max-h-[100px] overflow-y-auto"
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
                                                    className="block text-white text-sm font-medium mb-2"
                                                >
                                                    Year:
                                                </label>
                                                <select
                                                    id="popover-year-filter"
                                                    multiple
                                                    value={filters.year}
                                                    onChange={(e) => {
                                                        const values =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                                (option) =>
                                                                    option.value
                                                            );
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            year: values,
                                                        }));
                                                    }}
                                                    className="w-full p-1.5 rounded-md border-2 border-theme-secondary bg-gray-800 text-white text-xs cursor-pointer outline-none min-h-[90px] max-h-[100px] overflow-y-auto"
                                                    size={3}
                                                >
                                                    {getFilterOptions(
                                                        "Year"
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

                                            {/* Console Filter */}
                                            <div>
                                                <label
                                                    htmlFor="popover-console-filter"
                                                    className="block text-white text-sm font-medium mb-2"
                                                >
                                                    Console:
                                                </label>
                                                <select
                                                    id="popover-console-filter"
                                                    multiple
                                                    value={filters.console}
                                                    onChange={(e) => {
                                                        const values =
                                                            Array.from(
                                                                e.target
                                                                    .selectedOptions,
                                                                (option) =>
                                                                    option.value
                                                            );
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            console: values,
                                                        }));
                                                    }}
                                                    className="w-full p-1.5 rounded-md border-2 border-theme-secondary bg-gray-800 text-white text-xs cursor-pointer outline-none min-h-[90px] max-h-[100px] overflow-y-auto"
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
                                                <div className="pt-2 border-t border-gray-700">
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
                                                        className="w-full p-2 rounded-md border border-gray-500 bg-gray-700 text-white text-sm font-medium cursor-pointer outline-none transition-all hover:bg-gray-600"
                                                    >
                                                        Clear All Filters
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameFilter;
