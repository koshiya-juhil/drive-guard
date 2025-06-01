import { useContext, useState } from "react";
import ReportContext from "../../../context/ReportContext";
import axios from "axios";
import Config from "../../../Config";

function PublicReport() {

  const reportData = useContext(ReportContext);
  const publicFiles = reportData?.publicFiles || [];
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);

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

  // Handle checkbox selection
  const handleSelectFile = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  // Select or deselect all files
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFiles(publicFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  // Update access permissions for selected files
  const updateAccessPermissions = async (newAccessLevel) => {
    if (selectedFiles.length === 0) {
      setUpdateMessage({ type: 'error', text: 'Please select at least one file' });
      setTimeout(() => setUpdateMessage(null), 3000);
      return;
    }

    setIsUpdating(true);
    setUpdateMessage({ type: 'info', text: 'Updating access permissions...' });
    
    try {
      const email = sessionStorage.getItem('user');
      const response = await axios({
        method: 'post',
        url: `${Config.serverUrl}/updatePermissions`,
        data: { 
          email,
          fileIds: selectedFiles,
          accessLevel: newAccessLevel
        }
      });

      console.log("response", response);
      
      setUpdateMessage({ 
        type: 'success', 
        text: `Successfully updated ${selectedFiles.length} files to ${newAccessLevel}`
      });
      
      // Clear selected files
      setSelectedFiles([]);
      
      // Refresh the report data
      window.location.reload();
    } catch (error) {
      console.error("Error updating permissions:", error);
      setUpdateMessage({ 
        type: 'error', 
        text: `Error updating permissions: ${error.response?.data || error.message}`
      });
    } finally {
      setIsUpdating(false);
      setTimeout(() => setUpdateMessage(null), 5000);
    }
  };

  return (
    <div className="flex flex-col justify-center px-12 py-14 mt-12 text-gray-700 border-t border-b border-gray-300 border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 self-start text-3xl font-extralight leading-9 max-md:flex-wrap">
        <div>1.</div>
        <div className="flex-auto max-md:max-w-full">
          {publicFiles?.length || 0} files are publicly accessible for anyone with the link
        </div>
      </div>
      
      {/* Bulk Actions */}
      {publicFiles.length > 0 && (
        <div className="flex items-center my-4 space-x-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="selectAll" 
              className="w-4 h-4 mr-2 cursor-pointer" 
              checked={selectedFiles.length === publicFiles.length && publicFiles.length > 0}
              onChange={handleSelectAll}
            />
            <label htmlFor="selectAll" className="cursor-pointer">Select All</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium">{selectedFiles.length} files selected</span>
            <button
              className="px-3 py-1 text-sm text-gray-700 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedFiles.length === 0 || isUpdating}
              onClick={() => updateAccessPermissions('private')}
            >
              Make Private
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-700 bg-orange-600 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedFiles.length === 0 || isUpdating}
              onClick={() => updateAccessPermissions('domain')}
            >
              Restrict to Domain
            </button>
          </div>
          
          {/* Status Message */}
          {updateMessage && (
            <div className={`px-4 py-2 rounded text-gray-700 ${
              updateMessage.type === 'error' ? 'bg-red-500' : 
              updateMessage.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {updateMessage.text}
            </div>
          )}
        </div>
      )}
      
      <table className="w-full mt-2 border border-solid shadow-md">
        <thead>
          <tr className="text-base font-semibold leading-6 text-left border-b border-solid">
            <th className="px-3 py-4 w-10">Select</th>
            <th className="pr-20 pl-3 py-4">File name</th>
            <th className="px-3 py-4">Access setting</th>
            <th className="px-3 py-4">Shared with</th>
            <th className="px-3 py-4">Created by</th>
          </tr>
        </thead>
        <tbody>
          {publicFiles?.map((file, index) => (
            <tr key={index} className="text-base leading-6 text-left border-b border-solid">
              <td className="px-3 py-4">
                <input 
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                />
              </td>
              <td className="flex items-center gap-3 px-3 py-4 whitespace-nowrap">
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