import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import checkAdminStatus from '@/lib/admin/adminStatus';
import axios from 'axios';

const Navbar: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdminStatus().then((status) => {
                setIsAdmin(status);
            }
        );
    }, []);

    const handleLogout = async () => {
        await axios.delete('/api/admin/auth')
            .then(() => {
                window.location.href = '/';
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="rounded-b-2xl bg-amber-50 p-4 px-7 w-full absolute top-0 left-0 z-10">
            <div className="max-w-[100%] mx-auto flex justify-between items-center">

                <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center">
                    <Image 
                        width={70}
                        height={70}
                        src="/images/msa_logo1.png" 
                        alt="msa logo" 
                    />
                </Link>
                </div>

                <ul className="flex space-x-8 pr-8">
                <li><a href="/events" className="text-black hover:text-gray-900 text-lg">Events</a></li>
                <li><a href="/programs" className="text-black hover:text-gray-900 text-lg">Programs</a></li>
                <li><a href="/resources" className="text-black hover:text-gray-900 text-lg">Resources</a></li>
                <li><a href="/about" className="text-black hover:text-gray-900 text-lg">About</a></li>
                {isAdmin &&
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 rounded hover:bg-red-600 text-lg cursor-pointer"
                    >
                        Logout
                    </button>
                }
                </ul>
            </div>
        </div>
    );
}

export default Navbar;