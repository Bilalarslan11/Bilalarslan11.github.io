import GameCard from "@/Components/GameCard";
import { Game } from "@/models/Game";
import { GameStatusEntry } from "@/utils/gameStatusManager";
import React from "react";

interface GamesListProps {
    games: Game[];
    gameStatuses: GameStatusEntry[];
    onStatusUpdate: () => void;
}

const GamesList: React.FC<GamesListProps> = ({
    games,
    gameStatuses,
    onStatusUpdate,
}) => {
    return (
        <div className="gaming-list-container">
            <div className="games-grid">
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        gameStatuses={gameStatuses}
                        onStatusUpdate={onStatusUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamesList;
