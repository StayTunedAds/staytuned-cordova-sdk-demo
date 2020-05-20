import React from 'react';
import Header from './header';
import { useParams } from 'react-router-dom';

const Episode = function ({ debug, adapter }) {
  const { locationKey, contentKey, elementKey } = useParams();
  return (
    <section className="episode">
      <Header sdkView="Episode" target={`/sdk/${locationKey}/${contentKey}`} />
      <staytuned-mobile-sdk-element-view
        location-key={locationKey}
        content-key={contentKey}
        element-key={elementKey}
        adapter-type={adapter}
        debug={debug} />
    </section>
  )
}

export default Episode;
