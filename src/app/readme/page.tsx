export default function Readme() {
  return (
    <div className="bg-white p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Readme</h1>
        <p className="text-gray-700 mb-4">
            Developers readme. This page includes everything you should know for contributing to this project - SJSU MTC
        </p>

        <h2 className="text-xl font-semibold mt-4">Source Code: <a href="https://github.com/FardinHaque60/sjsumsa" target="_blank" className="underline hover:text-blue-800">sjsumsa</a>
        </h2>

        <h2 className="text-xl font-semibold mt-4">Milestones:</h2>
        <p className="">
            See <a href="https://github.com/FardinHaque60/sjsumsa/issues" target="_blank" className="underline hover:text-blue-800">
            GitHub Issues
            </a> for details on each feature.
        </p>

        <ol className="list-decimal pl-6 space-y-6 mt-4">
            {/* TODO: Add icons from Angular icon library below */}
            <li className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Basic Features</h3>
                <p className="text-gray-600">Approx. deploy date: <span className="font-medium">April 5th</span></p>
                
                <h4 className="text-md font-medium mt-2">Features:</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Homepage UI</li>
                    <li>About, Programs, Events, Resources Pages</li>
                    <li>Admin panel for managing events</li>
                </ul>
            </li>

            <li className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Reach Features</h3>
                <p className="text-gray-600">Approx. deploy date: <span className="font-medium">May 5th</span></p>

                <h4 className="text-md font-medium mt-2">Features:</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Handling events in-house (email system, view registered users, etc.)</li>
                    <li>Donation Handling</li>
                </ul>
            </li>
        </ol>
    </div>
  );
}
