const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-700 mt-4">You do not have permission to access this page!</p>
      </div>
    </div>
  );
};

export default AccessDenied;
