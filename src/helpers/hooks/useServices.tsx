import React, { useEffect, useState } from "react";
import { REACT_APP_FIRESTORE_SERVICES_COLLECTION, REACT_APP_FIRESTORE_SERVICES_DOCUMENT } from "../../constants/firebase";
import { iService } from "../../pages/Services/Services";
import { getDocument } from "../firebase/firestore";

export const useServices = () => {
    const [services, setServices] = useState<iService[]>([]);
    const [servicesError, setServicesError] = useState();
    const [loadingServices, setLoadingServices] = useState(false);


    {/* <h1 className="eyelash-extenstions">Eyelash Extensions Full Sets</h1>
      <p>Classic Semi-Permanent - £45 - 60mins</p>
      <p>YY Express - £45 - 60mins</p>
      <p>Classic Xtra Semi-Permanent - £50 - 70mins</p>
      <p>Hybrid - £55 - 80mins</p>
      <p>Russian Volume - £65 - 90mins</p>
      <p>Wispy Volume - £70 - 90mins</p>
      <p>Mega Russian Volume - £75 - 90mins</p>


      <h1 className="eyelash-extenstions">Eyelash Extensions Infills</h1>
      <p>Classic Semi-Permanent Infills - £30 - 45mins</p>
      <p>YY Express infills - £35 - 45mins</p>
      <p>Classic Xtra Semi-Permanent Infills - £35 - 60mins</p>
      <p>Hybrid Infills - £40 - 60mins</p>
      <p>Russian Volume Infills - £45 - 60mins</p>
      <p>Mega Volume Infills - £50 - 60mins</p>


      <h1 className="eyelash-extenstions">Eyebrows</h1>
      <p>Eyebrow Tint - £7 - 10mins</p>
      <p>Eyebrow Wax & Tint - £14 - 20mins</p>
      <p>Microblading - £180 - 90mins</p>
      <p>Removal - £10 - 20mins</p>

      <h1 className="eyelash-extenstions">Lips</h1>
      <p>0.5ml - £90 - 30mins</p>
      <p>1.1ml - £140 - 30mins</p>
      <p>3ml Package - £275 - 60mins</p>

      <h1 className="eyelash-extenstions">Semi-Permanent Makeup</h1>
      <p>Ombre Brows</p>
      <p>Combo Brows</p>
      <p>Lip Blush</p>
      <p>Lip Liner</p> */}


    const fetchServices = async () => {
        setLoadingServices(true);

        getDocument(REACT_APP_FIRESTORE_SERVICES_COLLECTION as string,
            REACT_APP_FIRESTORE_SERVICES_DOCUMENT as string)
            .then(res => {
                const result: iService[] = res['catergory'];
                // Only get the active items in the array.
                const filtered = result.filter((item) => item.active);

                // Only provide active options within this service.
                filtered.forEach(option => {
                    const op = option.options.filter((item) => item.active);
                    option.options = op;
                })
                // filtered.map(option => option.options.filter((item) => item.active))

                // console.log(filtered);
                setServices(filtered);
                setLoadingServices(false);
            })
            .catch(error => {
                setServicesError(error)
                setLoadingServices(false);
                return;
            });
    }

    useEffect(() => {
        fetchServices();
    }, [])

    return { services, loadingServices, servicesError };
}