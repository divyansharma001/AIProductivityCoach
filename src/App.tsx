import React from 'react';
import { Brain, MessageCircle, Zap, Moon, Coffee, ArrowRight, Clock, Calendar, Target, AlertCircle, TrendingDown, Battery, FileText, Smartphone, Sticker as Sticky, CheckSquare, BarChart3, Layers, Notebook, PenTool } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">AI Productivity Coach</span>
            <span className="text-sm text-gray-500">is the</span>
            <span className="bg-yellow-300 px-2 py-1 text-sm font-bold text-gray-900 transform -rotate-1">refreshingly clear</span>
            <span className="text-sm text-gray-500">productivity system by</span>
            <div className="flex items-center space-x-1">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">AI insights</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Real world results</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Paths</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Sign in</a>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
              Sign up free
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-[0.9] mb-8 tracking-tight">
              Wrestling with productivity?
              <br />
              <span className="block mt-4">It doesn't have to be this hard.</span>
            </h1>
            
            <div className="mt-12 space-y-8">
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Stop tracking busy work. Start understanding your productivity. Our AI coach connects the dots between your focus and your life—sleep, energy, meetings, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                <button className="group bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3">
                  <span>Start Understanding for Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-sm text-gray-500 max-w-sm">
                  <span className="text-purple-600 font-semibold">Limited:</span> Join the Founder's Circle - First 1,000 users get lifetime premium access
                </p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mb-12 flex justify-center">
            {/* Cloud background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[800px] h-[400px] bg-gradient-to-br from-blue-100 via-blue-50 to-gray-100 rounded-full opacity-60 blur-3xl"></div>
            </div>
            
            {/* Scattered productivity app icons with X through them */}
            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
              {/* Productivity app icons scattered around - representing real apps */}
              
              {/* Notion */}
              <div className="absolute top-8 left-16 transform rotate-12">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                </div>
              </div>
              
              {/* Apple Notes */}
              <div className="absolute top-12 right-20 transform -rotate-6">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                    <Notebook className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Google Keep */}
              <div className="absolute bottom-16 left-20 transform rotate-6">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                    <Sticky className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Todoist */}
              <div className="absolute bottom-12 right-16 transform -rotate-12">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                    <CheckSquare className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Evernote */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 rotate-3">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Trello */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 -rotate-3">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <Layers className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* RescueTime */}
              <div className="absolute top-10 left-1/3 transform rotate-8">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Forest App */}
              <div className="absolute bottom-8 right-1/3 transform -rotate-8">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Clockify */}
              <div className="absolute top-24 right-1/3 transform rotate-15">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Obsidian */}
              <div className="absolute bottom-20 left-1/3 transform -rotate-15">
                <div className="bg-white rounded-xl shadow-lg p-3 w-16 h-16 flex items-center justify-center border">
                  <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                    <PenTool className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Large X crossing out the apps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute w-[350px] h-2.5 bg-gray-900 transform rotate-45 rounded-full shadow-lg"></div>
                  <div className="absolute w-[350px] h-2.5 bg-gray-900 transform -rotate-45 rounded-full shadow-lg"></div>
                </div>
              </div>

              {/* Frustrated user faces with speech bubbles */}
              <div className="absolute top-4 left-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😰</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">WHY AM I STILL SCATTERED?</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">I TRACK EVERYTHING!</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😤</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-12">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😵</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">BUT NO ONE TOLD ME WHY!</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">THIS IS EXHAUSTING!</p>
                  </div>
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😫</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">🤔</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">WHEN IS THIS DUE?</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <div className="flex items-center space-x-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -right-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">I DON'T KNOW WHERE TO FOCUS!</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😩</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/3 left-1/4 transform rotate-3">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg">😔</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-gray-900 relative max-w-xs">
                    <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-white"></div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">I DON'T KNOW WHERE TO LOOK!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-10 mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <span className="text-base text-gray-600 font-medium">Voice & Text Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-purple-500" />
              <span className="text-base text-gray-600 font-medium">Instant Insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <Moon className="h-6 w-6 text-indigo-500" />
              <span className="text-base text-gray-600 font-medium">Holistic Approach</span>
            </div>
            <div className="flex items-center space-x-3">
              <Coffee className="h-6 w-6 text-orange-500" />
              <span className="text-base text-gray-600 font-medium">Daily Companion</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;