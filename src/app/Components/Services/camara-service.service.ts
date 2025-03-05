//src/app/Components/Services/camara-service.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';
import { Plugin } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  
  constructor() {}

  private async checkPermissions(): Promise<boolean> {
    if (this.isWeb()) return true;

    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted' || permissions.photos !== 'granted') {
      const request = await Camera.requestPermissions();
      return request.camera === 'granted' && request.photos === 'granted';
    }
    return true;
  }

  private isWeb(): boolean {
    return typeof window !== 'undefined' && window.document !== undefined;
  }

  async takePicture(): Promise<string> {
    const hasPermissions = await this.checkPermissions();
    if (!hasPermissions) {
      throw new Error('Permisos de cámara no otorgados');
    }
  
    if (this.isWeb()) {
      return this.takePictureWeb();
    } else {
      return await this.takePictureMobile(); // Aquí se usa la función correctamente
    }
  }
  

  private async takePictureWeb(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'; // Asegura que solo se seleccionen imágenes

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (!file) {
          reject('No se seleccionó ningún archivo');
          return;
        }

        if (!file.type.startsWith('image/')) {
          reject('El archivo seleccionado no es una imagen.');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      };

      input.click();
    });
  }

  private async takePictureMobile(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  
    if (!image.webPath) {
      throw new Error('Error al tomar la foto');
    }
    
    return image.webPath;
  }
  
}
