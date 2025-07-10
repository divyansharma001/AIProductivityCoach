import React from 'react';
import { MessageCircle, Zap, Moon, Coffee, ArrowRight, Notebook, StickyNote as Sticky, CheckSquare, FileText, Layers, BarChart3, Target, Clock, PenTool, Calendar, Timer, Brain } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-8 tracking-tight">
              Your productivity has
              <br />
              <span className="relative">
                <span className="relative z-10">a root cause.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gray-100 -rotate-1"></span>
              </span>
              <br />
              <span className="block mt-4 text-gray-900">
                Our job is to find it.
              </span>
            </h1>
          </div>

          {/* Enhanced Illustration */}
          <div className="relative mb-20">
            {/* Improved Cloud background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[900px] h-[500px] bg-gradient-to-br from-blue-100 via-green-50 to-purple-50 rounded-full opacity-60 blur-3xl animate-pulse"></div>
            </div>
            
            {/* Main illustration container with subtle float animation */}
            <div className="relative w-full max-w-5xl h-[500px] mx-auto flex items-center justify-center animate-float">
              {/* Productivity app icons that focus on symptoms not root causes */}
              
              {/* Notion - Top */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 rotate-3 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-base font-bold">N</span>
                  </div>
                </div>
              </div>
              
              {/* Todoist - Top Right */}
              <div className="absolute top-20 right-20 transform -rotate-6 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <CheckSquare className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* RescueTime - Right */}
              <div className="absolute top-1/2 right-16 transform -translate-y-1/2 rotate-8 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Focus Apps - Bottom Right */}
              <div className="absolute bottom-20 right-20 transform -rotate-12 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Trello - Bottom */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -rotate-3 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Google Keep - Bottom Left */}
              <div className="absolute bottom-20 left-20 transform rotate-6 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Sticky className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Evernote - Left */}
              <div className="absolute top-1/2 left-16 transform -translate-y-1/2 -rotate-8 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Apple Notes - Top Left */}
              <div className="absolute top-20 left-20 transform rotate-12 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <Notebook className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Clockify - Additional time tracking */}
              <div className="absolute top-12 left-1/3 transform rotate-15 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Calendar Apps - Scheduling */}
              <div className="absolute top-12 right-1/3 transform -rotate-15 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Pomodoro Timer Apps */}
              <div className="absolute bottom-12 left-1/3 transform -rotate-9 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-red-400 rounded-lg flex items-center justify-center">
                    <Timer className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Obsidian - Knowledge management */}
              <div className="absolute bottom-12 right-1/3 transform rotate-9 transition-transform hover:scale-110 duration-300 z-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 w-20 h-20 flex items-center justify-center border-2 border-gray-100 hover:border-black/10">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Centered and Enhanced X crossing out the symptoms */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rotate-45 rounded-full shadow-2xl animate-pulse"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 -rotate-45 rounded-full shadow-2xl animate-pulse"></div>
                  {/* Add glow effect */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-4 bg-red-400 rotate-45 rounded-full blur-sm opacity-50"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-4 bg-red-400 -rotate-45 rounded-full blur-sm opacity-50"></div>
                </div>
              </div>

              {/* Enhanced speech bubbles with clear messaging that these tools don't work */}
              <div className="absolute top-4 left-8 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                    <span className="text-xl">😰</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-gray-900"></div>
                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap">NOTION ISN'T HELPING!</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-6 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">TODOIST MADE IT WORSE!</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😤</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-12 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😫</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">RESCUETIME SHOWS THE PROBLEM!</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-8 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">FOCUS APPS DON'T WORK!</p>
                  </div>
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😩</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">🤔</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">EVERNOTE JUST COLLECTS DUST!</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">TRELLO BOARDS ARE CHAOS!</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😵</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/3 left-1/4 transform rotate-3 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😔</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">TIMERS STRESS ME OUT!</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/3 right-1/4 transform -rotate-3 animate-bounce-slow z-30">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">CALENDARS DON'T STICK!</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moved and Enhanced Content Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
              Traditional tools only show you the symptoms: distraction, procrastination, burnout. Our conversational AI Coach listens to your day to identify the source, connecting your focus to the crucial factors of sleep, energy, and well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="group relative bg-gradient-to-r from-green-600 to-green-500 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3 overflow-hidden">
                <span className="relative z-10">Start Understanding for Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              
              <div className="text-sm text-gray-500 max-w-sm p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                <span className="text-purple-600 font-semibold block mb-1">Limited Offer:</span>
                Join the Founder's Circle - First 1,000 users get lifetime premium access
              </div>
            </div>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-12 mt-12 pt-12 border-t border-gray-200">
            <div className="flex items-center space-x-3 group">
              <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-base text-gray-600 font-medium group-hover:text-blue-500 transition-colors">Voice & Text Ready</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <span className="text-base text-gray-600 font-medium group-hover:text-purple-500 transition-colors">Instant Insights</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <Moon className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-base text-gray-600 font-medium group-hover:text-indigo-500 transition-colors">Holistic Approach</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="p-3 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                <Coffee className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-base text-gray-600 font-medium group-hover:text-orange-500 transition-colors">Daily Companion</span>
            </div>
          </div>
        </div>
      </section>
    );
}

export default HeroSection; 