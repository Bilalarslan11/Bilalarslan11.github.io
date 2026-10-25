import type { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_ORIGIN = "https://zehai.dk";
const API_URL = "https://api.zehai.dk/games/top-rated";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Vary", "Origin");

    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    // CORS is not authentication. Keep sensitive data protected by the upstream API.
    const origin = req.headers.origin;
    if (origin && origin !== ALLOWED_ORIGIN) {
        return res.status(403).json({ error: "Origin not allowed" });
    }

    if (origin === ALLOWED_ORIGIN) {
        res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    }

    try {
        const response = await fetch(API_URL, {
            headers: { Accept: "application/json" },
            cache: "no-store",
            redirect: "error",
        });

        if (!response.ok) {
            console.error("Games API upstream failed:", response.status);
            return res.status(502).json({ error: "Unable to fetch games" });
        }

        return res.status(200).json(await response.json());
    } catch (error) {
        console.error("Error proxying games API:", error);
        return res.status(502).json({ error: "Unable to fetch games" });
    }
}
