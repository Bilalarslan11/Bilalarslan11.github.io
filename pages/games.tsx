import GameFilter from "@/Components/Gaming/GameFilter";
import GamesList from "@/Components/Gaming/GamesList";
import GamingPageLayout from "@/Components/Gaming/GamingPageLayout";
import { Game } from "@/models/Game";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";

interface GamesPageProps {
    initialGames: Game[];
    initialError?: string;
}

const Gaming = ({ initialGames, initialError }: GamesPageProps) => {
    // Navigation state preserved from original layout usage
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);
    const scrollToSection = () => closeNav();

    // Game data & statuses
    const [gamesFromCSV] = useState<Game[]>(initialGames); // Static for this page lifecycle
    const [gameStatuses, setGameStatuses] = useState<GameStatusEntry[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>(initialGames);
    const [error] = useState<string | null>(initialError ?? null);

    useEffect(() => {
        // Load statuses from localStorage
        try {
            const statuses = loadGameStatuses();
            setGameStatuses(statuses);
        } catch (err) {
            console.error("Error loading game statuses:", err);
        }
    }, []);

    const refreshStatuses = () => {
        try {
            const statuses = loadGameStatuses();
            setGameStatuses(statuses);
        } catch (err) {
            console.error("Error refreshing game statuses:", err);
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
            {error && (
                <div
                    className="w-[90%] max-w-[112rem] mx-auto mb-6"
                    role="alert"
                >
                    <div className="p-4 rounded border-2 border-theme-secondary bg-theme-darker">
                        <p className="text-theme-secondary font-bold mb-2">
                            Failed to load games
                        </p>
                        <p className="text-theme-text text-sm break-words mb-4">
                            {error}
                        </p>
                        <p className="text-theme-text text-xs opacity-70">
                            (Data attempted to be fetched during build via
                            getStaticProps.)
                        </p>
                    </div>
                </div>
            )}
            {!error && gamesFromCSV.length > 0 && (
                <GameFilter
                    games={gamesFromCSV}
                    onFilterChange={handleFilterChange}
                />
            )}
            {!error && (
                <GamesList
                    games={filteredGames}
                    gameStatuses={gameStatuses}
                    onStatusUpdate={refreshStatuses}
                />
            )}
        </GamingPageLayout>
    );
};

export default Gaming;

export const getStaticProps: GetStaticProps<GamesPageProps> = async () => {
    try {
        const res = await fetch("https://api.zehai.dk/api/games/top-rated");
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const json = await res.json();

        // API shape: { meta: {...}, games: [...] }
        let raw: unknown = json;
        if (!Array.isArray(raw)) {
            interface WithGames {
                games?: unknown[];
            }
            const maybeObj: WithGames | null =
                typeof json === "object" && json !== null
                    ? (json as WithGames)
                    : null;
            raw = Array.isArray(maybeObj?.games) ? maybeObj.games : [];
        }

        type RawGame = {
            id?: number;
            name?: string;
            rating?: number;
            weightedRating?: number;
            cover?: { url?: string };
        };

        const normalized: Game[] = (raw as RawGame[]).map((g, idx) => {
            let coverUrl = "/gamepictures/placeholder.png";
            if (g.cover?.url) {
                coverUrl = g.cover.url.startsWith("//")
                    ? `https:${g.cover.url}`
                    : g.cover.url;
            }
            const game: Game = {
                id: g.id ?? idx + 1,
                rank: idx + 1,
                title: g.name ?? "Untitled",
                producer: "",
                hours: Math.round(g.rating ?? 0),
                image: coverUrl,
                rating: Number(g.weightedRating ?? g.rating ?? 0),
                console: "",
                year: "",
                genre: "",
                company: "",
                credits: "",
                hundredPercent: "",
                dlc: "",
            };
            return game;
        });

        return { props: { initialGames: normalized } };
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { props: { initialGames: [], initialError: msg } };
    }
};
