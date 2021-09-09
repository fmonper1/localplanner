import L, { Icon, Point } from "leaflet";

const iconPerson = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/twbs/icons/main/icons/geo-alt.svg",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/twbs/icons/main/icons/geo-alt.svg",
  iconSize: new Point(32, 32),
  className: "fill-current stroke-current text-red-100",
}) as unknown as Icon;

const activeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/twbs/icons/main/icons/geo.svg",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/twbs/icons/main/icons/geo.svg",
  iconSize: new Point(32, 32),
  className: "fill-current stroke-current text-red-100",
}) as unknown as Icon;

const circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
});

export { iconPerson, activeIcon, circle };
