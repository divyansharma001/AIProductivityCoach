import React, { useEffect } from 'react';
import { 
  MessageCircle, 
  Brain, 
  LineChart, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Coffee, 
  Moon, 
  Sparkles,
  BarChart3,
  Zap,
  Target,
  BellRing,
  Share2
} from 'lucide-react';

// Animation utility function
const useAnimateOnScroll = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const items = document.querySelectorAll('.animate-on-scroll');
      
      items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
          item.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check on load
    setTimeout(animateOnScroll, 100);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
};

const Features = () => {
  useAnimateOnScroll();
  
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Complete AI Productivity System
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Beyond just tracking what you did, we uncover <span className="font-semibold">why</span> your productivity fluctuates and how to optimize it.
          </p>
        </div>
        
        {/* Conversational Interface Feature */}
        <div className="mb-20 sm:mb-28 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-blue-100 rounded-lg p-2 mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Natural Conversation</h3>
              <p className="text-gray-600 mb-6 text-lg">
                No more rigid time trackers and form fields. Simply chat with your coach through text or voice messages about your day, goals, and challenges.
              </p>
              <ul className="space-y-3">
                {[
                  "Type or speak naturally about your day",
                  "Answer simple questions about your focus and energy",
                  "Get personalized insights without data entry burden"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 bg-blue-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl opacity-70"></div>
              
              {/* Chat Interface Illustration */}
              <div className="relative space-y-4 z-10">
                <div className="flex items-start gap-3 animate-float-slow">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4 text-sm max-w-xs">
                    <p>How was your focus today? What were your most productive hours?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end animate-float-slow animation-delay-300">
                  <div className="bg-blue-100 rounded-2xl p-4 text-sm max-w-xs">
                    <p>Morning was great! I finished two big tasks before lunch. But I struggled to focus around 2-4 PM.</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-medium">You</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 animate-float-slow animation-delay-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4 text-sm max-w-xs">
                    <p>I've noticed this afternoon pattern. On days you have carb-heavy lunches, your focus drops by 40% from 2-4 PM. Would you like some alternatives to try?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Root Cause Analysis Feature */}
        <div className="mb-20 sm:mb-28 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-50 rounded-full blur-2xl opacity-70"></div>
              
              {/* Root Cause Illustration */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-full rounded-xl bg-gray-50 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Your Focus Patterns</h4>
                    <span className="text-xs text-gray-500">Last 30 days</span>
                  </div>
                  <div className="h-40 flex items-end space-x-2 mb-2">
                    {[60, 80, 30, 75, 40, 90, 25].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-sm flex-1 animate-grow-bar" 
                        style={{height: `${height}%`, animationDelay: `${i * 150}ms`}}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="flex items-center space-x-3 border-b border-gray-100 pb-4 mb-4 animate-fade-in animation-delay-500">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                      <Moon className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium">Sleep Quality</div>
                      <div className="text-sm text-gray-500">Focus drops 35% after less than 6hr sleep</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 border-b border-gray-100 pb-4 mb-4 animate-fade-in animation-delay-700">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Meal Timing</div>
                      <div className="text-sm text-gray-500">Carb-heavy lunches cause 2PM slumps</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 animate-fade-in animation-delay-900">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Meeting Schedule</div>
                      <div className="text-sm text-gray-500">Back-to-back calls reduce output by 40%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-yellow-100 rounded-lg p-2 mb-4">
                <LineChart className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Root Cause Analysis</h3>
              <p className="text-gray-600 mb-6 text-lg">
                We identify the real factors behind your productivity fluctuations by connecting your work output to your lifestyle patterns.
              </p>
              <ul className="space-y-3">
                {[
                  "Discover how sleep quality affects your focus hours",
                  "See which meeting patterns drain your energy most",
                  "Understand how meal timing impacts afternoon slumps"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 bg-yellow-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Smart Recommendations Feature */}
        <div className="mb-20 sm:mb-28 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-purple-100 rounded-lg p-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Receive personalized, actionable advice on how to optimize your schedule, environment, and habits for peak performance.
              </p>
              <ul className="space-y-3">
                {[
                  "Identify your personal \"Golden Hours\" for deep work",
                  "Get scheduling recommendations based on your energy patterns",
                  "Receive lifestyle adjustments that boost your specific focus challenges"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 bg-purple-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-50 rounded-full blur-2xl opacity-70"></div>
              
              {/* Recommendations Illustration */}
              <div className="relative z-10 space-y-5">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 animate-float-slow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <h4 className="font-medium">Your Optimal Schedule</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">9:00 - 11:30 AM</span>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Deep Work</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">12:30 - 1:30 PM</span>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Light Lunch + Walk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">2:00 - 4:00 PM</span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Meetings & Calls</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">4:30 - 6:00 PM</span>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Deep Work</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 animate-float-slow animation-delay-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium">Golden Hour Alert</h4>
                  </div>
                  <p className="text-sm text-gray-700">Your focus is 32% higher from 9-11 AM. Schedule your most important tasks during this time.</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4 animate-float-slow animation-delay-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Coffee className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Habit Suggestion</h4>
                  </div>
                  <p className="text-sm text-gray-700">Try a protein-rich breakfast before 8 AM. Users with your pattern saw a 27% focus increase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shareable Reports Feature */}
        <div className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl opacity-70"></div>
              
              {/* Reports Illustration */}
              <div className="relative z-10">
                <div className="bg-white rounded-xl shadow-md p-5 mb-6 animate-float-slow">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-medium">Weekly Progress</h4>
                    </div>
                    <Share2 className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deep Work Hours</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">18.5 hrs</span>
                        <span className="text-xs text-green-600 bg-green-50 px-1 py-0.5 rounded">+12%</span>
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full w-3/4 bg-indigo-500 rounded-full animate-grow-horizontal"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Focus Quality Score</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">8.4/10</span>
                        <span className="text-xs text-green-600 bg-green-50 px-1 py-0.5 rounded">+0.6</span>
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full w-4/5 bg-indigo-500 rounded-full animate-grow-horizontal animation-delay-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-xl p-4 animate-float-slow animation-delay-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-medium text-sm">Most Productive Day</h4>
                    </div>
                    <p className="text-xl font-bold">Tuesday</p>
                    <p className="text-xs text-gray-500">4.2 hrs of deep work</p>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-xl p-4 animate-float-slow animation-delay-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <BellRing className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-medium text-sm">Biggest Focus Win</h4>
                    </div>
                    <p className="text-sm font-medium">Morning routines are working!</p>
                    <p className="text-xs text-gray-500">38% increase in AM focus</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-indigo-100 rounded-lg p-2 mb-4">
                <Share2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Shareable Reports</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Celebrate your progress with beautifully designed reports that track your improvements and can be shared with your team or on social media.
              </p>
              <ul className="space-y-3">
                {[
                  "Weekly summaries of your productivity achievements",
                  "Beautiful visualizations of your improvement trends",
                  "Personalized insights on your biggest productivity wins"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 bg-indigo-100 rounded-full p-1">
                      <ArrowRight className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes grow-bar {
          0% { height: 0%; }
          100% { height: 100%; }
        }
        
        @keyframes grow-horizontal {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        
        .animate-grow-bar {
          animation: grow-bar 1s ease-out forwards;
        }
        
        .animate-grow-horizontal {
          animation: grow-horizontal 1.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default Features; 