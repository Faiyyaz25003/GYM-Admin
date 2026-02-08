
import { Check, Star, Crown, Zap } from 'lucide-react';

export default function PlanCard({ plan }) {
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'premium':
        return <Crown className="w-4 h-4" />;
      case 'pro':
        return <Zap className="w-4 h-4" />;
      case 'popular':
        return <Star className="w-4 h-4" />;
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  const getColorScheme = (type) => {
    switch (type.toLowerCase()) {
      case 'premium':
        return {
          gradient: 'from-purple-500 to-pink-500',
          badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
          price: 'text-purple-600',
          border: 'border-purple-200 hover:border-purple-300',
          shadow: 'hover:shadow-purple-200/50'
        };
      case 'pro':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          badge: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
          price: 'text-blue-600',
          border: 'border-blue-200 hover:border-blue-300',
          shadow: 'hover:shadow-blue-200/50'
        };
      case 'popular':
        return {
          gradient: 'from-green-500 to-emerald-600',
          badge: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
          price: 'text-green-600',
          border: 'border-green-200 hover:border-green-300',
          shadow: 'hover:shadow-green-200/50'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
          price: 'text-gray-600',
          border: 'border-gray-200 hover:border-gray-300',
          shadow: 'hover:shadow-gray-200/50'
        };
    }
  };

  const colors = getColorScheme(plan.type);

  return (
    <div className={`
      relative bg-white border-2 ${colors.border} 
      shadow-lg ${colors.shadow} rounded-3xl p-8 
      transition-all duration-500 ease-out
      hover:shadow-2xl hover:-translate-y-2 hover:scale-105
      group overflow-hidden
    `}>
      <div className={`
        absolute -top-20 -right-20 w-40 h-40 
        bg-gradient-to-br ${colors.gradient} 
        rounded-full opacity-10 
        group-hover:opacity-20 transition-opacity duration-500
      `} />

      {plan.type.toLowerCase() === 'popular' && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
          MOST POPULAR
        </div>
      )}

      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
          {plan.name}
        </h2>
      </div>

      <div className="text-center mb-6">
        <div className={`text-5xl font-black ${colors.price} mb-2 group-hover:scale-110 transition-transform duration-300`}>
          ${plan.price}
        </div>
        <div className="text-sm text-gray-500 font-medium tracking-wide">
          {plan.duration}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <span className={`
          inline-flex items-center gap-2 ${colors.badge}
          text-xs font-bold px-4 py-2 rounded-full
          shadow-md transform group-hover:scale-105 transition-transform duration-300
        `}>
          {getTypeIcon(plan.type)}
          {plan.type.toUpperCase()}
        </span>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className={`
            flex items-start gap-3 text-gray-700 text-sm
            transform transition-all duration-300
            hover:translate-x-2 hover:text-gray-900
          `}>
            <div className={`
              flex-shrink-0 w-5 h-5 rounded-full 
              bg-gradient-to-br ${colors.gradient}
              flex items-center justify-center mt-0.5
              shadow-sm
            `}>
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {plan.description && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 italic text-center leading-relaxed">
            {plan.description}
          </p>
        </div>
      )}
    </div>
  );
}
