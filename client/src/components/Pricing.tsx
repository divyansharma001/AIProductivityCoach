import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Perfect for getting started with productivity tracking',
    features: [
      'Basic daily logging',
      'Simple onboarding',
      '7-day history view',
      'Core productivity insights',
      'Email support',
    ],
    cta: 'Get Started Free',
    highlight: false,
    popular: false,
  },
  {
    name: 'Premium Monthly',
    price: '$5',
    period: '/month',
    description: 'Unlock your personal AI Coach and advanced features',
    features: [
      'Full AI Coach access',
      'Voice-to-text journaling',
      'Holistic performance analysis',
      'Smart scheduled emails',
      'Integrations (Calendar, Health)',
      'Streaks & Achievements',
      'Unlimited history',
      'Priority support',
    ],
    cta: 'Start Premium Trial',
    highlight: false,
    popular: true,
  },
  {
    name: 'Premium Annual',
    price: '$50',
    period: '/year',
    description: 'Best value with 2 months free',
    features: [
      'Everything in Premium Monthly',
      '2 months free (best value)',
      'Early access to new features',
      'Dedicated success manager',
      'Custom integrations',
      'Team insights dashboard',
    ],
    cta: 'Save 17%',
    highlight: true,
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <section className="pt-20 sm:pt-28 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-display">
            Choose Your
            <span className="relative">
              <span className="relative z-10"> Path</span>
              <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-yellow-300 -rotate-1"></span>
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Start free and upgrade when you're ready to unlock your personal AI Coach.<br className="hidden sm:block" />
            No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-2 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
                  plan.highlight 
                    ? 'border-yellow-300 shadow-lg scale-105' 
                    : plan.popular
                    ? 'border-purple-300 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1 text-xs sm:text-base">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mt-auto ${
                    plan.highlight
                      ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-400 hover:shadow-lg'
                      : plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 