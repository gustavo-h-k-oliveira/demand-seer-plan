
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Product {
  name: string;
  currentStock?: number;
  revenue?: number;
  salesTarget?: number;
  salesPercentage?: number;
}

interface SalesMetricsTableProps {
  data: Product[];
}

const SalesMetricsTable = ({ data }: SalesMetricsTableProps) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-100 text-green-700 border-green-300';
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-800">Métricas de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Produto</TableHead>
                <TableHead className="text-gray-700">Estoque</TableHead>
                <TableHead className="text-gray-700">Faturamento</TableHead>
                <TableHead className="text-gray-700">Meta de Vendas</TableHead>
                <TableHead className="text-gray-700">% Vendas Realizadas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, index) => (
                <TableRow key={index} className="hover:bg-orange-50">
                  <TableCell className="font-medium text-gray-800">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {product.currentStock?.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {product.revenue ? formatCurrency(product.revenue) : '-'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {product.salesTarget ? formatCurrency(product.salesTarget) : '-'}
                  </TableCell>
                  <TableCell>
                    {product.salesPercentage !== undefined ? (
                      <Badge className={getPercentageColor(product.salesPercentage)}>
                        {product.salesPercentage}%
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesMetricsTable;
