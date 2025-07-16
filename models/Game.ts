export interface Game {
    id: number;
    rank: number;
    title: string;
    producer: string;
    hours: number;
    image: string;
    rating: number;
    console: string;
    originConsole?: string;
    year: string;
    originYear?: string;
    genre: string;
    company: string;
    credits: string;
    hundredPercent: string;
    dlc: string;
}
