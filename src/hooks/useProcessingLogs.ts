
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ProcessingLog {
  id: string;
  file_name: string;
  file_size: number;
  products_count: number;
  status: 'success' | 'error';
  error_message?: string;
  processed_at: string;
}

export const useProcessingLogs = () => {
  const [logs, setLogs] = useState<ProcessingLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createLog = async (
    fileName: string,
    fileSize: number,
    productsCount: number,
    status: 'success' | 'error',
    errorMessage?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { error } = await supabase
        .from('processing_logs')
        .insert({
          user_id: user.id,
          file_name: fileName,
          file_size: fileSize,
          products_count: productsCount,
          status,
          error_message: errorMessage
        });

      if (error) {
        console.error('Erro ao salvar log:', error);
        toast({
          title: "Erro ao salvar log",
          description: "Não foi possível registrar o processamento",
          variant: "destructive",
        });
      } else {
        console.log('Log salvo com sucesso:', { fileName, status, productsCount });
      }
    } catch (error) {
      console.error('Erro ao criar log:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('processing_logs')
        .select('*')
        .order('processed_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logs,
    isLoading,
    createLog,
    fetchLogs
  };
};
