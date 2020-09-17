import React from "react";
import "./App.css";
import { STContent, STContentLight, STContents, STPlayer, STSection, STSections, STTrack } from "@staytuned-io/cordova-typescript";

export default class App extends React.Component {
    public myRef: React.RefObject<any> = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = {
            sections: [],
            currentContent: undefined,
            currentTrack: undefined,
        };
        STSections.getInstance()
            .getSections()
            .then((sections: STSection[]) => {
                this.setState({ sections: sections });
            })
            .catch((err) => {
                console.dir("Error while gettings sections", err);
            });
    }

    componentDidUpdate() {
        this.myRef.current?.setOnTrackClick((t: STTrack) => {
            this.setState({ currentTrack: t });
        });
    }

    render() {
        const sections = (this.state as any).sections;
        const currentContent = (this.state as any).currentContent;
        const currentTrack = (this.state as any).currentTrack;

        let body = sections.map((section: STSection, i: number) => {
            return (
                <div>
                    <h2>{section.name}</h2>
                    <div className="horizontal-scroll">
                        {section?.linkedContents?.map((content: STContentLight, i: number) => {
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
                        })}
                    </div>
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

/*
                                <div
                                    className="content"
                                    onClick={() => {
                                        STContents.getInstance()
                                            .getContent(content.key!)
                                            .then((c: STContent) => {
                                                this.setState({ currentContent: c });
                                            });
                                    }}
                                >
                                    <img src={content.imgSrc} height="100px" />
                                    <div className="title">{content.title}</div>
                                    <div>{content.author}</div>
                                </div>
                                */
