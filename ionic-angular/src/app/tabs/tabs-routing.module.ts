import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
    {
        path: "tabs",
        component: TabsPage,
        children: [
            {
                path: "tab1",
                loadChildren: () => import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
            },
            {
                path: "tab2",
                loadChildren: () => import("../tab2/tab2.module").then((m) => m.Tab2PageModule),
            },
            {
                path: "tab3",
                loadChildren: () => import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
            },
            {
                path: "content-detail/:id/tracks/:trackKey",
                loadChildren: () => import("../track-detail/track-detail.module").then((m) => m.TrackDetailPageModule),
            },
            {
                path: "content-detail/:id",
                loadChildren: () => import("../content-detail/content-detail.module").then((m) => m.ContentDetailPageModule),
            },
            {
                path: "",
                redirectTo: "/tabs/tab1",
                pathMatch: "full",
            },
        ],
    },
    {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
