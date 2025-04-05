'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function Admin() {
    const router = useRouter();
    const [password, setPassword] = useState("");   
    const [passwordFlag, setPasswordFlag] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/admin/auth", {password});
            const loginResponse = response.data;
            if (loginResponse.success) {
                console.log("CLIENT: admin successfully logged in");
                router.push("/");
            } else {
                console.log("CLIENT: admin password attempt failed");
                setPassword("");
                setPasswordFlag(true);
            }
        } catch (error) {
            console.error("CLIENT: error logging in: ", error);
        }
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
            <h3 className="mb-6 text-xl font-semibold text-gray-700">Admin Login</h3>
            <form className="flex flex-col text-center gap-4 w-80 p-6 bg-white shadow-md rounded-lg" action="submit" onSubmit={handleLogin}>
                <input 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Enter your password" 
                    required
                />
                <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors" type="submit">Enter</button>
                {passwordFlag ? (
                    <p className="text-red-500 text-sm transition-opacity duration-1000 ease-in-out opacity-100">
                        Password incorrect, please try again
                    </p>
                ) : null }
            </form>    
        </div>
    );
    
};