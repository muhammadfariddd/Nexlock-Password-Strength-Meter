import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- FSA Logic (Hidden from UI) ---
// State Tuple: (Length, HasLower, HasUpper, HasNumber, HasSpecial)
const initialState = { length: 0, hasLower: false, hasUpper: false, hasNumber: false, hasSpecial: false };

const transition = (currentState, char) => {
    const newState = { ...currentState };
    newState.length = currentState.length + 1;
    if (/[a-z]/.test(char)) newState.hasLower = true;
    if (/[A-Z]/.test(char)) newState.hasUpper = true;
    if (/[0-9]/.test(char)) newState.hasNumber = true;
    if (/[^a-zA-Z0-9]/.test(char)) newState.hasSpecial = true;
    return newState;
};

const runFSA = (password) => {
    let state = { ...initialState };
    for (let char of password) {
        state = transition(state, char);
    }
    return state;
};

// --- Entropy & Time Calculation ---
const calculateCrackTime = (fsaState) => {
    if (fsaState.length === 0) return { time: "0", label: "", color: "gray", score: 0 };

    let poolSize = 0;
    if (fsaState.hasLower) poolSize += 26;
    if (fsaState.hasUpper) poolSize += 26;
    if (fsaState.hasNumber) poolSize += 10;
    if (fsaState.hasSpecial) poolSize += 33;

    if (poolSize === 0) poolSize = 1; // Fallback

    const entropy = fsaState.length * Math.log2(poolSize);
    
    // Assume 10 billion guesses per second (high-end GPU array)
    const guessesPerSecond = 1e10;
    const seconds = Math.pow(2, entropy) / guessesPerSecond;

    let timeString = "";
    let label = "Very Weak";
    let color = "danger";
    let score = 1;

    // Time Formatting
    if (seconds < 1) timeString = "Less Than A Second";
    else if (seconds < 60) timeString = `${Math.floor(seconds)} Seconds`;
    else if (seconds < 3600) timeString = `${Math.floor(seconds / 60)} Minutes`;
    else if (seconds < 86400) timeString = `${Math.floor(seconds / 3600)} Hours`;
    else if (seconds < 2629746) timeString = `${Math.floor(seconds / 86400)} Days`;
    else if (seconds < 31536000) timeString = `${Math.floor(seconds / 2629746)} Months`;
    else if (seconds < 31536000 * 100) timeString = `${Math.floor(seconds / 31536000)} Years`;
    else timeString = "Centuries";

    // Strength Classification
    // Criteria based on visual references and general security standards
    if (fsaState.length < 8) {
        label = "Very Weak";
        color = "danger";
        score = 1;
    } else {
        if (seconds < 3600) { // < 1 Hour
            label = "Very Weak";
            color = "danger";
            score = 1;
        } else if (seconds < 2629746) { // < 1 Month
            label = "Weak";
            color = "warning";
            score = 2;
        } else if (seconds < 31536000 * 100) { // < 100 Years
            label = "Good";
            color = "success";
            score = 3;
        } else {
            label = "Strong";
            color = "bw-500";
            score = 4;
        }
    }

    return { time: timeString, label, color, score, entropy };
};

export default function PasswordStrengthMeter() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const fsaState = useMemo(() => runFSA(password), [password]);
    const analysis = useMemo(() => calculateCrackTime(fsaState), [fsaState]);

    // Helper to get Tailwind classes based on color name
    // Since colors are nested under 'bw' in tailwind.config.js, we need to prefix them
    const getColorClass = (colorName) => {
        switch(colorName) {
            case 'danger': return 'text-bw-danger';
            case 'warning': return 'text-bw-warning';
            case 'success': return 'text-bw-success';
            case 'bw-500': return 'text-bw-500';
            default: return 'text-white';
        }
    };
    
    const getBgClass = (colorName) => {
        switch(colorName) {
            case 'danger': return 'bg-bw-danger';
            case 'warning': return 'bg-bw-warning';
            case 'success': return 'bg-bw-success';
            case 'bw-500': return 'bg-bw-500';
            default: return 'bg-gray-700';
        }
    };

    const textColor = password ? getColorClass(analysis.color) : 'text-white';
    const barColor = password ? getBgClass(analysis.color) : 'bg-transparent';
    const badgeBg = password ? getBgClass(analysis.color) : 'hidden';

    return (
        <div className="lg:max-w-8xl m-auto px-5 lg:px-9">
           
            <div className="bg-bw-800 rounded-2xl p-8 shadow-xl py-10 lg:py-16 px-5 lg:px-32">
                 <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">Password Strength Testing Tool</h2>
                <p className="text-gray-400 text-lg">Think you have a strong password? Find out below.</p>
             </div>
                {/* Input Section */}
                <div className="relative mb-8 group">
                    <label className="absolute -top-3 left-4 bg-bw-800 px-2 text-sm text-gray-400 z-10">
                        Evaluate your password:
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cn(
                                "w-full bg-bw-800 border border-bw-600 rounded-lg py-6 px-5 text-2xl outline-none transition-all focus:border-bw-400 font-medium tracking-wide",
                                textColor
                            )}
                            placeholder=""
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                    </div>
                </div>

                {/* Strength Indicator Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Your password strength</h3>
                        {password && (
                            <span className={cn("px-6 py-2 rounded-full text-white font-bold text-sm transition-colors shadow-sm", badgeBg)}>
                                {analysis.label}
                            </span>
                        )}
                    </div>
                    
                    {/* Strength Bar */}
                    <div className="h-4 w-full bg-bw-900 rounded-full overflow-hidden">
                        <div 
                            className={cn("h-full transition-all duration-500 ease-out rounded-full", barColor)}
                            style={{ width: password ? `${(analysis.score / 4) * 100}%` : '0%' }}
                        />
                    </div>
                    
                    {/* Time to crack */}
                    <div className="pt-2">
                        <p className="text-gray-400 text-sm">
                            Estimated time to crack : <span className="text-white font-bold ml-1">{analysis.time}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
