import axios from "axios";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link} from "react-router-dom";
// import toast from "react-hot-toast";

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

          await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`, {
            user_data: formData.email,
            password: formData.password
          })

          window.location.reload();
          
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-12">
            <div className="w-full max-w-md p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <img src="/Leaf.svg" alt="leaf" className="size-6" />
                        <span className="text-2xl font-bold text-primary-green">JERIM</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Sign in to your account</h2>
                </div>

                <form className="space-y-4 text-black" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full placeholder:text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="w-full placeholder:text-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                        />
                        <div
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
                        >
                            {showPassword ? (
                                <EyeClosed className="text-black" />
                            ) : (
                                <Eye className="text-black" />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-black">
                        <Link to="/" className="px-3 py-1.5 flex items-center gap-1 text-sm font-semibold hover:underline">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <button
                            type="submit"
                            className="px-5 py-1.5 font-semibold bg-primary-green text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    </div>

                    <Link
                        to={`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google`}
                        className="p-1.5 px-4 flex items-center justify-center gap-2 border rounded-full font-semibold text-black"
                    >
                        <img src="/google-icon.svg" alt="google" width={18} />
                        <span>Sign in with Google</span>
                    </Link>

                    <p className="text-center text-sm text-black">Don't have an account? <Link to="/auth/register" className="text-primary-green hover:underline">Register here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signin;