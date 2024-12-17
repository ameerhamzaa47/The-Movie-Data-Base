import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 text-lg text-blue-500 hover:underline">Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;