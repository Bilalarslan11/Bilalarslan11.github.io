import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/models/Game";
import {
    GameStatus,
    GameStatusEntry,
    updateGameStatus,
} from "@/utils/gameStatusManager";

interface Props {
    game: Game;
    gameStatuses: GameStatusEntry[];
    onStatusUpdate: () => Promise<void>;
}

const GameCard = ({ game, gameStatuses, onStatusUpdate }: Props) => {
    const [currentStatus, setCurrentStatus] = useState<GameStatus | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load game status from props
    useEffect(() => {
        const status =
            gameStatuses.find((entry) => entry.id === game.id)?.status || null;
        setCurrentStatus(status);
    }, [game.id, gameStatuses]);

    const handleStatusUpdate = async (newStatus: GameStatus) => {
        setIsLoading(true);
        try {
            await updateGameStatus(game.id, newStatus);
            setCurrentStatus(newStatus);
            setShowStatusModal(false);
            await onStatusUpdate(); // Refresh the parent's status list
        } catch (error) {
            console.error("Error updating game status:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Stop event bubbling
        setShowStatusModal(true);
    };
    const getRankColorClass = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-theme-gold";
            case 2:
                return "bg-theme-silver";
            case 3:
                return "bg-theme-bronze";
            default:
                return "bg-theme-secondary";
        }
    };

    const CrownIcon = ({ rank }: { rank: number }) => {
        const getNumberColor = (rank: number) => {
            switch (rank) {
                case 1:
                    return "#B8860B"; // Dark gold
                case 2:
                    return "#696969"; // Dark gray/silver
                case 3:
                    return "#8B4513"; // Dark bronze/brown
                default:
                    return "#000";
            }
        };

        return (
            <div
                style={{ position: "relative", width: "45px", height: "45px" }}
            >
                <Image
                    src={`/images/crown${
                        rank === 1 ? "gold" : rank === 2 ? "silver" : "bronze"
                    }.png`}
                    alt={`Crown rank ${rank}`}
                    width={55}
                    height={55}
                    style={{ position: "absolute", top: 0, left: 0 }}
                />
                <span
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: getNumberColor(rank),
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)",
                        zIndex: 10,
                    }}
                >
                    {rank}
                </span>
            </div>
        );
    };

    return (
        <>
            <Link
                href={`/gaming/${game.id}`}
                className="block"
            >
                <div className="game-card cursor-pointer">
                    <div className="game-image">
                        <Image
                            src={game.image}
                            alt={game.title}
                            fill
                            className="image"
                        />

                        {/* Plus Button */}
                        <button
                            onClick={handlePlusClick}
                            className="absolute top-2 right-2 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold z-10 transition-colors"
                            title="Set game status"
                        >
                            +
                        </button>

                        {/* Status indicator */}
                        {currentStatus && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                                {currentStatus}
                            </div>
                        )}
                    </div>

                    <div className="game-info-box">
                        {game.rank <= 3 ? (
                            <div className="rank-star-image">
                                <CrownIcon rank={game.rank} />
                            </div>
                        ) : (
                            <div
                                className={`rank-circle ${getRankColorClass(
                                    game.rank
                                )}`}
                            >
                                {game.rank}
                            </div>
                        )}

                        <div className="game-info">
                            <h3>{game.title}</h3>
                            <p>{game.producer}</p>
                        </div>

                        <div className="game-rating">
                            <span className="score">{game.hours}</span>
                            <span className="total">hours</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Status Selection Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">
                            Set status for &quot;{game.title}&quot;
                        </h3>

                        <div className="space-y-3">
                            {(
                                ["Playing", "Completed", "Quit"] as GameStatus[]
                            ).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(status)}
                                    disabled={isLoading}
                                    className={`w-full p-3 text-left rounded border-2 transition-colors ${
                                        currentStatus === status
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    } ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    <span className="font-medium text-gray-800">
                                        {status}
                                    </span>
                                    {currentStatus === status && (
                                        <span className="text-blue-500 text-sm ml-2">
                                            ✓ Current
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <button
                                onClick={() => setShowStatusModal(false)}
                                disabled={isLoading}
                                className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GameCard;
