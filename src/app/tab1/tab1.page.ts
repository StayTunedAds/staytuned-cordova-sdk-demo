import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { STSection, STSections } from "@staytuned-io/cordova-typescript";
import { Router } from "@angular/router";

@Component({
    selector: "app-tab1",
    templateUrl: "tab1.page.html",
    styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
    public sections: STSection[] = [];
    public isLoading = false;
    constructor(private platform: Platform, private router: Router) {}

    public async ngOnInit() {
        this.isLoading = true;
        this.sections = await STSections.getInstance().getSections();
        this.isLoading = false;
    }
}
