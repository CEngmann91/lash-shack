import { useState, useEffect } from "react"
import useGeolocation, { GeolocationData, GeoError } from "./useGeolocation";
import { CONTACT } from "../constants/constants";

export default function useGeolocateStore(makeRequestImmediately = false) {
    const {
        loading,
        error,
        data: { latitude, longitude },
    }: { loading: boolean, error: GeoError | undefined, data: GeolocationData } = useGeolocation({}, makeRequestImmediately);
    const [sortedDistances, setSortedDistances] = useState<any[]>();
    const [closestStore, setClosestStore] = useState<{}>();


    useEffect(() => {
        if (!makeRequestImmediately)
            return;

        if (error) {
            // alert('Error - ' +JSON.stringify(error, null, 2));
        }
        else {
            if (loading)
                return;

            let distances = [] as any[];
            CONTACT.LOCATIONS.forEach(({lat, long}, key) => {
                const distance = CalcDistanceBetween(latitude, longitude, lat, long);
                distances.push({ key, distance });
            });
            const sorted = distances.sort((a, b) => (a.distance - b.distance));
            setSortedDistances(sorted);

            const closest = sorted[0]; //distances.reduce((acc, loc) => acc.distance < loc.distance ? acc : loc);
            setClosestStore(CONTACT.LOCATIONS[closest.key].ADDRESS);


            // alert( JSON.stringify(sorted, null, 2) );
        }
    }, [makeRequestImmediately])

    // https://stackoverflow.com/questions/5260423/torad-javascript-function-throwing-error
    // https://stackoverflow.com/questions/13840516/how-to-find-my-distance-to-a-known-location-in-javascript
    function CalcDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;

        return R * 2 * Math.asin(Math.sqrt(a));


        // //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
        // var R = 3958.7558657440545; // Radius of earth in Miles 
        // var dLat = toRad(lat2 - lat1);
        // var dLon = toRad(lon2 - lon1);
        // var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //   Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        //   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // var d = R * c;
        // return d;
    }

    // function toRad(Value: number) {
    //   /** Converts numeric degrees to radians */
    //   return Value * Math.PI / 180;
    // }

    return { loading, error, sortedDistances, closestStore }
}