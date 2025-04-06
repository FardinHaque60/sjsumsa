export default function Readme() {
  return (
    <div className="bg-white p-8 w-full h-screen">
        <h1 className="text-3xl font-bold mb-4">Readme</h1>
        <p className="text-gray-700 mb-4">
            Salam Admin. Here are some guidelines/ resources for administrating this site 
            - SJSU MTC
        </p>

        <h2 className="text-xl font-semibold mt-4">Source Code: <a href="https://github.com/FardinHaque60/sjsumsa" target="_blank" className="underline hover:text-blue-800">sjsumsa</a>
        </h2>

        <h2 className="text-xl font-semibold mt-4">Contact:</h2>
        <p>Reach out to: (TBD) for additional resources like cloud db access, etc. </p>

        <h2 className="text-xl font-semibold mt-4">Admin Functions:</h2>
        <p className="">
            The below items outline what an admin can do to maintain this site
        </p>

        <ul className="list-disc max-w-2xl pl-6 space-y-6 mt-4">
            <li className="bg-amber-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Login</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>navigate to the <a href="/adminLogin" className="underline hover:text-blue-800">admin portal</a> and enter the password.</li>
                    <li>
                        you will be redirected to the homepage where you will see 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block w-4 h-4 mx-1"> 
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /> 
                        </svg>
                        icons. this indicates those fields are editable.
                    </li>
                    <p>Note: all changes you save will be effectively immediately.</p>
                </ul>
            </li>

            <li className="bg-amber-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Update Iqamah Times</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>ensure you are logged in as admin (see above)</li>
                    <li>
                        navigate to the 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block w-4 h-4 mx-1"> 
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /> 
                        </svg>
                        icon in the table of &quot;Daily Prayer Info&quot; section.
                    </li>
                </ul>
            </li>

            <li className="bg-amber-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Create/ Delete Events</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>ensure you are logged in as admin (see above)</li>
                    <li>coming soon...</li>
                </ul>
            </li>
        </ul>
    </div>
  );
}
