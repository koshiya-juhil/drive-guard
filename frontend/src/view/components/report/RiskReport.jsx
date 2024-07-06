import ReportHeader from "./ReportHeader";
import PublicReport from "./PublicReport";
import PeopleReport from "./PeopleReport";
import ExternalReport from "./ExternalReport";

function RiskReport() {
  return (
    <div className="flex z-10 flex-col self-center pt-10 mt-10rem w-full rounded-xl shadow-sm bg-slate-50 max-w-[1376px] max-md:max-w-full">
      <ReportHeader />

      {/* Report Details */}
      <PublicReport />
      <PeopleReport />
      <ExternalReport />
      
      <div className="flex gap-5 justify-center px-10 py-4 w-full text-base leading-6 border border-t border-solid shadow-lg bg-slate-50 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex-auto my-auto text-gray-700 max-md:max-w-full">
          For a more detailed risk audit, book a demo with one of our SaaS
          Security Specialists.
        </div>
        <div className="justify-center px-7 py-5 font-semibold text-center text-white bg-indigo-800 rounded-lg shadow-md max-md:px-5">
          Book a demo
        </div>
      </div>
      
    </div>
  );
}

export default RiskReport;
