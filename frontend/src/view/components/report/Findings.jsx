import { useContext } from "react";
import ReportContext from "../../../context/ReportContext";

function Findings() {
  const reportData = useContext(ReportContext);
  
  const publicFilesCount = reportData?.publicFiles?.length || 0;
  const peopleFilesCount = reportData?.peopleFiles?.length || 0;
  const externalFilesCount = reportData?.externalFiles?.length || 0;
  const riskLevel = reportData?.riskScore?.level || 'MINIMAL';

  // Get severity level and bars for each finding
  const getSeverityBars = (type, count) => {
    let severity = 'LOW';
    let barCount = 1;

    if (type === 'public') {
      if (count > 20) { severity = 'HIGH'; barCount = 4; }
      else if (count > 10) { severity = 'MEDIUM'; barCount = 3; }
      else if (count > 0) { severity = 'MEDIUM'; barCount = 2; }
    } else if (type === 'people') {
      if (count > 50) { severity = 'HIGH'; barCount = 4; }
      else if (count > 20) { severity = 'MEDIUM'; barCount = 3; }
      else if (count > 10) { severity = 'MEDIUM'; barCount = 2; }
      else if (count > 0) { severity = 'LOW'; barCount = 1; }
    } else if (type === 'external') {
      if (count > 30) { severity = 'HIGH'; barCount = 4; }
      else if (count > 15) { severity = 'MEDIUM'; barCount = 3; }
      else if (count > 5) { severity = 'MEDIUM'; barCount = 2; }
      else if (count > 0) { severity = 'LOW'; barCount = 1; }
    }

    const getBarColor = (severity) => {
      switch(severity) {
        case 'HIGH': return 'bg-orange-500';
        case 'MEDIUM': return 'bg-orange-400';
        case 'LOW': return 'bg-yellow-400';
        default: return 'bg-gray-300';
      }
    };

    return (
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-sm text-gray-500 mr-2">Severity:</span>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`w-4 h-2 rounded-sm ${
              index < barCount ? getBarColor(severity) : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="px-12 py-8 max-md:px-5">
      <h2 className="text-2xl font-medium text-gray-700 mb-4">Findings</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Your Google Drive is considered at {riskLevel.toLowerCase()} risk for data leaking and insider threats. Here are some of the findings we&apos;ve discovered:
      </p>
      
      <div className="px-5 border border-solid shadow-md rounded-lg overflow-hidden bg-white">
        {/* Public Files Finding */}
        {publicFilesCount > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-solid border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-base">1.</span>
              <span className="text-gray-600 font-medium mr-1">{publicFilesCount}</span>
              <span className="text-gray-600">files are publicly accessible for anyone with the link</span>
            </div>
            {getSeverityBars('public', publicFilesCount)}
          </div>
        )}

        {/* People Access Finding */}
        {peopleFilesCount > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-solid border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-base">2.</span>
              <span className="text-gray-600 font-medium mr-1">{peopleFilesCount}</span>
              <span className="text-gray-600">people with access to your google drive</span>
            </div>
            {getSeverityBars('people', peopleFilesCount)}
          </div>
        )}

        {/* External Files Finding */}
        {externalFilesCount > 0 && (
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-base">3.</span>
              <span className="text-gray-600 font-medium mr-1">{externalFilesCount}</span>
              <span className="text-gray-600">files are shared externally</span>
            </div>
            {getSeverityBars('external', externalFilesCount)}
          </div>
        )}

        {/* No findings case */}
        {publicFilesCount === 0 && peopleFilesCount === 0 && externalFilesCount === 0 && (
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-base">1.</span>
              <span className="text-gray-600 font-medium mr-1">0</span>
              <span className="text-gray-600">critical security issues found - your Google Drive appears secure</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-sm text-gray-500 mr-2">Severity:</span>
              <div className="w-4 h-2 rounded-sm bg-green-400" />
              <div className="w-4 h-2 rounded-sm bg-gray-200" />
              <div className="w-4 h-2 rounded-sm bg-gray-200" />
              <div className="w-4 h-2 rounded-sm bg-gray-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Findings; 