
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import AnalysisResults from '@/components/AnalysisResults';
import { useAnalysis } from '@/hooks/useAnalysis';

const Index = () => {
  const { 
    data, 
    isLoading, 
    uploadFile, 
    results,
    filteredProducts,
    filteredSummary,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTrend,
    setSelectedTrend,
    categories,
    clearFilters
  } = useAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <UploadSection onUpload={uploadFile} isLoading={isLoading} />
        {results && (
          <AnalysisResults 
            results={results}
            filteredProducts={filteredProducts}
            filteredSummary={filteredSummary}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTrend={selectedTrend}
            setSelectedTrend={setSelectedTrend}
            categories={categories}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
