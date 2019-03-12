import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss'],
})
export class AddContactComponent implements OnInit {

    @Input() value: any;
    public names: any;
    public outgoing = [];

    constructor(public modalController: ModalController) { }

    ngOnInit() {
        this.outgoing = [];
        let temp = [];
        this.value.forEach( function (person) {
            temp = [...temp, {thisPerson: person, isChecked: false}];
        });
        console.log("Temp");
        console.log(temp);
        this.saveName(temp);
    }

    public saveName(toSave){
        this.names = toSave;
    }

    public clickCancel(){
        this.modalController.dismiss({
            'result': this.outgoing
        });
    }

    public clickAdd(){
        this.checkAdd().then(() => {
            console.log("Outgoing");
            console.log(this.outgoing);

            this.modalController.dismiss({
                'result': this.outgoing
            });
        });
    }

    public async checkAdd(){
        for(let person of this.names){
            if(person.isChecked){
                this.outgoing = [...this.outgoing, person.thisPerson];
            }
        }
    }
}
