// Usage: {{ distance | distance_to_human }}
export default function (distance) {
  return distance < 1000
    ? `${distance.toFixed(0)} m`
    : `${(distance / 1000).toFixed(1)} km`
}
