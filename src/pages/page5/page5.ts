import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page5',
  templateUrl: 'page5.html'
})
export class Page5 {
  responsiveVoice: any;
  voicelist : any;
    texte : string
  constructor(public navCtrl: NavController) {
this.texte = "Hello world";
  }

 ngAfterViewInit() {
  
     this.voicelist = (<any>window).responsiveVoice.getVoices();

  }


selectLanguage(ev: any){

     (<any>window).responsiveVoice.speak(this.texte, ev);
    
}
}
