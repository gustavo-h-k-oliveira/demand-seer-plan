
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { useProcessingLogs } from '@/hooks/useProcessingLogs';

const Logs = () => {
  const { logs, isLoading, fetchLogs } = useProcessingLogs();

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Logs de Processamento</h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Carregando logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-center text-gray-400">Nenhum log encontrado.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Arquivo</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                  <th className="py-2 px-4 border-b text-center">Produtos</th>
                  <th className="py-2 px-4 border-b text-center">Data</th>
                  <th className="py-2 px-4 border-b text-center">Mensagem de Erro</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td className="py-2 px-4 border-b text-center">{log.file_name}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        log.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status === 'success' ? 'Sucesso' : 'Erro'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">{log.products_count}</td>
                    <td className="py-2 px-4 border-b text-center">{new Date(log.processed_at).toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-4 border-b text-center text-red-600">{log.error_message || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
