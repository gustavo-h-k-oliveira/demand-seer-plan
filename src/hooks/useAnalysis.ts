
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { toast } from '@/hooks/use-toast';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category?: string;
}

interface AnalysisResults {
  products: Product[];
  summary: {
    totalProducts: number;
    avgGrowth: number;
    highDemandProducts: number;
  };
}

export const useAnalysis = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const processMLAnalysis = (products: any[]): AnalysisResults => {
    console.log('Processing ML analysis for', products.length, 'products');
    
    const analyzedProducts: Product[] = products.map((product, index) => {
      // Simulate ML analysis with realistic patterns
      const baseValue = product.vendas || product.quantidade || product.demanda || Math.floor(Math.random() * 1000) + 100;
      const seasonalityFactor = 1 + 0.3 * Math.sin(index * 0.5); // Seasonal variation
      const trendFactor = 1 + (Math.random() - 0.3) * 0.4; // Growth/decline trend
      const marketFactor = 1 + (Math.random() - 0.5) * 0.2; // Market conditions
      
      const predicted = Math.round(baseValue * seasonalityFactor * trendFactor * marketFactor);
      const growth = ((predicted - baseValue) / baseValue) * 100;
      
      let trend: 'up' | 'down' | 'stable';
      if (growth > 5) trend = 'up';
      else if (growth < -5) trend = 'down';
      else trend = 'stable';
      
      const confidence = 0.7 + Math.random() * 0.25; // 70-95% confidence
      
      return {
        name: product.produto || product.nome || product.item || `Produto ${index + 1}`,
        currentDemand: baseValue,
        predictedDemand: predicted,
        trend,
        confidence,
        category: product.categoria || product.category || 'Geral'
      };
    });

    // Calculate summary statistics
    const totalProducts = analyzedProducts.length;
    const avgGrowth = analyzedProducts.reduce((acc, p) => {
      return acc + ((p.predictedDemand - p.currentDemand) / p.currentDemand) * 100;
    }, 0) / totalProducts;
    
    const highDemandProducts = analyzedProducts.filter(p => p.trend === 'up').length;

    return {
      products: analyzedProducts,
      summary: {
        totalProducts,
        avgGrowth,
        highDemandProducts
      }
    };
  };

  const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('CSV parsed:', results.data.length, 'rows');
          resolve(results.data);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          reject(new Error('Erro ao processar arquivo CSV'));
        }
      });
    });
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    console.log('Uploading file:', file.name, 'Type:', file.type);
    
    try {
      let parsedData: any[] = [];
      
      if (file.name.endsWith('.csv')) {
        parsedData = await parseCSVFile(file);
      } else {
        // Parse Excel
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(worksheet);
        console.log('Excel parsed:', parsedData.length, 'rows');
      }

      if (parsedData.length === 0) {
        throw new Error('Arquivo vazio ou formato inválido');
      }

      setData(parsedData);
      
      // Simulate ML processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysisResults = processMLAnalysis(parsedData);
      setResults(analysisResults);
      
      toast({
        title: "Análise Concluída!",
        description: `${analysisResults.products.length} produtos analisados com sucesso.`,
      });
      
    } catch (error) {
      console.error('File processing error:', error);
      toast({
        title: "Erro no Processamento",
        description: error instanceof Error ? error.message : "Erro desconhecido ao processar arquivo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    uploadFile,
    results
  };
};
