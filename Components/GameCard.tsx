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

    const getStarColorFilter = (rank: number) => {
        switch (rank) {
            case 1:
                return "brightness(1.3) saturate(2) hue-rotate(-10deg) contrast(1.1)"; // Gold
            case 2:
                return "brightness(1.4) saturate(0) contrast(1.2)"; // Silver
            case 3:
                return "brightness(0.9) saturate(1.8) hue-rotate(-30deg) contrast(1.2)"; // Bronze
            default:
                return "brightness(1)";
        }
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
                            <Image
                                src="/images/star.png"
                                alt="Star"
                                width={70}
                                height={70}
                                style={{
                                    filter: getStarColorFilter(game.rank),
                                }}
                            />
                            <span className="rank-number">{game.rank}</span>
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
                        <span className="star">★</span>
                        <span className="score">{game.rating}</span>
                        <span className="total">/10</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
