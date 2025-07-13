export interface Game {
    id: number;
    image: string;
    title: string;
    producer: string;
    rank: number;
    rating: number;
    hours?: number; // Optional since not all games may have hours tracked
}
