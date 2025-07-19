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
    onStatusUpdate: () => void;
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

    const handleStatusUpdate = (newStatus: GameStatus) => {
        setIsLoading(true);
        try {
            updateGameStatus(game.id, newStatus);
            setCurrentStatus(newStatus);
            setShowStatusModal(false);
            onStatusUpdate(); // Refresh the parent's status list
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
                    className="rank-number-span"
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: getNumberColor(rank),
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)",
                        zIndex: 10,
                    }}
                >
                    {rank > 3 ? rank : ""}
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
                        {/* <button
                            onClick={handlePlusClick}
                            className="absolute top-2 right-2 w-8 h-8 bg-theme-secondary hover:bg-theme-accent text-theme-text rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-200 border-2 border-theme-secondary hover:border-theme-accent shadow-lg"
                            title="Set game status"
                        >
                            +
                        </button> */}

                        {/* Status indicator */}
                        {/* {currentStatus && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-theme-darker border border-theme-secondary text-theme-text text-xs rounded font-medium">
                                {currentStatus}
                            </div>
                        )} */}

                        {/* 100% and DLC indicators */}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            {game.hundredPercent &&
                                game.hundredPercent.trim() !== "" &&
                                game.hundredPercent.toLowerCase() !== "no" && (
                                    <div
                                        className="game-indicator bg-theme-gold text-black rounded font-bold shadow-lg border border-theme-gold"
                                        title="100% Complete"
                                    >
                                        100%
                                    </div>
                                )}
                            {game.dlc &&
                                game.dlc.trim() !== "" &&
                                game.dlc.toLowerCase() !== "no" && (
                                    <div
                                        className="game-indicator bg-theme-secondary text-theme-text rounded font-bold shadow-lg border border-theme-secondary"
                                        title="DLC Available"
                                    >
                                        DLC
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="game-info-box">
                        {game.rank <= 0 ? (
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
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-theme-darker border-2 border-theme-secondary p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold mb-4 text-theme-text text-center">
                            Set status for{" "}
                            <span className="text-theme-secondary">
                                &quot;{game.title}&quot;
                            </span>
                        </h3>

                        <div className="space-y-3">
                            {(
                                ["Playing", "Completed", "Quit"] as GameStatus[]
                            ).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(status)}
                                    disabled={isLoading}
                                    className={`w-full p-3 text-left rounded border-2 transition-all duration-200 font-medium ${
                                        currentStatus === status
                                            ? "border-theme-secondary bg-theme-secondary text-theme-text"
                                            : "border-theme-text-muted bg-theme-primary text-theme-text hover:border-theme-secondary hover:bg-theme-darker"
                                    } ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    <span className="text-theme-text">
                                        {status}
                                    </span>
                                    {currentStatus === status && (
                                        <span className="text-theme-text text-sm ml-2 font-bold">
                                            ✓ Current
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-theme-text-muted">
                            <button
                                onClick={() => setShowStatusModal(false)}
                                disabled={isLoading}
                                className="w-full p-3 bg-theme-primary hover:bg-theme-darker border-2 border-theme-text-muted hover:border-theme-secondary rounded text-theme-text transition-all duration-200 font-medium"
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
