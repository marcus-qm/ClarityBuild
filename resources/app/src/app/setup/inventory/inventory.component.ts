import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatasaveService } from "../../services/datasave.service";
import { DatawriteService } from "../../services/datawrite.service";

const uuidv4 = require('uuid/v4');


@Component({
  selector: 'setup-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class SetupInventoryComponent implements OnInit {
  addInventoryForm: FormGroup;

  inventoryList;

  updatingInventory;

  @Output() inventorySetMessage = new EventEmitter();


  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private fb: FormBuilder, private dlService: DataloadService) {
    dsService.myBool6$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.updatingInventory = false;
        this.dwService.log(this.dwService.writeLog("ADD", "INVENTORY", this.inventoryList), this.dlService.getLogs())
        this.goToEmployees();
        // this.inventoryList = this.dlService.getInventory();
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
      }
   })
   }

  ngOnInit() {

    this.updatingInventory = false;

    this.inventoryList = [];

    this.addInventoryForm = this.fb.group({
      id: new FormControl(),
      label: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      cost: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.min(0)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.min(0)]),
    })

  }

  saveInventory() {
    let inventoryItem = {};

    inventoryItem = {
      active: true,
      id: uuidv4(),
      label: this.addInventoryForm.controls.label.value,
      price: this.addInventoryForm.controls.price.value,
      cost: this.addInventoryForm.controls.cost.value,
    }

    // this.newEmployees.push(employee);


    this.inventoryList.push(inventoryItem);
    
    this.addInventoryForm.reset();

    Object.keys(this.addInventoryForm.controls).forEach(key => {
      this.addInventoryForm.get(key).markAsUntouched();
      this.addInventoryForm.get(key).markAsPristine();
    })
  }

  moveToEmployees() {
      this.updatingInventory = true;
      console.log(this.inventoryList);
      this.dwService.updateInventory(this.inventoryList);
  }

  goToEmployees() {
    this.inventorySetMessage.emit("Inventory Set");
  }

}
