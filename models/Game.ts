export interface Game {
    id: number;
    rank: number;
    title: string;
    producer: string; // Maps to "Company" from CSV
    hours: number; // Maps to "Jul/24" from CSV
    image: string;
    rating: number;
}
