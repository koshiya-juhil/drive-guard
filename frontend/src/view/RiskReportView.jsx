import { useContext } from "react";
import ReportContext from "../context/ReportContext";
import ReportPageHeader from "./components/report/ReportPageHeader";
import RiskReport from "./components/report/RiskReport";
import Spinner from "./components/Spinner";

function RiskReportView(props) {
  const reportData = useContext(ReportContext);
  const loading = reportData?.loading || false;

  // Overlay loader styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(5px)',
    zIndex: 9999,
  };

  const spinnerCardStyle = {
    padding: '32px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`flex flex-col bg-gray-100 ${loading ? 'blur-sm' : ''}`}>
        <ReportPageHeader 
          revokeAccess={props.revokeAccess} 
        />
        <RiskReport />
      </div>
      
      {/* Loading Overlay - using inline styles for reliability */}
      {loading && (
        <div style={overlayStyle}>
          <div style={spinnerCardStyle}>
            <div className="flex justify-center mb-6">
              <Spinner/>
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">
              Analyzing Your Google Drive
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              We&apos;re scanning your files and analyzing sharing permissions to generate your comprehensive risk report.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskReportView;