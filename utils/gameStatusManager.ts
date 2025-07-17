export type GameStatus = "Playing" | "Completed" | "Quit";

export interface GameStatusEntry {
    id: number;
    status: GameStatus;
}

// Client-side function to load game statuses via API
export async function loadGameStatuses(): Promise<GameStatusEntry[]> {
    try {
        const response = await fetch("/api/game-status");
        if (!response.ok) {
            throw new Error("Failed to load game statuses");
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading game statuses:", error);
        return [];
    }
}

// Client-side function to update game status via API
export async function updateGameStatus(
    gameId: number,
    newStatus: GameStatus
): Promise<void> {
    try {
        const response = await fetch(`/api/game-status/${gameId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            throw new Error("Failed to update game status");
        }
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
