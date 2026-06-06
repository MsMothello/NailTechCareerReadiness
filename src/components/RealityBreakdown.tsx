import React, { useState } from 'react';
import { supabase } from '../lib/supabaseclient';
import { Mail, ArrowLeft } from 'lucide-react';

interface QuizResultSummary {
  pct: number;
  band: { label: string };
  worstSection: { id: string; title: string };
  bestSection: { id: string; title: string; pct: number };
}

interface RealityBreakdownProps {
  onBack: () => void;
  onSubmit?: (email: string) => void;
  quizResults?: QuizResultSummary | null;
}

export default function RealityBreakdown({ onBack, onSubmit, quizResults }: RealityBreakdownProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      if (!supabase) {
        setSubmitted(true);
        onSubmit?.(email);
        return;
      }

      const { error: supabaseError } = await supabase
        .from('email_subscribers')
        .insert([{
          email,
          ...(quizResults ? {
            overall_score: quizResults.pct,
            score_band: quizResults.band?.label,
            worst_section: quizResults.worstSection?.id,
          } : {}),
        }]);

      if (supabaseError && supabaseError.code === '23505') {
        // Duplicate email — still send results email then proceed
        await supabase.functions.invoke('send-results-email', {
          body: { email, quizResults: quizResults ?? null },
        }).catch(() => {/* non-blocking */});
        setSubmitted(true);
        onSubmit?.(email);
      } else if (supabaseError) {
        setError('An error occurred. Please try again.');
      } else {
        // Success — send results + curriculum email
        await supabase.functions.invoke('send-results-email', {
          body: { email, quizResults: quizResults ?? null },
        }).catch(() => {/* non-blocking */});
        setSubmitted(true);
        onSubmit?.(email);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Access Your Free Reality Breakdown
            </h1>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border-2 border-pink-200">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">The Reality Check: What You Need to Know</h2>
                <p className="text-gray-700 mb-4">
                  This breakdown covers everything they don't tell you about the nail industry:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>The true cost of getting licensed (including hidden expenses)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>Why 38% of students never finish—and how to avoid becoming one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>The 6-12 month client-booking struggle (and what to do about it)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>Mental and financial preparation strategies that actually work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>How to go from "not ready" to "prepared to win"</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 p-6 rounded-lg">
                <p className="text-center text-green-900 font-semibold mb-1">
                  We've sent everything to {email}
                </p>
                <p className="text-center text-green-700 text-sm">
                  Your detailed quiz results + the Master Nail Technician Training Curriculum are on their way. Check your inbox (and spam folder just in case).
                </p>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {quizResults ? (
            <>
              <div className="flex justify-center mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase" style={{background:"#f3e5f5", color:"#7B1FA2"}}>
                  {quizResults.band.label} — {quizResults.pct}%
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                Your Free Reality Breakdown
              </h1>
              <p className="text-center text-gray-600 mb-8 text-lg">
                Your <span className="font-semibold text-gray-800">{quizResults.worstSection.title}</span> gap is exactly what this breakdown addresses — get the full picture before you commit.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold mb-0.5 text-center">
                Access Free Reality Breakdown
              </h1>
              <p className="text-center text-gray-600 mb-8 text-lg">
                Before taking the full quiz, get the truth about nail school
              </p>
            </>
          )}

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border-2 border-pink-200 mb-8">
            <h2 className="font-semibold text-lg mb-3 text-gray-900">What's Included:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold">✓</span>
                <span>Real statistics on student dropout rates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold">✓</span>
                <span>Hidden costs nobody mentions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold">✓</span>
                <span>Why the first 6-12 months are the hardest</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-600 font-bold">✓</span>
                <span>Preparation strategies that work</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your email to access
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 transition-colors"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Sending...' : 'Get Free Reality Breakdown'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            We respect your privacy. No spam, just real insights.
          </p>
        </div>
      </div>
    </div>
  );
}
