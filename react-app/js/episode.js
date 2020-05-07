;(function (demo) {
  const { Header } = demo;
  const { useParams } = window.ReactRouterDOM;

  demo.Episode = function ({ debug }) {
    const { locationKey, contentKey, elementKey } = useParams();
    return (
      <section className="episode">
        <Header sdkView="Episode" target={`/sdk/${locationKey}/${contentKey}`} />
        <staytuned-mobile-sdk-element-view
          location-key={locationKey}
          content-key={contentKey}
          element-key={elementKey}
          debug={debug} />
      </section>
    )
  }
}(window.CORDOVA_SDK_DEMO))
