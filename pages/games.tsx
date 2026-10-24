import GameFilter from "@/Components/Gaming/GameFilter";
import GamesList from "@/Components/Gaming/GamesList";
import GamingPageLayout from "@/Components/Gaming/GamingPageLayout";
import { Game } from "@/models/Game";
import {
    GameStatusEntry,
    syncGameStatuses,
} from "@/utils/gameStatusManager";
import { upgradeImageUrl } from "@/utils/imageUtils";
import { useEffect, useState } from "react";
import { getGameSession, ownerConfigured, signIn, signOut, type GameSession } from "@/utils/gameAuth";

const Gaming = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);
    const scrollToSection = () => closeNav();

    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [gameStatuses, setGameStatuses] = useState<GameStatusEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [session, setSession] = useState<GameSession>({ signedIn: false, canEdit: false });
    const [checkingSession, setCheckingSession] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [statusError, setStatusError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const checkSession = async () => {
            setCheckingSession(true);
            try {
                const nextSession = await getGameSession();
                if (!cancelled) {
                    setSession(nextSession);
                    setAuthError(null);
                }
            } catch {
                if (!cancelled) {
                    setSession({ signedIn: false, canEdit: false });
                    setAuthError("Could not check sign-in. Refresh the page to retry.");
                }
            } finally {
                if (!cancelled) setCheckingSession(false);
            }
        };
        void checkSession();
        window.addEventListener("focus", checkSession);
        return () => {
            cancelled = true;
            window.removeEventListener("focus", checkSession);
        };
    }, []);

    useEffect(() => {
        if (!session.canEdit) {
            setGameStatuses([]);
            return;
        }
        let cancelled = false;
        const loadStatuses = async () => {
            try {
                const statuses = await syncGameStatuses();
                if (!cancelled) {
                    setGameStatuses(statuses);
                    setStatusError(null);
                }
            } catch (err) {
                if (!cancelled) setStatusError(err instanceof Error ? err.message : "Unable to load game statuses.");
            }
        };
        void loadStatuses();
        return () => { cancelled = true; };
    }, [session.canEdit]);

    useEffect(() => {
        if (!session.canEdit) {
            setGames([]);
            setFilteredGames([]);
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(
                    "https://api.zehai.dk/api/games/top-rated",
                    {
                        cache: "no-store",
                        mode: "cors",
                        credentials: "include",
                        redirect: "error",
                    }
                );
                if (!res.ok) {
                    throw new Error(`API responded ${res.status}`);
                }
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
                    cover?: { url?: string } | string;
                };
                const normalized: Game[] = (raw as RawGame[]).map((g, idx) => {
                    let coverUrl = "/gamepictures/placeholder.png";
                    let coverUrlValue: string | undefined;
                    if (typeof g.cover === "string") {
                        coverUrlValue = g.cover;
                    } else if (
                        g.cover &&
                        typeof g.cover === "object" &&
                        "url" in g.cover
                    ) {
                        coverUrlValue = (g.cover as { url?: string }).url;
                    }
                    if (coverUrlValue && coverUrlValue.trim() !== "") {
                        const upgraded = upgradeImageUrl(coverUrlValue);
                        if (upgraded && upgraded.trim() !== "") {
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
                if (!cancelled) {
                    setGames(normalized);
                    setFilteredGames(normalized);
                    // snapshot time removed (unused)
                    setError(null);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : "Unable to load games.");
                    setGames([]);
                    setFilteredGames([]);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [session.canEdit]);

    const refreshStatuses = async () => {
        if (!session.canEdit) return;
        try {
            const statuses = await syncGameStatuses();
            setGameStatuses(statuses);
            setStatusError(null);
        } catch (err) {
            setStatusError("Your change was saved, but the list could not refresh. Reload to see the latest statuses.");
        }
    };

    const handleFilterChange = (filtered: Game[]) => {
        setFilteredGames(filtered);
    };

    if (checkingSession || !session.canEdit) {
        return (
            <GamingPageLayout nav={nav} openNav={openNav} closeNav={closeNav} scrollToSection={scrollToSection}>
                <section className="w-[90%] max-w-lg mx-auto my-12 p-6 rounded-lg border-2 border-theme-secondary bg-theme-darker text-theme-text text-center">
                    <h1 className="text-2xl font-bold mb-4">Games</h1>
                    <p className="mb-4" aria-live="polite">
                        {checkingSession ? "Checking sign-in…" : session.signedIn
                            ? ownerConfigured ? "This Microsoft account does not have access." : "Owner access has not been configured yet."
                            : "Sign in with your Microsoft account to access this page."}
                    </p>
                    {authError && <p role="alert" className="mb-4 text-red-400">{authError}</p>}
                    {!checkingSession && (
                        <button type="button" onClick={session.signedIn ? signOut : signIn}
                            className="px-4 py-2 rounded border-2 border-theme-secondary">
                            {session.signedIn ? "Sign out" : "Sign in with Microsoft"}
                        </button>
                    )}
                </section>
            </GamingPageLayout>
        );
    }

    return (
        <GamingPageLayout
            nav={nav}
            openNav={openNav}
            closeNav={closeNav}
            scrollToSection={scrollToSection}
        >
            <div className="w-[90%] max-w-[112rem] mx-auto mb-6 text-theme-text">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p>Signed in as the owner.</p>
                    <button type="button" onClick={signOut}
                        className="px-4 py-2 rounded border-2 border-theme-secondary">
                        Sign out
                    </button>
                </div>
                {statusError && <p role="alert" className="mt-3 text-red-400">{statusError}</p>}
            </div>
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
                    gameStatuses={gameStatuses}
                />
            )}
            {!error && (
                <GamesList
                    games={filteredGames}
                    gameStatuses={gameStatuses}
                    onStatusUpdate={refreshStatuses}
                    valueLabel="/ 100"
                    showStatusButton={session.canEdit && !checkingSession}
                    disableLink
                />
            )}
        </GamingPageLayout>
    );
};

export default Gaming;
