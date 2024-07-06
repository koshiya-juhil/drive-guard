
const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/882d3c95c3d10136bd37be68b7a7b720927dd729f224bc2ae9ea934a54e79f4a?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&",
    text: (
      <>
        <div className="flex gap-1.5 max-md:flex-wrap">
          <div className="grow text-white">See how secure your </div>
          <div className="flex flex-auto gap-0">
            <div className="text-slate-50">Google Drive</div>
            <div className="my-auto text-white"> account is in </div>
          </div>
        </div>
        <div className="text-white max-md:max-w-full">seconds</div>
      </>
    ),
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9d8e69a464e51d34e1e4bba53eebb9a133aa65a0db51aee8a81db30d2cf1f7e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&",
    text: "Discover who still has access to your files, and who they were created by",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2629e0d0234844f883f0a2c70bf782ef858820e496d7316470058466b830e2c0?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&",
    text: "Find risky files exposed publicly to anyone on the internet",
  },
];

function FeatureList() {
  return (
    <>
      {features.map((feature, index) => (
        <div key={index} className="flex gap-4 pt-1.5 mt-4 text-white max-md:flex-wrap">
          <img loading="lazy" src={feature.icon} className="shrink-0 self-start w-8 aspect-square" alt="" />
          <div className="max-md:max-w-full">{feature.text}</div>
        </div>
      ))}
    </>
  );
}

export default FeatureList;