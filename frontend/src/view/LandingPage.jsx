import Header from "./components/Header";
import MainContent from "./components/MainContent";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col justify-center bg-white">
        <div className="flex flex-col w-full bg-white max-md:max-w-full">
          <Header />
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default LandingPage;

{
  /* <div className="flex flex-col justify-center bg-white">
  <div className="flex flex-col w-full bg-white max-md:max-w-full">
    <div className="flex flex-col justify-center w-full bg-zinc-300 max-md:max-w-full">
      <div className="flex justify-center items-center px-16 py-2.5 w-full bg-violet-800 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-center pl-20 max-w-full w-[1200px] max-md:flex-wrap max-md:pl-5">
          <div className="flex gap-2 max-md:flex-wrap">
            <div className="justify-center my-auto text-sm font-medium leading-5 text-white bg-violet-800 max-md:max-w-full">
              Catch everything you might have missed from our Google
              Ecosystem Launch Week right here
            </div>
            <div className="flex justify-center items-center px-1.5 py-2 w-6 h-6 rounded-lg bg-white bg-opacity-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d2a31d3361e0c45166b7534f377214068f717505ca001864cdb4701de963b90?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                className="w-3 aspect-[1.2]"
              />
            </div>
          </div>
          <div className="flex gap-2 text-sm font-medium leading-6 whitespace-nowrap text-white text-opacity-60">
            <div>Close</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fdea0bc214d0005a6afd95b695505992bf55caca02a9cd01bbfe9852362093c?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 my-auto w-2 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex overflow-hidden relative flex-col items-center px-16 pt-20 w-full min-h-[856px] max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/271251734aee4fe2c252ce36633c87b40fbe6ef9c28fe97be7e0711ee990c716?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative justify-center pt-16 mt-8 w-full max-w-[1100px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col grow pb-7 text-lg font-medium leading-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-base font-semibold tracking-wider leading-5 text-orange-400 uppercase max-md:max-w-full">
                DATA BREACH FINDER
              </div>
              <div className="mt-4 text-5xl text-white leading-[60px] max-md:max-w-full">
                Check if your Google
                <br />
                Drive is leaking sensitive
                <br />
                data
              </div>
              <div className="flex gap-0 py-4 pr-5 pl-6 mt-10 font-semibold text-gray-700 bg-white rounded leading-[150%] max-md:flex-wrap max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/18677a552c1d6ba6f0f9dfc0edaace27acd462983e427e1d723dc26fee3870f3?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="shrink-0 w-10 aspect-[1.47]"
                />
                <div>Free Google Drive Risk Report</div>
              </div>
              <div className="shrink-0 mt-4 bg-zinc-200 bg-opacity-30 h-[17px] max-md:max-w-full" />
              <div className="flex gap-4 pt-1.5 mt-8 leading-[111%] max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/882d3c95c3d10136bd37be68b7a7b720927dd729f224bc2ae9ea934a54e79f4a?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="shrink-0 self-start w-8 aspect-square"
                />
                <div className="flex flex-col py-0.5 max-md:max-w-full">
                  <div className="flex gap-1.5 max-md:flex-wrap">
                    <div className="grow text-white">
                      See how secure your{" "}
                    </div>
                    <div className="flex flex-auto gap-0">
                      <div className="text-slate-50">Google Drive</div>
                      <div className="my-auto text-white">
                        {" "}
                        account is in
                      </div>
                    </div>
                  </div>
                  <div className="text-white max-md:max-w-full">
                    seconds
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-1.5 mt-4 text-white max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9d8e69a464e51d34e1e4bba53eebb9a133aa65a0db51aee8a81db30d2cf1f7e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="shrink-0 self-start w-8 aspect-square"
                />
                <div className="max-md:max-w-full">
                  Discover who still has access to your files, and who
                  <br />
                  they were created by
                </div>
              </div>
              <div className="flex gap-4 pt-1.5 mt-4 text-white max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2629e0d0234844f883f0a2c70bf782ef858820e496d7316470058466b830e2c0?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="shrink-0 self-start w-8 aspect-square"
                />
                <div className="max-md:max-w-full">
                  Find risky files exposed publicly to anyone on the
                  <br />
                  internet
                </div>
              </div>
              <div className="mt-10 text-sm text-white max-md:max-w-full">
                After your scan is completed, we will delete all collected
                data and remove our
                <br />
                access permissions within 24 hours. We will not read any
                of your files content
                <br />
                at any time.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/68700100762c51d514cedae744ff5bb2d957e4069a63ae03c5bdb5ddacabc335?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="w-full aspect-[0.83] max-w-[526px] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
