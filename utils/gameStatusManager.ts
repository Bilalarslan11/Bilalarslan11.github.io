export type GameStatus = "Playing" | "Completed" | "Quit";

export interface GameStatusEntry {
    id: number;
    status: GameStatus;
}

// Client-side function to load game statuses from localStorage
export function loadGameStatuses(): GameStatusEntry[] {
    try {
        if (typeof window === "undefined") {
            return []; // Return empty array during SSR
        }
        const stored = localStorage.getItem("gameStatuses");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading game statuses:", error);
        return [];
    }
}

// Client-side function to update game status in localStorage
export function updateGameStatus(gameId: number, newStatus: GameStatus): void {
    try {
        if (typeof window === "undefined") {
            return; // Do nothing during SSR
        }

        const statuses = loadGameStatuses();
        const existingIndex = statuses.findIndex(
            (entry) => entry.id === gameId
        );

        if (existingIndex >= 0) {
            statuses[existingIndex].status = newStatus;
        } else {
            statuses.push({ id: gameId, status: newStatus });
        }

        localStorage.setItem("gameStatuses", JSON.stringify(statuses));
    } catch (error) {
        console.error("Error updating game status:", error);
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
