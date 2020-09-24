import { Component, ViewChild, ElementRef, NgZone } from "@angular/core";
import { STContents, STPlayer, STContent, STTrack } from "@staytuned-io/cordova-typescript";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-content-detail",
    templateUrl: "content-detail.page.html",
    styleUrls: ["content-detail.page.scss"],
})
export class ContentDetailPage {
    public isLoading = false;
    public dataString: String = "";
    private currentTrack?: STTrack = undefined;

    @ViewChild("content") contentComponent: ElementRef<HTMLStContentDetailElement>;

    constructor(private route: ActivatedRoute, private router: Router, private ngZone: NgZone) {}

    public async ngOnInit() {
        this.isLoading = true;
        this.route.params.subscribe(async (params) => {
            this.isLoading = true;
            const currentContent = await STContents.getInstance().getContent(params.id);
            currentContent.elementList.sort((a, b) => {
                return a.chapter - b.chapter;
            });
            currentContent.elementList.sort((a, b) => {
                return a.episode - b.episode;
            });
            this.isLoading = false;
            this.dataString = JSON.stringify(currentContent);

            setTimeout(() => {
                (this.contentComponent.nativeElement as any).onTrackClick = (track) => {
                    this.ngZone.run(() => {
                        this.router.navigateByUrl("/tabs/content-detail/" + currentContent.key + "/tracks/" + track.key);
                    });
                };
            }, 50);
        });
    }

    public isPlayingTrack(track: STTrack) {
        return track.key == this.currentTrack?.key;
    }
}
