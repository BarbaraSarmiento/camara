import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaraService } from '../Services/camara-service.service';

@Component({
  selector: 'app-camar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camar.component.html',
  styleUrls: ['./camar.component.css']
})
export class CamarComponent {
  cameraService: CamaraService = inject(CamaraService);
  imgUrls: string[] = []; // Almacena las URLs de imágenes
  errorMessage: string = '';
  loading: boolean = false;
  
  async takePicture() {
    this.errorMessage = ''; // Limpiar errores previos
    
    try {
      this.loading = true;
      const imgUrl = await this.cameraService.takePicture();
      
      if (!imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }
      
      this.imgUrls.push(imgUrl); // Agregar imagen al array
      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.loading = false;
    }
  }
  async uploadPicture() {
    this.errorMessage = ''; // Limpiar errores previos
  
    try {
      this.loading = true;
      const imgUrl = await this.cameraService.takePicture();
  
      if (!imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }
  
      this.imgUrls.push(imgUrl); // Agregar imagen al array
      this.loading = false;
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      this.errorMessage = String(error);
      this.loading = false;
    }
  }
  

  deleteImage(index: number) {
    this.imgUrls.splice(index, 1); // Elimina la imagen seleccionada
  }
}
