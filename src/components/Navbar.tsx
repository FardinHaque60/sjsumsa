import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
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
                <li><a href="#" className="text-black hover:text-gray-900 text-lg">Events</a></li>
                <li><a href="#" className="text-black hover:text-gray-900 text-lg">Programs</a></li>
                <li><a href="#" className="text-black hover:text-gray-900 text-lg">Resources</a></li>
                <li><a href="#" className="text-black hover:text-gray-900 text-lg">About</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;