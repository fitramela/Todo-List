// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { MongoClient } from 'mongodb';

// export default function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const client = new MongoClient(process.env.URI as string);
//             await client.connect();

//             const db = client.db('your_database_name');
//             const users = db.collection('users');

//             const user = await users.findOne({ username, password });

//             if (user) {
//                 // User authenticated successfully
//                 router.push('/dashboard'); // Redirect to dashboard or home page
//             } else {
//                 setError('Invalid username or password');
//             }

//             await client.close();
//         } catch (error) {
//             console.error('Error during login:', error);
//             setError('An error occurred during login');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//                         Username
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="username"
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         placeholder="******************"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//                 <div className="flex items-center justify-between">
//                     <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         type="submit"
//                     >
//                         Sign In
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }