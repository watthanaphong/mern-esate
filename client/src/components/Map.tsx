const Map = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <iframe
      title="map"
      className="w-full h-64 rounded-xl"
      loading="lazy"
      src={`https://www.google.com/maps?q=${lat},${lng}&hl=th&z=15&output=embed`}
    />
  );
};

export default Map;
