import { Game } from "@/models/Game";
import {
    GameStatus,
    GameStatusEntry,
    updateGameStatus,
    clearGameStatus,
} from "@/utils/gameStatusManager";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CheckCircle, Close, SportsEsports } from "@mui/icons-material";

interface Props {
    game: Game;
    gameStatuses: GameStatusEntry[];
    onStatusUpdate: () => void;
    valueLabel: string; // label under the numeric value (e.g., 'hours' or '/ 100')
    showStatusButton?: boolean;
    disableLink?: boolean;
}

const CrownIcon: React.FC<{ rank: number }> = ({ rank }) => {
    const getNumberColor = (r: number) => {
        switch (r) {
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

    let type: string;
    if (rank === 1) type = "gold";
    else if (rank === 2) type = "silver";
    else type = "bronze";

    return (
        <div style={{ position: "relative", width: "45px", height: "45px" }}>
            <Image
                src={`/images/crown${type}.png`}
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
                {rank > 3 ? rank : ""}
            </span>
        </div>
    );
};

const GameCard = ({
    game,
    gameStatuses,
    onStatusUpdate,
    valueLabel,
    showStatusButton,
    disableLink,
}: Props) => {
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
            if (currentStatus === newStatus) {
                clearGameStatus(game.id);
                setCurrentStatus(null);
            } else {
                updateGameStatus(game.id, newStatus, game.title);
                setCurrentStatus(newStatus);
            }
            setShowStatusModal(false);
            onStatusUpdate(); // Refresh the parent's status list
        } catch (error) {
            console.error("Error updating game status:", error);
        } finally {
            setIsLoading(false);
        }
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

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowStatusModal(true);
    };

    const StatusIcon: React.FC<{ status: GameStatus }> = ({ status }) => {
        const size = 18; // pops more than tiny inline SVGs
        if (status === "Completed") {
            return <CheckCircle sx={{ fontSize: size }} />;
        }
        if (status === "Quit") {
            return <Close sx={{ fontSize: size }} />;
        }
        return <SportsEsports sx={{ fontSize: size }} />;
    };

    return (
        <>
            {disableLink ? (
                <div className="block">
                    <div className="relative bg-transparent transition-transform duration-300 min-w-0 w-full hover:scale-105 cursor-pointer">
                        <div className="relative aspect-square bg-gray-700 overflow-hidden rounded-lg mb-2">
                            {game.image.startsWith('http') ? (
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 rounded-lg hover:scale-110"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    className="object-cover transition-transform duration-300 rounded-lg hover:scale-110"
                                />
                            )}
                            {showStatusButton && (
                                <button
                                    onClick={handlePlusClick}
                                    className="absolute top-2 right-2 w-8 h-8 bg-theme-secondary hover:bg-theme-accent text-theme-text rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-200 border-2 border-theme-secondary hover:border-theme-accent shadow-lg"
                                    title="Set game status"
                                >
                                    +
                                </button>
                            )}
                            {/* Status + 100% and DLC indicators */}
                            <div className="absolute bottom-2 right-2 flex gap-1">
                                {currentStatus && (
                                    <div
                                        className={
                                            `flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold shadow-xl border-2 ring-2 ring-offset-1 backdrop-blur-sm ` +
                                            (currentStatus === "Completed"
                                                ? "bg-green-600 text-white border-green-400 ring-green-300/40"
                                                : currentStatus === "Quit"
                                                    ? "bg-red-600 text-white border-red-400 ring-red-300/40"
                                                    : "bg-blue-600 text-white border-blue-400 ring-blue-300/40")
                                        }
                                        title={currentStatus}
                                    >
                                        <span className="opacity-95 drop-shadow-md flex items-center">
                                            <StatusIcon status={currentStatus} />
                                        </span>
                                        <span className="hidden xs:inline opacity-95 drop-shadow-md">
                                            {currentStatus}
                                        </span>
                                    </div>
                                )}
                                {game.hundredPercent &&
                                    game.hundredPercent.trim() !== "" &&
                                    game.hundredPercent.toLowerCase() !== "no" &&
                                    game.hundredPercent.toLowerCase() !== "yes" && (
                                        <div
                                            className="text-[10px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-theme-gold text-black rounded font-bold shadow-lg border border-theme-gold"
                                            title="100% Complete"
                                        >
                                            100%
                                        </div>
                                    )}
                                {game.dlc &&
                                    game.dlc.trim() !== "" &&
                                    game.dlc.toLowerCase() !== "no" && (
                                        <div
                                            className="text-[10px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-theme-secondary text-theme-text rounded font-bold shadow-lg border border-theme-secondary"
                                            title="DLC Available"
                                        >
                                            DLC
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="relative bg-[#111111] rounded-lg p-2 pt-6 sm:p-4 sm:pt-4 flex justify-between items-start">
                            {game.rank <= 0 ? (
                                <div className="absolute -top-4 -left-1 sm:-top-5 sm:-left-1 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center z-20">
                                    <CrownIcon rank={game.rank} />
                                </div>
                            ) : (
                                <div
                                    className={`absolute -top-4 -left-1 sm:-top-10 sm:-left-2 flex items-center justify-center text-white font-bold bg-black ${getRankColorClass(
                                        game.rank
                                    )} w-8 h-8 sm:w-12 sm:h-12 text-[12px] sm:text-base rounded-full border-2 sm:border-4 border-black`}
                                >
                                    {game.rank}
                                </div>
                            )}
                            <div className="min-w-0">
                                <h3 className="text-white font-bold text-[10px] xs:text-xs sm:text-sm mb-1 leading-tight break-words">
                                    {game.title}
                                </h3>
                                <p className="text-gray-300 text-[8px] xs:text-[10px] sm:text-xs m-0">
                                    {game.producer}
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-yellow-400 font-bold text-sm leading-none">
                                <span>{game.hours}</span>
                                <span className="text-[10px] text-yellow-100">
                                    {valueLabel}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
            <Link
                href={`/gaming/${game.id}`}
                className="block"
            >
                <div className="relative bg-transparent transition-transform duration-300 min-w-0 w-full hover:scale-105 cursor-pointer">
                    <div className="relative aspect-square bg-gray-700 overflow-hidden rounded-lg mb-2">
                        {game.image.startsWith('http') ? (
                            // Use regular img tag for external URLs to avoid CORS issues
                            <img
                                src={game.image}
                                alt={game.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 rounded-lg hover:scale-110"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="object-cover transition-transform duration-300 rounded-lg hover:scale-110"
                            />
                        )}

                        {showStatusButton && (
                            <button
                                onClick={handlePlusClick}
                                className="absolute top-2 right-2 w-8 h-8 bg-theme-secondary hover:bg-theme-accent text-theme-text rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-200 border-2 border-theme-secondary hover:border-theme-accent shadow-lg"
                                title="Set game status"
                            >
                                +
                            </button>
                        )}

                        {/* Status indicator intentionally removed in Tailwind refactor */}

                        {/* Status + 100% and DLC indicators */}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            {currentStatus && (
                                <div
                                    className={
                                        `flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold shadow-xl border-2 ring-2 ring-offset-1 backdrop-blur-sm ` +
                                        (currentStatus === "Completed"
                                            ? "bg-green-600 text-white border-green-400 ring-green-300/40"
                                            : currentStatus === "Quit"
                                                ? "bg-red-600 text-white border-red-400 ring-red-300/40"
                                                : "bg-blue-600 text-white border-blue-400 ring-blue-300/40")
                                    }
                                    title={currentStatus}
                                >
                                    <span className="opacity-95 drop-shadow-md flex items-center">
                                        <StatusIcon status={currentStatus} />
                                    </span>
                                    <span className="hidden xs:inline opacity-95 drop-shadow-md">
                                        {currentStatus}
                                    </span>
                                </div>
                            )}
                            {game.hundredPercent &&
                                game.hundredPercent.trim() !== "" &&
                                game.hundredPercent.toLowerCase() !== "no" &&
                                game.hundredPercent.toLowerCase() !== "yes" && (
                                    <div
                                        className="text-[10px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-theme-gold text-black rounded font-bold shadow-lg border border-theme-gold"
                                        title="100% Complete"
                                    >
                                        100%
                                    </div>
                                )}
                            {game.dlc &&
                                game.dlc.trim() !== "" &&
                                game.dlc.toLowerCase() !== "no" && (
                                    <div
                                        className="text-[10px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-theme-secondary text-theme-text rounded font-bold shadow-lg border border-theme-secondary"
                                        title="DLC Available"
                                    >
                                        DLC
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="relative bg-[#111111] rounded-lg p-2 pt-6 sm:p-4 sm:pt-4 flex justify-between items-start">
                        {game.rank <= 0 ? (
                            <div className="absolute -top-4 -left-1 sm:-top-5 sm:-left-1 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center z-20">
                                <CrownIcon rank={game.rank} />
                            </div>
                        ) : (
                            <div
                                className={`absolute -top-4 -left-1 sm:-top-10 sm:-left-2 flex items-center justify-center text-white font-bold bg-black ${getRankColorClass(
                                    game.rank
                                )} w-8 h-8 sm:w-12 sm:h-12 text-[12px] sm:text-base rounded-full border-2 sm:border-4 border-black`}
                            >
                                {game.rank}
                            </div>
                        )}
                        <div className="min-w-0">
                            <h3 className="text-white font-bold text-[10px] xs:text-xs sm:text-sm mb-1 leading-tight break-words">
                                {game.title}
                            </h3>
                            <p className="text-gray-300 text-[8px] xs:text-[10px] sm:text-xs m-0">
                                {game.producer}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-1 text-yellow-400 font-bold text-sm leading-none">
                            <span>{game.hours}</span>
                            <span className="text-[10px] text-yellow-100">
                                {valueLabel}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            )}

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
