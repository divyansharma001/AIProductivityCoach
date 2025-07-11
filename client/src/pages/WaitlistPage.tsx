import React, { useState } from 'react';

const WaitlistPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      // TODO: Use import.meta.env.VITE_API_BASE_URL
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/waitlist/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(`You have been added to the waitlist! You are number ${data.totalCount}.`);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to join waitlist.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="w-full text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Join the Founder's Circle</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Be among the first to experience a revolutionary AI productivity coach that understands the real drivers of your focus and performance.
        </p>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4 mb-3 sm:mb-0">
            <span className="text-yellow-600 font-medium">1</span>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-1">Early Access Opportunity</h2>
            <p className="text-gray-600 text-sm">
              Few early members on the waitlist get exclusive beta access and 6 months free.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your email</label>
        <input
              id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
          required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-300 focus:ring focus:ring-yellow-100 focus:ring-opacity-50 outline-none transition-colors"
        />
          </div>
          
        <button
          type="submit"
          disabled={status === 'loading'}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
            {status === 'loading' ? 'Processing...' : 'Join Waitlist'}
        </button>
          
      {message && (
            <div className={`mt-3 text-center p-3 rounded-lg ${status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
      
      {/* New Features Showcase */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Your Personal AI Productivity Coach</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
            <h3 className="font-medium text-lg mb-4">Personalized Conversations</h3>
            <div className="space-y-4 mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">AI</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  What are your main productivity goals? How much time do you want to dedicate to work each day?
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-yellow-100 rounded-lg p-3 text-sm">
                  I want to focus better on deep work, aiming for about 5 hours of focused work daily.
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">You</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">AI</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  Tell me about your typical daily schedule. When do you usually start work, take breaks, and have meals?
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Through natural conversations, your AI coach learns your unique patterns, preferences, and challenges.
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
            <h3 className="font-medium text-lg mb-4">Daily Check-ins & Insights</h3>
            <div className="space-y-4 mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">AI</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  What have you accomplished today? How did your focus feel during different parts of the day?
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-yellow-100 rounded-lg p-3 text-sm">
                  Finished two major tasks this morning but struggled after lunch around 2 PM.
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">You</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium">AI</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  I've noticed a pattern in your afternoon energy dips. This often happens when your lunch contains refined carbs. Consider switching to a protein-rich lunch to maintain energy.
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Your coach identifies patterns in your productivity and provides actionable advice based on your personal data.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
            <h3 className="font-medium mb-3">Personalized Reports</h3>
            <p className="text-gray-600 text-sm mb-3">
              Beautiful, shareable reports showcase your productivity achievements and patterns.
            </p>
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500 border border-gray-100">
              "Your focus peaks between 9-11 AM. You've increased deep work by 27% this month!"
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
            <h3 className="font-medium mb-3">Focus Deficit Detection</h3>
            <p className="text-gray-600 text-sm mb-3">
              AI identifies exactly when and why your focus typically deteriorates during the day.
            </p>
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500 border border-gray-100">
              "Your focus drops at 2 PM on days following less than 7 hours of sleep."
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
            <h3 className="font-medium mb-3">Schedule Optimization</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get personalized recommendations to adjust your daily routine for maximum productivity.
            </p>
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-500 border border-gray-100">
              "Try shifting your deep work to mornings and meetings to afternoons."
            </div>
          </div>
        </div>
      </div>
      
      {/* Weekly/Monthly Reports Section */}
      <div className="w-full max-w-2xl bg-white rounded-lg border border-gray-100 p-6 sm:p-8 shadow-sm mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Comprehensive Progress Tracking</h2>
        
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-1">
            <h3 className="font-medium mb-3">Weekly Performance Summaries</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Detailed productivity patterns analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Focus time distribution throughout the week</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Correlation between lifestyle factors and productivity</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-3">Monthly Trend Reports</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Long-term progress visualization</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Habit formation and consistency tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Personalized recommendations for continued improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* What You'll Get / Premium Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="font-medium mb-2">What You'll Get</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Daily conversations with your AI Coach via text or voice</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Understand how lifestyle factors impact your productivity</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Personalized focus slump diagnosis</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>AI-powered goal decomposition</span>
            </li>
          </ul>
        </div>
        
        <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="font-medium mb-2">Premium Features</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Voice-to-text journaling</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Proactive scheduled emails at optimal times</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Calendar and health app integrations</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="font-medium mb-3">Smart Scheduled Emails</h3>
          <p className="text-gray-600 text-sm">
            Receive perfectly timed emails with insights and reminders at your most receptive moments, based on your personal productivity patterns.
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="font-medium mb-3">Holistic Performance Analysis</h3>
          <p className="text-gray-600 text-sm">
            Discover connections between your sleep quality, meal timing, meeting schedule, and focus levels to optimize your daily routine.
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="font-medium mb-3">"Golden Hour" Identification</h3>
          <p className="text-gray-600 text-sm">
            Let your AI coach identify your peak productivity windows and help you schedule your most important tasks during these optimal times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage; 