import { Component, ViewChild, ElementRef } from "@angular/core";
import { STContents, STPlayer, STContent, STTrack } from "@staytuned-io/cordova-typescript";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-track-detail",
    templateUrl: "track-detail.page.html",
    styleUrls: ["track-detail.page.scss"],
})
export class TrackDetailPage {
    public currentTrack?: STTrack = undefined;
    public listenedTrack?: STTrack = undefined;
    public isLoading = false;
    public dataString: String = "";

    @ViewChild("track") contentComponent: ElementRef<HTMLStContentDetailElement>;

    constructor(private route: ActivatedRoute) {}

    public async ngOnInit() {
        this.isLoading = true;
        this.route.params.subscribe(async (params) => {
            this.isLoading = true;
            let currentContent: STContent;
            currentContent = await STContents.getInstance().getContent(params.id);
            this.currentTrack = currentContent.elementList.find((a) => {
                return a.key == params.trackKey;
            });
            this.isLoading = false;
            this.dataString = JSON.stringify(this.currentTrack);
        });
        STPlayer.getInstance().observeCurrentTrack((track: STTrack) => {
            this.listenedTrack = track;
        });
    }

    public async playTrack(index: number) {
        await STPlayer.getInstance().playTrack(this.currentTrack);
    }

    public isPlayingTrack(track: STTrack) {
        return track.key == this.currentTrack?.key;
    }
}
