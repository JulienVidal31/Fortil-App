import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class UploadsController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../front-projet/src/assets/images', // Le répertoire où les fichiers seront stockés
        filename: (req, file, cb) => {
          const randomName = Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          // cb(null, `${randomName}${extname(file.originalname)}`);
          cb(null, `${(file.originalname)}`); //version 1 : pas d'ajout de chaine random devant nom de l'image car je ne sais pas récupérer ce nouveau nom dans le front --> à améliorer
        },
      }),
    }),
  )
//   uploadFile(@UploadedFile() file: Express.Multer.File) {
    uploadFile(@UploadedFile() file) {
    // Le fichier a été téléchargé avec succès
    return { message: 'Fichier téléchargé avec succès' };
  }
}
