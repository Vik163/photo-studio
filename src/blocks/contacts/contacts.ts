import type { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import {
  YMap,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from "@yandex/ymaps3-types";

import { $id } from "@/utils/lib/getElement";
const MAIN_COORD = [50.09034210620347, 53.12562954789585] as LngLat;

const LOCATION: YMapLocationRequest = {
  center: MAIN_COORD,
  zoom: 16,
};

const map = new YMap(
  $id("map"),
  {
    location: LOCATION,
  },
  [
    // Add a map scheme layer
    new YMapDefaultSchemeLayer({}),
    // Add a layer of geo objects to display the markers
    new YMapDefaultFeaturesLayer({}),
  ]
);

export async function setContacts() {
  await ymaps3.ready; // waiting for the main JS API to load.

  const { YMapZoomControl, YMapDefaultMarker } = await import(
    "@yandex/ymaps3-default-ui-theme"
  );

  const controls = new YMapControls({ position: "top left" });
  controls.addChild(
    new YMapZoomControl({
      easing: "linear",
    })
  );
  map.addChild(
    new YMapDefaultMarker({
      coordinates: MAIN_COORD,
      color: "red",
      size: "normal",
      iconName: "photo",
    })
  );

  map.addChild(controls);
}
