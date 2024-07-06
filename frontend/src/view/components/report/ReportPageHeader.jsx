function ReportPageHeader(props) {

  return (
    <div className="flex flex-col px-8 pt-12 pb-20 w-full bg-indigo-800 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-center w-full max-md:flex-wrap max-md:max-w-full">
        <div onClick={() => props.revokeAccess()} className="justify-center cursor-pointer self-stretch px-7 py-5 text-sm font-semibold leading-5 text-center text-red-300 rounded-lg border border-pink-700 border-solid max-md:px-5">
          Revoke access
        </div>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb3d6e0b0644deb8b2c65feec25fbf6887c413845605264c2f370a7620598ab6?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
          className="shrink-0 self-stretch my-auto max-w-full aspect-[5.88] w-[238px]"
        />
        <div className="flex gap-5 self-stretch my-auto">
          <div className="grow my-auto text-sm font-semibold leading-5 text-white">
            Terms & Conditions
          </div>
          <div className="text-sm font-semibold leading-5 text-white">
            Privacy Policy
          </div>
          <div className="flex gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ec32d70e8c5df6ab74f5e1c0af9346c91c8449e2011d45bc08942ed23e47049?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 w-5 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5b4781d0d71afee664d6e261512429ded5305de1e543e77539f2344e73a4bca?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 my-auto w-4 aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 self-start mt-12 mb-24 ml-4 text-xl leading-7 text-white max-md:flex-wrap max-md:my-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7770f8b9f1a639ef0942c8ba5559a4871b04e8eb52ff43e79038bf15231538?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-auto max-md:max-w-full">
          We do not scan the contents of files. Scan results are never stored.
        </div>
      </div>
    </div>
  );
}

export default ReportPageHeader;
