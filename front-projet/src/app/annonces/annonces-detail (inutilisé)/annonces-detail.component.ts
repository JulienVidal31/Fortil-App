import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-annonces-detail',
  templateUrl: './annonces-detail.component.html'
})
export class AnnoncesDetailComponent {
  
  // @Input() title!: number
  // @Input() isVisible: boolean = false

  isVisible = false;

  constructor() {}
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
