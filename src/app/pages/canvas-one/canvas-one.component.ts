import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-canvas-one',
  templateUrl: './canvas-one.component.html',
  styleUrls: ['./canvas-one.component.css']
})
export class CanvasOneComponent implements OnInit, OnDestroy {

  selectedImages: any[] = [];
  draggingImage: any = null;
  offsetX: number = 0;
  offsetY: number = 0;
  secondCanvasImage:any

  images = [
    { url: '/assets/images/imageOne.jpeg', alt: 'imageOne' },
    { url: '/assets/images/imageTwo.webp', alt: 'imageTwo' },
    { url: '/assets/images/imageThree.jpeg', alt: 'imageThree' },
    { url: '/assets/images/imageFour.webp', alt: 'imageFour' },
    { url: '/assets/images/imageFive.jpeg', alt: 'imageFive' }
  ];

  ngOnInit() {
    const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
    const canvasTwo = document.getElementById('secondCanvas') as HTMLCanvasElement;

    canvas.addEventListener('mousedown', (event) => this.onMouseDown(event, 'firstCanvas'));
    canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.addEventListener('mouseup', () => this.onMouseUp('firstCanvas'));

    canvasTwo.addEventListener('mouseup', () => this.onMouseUp('secondCanvas'));
  }


  /**checking image is already exist or not */
  imageSelected(imageFile: any): boolean {
    return this.selectedImages.some(img => img.url === imageFile.url && img.alt === imageFile.alt);
  }

  /**selecting image and push into array */
  selectImage(imageFile: any) {
    if (!this.imageSelected(imageFile)) {
      this.selectedImages.push({ ...imageFile, x: 0, y: 0 });
    } else {
      this.selectedImages = this.selectedImages.filter(img => img.url !== imageFile.url || img.alt !== imageFile.alt);
      console.log(this.selectedImages);
      
      if(this.secondCanvasImage){
        if( imageFile.url===this.secondCanvasImage.url){
          this.secondCanvasImage=null
          this.secondCanvasMakeEmpty()
        }
      }

    }
    this.addImageToCanvasOne('firstCanvas');
  }


  /**adding image to canvasone */
  addImageToCanvasOne(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = 600;
      canvas.height = 650;
      context.clearRect(0, 0, canvas.width, canvas.height);

      this.selectedImages.forEach((image) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
          context.drawImage(img, image.x, image.y, 300, 300);
        };
      });
    }
  }


  /**mouse event - mouse cliking time */
  onMouseDown(event: MouseEvent, canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (canvasId === 'firstCanvas') {
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
    
  }


  /**mouse moving time */
  onMouseMove(event: MouseEvent) {
    if (this.draggingImage) {
      const canvas = document.querySelector('#firstCanvas') as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.draggingImage.x = mouseX - this.offsetX;
      this.draggingImage.y = mouseY - this.offsetY;

      this.addImageToCanvasOne('firstCanvas');
    }
  }


  /**mouse up time */
  onMouseUp(canvasId:string) {
    
    if (canvasId === 'secondCanvas' && this.draggingImage) {
      this.addToSecondCanvas('secondCanvas');
      this.secondCanvasImage=this.draggingImage
      
    }
    this.draggingImage = null;
  }
  
  


  /**add to second canvas */
  addToSecondCanvas(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = canvas.getContext('2d');
  
    if (context && this.draggingImage) {
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = this.draggingImage.url;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height); 
      };
    }
  }

  /**when unselection remove from both first and second canvas */
  secondCanvasMakeEmpty(){
    const canvas = document.getElementById('secondCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if(context){
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  

  
    ngOnDestroy() {
      const canvas = document.getElementById('firstCanvas') as HTMLCanvasElement;
      const canvasTwo = document.getElementById('secondCanvas') as HTMLCanvasElement;
  
      canvas.removeEventListener('mousedown', (event) => this.onMouseDown(event, 'firstCanvas'));
      canvas.removeEventListener('mousemove', (event) => this.onMouseMove(event));
      canvas.removeEventListener('mouseup', () => this.onMouseUp('firstCanvas'));
  
      canvasTwo.removeEventListener('mouseup', () => this.onMouseUp('secondCanvas'));
    }
  
} 

