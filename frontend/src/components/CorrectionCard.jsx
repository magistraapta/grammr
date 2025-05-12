

const CorrectionCard = ({correctedSentence, tips,example, improvement}) => {
  return (
    <div className="mt-8 flex justify-center bg-white shadow-md p-6 rounded-xl">
        <div className="space-y-5 ">
            <div>
                <p className="text-2xl font-bold">Corrected Sentence</p>
                <p>{correctedSentence}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Improvement</p>
                <p>{improvement}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Tips</p>
                <p>{tips}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Example</p>
                <p>{example}</p>
            </div>

        </div>
    </div>
  )
}

export default CorrectionCard;