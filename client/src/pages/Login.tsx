import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"

type Inputs = {
    email: string
    password: string
}

const Login = () => {
    useEffect(() => {
        document.title = "VivahStore | Login";
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className="flex h-screen w-full bg-stone-50 relative">
            <div className="w-full hidden md:inline-block">
                <img className="h-full w-full object-cover" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
            </div>


            <div className="w-full flex flex-col items-center justify-center">

                <form onSubmit={handleSubmit(onSubmit)} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <Link to="/"><img className='w-50 mb-5' src="/Assets/Logo.svg" alt="Logo" /></Link>

                    <h2 className="text-4xl text-stone-900 font-medium">Sign In</h2>
                    <p className="text-sm text-stone-500/90 mt-3">Sign in to your account</p>

                    <button type="button" className="cursor-pointer w-full mt-8 bg-stone-500/10 flex items-center justify-center h-12 rounded-full">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                    </button>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-stone-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-stone-500/90">or sign in with email</p>
                        <div className="w-full h-px bg-stone-300/90"></div>
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <MdOutlineAlternateEmail className="text-stone-500/80" />
                        <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email id" className="bg-transparent text-stone-700 placeholder-stone-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <LuKeyRound className="text-stone-500/80" />
                        <input {...register("password", { required: "Password is required" })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-transparent text-stone-700 placeholder-stone-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                        {showPassword ? (
                            <FiEye
                                className="text-stone-500/80 mr-5 text-xl cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <FiEyeOff
                                className="text-stone-500/80 mr-5 text-xl cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>

                    <div className="w-full flex items-center justify-end mt-8 ">
                        <a className="text-sm underline text-stone-500 hover:text-stone-600" href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-[#E41F66] hover:scale-101 transition-all cursor-pointer">
                        Sign In
                    </button>
                    <p className="text-stone-500/90 text-sm mt-4">Don't have an account? <Link className="text-stone-700 hover:underline" to="/register">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login