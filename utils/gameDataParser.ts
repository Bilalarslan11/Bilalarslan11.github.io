import Papa from "papaparse";
import { Game } from "@/models/Game";

export interface GameDataParserOptions {
    csvFileName: string;
    useNewFormat?: boolean; // true for salihgames2.csv format, false for salihgames.csv format
}

export const parseGameData = (csvData: string): Promise<Game[]> => {
    return new Promise<Game[]>((resolve) => {
        Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<Record<string, string>>) => {
                const parsedGames: Game[] = results.data
                    .map((row: Record<string, string>, index: number) => {
                        // Format for salihgames.csv (old format)
                        return {
                            id: index + 1,
                            title: row["Name"] || "",
                            producer: row["Company"] || "",
                            console: row["Console"] || "",
                            hours: parseInt(row["Hours"] || "0", 10),
                            rank: parseInt(
                                (row["Rank"] || "0").replace(/\D/g, ""),
                                10
                            ),
                            year: row["Year"] || "",
                            originConsole: row["Origin Console"] || "",
                            originYear: row["Origin Year"] || "",
                            genre: row["Genre"] || "",
                            company: row["Company"] || "",
                            credits: row["Credits"] || "",
                            hundredPercent: row["100%"] || "",
                            dlc: row["DLC"] || "",
                            image: "/gamepictures/" + row["ID"] + ".png",
                            rating:
                                Math.round((Math.random() * 2 + 8) * 10) / 10,
                        };
                    })
                    .filter((game) => game.title && game.rank);

                // Sort by rank
                parsedGames.sort((a, b) => a.rank - b.rank);
                resolve(parsedGames);
            },
        });
    });
};

export const loadGameData = async (
    options: GameDataParserOptions
): Promise<Game[]> => {
    try {
        const response = await fetch(`/${options.csvFileName}`);
        const csvData = await response.text();
        return await parseGameData(csvData);
    } catch (error) {
        console.error("Error loading CSV:", error);
        return [];
    }
};
