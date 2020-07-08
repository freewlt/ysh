
import { get, post } from "../utils/http";

export function login(data) {
    return post("/api-aus/oauth/token", data, {
        headers: {
            "Authorization": "Basic Y2xpZW50XzI6MTIzNDU2"
        }
    });
}
export function loginOut() {
    return get("/api-aus/oauth/remove/token");
}