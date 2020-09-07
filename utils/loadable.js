import Loadable from 'react-loadable';
import React from "react";


function MyLoadingComponent() {
  return <div>Loading...</div>;
}

const LoadableComponent = (component) => Loadable({
  loader: component,
  loading: () => null,
});


export default LoadableComponent;