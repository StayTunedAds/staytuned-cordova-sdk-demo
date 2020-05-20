
import React from 'react';
import Header from './header';
import { useParams } from 'react-router-dom'

const Podcast = function ({ debug, adapter }) {
  const { locationKey, contentKey } = useParams();

  return (
    <section className="podcast">
      <Header sdkView="Podcast" target="/sdk" />
      <staytuned-mobile-sdk-content-view
        location-key={locationKey}
        content-key={contentKey}
        adapter-type={adapter}
        debug={debug}
      />
    </section>
  )
}

export default Podcast;
