
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import AnalysisResults from '@/components/AnalysisResults';
import { useAnalysis } from '@/hooks/useAnalysis';

const Index = () => {
  const { data, isLoading, uploadFile, results } = useAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <UploadSection onUpload={uploadFile} isLoading={isLoading} />
        {results && <AnalysisResults results={results} />}
      </div>
    </div>
  );
};

export default Index;
