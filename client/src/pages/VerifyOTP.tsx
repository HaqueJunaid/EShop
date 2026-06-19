import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";

const VerifyOTP = () => {
    useEffect(() => {
        document.title = "VivahStore | Verify OTP";
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Get email from location state
    const email = location.state?.email || "";

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            // Add your OTP verification API call here
            // const response = await fetch("/api/verify-otp", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ email, otp: otpCode }),
            // });
            // const data = await response.json();

            // Mock verification - replace with actual API call
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                // Redirect to login or home after successful verification
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }, 1500);
        } catch (err) {
            setError("Failed to verify OTP. Please try again.");
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            // Add your resend OTP API call here
            // const response = await fetch("/api/resend-otp", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ email }),
            // });

            // Mock resend
            setTimeout(() => {
                setOtp(["", "", "", "", "", ""]);
                setError("");
                setLoading(false);
                alert("OTP resent to your email");
            }, 1000);
        } catch (err) {
            setError("Failed to resend OTP. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-stone-50 relative">
            <div className="w-full hidden md:inline-block">
                <img
                    className="h-full w-full object-cover"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
                    alt="leftSideImage"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <form onSubmit={handleVerifyOtp} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <Link to="/">
                        <img className="w-50 mb-5" src="/Assets/Logo.svg" alt="Logo" />
                    </Link>

                    <h2 className="text-4xl text-stone-900 font-medium">Verify OTP</h2>
                    <p className="text-sm text-stone-500/90 mt-3">Enter the 6-digit code sent to your email</p>

                    {email && (
                        <div className="flex items-center mt-6 w-full bg-stone-100 border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <MdOutlineAlternateEmail className="text-stone-500/80" />
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="bg-transparent text-stone-700 outline-none text-sm w-full h-full"
                            />
                        </div>
                    )}

                    <div className="flex gap-2 mt-8 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-semibold border border-stone-300/60 rounded-lg focus:outline-none focus:border-[#E41F66] focus:ring-2 focus:ring-[#E41F66]/20"
                                placeholder="0"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-4 text-center">✓ OTP verified successfully!</p>}

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="mt-8 w-full h-11 rounded-full text-white bg-[#E41F66] hover:scale-101 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying..." : success ? "Verified" : "Verify OTP"}
                    </button>

                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="mt-4 w-full h-11 rounded-full text-[#E41F66] bg-[#E41F66]/10 hover:bg-[#E41F66]/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Resend OTP
                    </button>

                    <p className="text-stone-500/90 text-sm mt-4">
                        Don't want to verify? <Link className="text-stone-700 hover:underline" to="/register">Back to Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
