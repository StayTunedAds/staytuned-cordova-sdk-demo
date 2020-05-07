;(function (demo) {
  const { Header } = demo;
  const { useParams } = window.ReactRouterDOM;

  demo.Podcast = function ({ debug }) {
    const { locationKey, contentKey } = useParams();

    return (
      <section className="podcast">
        <Header sdkView="Podcast" target="/sdk" />
        <staytuned-mobile-sdk-content-view
          location-key={locationKey}
          content-key={contentKey}
          debug={debug}
        />
      </section>
    )
  }
}(window.CORDOVA_SDK_DEMO))
