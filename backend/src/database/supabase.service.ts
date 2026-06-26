import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Express } from 'express';
import { Multer } from 'multer';

dotenv.config();

@Injectable()
export class SupabaseService {
  private readonly supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
  );

  uploadFile = async (
    fileName: string,
    fileType: 'image' | 'video' | 'audio',
    file: Express.Multer.File,
  ) => {
    const { error } = await this.supabase.storage
      .from('files')
      .upload(`${fileType}/${fileName}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error)
      throw new InternalServerErrorException(
        'Erro ao fazer o Upload do arquivo',
      );
  };

  getFile = async (fileName: string, fileType: 'image' | 'video' | 'audio') => {
    const { data } = this.supabase.storage
      .from('files')
      .getPublicUrl(`${fileType}/${fileName}`);

    return data.publicUrl;
  };
}
