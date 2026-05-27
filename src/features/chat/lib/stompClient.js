/**
 * STOMP 프레임 개체 클래스
 */
export class StompFrame {
    constructor(command, headers = {}, body = "") {
        this.command = command;
        this.headers = headers;
        this.body = body;
    }

    /**
     * 프레임을 STOMP 텍스트 스트림 변환
     * @returns 
     */
    toString() {
        let str = `${this.command}\n`;
        Object.entries(this.headers).forEach(([key, value]) => {
            str += `${key}:${value}\n`;
        });
        str += `\n${this.body}\u0000`;
        return str;
    }

    static parse(rawString) {
        const cleaned = rawString.replace(/\0+$/, "").trim();
        const parts = cleaned.split("\n\n");
        const headerLines = parts[0].split("\n");
        const command = headerLines[0].trim();
        const headers = {};

        for (let i = 1; i < headerLines.length; i++) {
            const line = headerLines[i].trim();
            if (!line) continue;
            const index = line.indexOf(":");
            if (index !== -1) {
                const key = line.substring(0, index).trim();
                const val = line.substring(index + 1).trim();
                headers[key] = val;
            }
        }

        const body = parts.slice(1).join("\n\n");
        return new StompFrame(command, headers, body);
    }
}

/**
 * STOMP 클라이언트 매니저 클래스
 */
export class StompClient {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.ws = null;
        this.subscriptions = new Map();
        this.isConnected = false;
        this.onConnectCallback = null;
        this.onDisconnectCallback = null;
        this.onErrorCallback = null;
    }

    connect(onConnect, onError) {
        this.onConnectCallback = onConnect;
        this.onErrorCallback = onError;

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            const connectFrame = new StompFrame("CONNECT", {
                "accept-version": "1.1,1.2",
                "heart-beat": "10000,10000",
                "Authorization": `Bearer ${this.token}`
            });
            this.ws.send(connectFrame.toString());
        };

        this.ws.onmessage = (event) => {
            const rawData = event.data;
            const frame = StompFrame.parse(rawData);
            this.handleFrame(frame);
        };

        this.ws.onclose = () => {
            this.isConnected = false;
            if (this.onDisconnectCallback) {
                this.onDisconnectCallback();
            }
        };

        this.ws.onerror = (err) => {
            if (this.onErrorCallback) {
                this.onErrorCallback(err);
            }
        };

    }


    disconnect() {
        if (this.ws) {
            const disconnectFrame = new StompFrame("DISCONNECT");
            try {
                this.ws.send(disconnectFrame.toString());
            } catch (err) {}
            this.ws.close();
        }

        this.isConnected = false;
    }

    subscribe(destination, callback) {
        const subId = `sub-${Math.random().toString(36).substring(2, 11)}`;
        this.subscriptions.set(destination, { subId, callback });

        if (this.isConnected) {
            const subscribeFrame = new StompFrame("SUBSCRIBE", {
                id: subId,
                destination: destination
            });
            this.ws.send(subscribeFrame.toString());
        }

        return () => {
            this.unsubscribe(destination);
        };
    }


    unsubscribe(destination) {
        const sub = this.subscriptions.get(destination);
        if (sub) {
            if (this.isConnected) {
                const unsubFrame = new StompFrame("UNSUBSCRIBE", {
                    id: sub.subId
                });
                this.ws.send(unsubFrame.toString());
            }
            this.subscriptions.delete(destination);
        }
    }



    send(destination, bodyObj) {
        if (!this.isConnected) {
            return;
        }
        const sendFrame = new StompFrame("SEND", {
            destination: destination,
            "content-type": "application/json"
        }, JSON.stringify(bodyObj));

        this.ws.send(sendFrame.toString());
    }

    handleFrame(frame) {
        if (frame.command === "CONNECTED") {
            this.isConnected = true;

            this.subscriptions.forEach((sub, dest) => {
                const subscribeFrame = new StompFrame("SUBSCRIBE", {
                    id: sub.subId,
                    destination: dest
                });
                this.ws.send(subscribeFrame.toString());
            });

            if (this.onConnectCallback) {
                this.onConnectCallback();
            }
        } else if (frame.command === "MESSAGE") {
            const dest = frame.headers["destination"];
            const sub = this.subscriptions.get(dest);
            if (sub && sub.callback) {
                try {
                    const parsedBody = JSON.parse(frame.body);
                    sub.callback(parsedBody);
                } catch (err) {
                    sub.callback(frame.body);
                }
            }
        } else if (frame.command === "ERROR") {
            if (this.onErrorCallback) {
                this.onErrorCallback(new Error(frame.body || "STOMP Protocol Error"));
            }
        }
    }
}