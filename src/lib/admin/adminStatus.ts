import axios from "axios";

export async function checkAdminStatus() {
  const response = await axios.get("api/admin/status", {
    withCredentials: true
  });
  return response.data.authenticated;
};