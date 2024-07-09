// import Header from "./components/Header";
import MainContent from "./components/MainContent";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col justify-center bg-white">
        <div className="flex flex-col w-full bg-white max-md:max-w-full">
          {/* <Header /> */}
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default LandingPage;