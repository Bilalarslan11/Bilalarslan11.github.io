import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { GameStatusEntry } from "@/utils/gameStatusManager";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const filePath = path.join(
                process.cwd(),
                "data",
                "salihGameStatus.json"
            );
            const fileContent = await fs.readFile(filePath, "utf8");
            const gameStatuses: GameStatusEntry[] = JSON.parse(fileContent);
            res.status(200).json(gameStatuses);
        } catch (error) {
            console.error("Error reading game status file:", error);
            res.status(500).json({ error: "Failed to load game statuses" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
