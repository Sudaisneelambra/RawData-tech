import { Component } from '@angular/core';

@Component({
  selector: 'app-canvas-one',
  templateUrl: './canvas-one.component.html',
  styleUrls: ['./canvas-one.component.css']
})
export class CanvasOneComponent {

  selectedImages: any[] = [];
  draggingImage: any = null;
  offsetX: number = 0;
  offsetY: number = 0;


  /**images */
  images = [
    { url: '/assets/images/imageOne.jpeg', alt: 'imageOne' },
    { url: '/assets/images/imageTwo.webp', alt: 'imageTwo' },
    { url: '/assets/images/imageThree.jpeg', alt: 'imageThree' },
    { url: '/assets/images/imageFour.webp', alt: 'imageFour' },
    { url: '/assets/images/imageFive.jpeg', alt: 'imageFive' }
  ];

  ngOnInit() {
    const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
    canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
    canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.addEventListener('mouseup', () => this.onMouseUp());
  }



  /** checking the file include or not*/
  isImageSelected(imageFile: any): boolean {
    return this.selectedImages.some(img => img.url === imageFile.url && img.alt === imageFile.alt);
  }



  /** Select image */
  selectImage(imageFile: any) {
    if (!this.isImageSelected(imageFile)) {
      this.selectedImages.push({ ...imageFile, x: 0, y: 0 });
    } else {
      this.selectedImages = this.selectedImages.filter(img => img.url !== imageFile.url || img.alt !== imageFile.alt);
    }
    this.drawImageOnCanvas();
  }



  /** show selected images on canvas */
  drawImageOnCanvas() {
    const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = 1200;
      canvas.height = 800;

      /**clearing prvs canvas */
      context.clearRect(0, 0, canvas.width, canvas.height); 

      this.selectedImages.forEach((image, index) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          context.drawImage(img, image.x, image.y, 300, 300);
        };
      });
    }
  }




  /** handle mouse down event */
  onMouseDown(event: MouseEvent) {
    const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.selectedImages.forEach(image => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        if (mouseX >= image.x && mouseX <= image.x + 300 &&
            mouseY >= image.y && mouseY <= image.y + 300) {
          this.draggingImage = image;
          this.offsetX = mouseX - image.x;
          this.offsetY = mouseY - image.y;
        }
      };
    });
  }




  /** handle mouse move event */
  onMouseMove(event: MouseEvent) {
    if (this.draggingImage) {
      const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.draggingImage.x = mouseX - this.offsetX;
      this.draggingImage.y = mouseY - this.offsetY;
      this.drawImageOnCanvas();
    }
  }




  /** handle mouse up event */
  onMouseUp() {
    this.draggingImage = null;
  }

 

  ngOnDestroy() {
    const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
    canvas.removeEventListener('mousedown', (event) => this.onMouseDown(event));
    canvas.removeEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.removeEventListener('mouseup', () => this.onMouseUp());
  }

}
