import { useEffect } from "react";
import { useAppendAdminLocationTrackMutation } from "@/redux/features/bookingApi/bookingApi";

export const useLiveAdminLocationTracking = (bookingId: string | undefined) => {
  const [appendLocation] = useAppendAdminLocationTrackMutation();

  useEffect(() => {
    if (!bookingId) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        await appendLocation({
          id: bookingId,
          data: {
            lat: latitude,
            lng: longitude,
            timestamp: new Date().toISOString(),
          },
        });
      },
      (err) => console.error("Location tracking error:", err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [bookingId, appendLocation]);
};
