import GameFilter from "@/Components/Gaming/GameFilter";
import GamesList from "@/Components/Gaming/GamesList";
import GamingPageLayout from "@/Components/Gaming/GamingPageLayout";
import { Game } from "@/models/Game";
import { GameStatusEntry, loadGameStatuses } from "@/utils/gameStatusManager";
import { upgradeImageUrl } from "@/utils/imageUtils";
import { useEffect, useState } from "react";

const Gaming = () =>
{
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);
    const scrollToSection = () => closeNav();

    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [gameStatuses, setGameStatuses] = useState<GameStatusEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [fetchedAt, setFetchedAt] = useState<string>("");

    useEffect(() => {
        try {
            const statuses = loadGameStatuses();
            setGameStatuses(statuses);
        } catch (err) {
            console.error("Error loading game statuses:", err);
        }
    }, []);

    useEffect(() =>
    {
        let cancelled = false;
        (async () =>
        {
            try
            {
                const res = await fetch("https://api.zehai.dk/games/top-rated", {
                    cache: "no-store",
                    mode: "cors",
                    credentials: "omit"
                });
                if (!res.ok)
                {
                    throw new Error(`API responded ${res.status}`);
                }
                const json = await res.json();
                let raw: unknown = json;
                if (!Array.isArray(raw))
                {
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
                    cover?: { url?: string } | string;
                };
                const normalized: Game[] = (raw as RawGame[]).map((g, idx) =>
                {
                    let coverUrl = "/gamepictures/placeholder.png";
                    let coverUrlValue: string | undefined;
                    if (typeof g.cover === "string")
                    {
                        coverUrlValue = g.cover;
                    }
                    else if (g.cover && typeof g.cover === "object" && "url" in g.cover)
                    {
                        coverUrlValue = (g.cover as { url?: string }).url;
                    }
                    if (coverUrlValue && coverUrlValue.trim() !== "")
                    {
                        const upgraded = upgradeImageUrl(coverUrlValue);
                        if (upgraded && upgraded.trim() !== "")
                        {
                            coverUrl = upgraded;
                        }
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
                if (!cancelled)
                {
                    setGames(normalized);
                    setFilteredGames(normalized);
                    setFetchedAt(new Date().toISOString());
                    setError(null);
                }
            }
            catch (e)
            {
                if (!cancelled)
                {
                    try
                    {
                        const backupRes = await fetch("/backupList.json", {
                            cache: "no-store"
                        });
                        if (!backupRes.ok)
                        {
                            throw new Error(`Backup responded ${backupRes.status}`);
                        }
                        const backupJson = await backupRes.json();
                        const raw = Array.isArray(backupJson)
                            ? backupJson
                            : Array.isArray(backupJson?.games)
                                ? (backupJson.games as unknown[])
                                : [];
                        type RawGame = {
                            id?: number;
                            name?: string;
                            rating?: number;
                            weightedRating?: number;
                            cover?: { url?: string } | string;
                        };
                        const normalized: Game[] = (raw as RawGame[]).map((g, idx) =>
                        {
                            let coverUrl = "/gamepictures/placeholder.png";
                            let coverUrlValue: string | undefined;
                            if (typeof g.cover === "string")
                            {
                                coverUrlValue = g.cover;
                            }
                            else if (g.cover && typeof g.cover === "object" && "url" in g.cover)
                            {
                                coverUrlValue = (g.cover as { url?: string }).url;
                            }
                            if (coverUrlValue && coverUrlValue.trim() !== "")
                            {
                                const upgraded = upgradeImageUrl(coverUrlValue);
                                if (upgraded && upgraded.trim() !== "")
                                {
                                    coverUrl = upgraded;
                                }
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
                        setGames(normalized);
                        setFilteredGames(normalized);
                        setFetchedAt(new Date().toISOString());
                        setError(null);
                    }
                    catch
                    {
                        const msg = e instanceof Error ? e.message : String(e);
                        setError(msg);
                        setGames([]);
                        setFilteredGames([]);
                        setFetchedAt(new Date().toISOString());
                    }
                }
            }
        })();
        return () =>
        {
            cancelled = true;
        };
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
            {!error && games.length > 0 && (
                <GameFilter
                    games={games}
                    onFilterChange={handleFilterChange}
                />
            )}
            {!error && (
                <GamesList
                    games={filteredGames}
                    gameStatuses={gameStatuses}
                    onStatusUpdate={refreshStatuses}
                    valueLabel="/ 100"
                    showStatusButton
                />
            )}
            {!error && (
                <div className="w-[90%] max-w-[112rem] mx-auto mt-4 text-right text-[10px] text-gray-400">
                    <span>
                        Fetched at {new Date(fetchedAt).toLocaleString()}
                    </span>
                </div>
            )}
        </GamingPageLayout>
    );
};

export default Gaming;
