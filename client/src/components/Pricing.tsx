import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '',
    features: [
      'Basic daily logging',
      'Simple onboarding',
      '7-day history view',
    ],
    cta: 'Join Waitlist',
    highlight: false,
  },
  {
    name: 'Premium Monthly',
    price: '₹199',
    period: '/month',
    features: [
      'Full AI Coach access',
      'Voice-to-text journaling',
      'Holistic performance analysis',
      'Smart scheduled emails',
      'Integrations (Calendar, Health)',
      'Streaks & Achievements',
    ],
    cta: 'Join Waitlist',
    highlight: false,
  },
  {
    name: 'Premium Annual',
    price: '₹1,499',
    period: '/year',
    features: [
      'Everything in Premium Monthly',
      '4 months free (best value)',
    ],
    cta: 'Join Waitlist',
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Start for free. Upgrade when you’re ready to unlock your personal AI Coach and all premium features.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 bg-white border ${plan.highlight ? 'border-yellow-300 shadow-lg' : 'border-gray-200'} rounded-2xl p-8 flex flex-col items-center transition-all`}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 font-display">{plan.name}</h2>
            <div className="flex items-end mb-4">
              <span className="text-3xl font-bold text-gray-900 font-display">{plan.price}</span>
              <span className="text-base text-gray-500 ml-1">{plan.period}</span>
            </div>
            <ul className="mb-6 text-gray-700 text-left w-full space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-yellow-300 before:rounded-full"></li>
              ))}
            </ul>
            <button className="w-full bg-yellow-300 text-gray-900 font-bold py-2 rounded-lg transition hover:bg-yellow-400">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 