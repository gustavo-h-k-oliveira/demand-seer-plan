
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category?: string;
  management?: string;
  currentStock?: number;
  weight?: number;
  weightTarget?: number;
  salesPercentage?: number;
}

interface ExportReportsProps {
  products: Product[];
  summary: {
    totalProducts: number;
    avgGrowth: number;
    highDemandProducts: number;
  };
}

const ExportReports = ({ products, summary }: ExportReportsProps) => {
  const generateCSV = () => {
    const headers = [
      'Produto',
      'Demanda Atual',
      'Demanda Prevista',
      'Tendência',
      'Confiança (%)',
      'Categoria',
      'Gerência',
      'Estoque',
      'Peso (kg)',
      'Meta Peso (kg)',
      '% Vendas Realizadas'
    ];

    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        `"${product.name}"`,
        product.currentDemand,
        product.predictedDemand,
        product.trend,
        Math.round((product.confidence || 0) * 100),
        `"${product.category || ''}"`,
        `"${product.management || ''}"`,
        product.currentStock || 0,
        product.weight || 0,
        product.weightTarget || 0,
        product.salesPercentage || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analise_produtos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CSV Exportado!",
      description: "O arquivo CSV foi baixado com sucesso.",
    });
  };

  const generatePDF = () => {
    // Create a simple HTML content for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório de Análise de Produtos</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
          .summary h3 { margin: 0 0 10px 0; }
          .summary p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .trend-up { color: green; }
          .trend-down { color: red; }
          .trend-stable { color: orange; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Relatório de Análise de Produtos</h1>
          <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div class="summary">
          <h3>Resumo Executivo</h3>
          <p><strong>Total de Produtos:</strong> ${summary.totalProducts}</p>
          <p><strong>Crescimento Médio:</strong> ${summary.avgGrowth.toFixed(1)}%</p>
          <p><strong>Produtos em Alta Demanda:</strong> ${summary.highDemandProducts}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Demanda Atual</th>
              <th>Demanda Prevista</th>
              <th>Tendência</th>
              <th>Confiança</th>
              <th>Categoria</th>
              <th>Gerência</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(product => `
              <tr>
                <td>${product.name}</td>
                <td>${product.currentDemand}</td>
                <td>${product.predictedDemand}</td>
                <td class="trend-${product.trend}">${product.trend}</td>
                <td>${Math.round((product.confidence || 0) * 100)}%</td>
                <td>${product.category || '-'}</td>
                <td>${product.management || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      newWindow.print();
    }

    toast({
      title: "PDF Gerado!",
      description: "O relatório PDF foi aberto em uma nova janela para impressão.",
    });
  };

  return (
    <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-gray-800 flex items-center justify-center text-xl">
          <Download className="w-6 h-6 mr-3" />
          Exportar Relatórios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={generatePDF}
              size="lg"
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
            >
              <FileText className="w-6 h-6 mr-3" />
              Exportar PDF
            </Button>
            <Button
              onClick={generateCSV}
              size="lg"
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            >
              <FileSpreadsheet className="w-6 h-6 mr-3" />
              Exportar CSV
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center max-w-md">
            Exporte os dados da análise em formato PDF para relatórios ou CSV para processamento adicional.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportReports;
