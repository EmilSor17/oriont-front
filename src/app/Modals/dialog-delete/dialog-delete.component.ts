import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerDisplayDTO } from 'src/app/DTOs/customer-displayDTO';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  constructor(    private dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDisplayDTO) { }

  ngOnInit(): void {    
  }
delete(){
  if(this.data){
    this.dialogRef.close("deleted");
  }
}

}
