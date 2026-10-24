export type GameStatus = "Playing" | "Completed" | "Quit";

export interface GameStatusEntry {
  id: number;
  status: GameStatus;
  name: string;
}

const STATUS_API_URL = "https://api.zehai.dk/statuses";

function saveCachedStatuses(statuses: GameStatusEntry[]): void {
  localStorage.setItem("gameStatuses", JSON.stringify(statuses));
}

// Client-side function to load game statuses from localStorage
export function loadGameStatuses(): GameStatusEntry[] {
  try {
    if (typeof window === "undefined") {
      return []; // Return empty array during SSR
    }
    const stored = localStorage.getItem("gameStatuses");
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((e: any) => ({
      id: Number(e?.id),
      status: (e?.status as GameStatus) ?? "Playing",
      name: typeof e?.name === "string" ? e.name : "",
    }));
  } catch (error) {
    console.error("Error loading game statuses:", error);
    return [];
  }
}

export async function syncGameStatuses(): Promise<GameStatusEntry[]> {
  if (typeof window === "undefined") return [];
  try {
    const response = await fetch(STATUS_API_URL, {
      credentials: "include",
      cache: "no-store",
    });
    if (!response.ok) return loadGameStatuses();
    const statuses = (await response.json()) as GameStatusEntry[];
    saveCachedStatuses(statuses);
    return statuses;
  } catch (error) {
    console.error("Error syncing game statuses:", error);
    return loadGameStatuses();
  }
}

// Client-side function to update game status in localStorage
export async function updateGameStatus(
  gameId: number,
  newStatus: GameStatus,
  gameName: string
): Promise<void> {
  try {
    if (typeof window === "undefined") {
      return;
    }

    const statuses = loadGameStatuses();
    const existingIndex = statuses.findIndex((entry) => entry.id === gameId);

    if (existingIndex >= 0) {
      statuses[existingIndex].status = newStatus;
      statuses[existingIndex].name = gameName;
    } else {
      const entry: GameStatusEntry = {
        id: gameId,
        status: newStatus,
        name: gameName,
      };
      statuses.push(entry);
    }

    saveCachedStatuses(statuses);
    const response = await fetch(STATUS_API_URL, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: gameId, status: newStatus, name: gameName }),
    });
    if (!response.ok && response.status !== 401) {
      throw new Error(`Status API responded ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating game status:", error);
    throw error;
  }
}

export async function clearGameStatus(gameId: number): Promise<void> {
  try {
    if (typeof window === "undefined") {
      return;
    }
    const statuses = loadGameStatuses().filter((entry) => entry.id !== gameId);
    saveCachedStatuses(statuses);
    const response = await fetch(`${STATUS_API_URL}?id=${gameId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok && response.status !== 401) {
      throw new Error(`Status API responded ${response.status}`);
    }
  } catch (error) {
    console.error("Error clearing game status:", error);
    throw error;
  }
}

// Helper function to find a specific game's status
export function getGameStatus(
  gameId: number,
  statuses: GameStatusEntry[]
): GameStatus | null {
  const gameStatus = statuses.find((entry) => entry.id === gameId);
  return gameStatus ? gameStatus.status : null;
}
