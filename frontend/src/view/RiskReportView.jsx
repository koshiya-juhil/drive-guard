import ReportPageHeader from "./components/report/ReportPageHeader";
import RiskReport from "./components/report/RiskReport";

function RiskReportView(props) {
  return (
    <div className="flex flex-col bg-gray-100">
      <ReportPageHeader 
        revokeAccess={props.revokeAccess} 
      />
      <RiskReport />
    </div>
  );
}



export default RiskReportView;