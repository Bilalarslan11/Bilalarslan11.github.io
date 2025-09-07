import GameCard from "@/Components/GameCard";
import { Game } from "@/models/Game";
import { GameStatusEntry } from "@/utils/gameStatusManager";
import React from "react";

interface GamesListProps {
    games: Game[];
    gameStatuses: GameStatusEntry[];
    onStatusUpdate: () => void;
    valueLabel: string;
}

const GamesList: React.FC<GamesListProps> = ({
    games,
    gameStatuses,
    onStatusUpdate,
    valueLabel,
}) => {
    return (
        <div className="w-[90%] max-w-[112rem] mx-auto pb-16">
            <div className="grid grid-cols-3 gap-2 min-w-0 sm:gap-4 md:gap-12 lg:grid-cols-4 xl:grid-cols-5">
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        gameStatuses={gameStatuses}
                        onStatusUpdate={onStatusUpdate}
                        valueLabel={valueLabel}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamesList;
