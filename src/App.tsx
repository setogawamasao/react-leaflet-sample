import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/";
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

export default () => {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  // Used to determine if "useEffect" is already used
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };

  function calcDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
  ) {
    latitude1 *= Math.PI / 180;
    longitude1 *= Math.PI / 180;
    latitude2 *= Math.PI / 180;
    longitude2 *= Math.PI / 180;
    var ret =
      6378.137 *
      Math.acos(
        Math.cos(latitude1) *
          Math.cos(latitude2) *
          Math.cos(longitude2 - longitude1) +
          Math.sin(latitude1) * Math.sin(latitude2)
      );

    //alert('距離は' + ret + 'kmです。');
    return ret;
  }

  // Show this(Loading...) until "useEffect" is completed
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  // const { isWatching, watchId } = watchStatus;

  /* eslint-disable */
  const pointerIcon = new Leaflet.Icon({
    iconUrl:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMC41IDQ0LjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwLjUgNDQuOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMEEyMTg7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQoJLnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjAuNzU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNi45LDAuM2MwLDAtMC4yLDguOS0wLjQsMTBjLTAuMiwxLjEtNS43LDYuNy02LjEsNy45Yy0wLjQsMS4yLDAsMy41LDAsMy41UzEuMywyNSwxLjUsMjZzMSwxLjgsMSwxLjgKCWwwLjYsMTMuM2MwLDAtMC4yLDMuMiwxLjYsMy41YzEuOCwwLjQsMS43LTIsMS43LTJzMC4zLTEwLjcsMC4yLTExLjRjMC0wLjcsMC43LTEsMC43LTFzLTAuMSwxLjgsMCwyLjVjMC4xLDAuNiwwLjQsMi41LDIuNCwyLjUKCWMyLDAsMi4yLTIuMywyLjItMi4zczAuNCwwLjksMi4xLDAuOXMyLjEtMywyLjEtM3MwLjEsMC40LDEuNCwwYzEuOC0wLjUsMS41LTEuOSwxLjUtMS45cy0wLjEtMS4yLTAuMi0yLjZzMC45LTEuOSwxLTIuNwoJczAuNi0zLjIsMC4zLTUuOGMtMC4zLTIuNi0xLjUtNS0xLjYtNi43czAuOC05LDAuOC05TDYuOSwwLjN6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMS45LDMyLjhjMCwwLDAuMy0zLjQsMC4zLTQuNmMwLTEuMS0wLjgtMy0wLjgtM2wtMC42LTJjMCwwLTAuNi0wLjQtMS43LTAuNHMtMS45LDEuNy0xLjksMS43bDAuMywxLjIKCWMwLDAsMC45LDIuMSwwLjksMi45cy0wLjQsMS40LTEsMS41cy0xLTEuMS0xLjQtMS42Yy0xLTEtMi44LTAuNC0zLjQtMC44Ii8+Cjxwb2x5bGluZSBjbGFzcz0ic3QxIiBwb2ludHM9IjMuOSwyMC4yIDUuMiwyMS45IDUuNSwyNC4xIDcuMSwyNC42ICIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAuNywyMy4zYzAsMCwwLjQtMS4yLDEuNC0xLjJzMS43LDAuNCwxLjcsMC40YzEsMi4zLDEuOCw1LjIsMi4yLDguMSIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTguOSwyNi4xYy0wLjEtMC40LTEuOS0zLjctNC4xLTRjLTAuOSwwLTAuOSwwLjQtMC45LDAuNCIvPgo8L3N2Zz4K",
    iconRetinaUrl:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMC41IDQ0LjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwLjUgNDQuOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMEEyMTg7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQoJLnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjAuNzU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNi45LDAuM2MwLDAtMC4yLDguOS0wLjQsMTBjLTAuMiwxLjEtNS43LDYuNy02LjEsNy45Yy0wLjQsMS4yLDAsMy41LDAsMy41UzEuMywyNSwxLjUsMjZzMSwxLjgsMSwxLjgKCWwwLjYsMTMuM2MwLDAtMC4yLDMuMiwxLjYsMy41YzEuOCwwLjQsMS43LTIsMS43LTJzMC4zLTEwLjcsMC4yLTExLjRjMC0wLjcsMC43LTEsMC43LTFzLTAuMSwxLjgsMCwyLjVjMC4xLDAuNiwwLjQsMi41LDIuNCwyLjUKCWMyLDAsMi4yLTIuMywyLjItMi4zczAuNCwwLjksMi4xLDAuOXMyLjEtMywyLjEtM3MwLjEsMC40LDEuNCwwYzEuOC0wLjUsMS41LTEuOSwxLjUtMS45cy0wLjEtMS4yLTAuMi0yLjZzMC45LTEuOSwxLTIuNwoJczAuNi0zLjIsMC4zLTUuOGMtMC4zLTIuNi0xLjUtNS0xLjYtNi43czAuOC05LDAuOC05TDYuOSwwLjN6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMS45LDMyLjhjMCwwLDAuMy0zLjQsMC4zLTQuNmMwLTEuMS0wLjgtMy0wLjgtM2wtMC42LTJjMCwwLTAuNi0wLjQtMS43LTAuNHMtMS45LDEuNy0xLjksMS43bDAuMywxLjIKCWMwLDAsMC45LDIuMSwwLjksMi45cy0wLjQsMS40LTEsMS41cy0xLTEuMS0xLjQtMS42Yy0xLTEtMi44LTAuNC0zLjQtMC44Ii8+Cjxwb2x5bGluZSBjbGFzcz0ic3QxIiBwb2ludHM9IjMuOSwyMC4yIDUuMiwyMS45IDUuNSwyNC4xIDcuMSwyNC42ICIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAuNywyMy4zYzAsMCwwLjQtMS4yLDEuNC0xLjJzMS43LDAuNCwxLjcsMC40YzEsMi4zLDEuOCw1LjIsMi4yLDguMSIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTguOSwyNi4xYy0wLjEtMC40LTEuOS0zLjctNC4xLTRjLTAuOSwwLTAuOSwwLjQtMC45LDAuNCIvPgo8L3N2Zz4K",
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC",
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  });
  const positionCurrent = [35.667968, 138.5824256];
  const positionDC = [38.907192, -77.036871];
  const positionLondon = [51.507351, -0.127758];
  const positionTokyo = [35.68944, 139.69167];
  const positionAichi = [35.18028, 136.90667];
  const positionOsaka = [34.68639, 135.52];
  //  const zoom = 3;
  const zoom = 7;
  /* eslint-disable */

  return (
    <div className="App">
      <h2>現在地取得サンプル</h2>
      {!isFirstRef && !isAvailable && <ErrorText />}
      {isAvailable && (
        <div>
          <button onClick={getCurrentPosition}>現在地取得</button>
        </div>
      )}
      {position.latitude !== 0 && position.longitude !== 0 && (
        <>
          <div>
            <table>
              <thead>
                <tr>
                  <td>経度・緯度</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    緯度：{position.latitude}／ 経度：{position.longitude}
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
          <hr />
          <div
            style={{
              textAlign: "left",
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div>パターン１</div>
            <div>
              <select style={{ height: "1.25rem" }}>
                <option value="">東京</option>
                <option value="">愛知</option>
                <option value="">大阪</option>
                <option value="">ロンドン</option>
                <option value="">ワシントン</option>
              </select>
              <button
                onClick={() => {
                  window.open("http://google.com/");
                }}
                style={{ marginLeft: "1rem" }}
              >
                遷移実行
              </button>
            </div>
          </div>
          <hr />
          <div
            style={{
              textAlign: "left",
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            パターン２
          </div>
          <Map center={[positionCurrent[0], positionCurrent[1]]} zoom={zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[positionCurrent[0], positionCurrent[1]]}
              icon={pointerIcon}
            >
              <Popup>現在地</Popup>
            </Marker>
            <Marker position={[positionDC[0], positionDC[1]]}>
              <Popup>
                ワシントン
                <br />
                <a href="http://google.co.jp" target="_blank">
                  ここをクリック
                </a>
              </Popup>
            </Marker>
            <Marker position={[positionLondon[0], positionLondon[1]]}>
              <Popup>
                ロンドン
                <br />
                <a href="http://google.co.jp" target="_blank">
                  ここをクリック
                </a>
              </Popup>
            </Marker>
            <Marker position={[positionTokyo[0], positionTokyo[1]]}>
              <Popup>
                東京
                <br />
                <a href="http://google.co.jp" target="_blank">
                  ここをクリック
                </a>
              </Popup>
            </Marker>
            <Marker position={[positionAichi[0], positionAichi[1]]}>
              <Popup>
                愛知
                <br />
                <a href="http://google.co.jp" target="_blank">
                  ここをクリック
                </a>
              </Popup>
            </Marker>
            <Marker position={[positionOsaka[0], positionOsaka[1]]}>
              <Popup>
                大阪
                <br />
                <a href="http://google.co.jp" target="_blank">
                  ここをクリック
                </a>
              </Popup>
            </Marker>
          </Map>
        </>
      )}
    </div>
  );
};
