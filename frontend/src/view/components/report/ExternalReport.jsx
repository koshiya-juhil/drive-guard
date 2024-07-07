import { useContext } from "react";
import ReportContext from "../../../context/ReportContext";

function ExternalReport() {

  const reportData = useContext(ReportContext);
  const externalFiles = reportData.externalFiles;

  return (
    <div className="flex flex-col justify-center px-12 py-14 mt-16 text-gray-700 border border-t border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 self-start text-3xl font-extralight leading-9">
        <div>3.</div>
        <div className="flex-auto">{externalFiles?.length} files are shared externally</div>
      </div>

      <table className="w-full mt-6 border border-solid shadow-md">
        <thead>
          <tr className="text-base font-semibold leading-6 text-left border-b border-solid">
            <th className="pr-20 pl-8 py-4">File name</th>
            <th className="px-3 py-4">Access setting</th>
            <th className="px-3 py-4">Shared with</th>
            <th className="px-3 py-4">Created by</th>
          </tr>
        </thead>
        <tbody>
          {externalFiles?.map((file, index) => (
            <tr key={index} className="text-base leading-6 text-left border-b border-solid">
              <td className="flex items-center gap-3 px-8 py-4">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/40ee81af89e7be9e5c573e83f5c0a926a811711e74386276a4453f64def7ace4?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="w-4 aspect-square shrink-0"
                  alt="File icon"
                />
                <span className="w-fit overflow-hidden break-words whitespace-normal">{file.name}</span>
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center w-fit gap-3 px-3 py-1.5 bg-gray-100 rounded-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/89623679acd18eccbcbee7819095ee84e010aab1749b02c0bcd4e98f72c1f24e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                    className="w-4 aspect-square shrink-0"
                    alt="Access icon"
                  />
                  <span>External</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center gap-2">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6ba005bf5ecca807001e14e62f2186f64167e015029ae128f5cdeddf236d3c8?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                    className="w-5 aspect-square shrink-0"
                    alt="Shared with icon"
                  />
                  <span>{file.shared || 0}</span>
                </div>
              </td>
              <td className="flex items-center gap-2.5 px-3 py-4 whitespace-nowrap">
                <img
                  loading="lazy"
                  // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  srcSet={file.owners?.length ? file.owners[0].photoLink : 'https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&'}
                  className="w-6 aspect-square shrink-0 rounded-full"
                  alt="Created by icon"
                />
                <span>{file.owners?.length ? file.owners[0]?.displayName : 'Unknown'}</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b0ab6d1fc553a900b94c7a67a141705e33e380b39b086f68ba2a85d77bacc2a?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="w-5 aspect-square shrink-0"
                  alt="Verification icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="flex flex-col items-center pt-6 pb-10 mt-6 rounded-lg border border border-solid shadow-md bg-white bg-opacity-0 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-stretch pt-1.5 pr-20 pb-6 pl-8 w-full text-base font-semibold leading-6 border border-b border-solid max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="self-start">File name</div>
          <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto">Access setting</div>
            <div>Shared with</div>
            <div>Created by</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between mt-7 w-full max-w-[1186px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-3 my-auto text-base leading-6">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dae9365b7a65cbaba3341a5e53b99ad8ccf4d19fb6aa4f19d8f9f072f049dfb?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 self-start w-4 aspect-square"
            />
            <div className="flex-auto">metomic ss.png</div>
          </div>
          <div className="flex gap-5 justify-between text-sm leading-5 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-3 justify-center self-start px-3 py-1.5 bg-gray-100 rounded-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/37be27c67db7dd43aa2fc19b796c6c41de1ca1a7fd78ca900850292893efa477?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                className="shrink-0 w-4 aspect-square"
              />
              <div className="my-auto">External</div>
            </div>
            <div className="flex gap-2 my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac092c1c3d1c80f09d1127b431bef5c2d5661ef7b73a49ddeaf60b1b0ce7943e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                className="shrink-0 w-5 aspect-square"
              />
              <div className="my-auto">1</div>
            </div>
            <div className="flex gap-5 justify-between items-center leading-5">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/42d5fbe09d59beb2537a6c348e568396e26a36eccc6ef764c9e3b9a93b24509d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                className="shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <div className="self-stretch">koshiyajuhil</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2e24c30e15ab705ea8413c70d4c37a46f5dfbabf7bcf19e68dc8a39980b5fdd?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                className="shrink-0 self-stretch my-auto w-5 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-center mt-8 w-full text-sm leading-5 max-w-[1186px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-3 self-stretch text-base leading-6 whitespace-nowrap max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa0ca2b55bdc54cbd24de9cafd3c7054984de09daf6dc85d90a84a3409590ffc?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 my-auto w-4 aspect-square"
            />
            <div className="flex-auto max-md:max-w-full">
              dokumen.pub_business-statistics-3rd-edition-9780321925831-
              <br />
              1292058692-9781292058696-4464484514-0321925831.pdf
            </div>
          </div>
          <div className="flex gap-3 justify-center self-stretch px-3 py-1.5 my-auto whitespace-nowrap bg-gray-100 rounded-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dadbaf132ee90aef738733909658f4401b7018942b8cff8b9859aa1841eea8a4?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 w-4 aspect-square"
            />
            <div className="my-auto">External</div>
          </div>
          <div className="flex gap-2 self-stretch my-auto whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4295de5b32a6a20382d463e6aa16249e1b8734e2e86bc8601814a3a6494e77d?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 w-5 aspect-square"
            />
            <div className="my-auto">1</div>
          </div>
          <div className="flex gap-2.5 items-center self-stretch my-auto">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f6b3a8dd6a74eca42df9937ec6100e2075f7632ef6f38a66e275dd1fa504a82e?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 self-stretch w-6 aspect-square"
            />
            <div className="flex-auto self-stretch my-auto">
              102_koshiya juhil
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2e24c30e15ab705ea8413c70d4c37a46f5dfbabf7bcf19e68dc8a39980b5fdd?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
              className="shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default ExternalReport;
