import React, {useState, useEffect} from 'react';
import {ref, onValue} from 'firebase/database';
import {db} from "../index";
import TripItem from "../components/TripItem";

const Trips = () => {
        const [trips, setTrips] = useState(null);

        const starCountRef = ref(db, 'trips');
        useEffect(() => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setTrips(data)
            });
        }, [])

        return (
            <div>
                {
                    trips && Object.keys(trips).map(uidKey => {
                        return <TripItem uidKey={uidKey} data={trips[uidKey]}/>
                    })
                }
            </div>
        );
    }
;

export default Trips;