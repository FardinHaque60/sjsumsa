import axios from "axios";

export async function checkAdminStatus() {
    const response = await axios.get("api/admin/status", {
        withCredentials: true
    });
    console.log("CLIENT: admin status - ", response.data.authenticated);
    return response.data.authenticated;
};