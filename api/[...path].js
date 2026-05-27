const TARGET_API_URL = process.env.WAYMORE_API_URL;

const HOP_BY_HOP_HEADERS = new Set([
    "connection",
    "content-length",
    "host",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
]);

const readBody = (req) =>
    new Promise((resolve, reject) => {
        const chunks = [];

        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
    });

const normalizeSetCookie = (cookie) =>
    cookie.replace(/;\s*Domain=[^;]*/gi, "");

export default async function handler(req, res) {
    if (!TARGET_API_URL) {
        res.status(500).json({ message: "WAYMORE_API_URL is not configured" });
        return;
    }

    const path = Array.isArray(req.query.path)
        ? req.query.path.join("/")
        : req.query.path || "";
    const targetUrl = new URL(`/api/${path}`, TARGET_API_URL);

    Object.entries(req.query).forEach(([key, value]) => {
        if (key === "path") return;

        if (Array.isArray(value)) {
            value.forEach((item) => targetUrl.searchParams.append(key, item));
            return;
        }

        if (value !== undefined) {
            targetUrl.searchParams.set(key, value);
        }
    });

    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
        const lowerKey = key.toLowerCase();
        if (HOP_BY_HOP_HEADERS.has(lowerKey) || value === undefined) return;

        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    });

    const hasBody = !["GET", "HEAD"].includes(req.method);
    const response = await fetch(targetUrl, {
        method: req.method,
        headers,
        body: hasBody ? await readBody(req) : undefined,
        redirect: "manual",
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (HOP_BY_HOP_HEADERS.has(lowerKey)) return;
        if (lowerKey === "set-cookie") return;

        res.setHeader(key, value);
    });

    const setCookies = typeof response.headers.getSetCookie === "function"
        ? response.headers.getSetCookie()
        : response.headers.get("set-cookie")
            ? [response.headers.get("set-cookie")]
            : [];

    if (setCookies.length > 0) {
        res.setHeader("set-cookie", setCookies.map(normalizeSetCookie));
    }

    const body = Buffer.from(await response.arrayBuffer());
    res.send(body);
}
