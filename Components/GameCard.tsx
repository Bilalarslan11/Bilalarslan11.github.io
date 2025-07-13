import React from "react";
import Image from "next/image";
import { Game } from "@/models/Game";

interface Props {
    game: Game;
}

const GameCard = ({ game }: Props) => {
    return (
        <div className="game-card">
            <div className="game-image">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="image"
                />
            </div>

            <div className="game-info-box">
                <div className="rank-circle">{game.rank}</div>

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
    );
};

export default GameCard;
