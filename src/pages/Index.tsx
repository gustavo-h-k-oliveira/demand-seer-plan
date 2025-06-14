
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import AnalysisResults from '@/components/AnalysisResults';
import Auth from '@/components/Auth';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading } = useAuth();
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
    selectedManagement,
    setSelectedManagement,
    categories,
    managements,
    clearFilters
  } = useAnalysis();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

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
            selectedManagement={selectedManagement}
            setSelectedManagement={setSelectedManagement}
            categories={categories}
            managements={managements}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
