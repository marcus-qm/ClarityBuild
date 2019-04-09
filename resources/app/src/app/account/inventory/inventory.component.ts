import { Component, OnInit } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatasaveService } from "../../services/datasave.service";
import { DatawriteService } from "../../services/datawrite.service";

const uuidv4 = require('uuid/v4');


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryList;

  addInventoryForm: FormGroup;

  editInventoryForm: FormGroup;

  showEODModal;

  InventoryListUpdated;

  showEODModal3;

  showEODModal2;

  searchingForInventory;

  updatingInventory;

  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private fb: FormBuilder, private dlService: DataloadService) {
    dsService.myBool6$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.updatingInventory = false;
        this.inventoryList = this.dlService.getInventory();
        this.InventoryListUpdated = false;
        this.dwService.log(this.dwService.writeLog("EDIT", "INVENTORY", this.inventoryList), this.dlService.getLogs())
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
      }
   })
   }

  ngOnInit() {
    this.showEODModal = false;
    this.showEODModal3 = false;
    this.showEODModal2 = false;
    this.searchingForInventory = false;
    this.inventoryList = this.dlService.getInventory();


    
    this.addInventoryForm = this.fb.group({
      id: new FormControl(),
      label: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      cost: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.min(0)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.min(0)]),
    })

    this.editInventoryForm = this.fb.group({
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

    this.InventoryListUpdated = true;
    
    this.toggleEODModal();

    this.addInventoryForm.reset();
  }

  allowInventoryListUpdate() {
    if (this.InventoryListUpdated) {
      return true
    } else {
      return false
    }
  }

  addInventoryToggle() {
    this.showEODModal = !this.showEODModal;
  }

  toggleEODModal() {
    this.showEODModal = !this.showEODModal;
  }

  toggleEODModal3(){
    this.showEODModal3 = !this.showEODModal3;
  }

  updateInventory(id) {
    this.toggleEODModal3();

    let key = [];
    this.inventoryList.filter((inventoryItem) => {
      if (inventoryItem.id === id) {
        key.push(inventoryItem);
        // employee = key;
      }
    })

    console.log(key)

    this.editInventoryForm.controls.id.setValue(id)
    this.editInventoryForm.controls.label.setValue(key[0].label)
    this.editInventoryForm.controls.cost.setValue(key[0].cost)
    this.editInventoryForm.controls.price.setValue(key[0].price)
    //console.log.log(id);
  }

  removeInventory(id) {
    let newList = [];
    this.inventoryList.filter((inventoryItem) => {
      if (inventoryItem.id !== id) {
        newList.push(inventoryItem)
      }
      // console.log(employee)
      // console.log(employee.id === id)
      // employee.id !== id
    })

    this.inventoryList = newList

    this.InventoryListUpdated = true;

    // console.log(newList);
    // return newList;
  }

  updateInventoryDetails(){
    
    this.removeInventory(this.editInventoryForm.controls.id.value);

    let inventoryItem = {};

    inventoryItem = {
      active: true,
      label: this.editInventoryForm.controls.label.value,
      price: this.editInventoryForm.controls.price.value,
      id: this.editInventoryForm.controls.id.value,
      cost: this.editInventoryForm.controls.cost.value
    }

    // this.newEmployees.push(employee);


    this.inventoryList.push(inventoryItem);


    this.InventoryListUpdated = true;
    
    this.toggleEODModal3();

    this.editInventoryForm.reset();

  }

  toggleEODModal2() {
    this.showEODModal2 = !this.showEODModal2;
  }

  searchForInventory(string) {
    // console.log(value)
    let match = [];
    string = string.toLowerCase();
    this.inventoryList.forEach(inventory => {
      // console.log(employee);
      // console.log(employee.name.includes(string))
      let master = inventory.label.toLowerCase();
      if (master.includes(string)) {
        match.push(inventory);
      }
    });
    return match;
  }

  findInventory(event) {
    let inventoryList = [];
    let inventoryMatches;
    if (event.length > 2) {
      this.searchingForInventory = true;
      inventoryMatches = this.searchForInventory(event);
      if (inventoryMatches.length > 0) {
        this.inventoryList = inventoryMatches;
      } else {
        this.inventoryList = this.dlService.getInventory();
        this.searchingForInventory = false;
      }
    } else {
      this.inventoryList = this.dlService.getInventory();
      this.searchingForInventory = false;
    }
  }

  updateInventoryList() {
    this.updatingInventory = true;
    console.log(this.inventoryList);
    this.dwService.updateInventory(this.inventoryList);
  }

}
