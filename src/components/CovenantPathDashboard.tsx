import React from 'react';
import { useQuotes } from '../context/QuoteContext';
import { useAuth } from '../context/AuthContext';
import { ImageUpload } from './ImageUpload';

export const CovenantPathDashboard: React.FC = () => {
  const { quotes, templeImage, christImage, centerImage, updateTempleImage, updateChristImage, updateCenterImage } = useQuotes();
  const { user } = useAuth();
  const completedCount = quotes.filter(q => q.completed).length;

  const createSteps = () => {
    const steps = [];
    const totalSteps = 52;
    
    for (let i = 0; i < totalSteps; i++) {
      const progress = i / (totalSteps - 1);
      const x = 10 + (progress * 70);
      const y = 85 - (progress * 70);
      const variation = Math.sin(progress * Math.PI * 2) * 5;
      
      steps.push({
        number: i + 1,
        x: x + (variation * 0.5),
        y: y + variation,
      });
    }
    return steps;
  };

  const steps = createSteps();

  const ImageContainer = ({ 
    image, 
    onUpload, 
    onRemove, 
    alt, 
    className 
  }: { 
    image: string; 
    onUpload: (url: string) => void; 
    onRemove: () => void; 
    alt: string;
    className: string;
  }) => (
    <div className={`${className} w-[250px] h-[300px]`}>
      {user?.isAdmin ? (
        <ImageUpload
          currentImage={image}
          onImageUpload={onUpload}
          onImageRemove={onRemove}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg p-6 mb-8">
      <div className="relative w-full h-[700px] overflow-hidden">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#002d5c]">
            Your Covenant Path Progress
          </h2>
        </div>

        {/* Temple Image */}
        <ImageContainer
          image={templeImage}
          onUpload={updateTempleImage}
          onRemove={() => updateTempleImage('')}
          alt="Temple"
          className="absolute top-0 right-0 z-10"
        />

        {/* Center Image - Moved to the right */}
        <ImageContainer
          image={centerImage}
          onUpload={updateCenterImage}
          onRemove={() => updateCenterImage('')}
          alt="Center"
          className="absolute top-[65%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 z-10"
        />

        {/* Christ Image */}
        <ImageContainer
          image={christImage}
          onUpload={updateChristImage}
          onRemove={() => updateChristImage('')}
          alt="Christ"
          className="absolute bottom-48 left-0 z-10"
        />

        {/* Steps Container */}
        <div className="absolute inset-0 pt-24">
          {steps.map((step, index) => (
            <div
              key={step.number}
              style={{
                position: 'absolute',
                left: `${step.x}%`,
                top: `${step.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: step.number,
              }}
            >
              <div
                className={`
                  relative w-5 h-5 transform transition-all duration-300
                  ${step.number <= completedCount 
                    ? 'bg-[#c4b000] shadow-lg scale-100' 
                    : step.number === completedCount + 1
                    ? 'bg-gray-300 animate-pulse shadow-md scale-95'
                    : 'bg-gray-200 scale-90'
                  }
                  rounded-sm rotate-45
                `}
                title={`Step ${step.number}`}
              >
                <div className="absolute inset-0 border-t-2 border-r-2 border-[#002d5c]/10" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[#002d5c] -rotate-45">
                  {step.number}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute h-0.5 ${
                    step.number <= completedCount ? 'bg-[#c4b000]' : 'bg-gray-200'
                  }`}
                  style={{
                    width: '20px',
                    left: '100%',
                    top: '50%',
                    transform: `rotate(${Math.atan2(
                      (steps[index + 1].y - step.y),
                      (steps[index + 1].x - step.x)
                    ) * (180 / Math.PI)}deg)`,
                    transformOrigin: '0 50%',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Stats - Bottom */}
        <div className="absolute bottom-4 left-0 w-full px-6">
          <div className="text-center">
            <p className="text-lg text-[#002d5c] mb-2">
              <span className="font-bold">{completedCount}</span> of <span className="font-bold">52</span> steps completed
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#c4b000] transition-all duration-300"
                style={{ width: `${(completedCount / 52) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovenantPathDashboard;