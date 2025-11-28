import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-time-modal',
  templateUrl: './edit-time-modal.component.html',
  styleUrls: ['./edit-time-modal.component.scss']
})
export class EditTimeModalComponent {
  @Input() text: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  editedText: string = '';

  ngOnChanges() {
    this.editedText = this.text;
  }

  onSave() {
    this.save.emit(this.editedText);
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick() {
    this.onClose();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
