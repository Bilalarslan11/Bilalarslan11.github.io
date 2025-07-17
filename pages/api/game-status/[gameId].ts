import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { GameStatusEntry, GameStatus } from "@/utils/gameStatusManager";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { gameId } = req.query;
    const gameIdNum = parseInt(gameId as string);

    if (isNaN(gameIdNum)) {
        return res.status(400).json({ error: "Invalid game ID" });
    }

    if (req.method === "PUT") {
        try {
            const { status }: { status: GameStatus } = req.body;

            if (!status || !["Playing", "Completed", "Quit"].includes(status)) {
                return res
                    .status(400)
                    .json({
                        error: "Invalid status. Must be Playing, Completed, or Quit",
                    });
            }

            const filePath = path.join(
                process.cwd(),
                "data",
                "salihGameStatus.json"
            );
            const fileContent = await fs.readFile(filePath, "utf8");
            const gameStatuses: GameStatusEntry[] = JSON.parse(fileContent);

            // Find existing entry or create new one
            const existingIndex = gameStatuses.findIndex(
                (entry) => entry.id === gameIdNum
            );

            if (existingIndex !== -1) {
                // Update existing entry
                gameStatuses[existingIndex].status = status;
            } else {
                // Add new entry
                gameStatuses.push({ id: gameIdNum, status });
            }

            // Write back to file
            await fs.writeFile(filePath, JSON.stringify(gameStatuses, null, 2));

            res.status(200).json({
                message: "Game status updated successfully",
            });
        } catch (error) {
            console.error("Error updating game status:", error);
            res.status(500).json({ error: "Failed to update game status" });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
