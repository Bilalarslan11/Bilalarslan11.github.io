import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const apiUrl =
            process.env.API_BASE_URL || "https://api.zehai.dk";
        const endpoint = "/api/games/top-rated";
        
        const response = await fetch(`${apiUrl}${endpoint}`, {
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`External API responded with ${response.status}`);
        }

        const data = await response.json();

        // Set CORS headers to allow your domain
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error proxying games API:", error);
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ error: message });
    }
}

