import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TrackDetailPage } from "./track-detail.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { TrackDetailPageRoutingModule } from "./track-detail-routing.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: "", component: TrackDetailPage }]),
        TrackDetailPageRoutingModule,
    ],
    declarations: [TrackDetailPage],
})
export class TrackDetailPageModule {}
