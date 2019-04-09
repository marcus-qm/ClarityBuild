import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataloadService } from "../../../services/dataload.service";



@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @Output() messageEvent1 = new EventEmitter<number>();

  incomesJSON;

  incomePresetsExist: boolean;
  preset_labels;


  @Input() income: number;

  //More app code

  incometally: number;
  otherIncomeCounter = 0;
  incomeForm = new FormGroup({
    // incomeFromTill: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(0)]))
  });

  // otherIncomeForm = new FormGroup({
  //   otherIncomeName: new FormControl("", Validators.compose([Validators.required, Validators.minLength(0)])),
  //   otherIncomeValue: new FormControl(0, Validators.compose([Validators.required, Validators.minLength(0)]))    
  // });

  constructor(private dlService: DataloadService, private fb: FormBuilder) { }

  ngOnInit() {

    this.incomePresetsExist = this.dlService.incomePresetsExist();
    if (this.incomePresetsExist) {
      this.generatePresetForm();

      this.incomeForm = this.fb.group({

      });

      this.preset_labels.forEach((label, index) => {
        //console.log.log(label);
        //fix for multiple incomes entered
        this.incomeForm.addControl(label.label, new FormControl(0, Validators.required))
      })

    } else {
      this.setupNewForm();
    }
  }


  generatePresetForm() {
    let labels = this.dlService.getIncomePresetLabels();
    //console.log.log(labels);

    this.preset_labels = labels.filter(label => label.value === true)

    // this.preset_labels = this.dlService.getIncomePresetLabels();

    //console.log.log(this.preset_labels);
  }

  setupNewForm() {
    this.preset_labels = [];

  }

  packageIncomeJSON() {
    this.incomesJSON = [];
    Object.keys(this.incomeForm.controls).forEach(key => {
      ////console.log.log(this.incomeForm.controls[key]);
      this.incomesJSON.push({
        'label': key,
        'value': this.incomeForm.controls[key].value
      })
    });
  }


  goToExpenses() {
    this.packageIncomeJSON();
    this.messageEvent1.emit(this.incomesJSON);
  }

}
