export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="text-center px-6 py-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700">You do not have permission to view this page.</p>
            </div>
        </div>
    );
}
