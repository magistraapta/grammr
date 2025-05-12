import { useState, useCallback } from 'react';
import CorrectionCard from './CorrectionCard';

const InputText = () => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [correctedSentence, setCorrectedSentence] = useState('');
    const [tips, setTips] = useState('');
    const [example, setExample] = useState('');
    const [improvement, setImprovement] = useState('');
    const [error, setError] = useState(null);

    const resetStates = useCallback(() => {
        setCorrectedSentence('');
        setExample('');
        setTips('');
        setImprovement('');
        setError(null);
    }, []);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }

        try {
            setLoading(true);
            resetStates();
            
            const data = await handleInput(text);
            
            if (!data || !data.corrected_sentence) {
                throw new Error('Invalid response from server');
            }

            setCorrectedSentence(data.corrected_sentence);
            setExample(data.personalized_advice?.example || '');
            setTips(data.personalized_advice?.tip || '');
            setImprovement(data.personalized_advice?.improvement || '');
        } catch (error) {
            setError(error.message || 'Failed to process text. Please try again.');
            resetStates();
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        if (error) setError(null);
    };
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid items-start lg:grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1">
                <div className="w-full space-y-4">
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="w-full">
                            <label 
                                htmlFor="text-input" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Enter your text for grammar analysis
                            </label>
                            <textarea
                                id="text-input"
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Type or paste your text here..."
                                disabled={loading}
                                className="w-full border border-gray-300 p-4 rounded-lg shadow-sm 
                                         min-h-[200px] md:min-h-[250px] lg:min-h-[300px] resize-y
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                         disabled:bg-gray-50 disabled:cursor-not-allowed
                                         transition-colors duration-200 bg-white shadow-md"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button 
                                type="submit"
                                disabled={!text.trim() || loading}
                                className={`w-full md:w-auto py-3 px-8 rounded-md text-white font-medium
                                         transition-all duration-200 transform hover:scale-[1.02]
                                         ${text.trim() && !loading
                                            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
                                            : 'bg-gray-400 cursor-not-allowed'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Analyze Text'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-full">
                    {loading ? (
                        <div className="w-full">
                            <div className="h-[400px] w-full p-6 bg-gray-50 rounded-lg space-y-4 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    ) : (
                        correctedSentence && (
                            <div className="w-full mb-9">
                                <CorrectionCard 
                                    correctedSentence={correctedSentence} 
                                    example={example} 
                                    tips={tips} 
                                    improvement={improvement} 
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const handleInput = async (text) => {
    try {
        const response = await fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text_input: text })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data) {
            throw new Error('No data received from server');
        }

        return data;
    } catch (error) {
        console.error('Error processing input:', error.message);
        throw error;
    }
};

export default InputText;