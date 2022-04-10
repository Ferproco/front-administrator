import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mensaje-guardar-documentoventa',
  templateUrl: './mensaje-guardar-documentoventa.component.html',
  styleUrls: ['./mensaje-guardar-documentoventa.component.css']
})
export class MensajeGuardarDocumentoventaComponent implements OnInit {

  public onClose: Subject<boolean>;
  ndocumento: string;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
}

public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
}

}
