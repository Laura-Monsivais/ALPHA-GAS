# README IONIC #

https://docs.angular.lat/

## Local installation 

- Download and install on your computer: *node.js* .
- Run in project console: *npm install* .
- Run in project console in question "? Would you like to share anonymous usage data with the Angular Team at Google under Google’s Privacy Policy at https://policies.google.com/privacy? For more details and how to change this setting, see http://angular.io/analytics.": *y* .
- Run in project console: *npm install xlsx* .
- Run in project console: *npm install -g mdb-cli* .
- Run in project console: *npm install -g @ionic/cli* .
- Run in project console: *npm install -g ionic cordova* .
- Run in project console: *npm install -g @angular/cli* .
- Run in project console: *npm install @angular/cdk --save* .
- Run in project console (mdbootstrap): *npm install angular-bootstrap-md --save* .
- Run in project console (mdbootstrap): *npm install -–save chart.js@2.5.0 @types/chart.js* .
- Run in project console (mdbootstrap): *npm install hammerjs* .
- Run in project console (mdbootstrap): *npm install --save @fortawesome/fontawesome-free* .
- Run in project console (mdbootstrap): *npm install animate.css --save* .
- Run in project console: *npm install -D typescript@4.0.5* .
- Run in project console: *npm install @ionic-native/firebase* .
- Run in project console: *npm i @angular-devkit/architect --save* . 
- Run in project console: *npm install @capacitor/core @capacitor/cli* . 
- Run in project console: *npm i sweetalert2* .
- Run in project console: *npm install npm install firebase angularfire2 --save* .
- Run in project console (optional): *ionic start ionic blank --type=ionic-angular* .
- Run in project console: *ionic cordova plugin add cordova-plugin-firebase* .
- Run in project console (CMD or PowerShell): *ng serve* .
npm install -g @angular/cli@1.4.9

## Build production

- Run in project console: *ng build --prod* .

### How to generate a mobile application in android? ###

install android studio or some api, you can also use your mobile device.

- Run in project console: *ionic integrations enable cordova --add*
- Run in project console: *ionic cordova platform add android*
- Run in project console: *ionic cordova resources android*

Create apk
- Run in project console: *ionic cordova build android --prod --device*

View in emulator
- Run in project console: *ionic cordova run android*

### How to generate a mobile application in iOS? ###

- Run in project console: *ionic integrations enable cordova --add*
- Run in project console: *ionic cordova platform add ios*
- Run in project console: *ionic cordova resources ios*

Create app
- Run in project console: *ionic cordova build ios --prod --release*