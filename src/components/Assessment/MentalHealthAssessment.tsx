import React, { useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon, ClipboardIcon, BarChart2Icon } from 'lucide-react';
const assessments = {
  anxiety: {
    title: 'Anxiety Assessment',
    description: 'Measures symptoms of anxiety over the past two weeks',
    questions: ['Feeling nervous, anxious, or on edge', 'Not being able to stop or control worrying', 'Worrying too much about different things', 'Trouble relaxing', "Being so restless that it's hard to sit still", 'Becoming easily annoyed or irritable', 'Feeling afraid as if something awful might happen'],
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    result: {
      low: 'Your anxiety level appears to be minimal.',
      moderate: 'Your anxiety level appears to be moderate.',
      high: 'Your anxiety level appears to be high. Consider seeking support.'
    }
  },
  depression: {
    title: 'Depression Assessment',
    description: 'Measures symptoms of depression over the past two weeks',
    questions: ['Little interest or pleasure in doing things', 'Feeling down, depressed, or hopeless', 'Trouble falling or staying asleep, or sleeping too much', 'Feeling tired or having little energy', 'Poor appetite or overeating', 'Feeling bad about yourself or that you are a failure', 'Trouble concentrating on things', 'Moving or speaking so slowly that other people could have noticed', 'Thoughts that you would be better off dead or of hurting yourself'],
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    result: {
      low: 'Your depression level appears to be minimal.',
      moderate: 'Your depression level appears to be moderate.',
      high: 'Your depression level appears to be high. Consider seeking support.'
    }
  },
  stress: {
    title: 'Academic Stress Assessment',
    description: 'Measures your level of academic stress',
    questions: ['I feel overwhelmed by my academic workload', 'I worry about meeting deadlines for assignments', 'I feel pressured to perform well academically', 'I have trouble balancing my academic and personal life', 'I feel stressed about exams or assessments', 'I worry about my academic future', 'I have trouble sleeping due to academic concerns'],
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
    result: {
      low: 'Your academic stress level appears to be manageable.',
      moderate: 'Your academic stress level appears to be moderate.',
      high: 'Your academic stress level appears to be high. Consider seeking support.'
    }
  }
};
export const MentalHealthAssessment = () => {
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);
  const assessmentTypes = ['anxiety', 'depression', 'stress'];
  const handleStartAssessment = type => {
    setCurrentAssessment(type);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };
  const handleAnswerSelect = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };
  const handleNext = () => {
    if (currentStep < assessments[currentAssessment].questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const values = Object.values(answers);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const maxPossibleScore = assessments[currentAssessment].questions.length * (assessments[currentAssessment].options.length - 1);
      const percentage = sum / maxPossibleScore * 100;
      let resultLevel;
      if (percentage < 30) {
        resultLevel = 'low';
      } else if (percentage < 60) {
        resultLevel = 'moderate';
      } else {
        resultLevel = 'high';
      }
      setResults({
        ...results,
        [currentAssessment]: {
          score: sum,
          maxScore: maxPossibleScore,
          percentage,
          level: resultLevel
        }
      });
      setShowResults(true);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleBackToAssessments = () => {
    setCurrentAssessment(null);
    setCurrentStep(0);
    setShowResults(false);
  };
  const renderAssessmentList = () => {
    return <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Mental Health Assessment
          </h2>
          <p className="text-gray-600">
            Complete these assessments to better understand your mental
            well-being
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessmentTypes.map(type => <div key={type} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {assessments[type].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {assessments[type].description}
              </p>
              {results[type] ? <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Score: {results[type].score}/{results[type].maxScore}
                    </span>
                    <span className={`text-sm font-medium ${results[type].level === 'low' ? 'text-green-600' : results[type].level === 'moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {results[type].level.charAt(0).toUpperCase() + results[type].level.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className={`h-2.5 rounded-full ${results[type].level === 'low' ? 'bg-green-500' : results[type].level === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                width: `${results[type].percentage}%`
              }}></div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleStartAssessment(type)} className="flex-1 py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                      Retake
                    </button>
                    <button onClick={() => {
                setCurrentAssessment(type);
                setShowResults(true);
              }} className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      View Results
                    </button>
                  </div>
                </div> : <button onClick={() => handleStartAssessment(type)} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Start Assessment
                </button>}
            </div>)}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-blue-800">
            This assessment is not a diagnostic tool. If you're concerned about
            your mental health, please consult with a healthcare professional.
          </p>
        </div>
      </div>;
  };
  const renderQuestion = () => {
    const assessment = assessments[currentAssessment];
    const question = assessment.questions[currentStep];
    return <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {assessment.title}
          </h2>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-blue-600" style={{
              width: `${(currentStep + 1) / assessment.questions.length * 100}%`
            }}></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {currentStep + 1}/{assessment.questions.length}
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question}</h3>
          <div className="space-y-3">
            {assessment.options.map((option, index) => <div key={index} onClick={() => handleAnswerSelect(currentStep, index)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${answers[currentStep] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentStep] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                    {answers[currentStep] === index && <CheckCircleIcon size={16} className="text-white" />}
                  </div>
                  <span className="ml-3 text-gray-800">{option}</span>
                </div>
              </div>)}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={handlePrevious} disabled={currentStep === 0} className={`py-2 px-4 rounded-md ${currentStep === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Previous
            </button>
            <button onClick={handleNext} disabled={answers[currentStep] === undefined} className={`py-2 px-4 rounded-md flex items-center ${answers[currentStep] === undefined ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {currentStep === assessment.questions.length - 1 ? 'Submit' : 'Next'}
              {currentStep !== assessment.questions.length - 1 && <ArrowRightIcon size={16} className="ml-2" />}
            </button>
          </div>
        </div>
      </div>;
  };
  const renderResults = () => {
    const assessment = assessments[currentAssessment];
    const result = results[currentAssessment];
    if (!result) return null;
    return <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Assessment Results
          </h2>
          <p className="text-gray-600 mt-2">{assessment.title}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.score}/{result.maxScore}
              </p>
            </div>
            <div className={`py-1 px-3 rounded-full ${result.level === 'low' ? 'bg-green-100 text-green-800' : result.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-green-600 font-medium">Low</span>
              <span className="text-sm text-yellow-600 font-medium">
                Moderate
              </span>
              <span className="text-sm text-red-600 font-medium">High</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className={`h-2 rounded-full ${result.level === 'low' ? 'bg-green-500' : result.level === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
              width: `${result.percentage}%`
            }}></div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 mb-6">
            <p className="text-gray-800">{assessment.result[result.level]}</p>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleBackToAssessments} className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              <ClipboardIcon size={16} className="inline mr-2" />
              Back to Assessments
            </button>
            <button onClick={() => handleStartAssessment(currentAssessment)} className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <BarChart2Icon size={16} className="inline mr-2" />
              Retake Assessment
            </button>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-blue-800">
            This assessment is not a diagnostic tool. If you're concerned about
            your mental health, please consult with a healthcare professional.
          </p>
        </div>
      </div>;
  };
  return <div>
      {!currentAssessment && renderAssessmentList()}
      {currentAssessment && !showResults && renderQuestion()}
      {currentAssessment && showResults && renderResults()}
    </div>;
};