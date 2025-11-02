import GameFilter from "@/Components/Gaming/GameFilter";
import GamesList from "@/Components/Gaming/GamesList";
import GamingPageLayout from "@/Components/Gaming/GamingPageLayout";
import { Game } from "@/models/Game";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
import { upgradeImageUrl } from "@/utils/imageUtils";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";

interface GamesPageProps {
    initialGames: Game[];
    initialError?: string;
    builtAt: string; // ISO timestamp for transparency
}

const Gaming = ({ initialGames, initialError, builtAt }: GamesPageProps) => {
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
    const [isLiveUpdating, setIsLiveUpdating] = useState(false);

    // After mount, do a client-side refresh to get the absolute latest ordering
    // (static export can't revalidate automatically). This will replace the
    // static snapshot if the API order changed since build.
    useEffect(() => {
        if (error) return; // don't attempt if initial build failed
        let aborted = false;
        (async () => {
            try {
                setIsLiveUpdating(true);
                const res = await fetch(
                    "/api/games/top-rated",
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error(`live fetch ${res.status}`);
                const json = await res.json();
                let raw: unknown = json;
                if (!Array.isArray(raw)) {
                    const maybeObj =
                        typeof json === "object" && json !== null
                            ? (json as { games?: unknown[] })
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
                const liveGames: Game[] = (raw as RawGame[]).map((g, idx) => {
                    let coverUrl = "/gamepictures/placeholder.png";
                    if (g.cover?.url) {
                        coverUrl = upgradeImageUrl(g.cover.url);
                    }
                    return {
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
                });
                if (!aborted) {
                    setFilteredGames(liveGames);
                }
            } catch (e) {
                if (!aborted) {
                    console.warn("Live update failed", e);
                }
            } finally {
                if (!aborted) setIsLiveUpdating(false);
            }
        })();
        return () => {
            aborted = true;
        };
    }, [error]);

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
                            (Static build fetch failed)
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
                    valueLabel="/ 100"
                />
            )}
            {!error && (
                <div className="w-[90%] max-w-[112rem] mx-auto mt-4 text-right text-[10px] text-gray-400">
                    <span>
                        Built at {new Date(builtAt).toLocaleString()} ·{" "}
                        {isLiveUpdating ? "Refreshing…" : "Live order loaded"}
                    </span>
                </div>
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
        let raw: unknown = json;
        if (!Array.isArray(raw)) {
            const maybeObj =
                typeof json === "object" && json !== null
                    ? (json as { games?: unknown[] })
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
                coverUrl = upgradeImageUrl(g.cover.url);
            }
            return {
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
        });
        return {
            props: {
                initialGames: normalized,
                builtAt: new Date().toISOString(),
            },
        };
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return {
            props: {
                initialGames: [],
                initialError: msg,
                builtAt: new Date().toISOString(),
            },
        };
    }
};
