import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Target, Download, Upload, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

type ActiveTab = 'builder' | 'checker' | 'matching';

export const JobSeeker: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('builder');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [atsScore, setATSScore] = useState<number | null>(null);

  const tabs = [
    { id: 'builder', label: 'AI Resume Builder', icon: FileText },
    { id: 'checker', label: 'ATS Score Checker', icon: Target },
    { id: 'matching', label: 'Job Matching', icon: Search }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const generateATSScore = () => {
    // Simulate ATS scoring
    const score = Math.floor(Math.random() * 40) + 60; // 60-100 range
    setATSScore(score);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'builder':
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Your Resume</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your professional background..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, TypeScript, Node.js, Python..."
                  />
                </div>
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Template Preview</h3>
              <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500 mt-20">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Your resume will appear here</p>
                  <p className="text-sm">Fill in the form to see live preview</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Word
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'checker':
        return (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ATS Score Checker</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Your Resume
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    rows={8}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste the job description here..."
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button 
                  onClick={generateATSScore}
                  disabled={!resumeFile || !jobDescription}
                  size="lg"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Analyze ATS Score
                </Button>
              </div>

              {atsScore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {atsScore}%
                      </div>
                      <p className="text-gray-600">ATS Compatibility Score</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-green-600">85%</div>
                        <div className="text-sm text-gray-600">Keyword Match</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-yellow-600">72%</div>
                        <div className="text-sm text-gray-600">Format Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-blue-600">90%</div>
                        <div className="text-sm text-gray-600">Section Score</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </Card>
          </div>
        );

      case 'matching':
        return (
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Job Matching</h3>
              <p className="text-gray-600 mb-6">
                Upload your resume to find perfectly matched job opportunities
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-match"
                  />
                  <label
                    htmlFor="resume-match"
                    className="block w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:border-blue-400 transition-colors cursor-pointer"
                  >
                    Upload Resume for Job Matching
                  </label>
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Find Jobs
                </Button>
              </div>
            </Card>

            <div className="grid gap-6">
              {[1, 2, 3].map((job) => (
                <motion.div
                  key={job}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: job * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">
                          Senior Frontend Developer
                        </h4>
                        <p className="text-gray-600">TechCorp Inc. • San Francisco, CA</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <div className="text-sm text-gray-600">Match Score</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      We're looking for a skilled Frontend Developer with expertise in React, 
                      TypeScript, and modern web technologies...
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['React', 'TypeScript', 'Node.js', 'AWS'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">$120k - $150k • Full-time</span>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Build, optimize, and match your way to your dream job
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-white bg-blue-600 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 inline-block mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};