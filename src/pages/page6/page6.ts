import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';



import  annyang from 'annyang'


@Component({
  selector: 'page-page6',
  templateUrl: 'page6.html'
})
export class Page6 {
  responsiveVoice: any;

  constructor(public navCtrl: NavController) {
    
  }
    ngAfterViewInit() {
 
         // Let's define a command. 
      var commands = {
        'salut': function() {   (<any>window).responsiveVoice.speak("Bonjour", "French Female"); },
        'comment vas-tu': function() { (<any>window).responsiveVoice.speak("Plutôt bien et vous?", "French Female"); },
        "comment t'appelles-tu": function() { (<any>window).responsiveVoice.speak("Je suis annyang et toi?", "French Female"); },
        "je m'appelle :name": function(name) { (<any>window).responsiveVoice.speak("Enchanté"+name, "French Female"); }
      };
             
      // Add our commands to annyang 
      annyang.addCommands(commands);
      // Start listening. 
    annyang.setLanguage('fr-FR');
      annyang.start();
     annyang.debug(true);
    }
    
    
}
