import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendData } from '../backend-data';
import { Observable } from 'rxjs';

import radiosData from "../../../radio.json";



interface Radio {
  nom: string,
  flux: string,
  ID : string
}




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  radios : Radio[];

  selectedRadio : Radio;

  audio = new Audio();

  selectedIndex : number;

  isPlaying : boolean = false;

  constructor(private http : HttpClient) {

  }

  ngOnInit(): void {
    this.radios=radiosData;
  }

  selectRadio(radio : Radio, index) : void{
    this.selectedRadio = radio;
    this.selectedIndex = index;
    if(this.isPlaying)
      this.playRadio();
  }

  playRadio():void{
    this.audio.src = this.selectedRadio.flux;
    this.audio.play();
    this.isPlaying = true;
  }

  pauseRadio():void{
    this.audio.pause();
    this.isPlaying = false;
  }

  playAndSelectRadio(radio : Radio, index):void{
    this.selectedRadio = radio;    
    this.selectedIndex = index;
    this.playRadio();
    this.isPlaying = true;
  }

  changeVolume(vol : number) : void{
    this.audio.volume = vol;
  }

  mute():void{
    this.audio.volume = 0;
  }

  unmute():void{
    this.audio.volume = 0.5;
  }

  formatLabel(value: number) {
    return Math.round(100 * value) + "%";
  }

  previous():void{
    if(this.selectedIndex > 0){
      this.selectRadio(this.radios[this.selectedIndex-1], this.selectedIndex-1);
    }
  }

  next():void{
    if(this.selectedIndex < this.radios.length-1){
      this.selectRadio(this.radios[this.selectedIndex+1], this.selectedIndex+1);
    }
  }

}
