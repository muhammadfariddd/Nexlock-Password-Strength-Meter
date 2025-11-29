import React from 'react';
import { RefreshCw } from 'lucide-react';

const strengthData = [
  { password: "$*y*h1YRX2HgHzND", strength: "Strong", color: "bg-bw-500", width: "100%" },
  { password: "L@Szos72g6ww$&", strength: "Strong", color: "bg-bw-600", width: "95%" },
  { password: "Nwd3e%zqz6TG", strength: "Good", color: "bg-bw-success", width: "75%" },
  { password: "2jWLq!*gZA2", strength: "Good", color: "bg-green-600", width: "70%" },
  { password: "*wP5W5v3i", strength: "Weak", color: "bg-bw-warning", width: "50%" },
  { password: "^Y66u&VK", strength: "Weak", color: "bg-yellow-600", width: "45%" },
  { password: "Pt%sdr", strength: "Very Weak", color: "bg-bw-danger", width: "25%" },
  { password: "4fW", strength: "Very Weak", color: "bg-red-700", width: "15%" },
];

const legends = [
  { label: "Strong", color: "bg-bw-500", time: "Centuries" },
  { label: "Good", color: "bg-bw-success", time: "Months To Years" },
  { label: "Weak", color: "bg-bw-warning", time: "Hours To Weeks" },
  { label: "Very Weak", color: "bg-bw-danger", time: "Seconds To Minutes" },
];

export default function PasswordStrengthTable() {
  return (
    <section className="bg-bw-900 max-w-7xl px-5 lg:px-9">
      <div className="flex flex-col border rounded-lg border-bw-600 px-6 py-6 lg:px-10 lg:py-10 ">
        <h2 className="text-3xl font-bold text-white mb-2">Password Strength Table</h2>
        
        <button className="flex items-center gap-2 text-bw-400 hover:text-white transition-colors mb-10 text-sm font-medium">
          <RefreshCw size={16} />
          Toggle to passphrases
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Chart Section */}
          <div className="lg:col-span-2 relative">
            <div className="space-y-1">
              {strengthData.map((item, index) => (
                <div key={index} className="relative h-12 flex items-center">
                  <div 
                    className={`h-full ${item.color} rounded-r-md flex items-center px-4 whitespace-nowrap overflow-hidden transition-all duration-1000`}
                    style={{ width: item.width }}
                  >
                    <span className="font-mono text-white font-medium text-sm drop-shadow-md">
                      {item.password}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend Section */}
          <div className="flex flex-col justify-between py-2">
            {legends.map((legend, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <div className={`w-full py-2 rounded-full ${legend.color} text-white font-bold text-lg shadow-lg`}>
                  {legend.label}
                </div>
                <div className="text-gray-400 text-sm">
                  <p className="mb-0.5">Estimated time to crack</p>
                  <p className="text-white font-medium">{legend.time}</p>
                </div>
                {index !== legends.length - 1 && (
                  <div className="w-full border-b border-bw-800 my-4 lg:hidden"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          Password Strength Test Chart. This tool uses Finite State Automata (FSA) logic for reliable password strength calculations.
        </div>
      </div>
    </section>
  );
}
