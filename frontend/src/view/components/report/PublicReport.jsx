import { useContext } from "react";
import ReportContext from "../../../context/ReportContext";

function PublicReport() {

  const reportData = useContext(ReportContext);
  const publicFiles = reportData?.publicFiles || [];

  // Function to open Google Drive file
  const openInDrive = (fileId, mimeType) => {
    if (!fileId) return;
    
    let driveUrl;
    
    // Handle different Google Workspace file types
    if (mimeType && mimeType.includes('google-apps')) {
      if (mimeType === 'application/vnd.google-apps.document') {
        driveUrl = `https://docs.google.com/document/d/${fileId}/edit`;
      } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
        driveUrl = `https://docs.google.com/spreadsheets/d/${fileId}/edit`;
      } else if (mimeType === 'application/vnd.google-apps.presentation') {
        driveUrl = `https://docs.google.com/presentation/d/${fileId}/edit`;
      } else if (mimeType === 'application/vnd.google-apps.form') {
        driveUrl = `https://docs.google.com/forms/d/${fileId}/edit`;
      } else if (mimeType === 'application/vnd.google-apps.folder') {
        driveUrl = `https://drive.google.com/drive/folders/${fileId}`;
      } else {
        // Default for other Google document types
        driveUrl = `https://drive.google.com/file/d/${fileId}/view`;
      }
    } else {
      // Default for non-Google files
      driveUrl = `https://drive.google.com/file/d/${fileId}/view`;
    }
    
    window.open(driveUrl, '_blank');
  };

  // CSS for the link with hover effect
  const fileLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: 'fit-content',
    overflow: 'hidden',
    breakWord: 'break-word',
    whiteSpace: 'normal',
    cursor: 'pointer',
    transition: 'color 0.2s, transform 0.2s',
    position: 'relative',
  };

  // CSS for the external link icon
  const externalLinkIconStyle = {
    fontSize: '12px',
    marginLeft: '4px',
    color: '#6b7280', // Gray color for the icon
  };

  return (
    <div className="flex flex-col justify-center px-12 py-14 mt-12 text-gray-700 border-t border-b border-gray-300 border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 self-start text-3xl font-extralight leading-9 max-md:flex-wrap">
        <div>1.</div>
        <div className="flex-auto max-md:max-w-full">
          {publicFiles?.length || 0} files are publicly accessible for anyone with the link
        </div>
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
          {publicFiles?.map((file, index) => (
            <tr key={index} className="text-base leading-6 text-left border-b border-solid">
              <td className="flex items-center gap-3 px-8 py-4 whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/40ee81af89e7be9e5c573e83f5c0a926a811711e74386276a4453f64def7ace4?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                  className="w-4 aspect-square shrink-0"
                  alt="File icon"
                />
                <div 
                  style={fileLinkStyle}
                  onClick={() => openInDrive(file.id, file.mimeType)}
                  title="Open in Google Drive"
                  className="hover:text-blue-700 hover:underline"
                >
                  {file.name}
                  <span style={externalLinkIconStyle}>↗</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center w-fit gap-3 px-3 py-1.5 bg-gray-100 rounded-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad9c67963977d8201856e2bc2d9a93409f0a66967c37884401deab24db3f4bc?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&"
                    className="w-4 aspect-square shrink-0"
                    alt="Access icon"
                  />
                  <span>Anyone with link</span>
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
                  srcSet={file.owners?.length ? file.owners[0].photoLink : 'https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/389405209ebfdc0ce05c73484acc04d57a0069def0023eca3acca5c53a3ac2fe?apiKey=ffe900c0da0f45f9af6d3b4f4c162962&'}
                  className="w-6 aspect-square shrink-0 rounded-full"
                  alt="Created by icon"
                />
                <span>{file.owners?.length ? file.owners[0].displayName : 'Unknown'}</span>
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
    </div>
  );
}

export default PublicReport;