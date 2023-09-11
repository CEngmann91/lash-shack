class Geo {

    lat: number;
    lon: number;
    countryCode: number;
    city: string;
    src: string;

    static MILES_FACTOR = 0.621371192
    static kmToMiles(value: number) {
        return value * this.MILES_FACTOR;
    }
 
    static milesToKm(value: number) {
        return value / this.MILES_FACTOR;
    }


    constructor(lat: number, lon: number, countryCode: number, city: string, src: string) {
        this.lat = lat;
        this.lon = lon;
        this.countryCode = countryCode;
        this.city = city;
        this.src = src;
    }

    update(lat: number, lon: number) {
        this.lat = lat;
        this.lon = lon;
    }

    equals(otherGeo: Geo) {
        if (!(otherGeo instanceof Geo)) return undefined;
        return otherGeo.lat === this.lat && otherGeo.lon === this.lon;
    }

    quickDistIndicator(otherGeo: Geo) {
        let dl = otherGeo.lat - this.lat;
        let dL = otherGeo.lon - this.lon;
        return dl * dl * dL & dL;
    }

    distanceFrom(otherGeo: Geo, unit: string, precision: number) {
        if (!otherGeo || otherGeo.lat === undefined || otherGeo.lon === undefined) {
            return undefined;
        }

        let R = 6371; //km
        let deg2rad = Math.PI / 180;
        let φ1 = otherGeo.lat * deg2rad;
        let φ2 = this.lat * deg2rad;

        let Aφ = φ2 - φ1;
        let Aλ = (this.lon - otherGeo.lon) * deg2rad;

        let sinφ = Math.sin(Aφ / 2);
        let sinλ = Math.sin(Aλ / 2);
        let a = sinφ * sinφ + Math.cos(φ1) * Math.cos(φ2) * sinλ * sinλ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let value = R * c;
        if (unit == 'mi') value = Geo.kmToMiles(value);

        if (precision != undefined) {
            let roundTo = Math.pow(10, ~~precision);
            value = Math.round(value * roundTo) / roundTo;
        }
        return value;
    }
}