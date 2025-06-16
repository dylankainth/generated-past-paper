import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import UploadSection from '@/components/UploadSection';

const NewModule = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFilesSubmit = () => {
    // send the files to the backend
    const formData = new FormData();
    formData.append("module", moduleCode);
    formData.append("module_name", moduleName);
    uploadedFiles.forEach(file => {
      formData.append("files", file);
    });
    fetch('/api/newModule', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
      )
      .then(data => {
        console.log('Files uploaded successfully:', data);
        // Optionally, redirect to the dashboard or show a success message
      }).then(() => {

        // send the user to the dashboard
        window.location.href = "/dashboard";
      })


  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StudyAI
                </h1>
                <p className="text-sm text-gray-600">Create New Module</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Module Name
            </label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. Introduction to AI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Module Code
            </label>
            <input
              type="text"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. CS101"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 mt-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Create a New Study Module</h1>
            <p className="text-gray-600 text-lg">
              Upload your study materials and let AI generate personalized practice questions
            </p>
          </div>

          <UploadSection onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />

          {uploadedFiles.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="default" onClick={handleFilesSubmit} className="px-6">
                Submit
              </Button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default NewModule;
