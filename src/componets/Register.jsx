import React from 'react'
import { Link } from 'react-router-dom';

export const Register = () => {
    return (
        <div className='mt-12'>
            <h4 className='text-center text-lg font-semibold' >Please contact the admin</h4>
             <div className="mt-4 flex justify-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
                            Login here
                        </Link>
                    </p>
                </div>
        </div>
    )
}
