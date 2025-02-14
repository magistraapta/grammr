"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import CorrectionCard from "./CorrectionCard"

async function handleInput(inputText) {
    try {
        const response = await fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text_input: inputText})
        })

        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`)
        }

        const data = response.json()

        return data

    } catch (error) {
        console.error('Error handle input: ', error.message)
        throw error
    }
}


export default function InputField() {
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [correctedSentence, setCorrectedSentence] = useState('')
    const [example, setExample] = useState('')
    const [tips, setTips] = useState('')
    const [improvement, setImprovement] = useState('')

    const HandleSubmit = async () => {
        if (!inputText.trim()) {
            return
        }

        try {
            setIsLoading(true)
            const data = await handleInput(inputText)

            setCorrectedSentence(data.corrected_sentence)
            setExample(data.personalized_advice.example)
            setTips(data.personalized_advice.tip)
            setImprovement(data.personalized_advice.improvement)

            console.log(data)

            
        } catch (error) {
            setError(error.message || 'Failed to process text')

        } finally {
            setIsLoading(false)
        }
    }

    

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid items-center lg:grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1">
                <div className="w-full space-y-4">
                    <div className="w-full">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter your text here"
                            disabled={isLoading}
                            className="w-full border border-gray-300 p-4 rounded-lg shadow-lg min-h-[200px] md:min-h-[250px] lg:min-h-[300px] resize-y"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-center mt-2">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button 
                            onClick={HandleSubmit}
                            disabled={!inputText.trim() || isLoading}
                            className={`w-full md:w-auto py-3 px-6 rounded-md text-white transition-colors duration-200 ${
                                inputText.trim() && !isLoading
                                ? 'bg-blue-700 hover:bg-blue-800' 
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    {isLoading ? (
                        <div className="w-full">
                            <div className="h-[400px] w-full p-4 bg-gray-200 animate-pulse rounded-lg space-y-4">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
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
    )
}