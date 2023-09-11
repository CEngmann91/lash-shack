// https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main/src/17-useGeolocation
import { useState, useEffect } from "react"

export interface GeolocationData {
    latitude: number,
    longitude: number,
    altitude: number | null,
    accuracy: number,
    altitudeAccuracy: number | null,
    heading: number | null,
    speed: number | null
}

export interface GeoError {
    code: number,
    message: string,
    PERMISSION_DENIED: number,
    POSITION_UNAVAILABLE: number,
    TIMEOUT: number
}

export interface Options {
    enableHighAccuracy?: boolean,
    timeout?: number,
    maximumAge?: number
}

export interface GeolocationReturnType {
    loading: boolean,
    error: GeoError | undefined,
    data: GeolocationData
}

export default function useGeolocation(options: Options = {}, makeRequestImmediately = false): GeolocationReturnType {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<GeoError | undefined>(undefined);
    const [data, setData] = useState<GeolocationData>({
        latitude: 0,
        longitude: 0,
        altitude: null,
        accuracy: 0,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    });
    // const [successHandler, setSuccessHandler] = useState<any>();

    useEffect(() => {
        if (!makeRequestImmediately)
            return;

        setLoading(true);

        const successHandler = (e: any) => {
            setLoading(false)
            setError(undefined)
            setData({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                altitude: e.coords.altitude,
                accuracy: e.coords.accuracy,
                altitudeAccuracy: e.coords.altitudeAccuracy,
                heading: e.coords.heading,
                speed: e.coords.speed
            })
        }
        const errorHandler = (e: any) => {
            setError({ code: e.code, message: e.message, PERMISSION_DENIED: e.PERMISSION_DENIED, POSITION_UNAVAILABLE: e.POSITION_UNAVAILABLE, TIMEOUT: e.TIMEOUT })
            setLoading(false)
        }
        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )
        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, [options, makeRequestImmediately])

    return { loading, error, data }
}