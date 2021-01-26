import React from "react";
import "./App.css";
import { STContent, STContentLight, STContents, STOffline, STPlayer, STTrack } from "@staytuned-io/cordova-typescript";

export default class App extends React.Component {
    public myRef: React.RefObject<any> = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = {
            contents: [],
            currentContent: undefined,
            currentTrack: undefined,
        };
        document.addEventListener("deviceready", () => {
            STContents.getInstance()
                .getContents()
                .then((contents: STContentLight[]) => {
                    this.setState({ contents: contents });
                })
                .catch((err) => {
                    console.dir("Error while gettings contents", err);
                });
        });

        /* STPlayer.getInstance().setOnCellClickListener((content: STContent) => {
            this.setState({ currentContent: content });
        }); */

        // This is how you retrieve the offline tracks
        // With this list you will be able to do your own screen listing the downloaded tracks
        STOffline.getInstance().observeTracks((tracks) => {
            console.log("Offline Tracks Changed", tracks);
        });
    }

    componentDidUpdate() {
        this.myRef.current?.setOnTrackClick((t: STTrack) => {
            this.setState({ currentTrack: t });
        });
    }

    render() {
        const contents = (this.state as any).contents;
        const currentContent = (this.state as any).currentContent;
        const currentTrack = (this.state as any).currentTrack;

        let body = contents.map((content: STContentLight, i: number) => {
            return (
                <div className="content-widget">
                    <st-content-widget
                        data={JSON.stringify(content)}
                        onClick={() => {
                            STContents.getInstance()
                                .getContent(content.key!)
                                .then((c: STContent) => {
                                    this.setState({ currentContent: c });
                                });
                        }}
                    ></st-content-widget>
                </div>
            );
        });

        if (currentTrack) {
            body = (
                <div>
                    <button
                        onClick={() => {
                            this.setState({ currentTrack: undefined });
                        }}
                    >
                        Previous
                    </button>
                    <st-track-detail data={JSON.stringify(currentTrack)}></st-track-detail>
                </div>
            );
        } else if (currentContent) {
            body = (
                <div>
                    <button
                        onClick={() => {
                            this.setState({ currentContent: undefined });
                        }}
                    >
                        Previous
                    </button>
                    <st-content-detail data={JSON.stringify(currentContent)} ref={this.myRef}></st-content-detail>
                </div>
            );
        }

        return (
            <div className="App">
                <header className="App-header flex-1">
                    <div>{body}</div>
                </header>
                <st-mini-player></st-mini-player>
            </div>
        );
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "st-mini-player": React.DetailedHTMLProps<any, HTMLElement>;
            "st-content-detail": React.DetailedHTMLProps<any, HTMLElement>;
            "st-track-detail": React.DetailedHTMLProps<any, HTMLElement>;
            "st-content-widget": React.DetailedHTMLProps<any, HTMLElement>;
        }
    }
}
