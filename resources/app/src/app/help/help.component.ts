import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  showHelpModal;

  constructor() { }

  ngOnInit() {
    this.showHelpModal = false;
  }

  toggleHelp(){
    this.showHelpModal = !this.showHelpModal
  }

}
