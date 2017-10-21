import { Loader } from './../../providers/loader/loader';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController, Platform, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
// import { RegistrationPage } from '../registration/registration';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;


  public emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  public passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
  ]);


  constructor(
    private menuCtrl: MenuController,
    public navCtrl: NavController,
    public ToastController: ToastController,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private platform: Platform,
    public AuthenticationProvider: AuthenticationProvider,
    public Loader: Loader
  ) {

    this.menuCtrl.enable(false);

  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true)
  }

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator]
    });
  }

  login() {

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this.Loader.show("Logging In")
    this.AuthenticationProvider.loginWithEmail(email, password).then(res => {
      this.navCtrl.setRoot("HomePage")
      this.Loader.hide();
    }).catch(err => {
      this.alertCtrl.create({
        message: err,

      }).present();
      this.Loader.hide();
    });
  }

  // Push registration view
  signUp() {
    this.navCtrl.push("SignupPage");
  }

  // Reset password
  resetPassword() {
    this.alertCtrl.create({
      title: 'Reset your password',
      message: "Enter your email so we can send you a link to reset your password",
      inputs: [{ type: 'email', name: 'email', placeholder: 'Email' }],
      buttons: [
        { text: 'Cancel', handler: data => { } },
        {
          text: 'Done',
          handler: data => {
            this.alertCtrl.create({
              title: 'done dummy click',
              message: 'dummy click',
              buttons: [{ text: 'Ok' }]
            }).present();
            // this.authenticator.resetPassword(data.email)
            //   .then(() => {
            //     this.alertCtrl.create({
            //       title: 'Success',
            //       message: 'Your password has been reset - Please check your email for further instructions.',
            //       buttons: [{ text: 'Ok' }]
            //     }).present();
            //   })
            //   .catch((e) => {
            //     this.alertCtrl.create({
            //       title: 'Error',
            //       message: `Failed to login ${e.message}`,
            //       buttons: [{ text: 'Ok' }]
            //     }).present();
            //   });
          }
        }
      ]
    }).present();
  }

}
