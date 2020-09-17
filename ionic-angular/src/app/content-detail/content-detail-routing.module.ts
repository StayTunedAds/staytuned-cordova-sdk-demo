import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentDetailPage } from "./content-detail.page";
import { TrackDetailPage } from "../track-detail/track-detail.page";

const routes: Routes = [
    {
        path: "",
        component: ContentDetailPage,
    },
    {
        path: "tracks/:trackKey",
        component: TrackDetailPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContentDetailPageRoutingModule {}
