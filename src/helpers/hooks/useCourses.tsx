import React, { useEffect, useState } from "react";
import { REACT_APP_FIRESTORE_COURSES_COLLECTION, REACT_APP_FIRESTORE_COURSES_DOCUMENT } from "../../constants/firebase";
import { iCourse } from "../../pages/Courses/Courses";
import { getImage } from "../firebase/firebase";
import { getDocument } from "../firebase/firestore";

export const useCourses = () => {
    const [courses, setCourses] = useState<iCourse[]>([]);


    const fetchCourses = async () => {
        // setIsLoading(true);

        let array: iCourse[] = [];
        await getDocument(REACT_APP_FIRESTORE_COURSES_COLLECTION as string,
            REACT_APP_FIRESTORE_COURSES_DOCUMENT as string)
            .then(res => {
                const result: iCourse[] = res['content'];
                // Only get the active items in the array.
                const filtered = result.filter((item) => item.active);
                // Sort by ID.
                array = filtered.sort((a, b) => a.id - b.id);
            })
            .catch(error => {
                // setIsLoading(false);
                // setError(error);
                return;
            });


        // Load images from Firestore.
        const mapPromises = array.map((item) =>
            getImage(item.img).then(res => item.img = res)
        );
        await Promise.all(mapPromises);
        // const results = await Promise.all(mapPromises);
        // console.log("results - " + results)

        setCourses(array);
        // setIsLoading(false);
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    return { courses };
}