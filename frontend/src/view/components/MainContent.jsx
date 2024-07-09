import { useState } from "react";
import Config from "../../Config";
import FeatureList from "./FeatureList";
import axios from "axios";
import Spinner from '../components/Spinner'

function MainContent() {

  const [loading, setLoading] = useState(false);

  async function getReport() {
    if(loading) return;
    setLoading(true);

    sessionStorage.removeItem("user");
    try {
      const response = await axios({
        method: "get",
        url: `${Config.serverUrl}/getAuthUrl`,
        data: {},
        headers: {},
        withCredentials: true,
      });

      window.location.href = response.data;
      // navigate(response.data, { replace: true });
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  }


  return (
    // <main className="flex overflow-hidden relative flex-col items-center px-16 pt-20 w-full min-h-[856px] max-md:px-5 max-md:max-w-full">
    <main className="flex overflow-hidden relative flex-col items-center px-16 w-full min-h-[856px] max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
        className="object-cover absolute inset-0 size-full"
        alt="Background"
      />
      <div className="relative justify-center pt-16 mt-8 w-full max-w-[1100px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col grow pb-7 text-lg font-medium leading-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-base font-semibold tracking-wider leading-5 text-orange-400 uppercase max-md:max-w-full">
                DATA BREACH FINDER
              </div>
              <h1 className="mt-4 text-5xl text-white leading-[60px] max-md:max-w-full">
                Check if your Google <br /> Drive is leaking sensitive <br />{" "}
                data
              </h1>

              <button
                onClick={getReport}
                disabled={loading}
                className="flex gap-0 py-4 pr-5 pl-6 mt-10 font-semibold text-gray-700 bg-white rounded leading-[150%] max-md:flex-wrap max-md:px-5"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/18677a552c1d6ba6f0f9dfc0edaace27acd462983e427e1d723dc26fee3870f3?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="shrink-0 w-10 aspect-[1.47]"
                  alt=""
                />
                <span className="mr-2">Free Google Drive Risk Report</span>
                {loading && <Spinner className="ml-auto" />}
              </button>

              <div className="shrink-0 mt-4 bg-zinc-200 bg-opacity-30 h-[17px] max-md:max-w-full" />
              <FeatureList />
              <p className="mt-10 text-sm text-white max-md:max-w-full">
                After your scan is completed, we will delete all collected data
                and remove our <br /> access permissions within 24 hours. We
                will not read any of your files content <br /> at any time.
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="w-full aspect-[0.83] max-w-[526px] max-md:mt-10 max-md:max-w-full"
              alt="Data Breach Finder illustration"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
