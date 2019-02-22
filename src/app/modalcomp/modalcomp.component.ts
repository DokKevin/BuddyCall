import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalcomp',
  templateUrl: './modalcomp.component.html',
  styleUrls: ['./modalcomp.component.scss'],
})
export class ModalcompComponent implements OnInit {

    @Input() value: any;
    public name = "this contact";

  constructor(public modalController: ModalController) { }

  ngOnInit() {
      if(this.value){
          this.name = this.value;
      }
      console.log("value: " + this.value);
      console.log("name: " + this.name);
  }

  clickCancel(){
      console.log("Click Cancel");
      this.modalController.dismiss({
          'result': 0
      });
  }

  clickDelete(){
      console.log("Click Delete");
      this.modalController.dismiss({
          'result': 1
      });
  }

}
