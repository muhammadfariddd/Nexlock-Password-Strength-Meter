import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Is it safe to type my real password here?",
    answer: "Yes. Your password is never transmitted to our servers and is processed locally in your device's web browser."
  },
  {
    question: "How do I create a strong password?",
    answer: "A strong password should be long (at least 12 characters), include a mix of uppercase and lowercase letters, numbers, and symbols, and avoid common words or personal information."
  },
  {
    question: "How do you calculate password strength?",
    answer: "We use a Finite State Automata (FSA) model to analyze your password against various criteria such as length, character variety, and complexity patterns to determine its strength."
  },
  {
    question: "What's the best way to manage my passwords?",
    answer: "The best way is to use a reputable password manager. It allows you to generate unique, strong passwords for every account and stores them securely."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bw-800/50 border border-bw-600/30 rounded-lg overflow-hidden transition-all duration-200 hover:border-bw-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-white font-medium text-lg pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-bw-400 min-w-[20px]" size={20} />
        ) : (
          <ChevronDown className="text-bw-400 min-w-[20px]" size={20} />
        )}
      </button>
      
      <div 
        className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 !== 0);

  return (
    <section className="bg-bw-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Password FAQ
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-start">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {leftColumnFaqs.map((faq, index) => (
              <FAQItem key={`left-${index}`} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {rightColumnFaqs.map((faq, index) => (
              <FAQItem key={`right-${index}`} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
