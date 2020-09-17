import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ContentDetailPage } from "./content-detail.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { ContentDetailPageRoutingModule } from "./content-detail-routing.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: "", component: ContentDetailPage }]),
        ContentDetailPageRoutingModule,
    ],
    declarations: [ContentDetailPage],
})
export class ContentDetailPageModule {}
