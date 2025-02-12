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
        <div className=" mt-8 mb-8">
            <div className="flex justify-center">
                <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here"
                disabled={isLoading}
                className="border border-gray-300 p-4 rounded-lg" cols="80" rows="10">

                </textarea>
            </div>

            {error && (
                <div className="text-red-500 text-center mt-2">
                {error}
                </div>
            )}

            <div className="flex justify-center mt-2">
                <button 
                    onClick={HandleSubmit}
                    disabled={!inputText.trim() || isLoading}
                    className={`py-2 px-4 rounded-md text-white ${
                        inputText.trim() && !isLoading
                        ? 'bg-blue-700 hover:bg-blue-800' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    >
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center">
                    <div className="  h-[200px] w-6/12 mt-4 p-4 bg-gray-200 animate-pulse rounded-lg ">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                </div>
                
            ) : (
                correctedSentence && (
                    <CorrectionCard 
                        correctedSentence={correctedSentence} 
                        example={example} 
                        tips={tips} 
                        improvement={improvement} 
                    />
                )
            )}

        </div>
    )
}