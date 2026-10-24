export const API_ORIGIN = "https://api.zehai.dk";
const OWNER_ID = process.env.NEXT_PUBLIC_GAMES_OWNER_ID?.trim();
export const ownerConfigured = Boolean(OWNER_ID);

export interface GameSession {
    signedIn: boolean;
    canEdit: boolean;
}

// UI gating only. The API must independently authorize every write.
export async function getGameSession(): Promise<GameSession> {
    const response = await fetch(`${API_ORIGIN}/.auth/me`, {
        credentials: "include",
        cache: "no-store",
        redirect: "error",
    });
    if (response.status === 401) return { signedIn: false, canEdit: false };
    if (!response.ok) throw new Error("Unable to check sign-in. Please try again.");
    const identities: unknown = await response.json();
    if (!Array.isArray(identities)) throw new Error("Unexpected sign-in response.");
    const signedIn = identities.some((identity) => typeof identity?.user_id === "string" && identity.user_id.length > 0);
    const canEdit = Boolean(OWNER_ID) && identities.some((identity) =>
        identity?.provider_name === "aad" && identity?.user_id === OWNER_ID
    );
    return { signedIn, canEdit };
}

export function signIn(): void {
    const url = new URL(`${API_ORIGIN}/.auth/login/aad`);
    url.searchParams.set("post_login_redirect_uri", `${window.location.origin}/games/`);
    window.location.assign(url.toString());
}

export function signOut(): void {
    const url = new URL(`${API_ORIGIN}/.auth/logout`);
    url.searchParams.set("post_logout_redirect_uri", `${window.location.origin}/games/`);
    window.location.assign(url.toString());
}
