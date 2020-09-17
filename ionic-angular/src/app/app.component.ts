import { Component } from "@angular/core";

import { Platform, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Staytuned } from "@staytuned-io/cordova-typescript";
import { Location } from "@angular/common";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent {
    constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private location: Location) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            await Staytuned.getInstance().init("de03f2b8-ef81-428e-a20c-fb5becf32cad", "dda710aa.74ff4f0a-cf6b-4db1-9345-e88862ca7ce9");
            this.splashScreen.hide();
        });

        this.platform.backButton.subscribeWithPriority(-1, () => {
            this.location.back();
        });
    }
}
