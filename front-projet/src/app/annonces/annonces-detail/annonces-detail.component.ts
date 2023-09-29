import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Annonce } from '../annonces.interface';

@Component({
  selector: 'app-annonces-detail',
  templateUrl: './annonces-detail.component.html'
})
export class AnnoncesDetailComponent {
  
  @Input() isVisibleModal = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() annonce!: Annonce

  closeModal(): void {
    this.onClose.emit();
  }


}
