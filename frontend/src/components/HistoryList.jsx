import CorrectionCard from './CorrectionCard';

const HistoryList = ({ history, onSelectHistory }) => {
    if (!history || history.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">History</h2>
            <div className="space-y-4">
                {history.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-sm">Original text:</p>
                            <p className="text-gray-800">{item.originalText}</p>
                        </div>
                        <button
                            onClick={() => onSelectHistory(item)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Show correction
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryList; 