export type GameStatus = "Playing" | "Completed" | "Quit";

export interface GameStatusEntry {
    id: number;
    status: GameStatus;
    name: string;
}

const STATUS_API_URL = "https://api.zehai.dk/api/statuses";

async function requestStatuses(url: string, options: RequestInit = {}): Promise<Response> {
    let response: Response;
    try {
        response = await fetch(url, {
            ...options,
            credentials: "include",
            cache: "no-store",
            redirect: "error",
        });
    } catch {
        throw new Error("The API could not be reached. Check your connection or sign in again, then retry.");
    }
    if (response.status === 401) throw new Error("Your session has expired. Sign in with Microsoft again.");
    if (response.status === 403) throw new Error("This account is not allowed to change game statuses.");
    if (!response.ok) throw new Error(`The API rejected the request (${response.status}). Please try again.`);
    return response;
}

// Compatibility for other pages: no local cache is read or written.
export function loadGameStatuses(): GameStatusEntry[] {
    return [];
}

export async function syncGameStatuses(): Promise<GameStatusEntry[]> {
    const response = await requestStatuses(STATUS_API_URL);
    const statuses: unknown = await response.json();
    if (!Array.isArray(statuses)) throw new Error("The API returned an invalid game status list.");
    return statuses as GameStatusEntry[];
}

export async function updateGameStatus(gameId: number, newStatus: GameStatus, gameName: string): Promise<void> {
    await requestStatuses(STATUS_API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: gameId, status: newStatus, name: gameName }),
    });
}

export async function clearGameStatus(gameId: number): Promise<void> {
    await requestStatuses(`${STATUS_API_URL}?id=${encodeURIComponent(gameId)}`, { method: "DELETE" });
}

export function getGameStatus(gameId: number, statuses: GameStatusEntry[]): GameStatus | null {
    return statuses.find((entry) => entry.id === gameId)?.status ?? null;
}
