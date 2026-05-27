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

const getPath = (path) => {
    if (Array.isArray(path)) return path.join("/");
    return path || "";
};

const getTargetPath = (req) => {
    const queryPath = getPath(req.query?.path);
    if (queryPath) return queryPath;

    const pathname = new URL(req.url || "", "https://localhost").pathname;
    const proxyPrefix = "/api/proxy/";

    if (pathname.startsWith(proxyPrefix)) {
        return decodeURIComponent(pathname.slice(proxyPrefix.length));
    }

    return "";
};

export default async function handler(req, res) {
    res.setHeader("x-waymore-proxy", "hit");

    if (!TARGET_API_URL) {
        res.status(500).json({ message: "WAYMORE_API_URL is not configured" });
        return;
    }

    const targetPath = getTargetPath(req);

    if (targetPath === "_proxy-health") {
        res.status(200).json({ ok: true });
        return;
    }

    const targetUrl = new URL(`/api/${targetPath}`, TARGET_API_URL);

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

    try {
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
    } catch (error) {
        res.status(502).json({
            message: "Failed to proxy API request",
            detail: error instanceof Error ? error.message : String(error),
        });
    }
}
