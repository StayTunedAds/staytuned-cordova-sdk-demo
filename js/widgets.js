;(function (demo) {
  const { Header } = demo;

  demo.Widgets = function ({ debug }) {
    const widgets = [
      {
        locationKey: '6afbb74a-5f50-4f78-8fb3-30ec67db7d26',
        contentKey: 'c7545d88-c5c6-4b23-aa71-4294c91b9a60',
      },
      {
        locationKey: '621d575a-a8fd-45f0-a133-9bed49395de1',
        contentKey: '6866df09-78c6-43e4-af5c-3e9ab927f7cb',
      },
      {
        locationKey: '0f67a32c-4655-4d89-b46a-a3084c57de71',
        contentKey: '9683d94b-3564-4fef-8765-02b5bfd5bed8',
      }
    ];

    return (
      <section className="widgets">
        <Header />
        <h2>Podcast</h2>
        {
          widgets.map((w, i) => {
            return (
              <div className="widget-container" key={i}>
                <staytuned-widget
                format="four-thirds"
                location-key={w.locationKey}
                featured-content-key={w.contentKey}
                debug={debug} />
              </div>
            )
          })
        }
      </section>
    )
  }
}(window.CORDOVA_SDK_DEMO))


