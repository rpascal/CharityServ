import { ToastController, ToastOptions } from 'ionic-angular';
import { Injectable } from '@angular/core';

export class positions {
  public top : string = "top";
  public bottom : string = "bottom";
  public middle : string = "middle";
}

@Injectable()
export class ToastProvider {

  constructor(public toastContoller: ToastController) {
  }

  presentToast(message : string) {
    this.toastContoller.create({
      message: message,
      position: new positions().bottom,
      duration : 2000
    }).present();
  }

  presentToastOptions(options : ToastOptions){
    this.toastContoller.create(options).present();
  }


}
