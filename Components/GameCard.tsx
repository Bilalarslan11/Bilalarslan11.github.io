import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/models/Game";

interface Props {
    game: Game;
}

const GameCard = ({ game }: Props) => {
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
    );
};

export default GameCard;
