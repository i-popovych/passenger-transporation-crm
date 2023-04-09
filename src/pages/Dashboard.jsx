import React, {useState, useEffect} from 'react';
import {ref, onValue} from 'firebase/database';
import {db} from "../index";
import UserItem from "../components/UserItem";

const RealtimeDBComponent = () => {
    const [items, setItems] = useState([]);

    const starCountRef = ref(db, 'users');
    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setItems(data)
        });
    }, [])

    if (!items) return <div>no user</div>

    return (
        <div>
            {
                Object.keys(items).map((key) => {
                    return <UserItem key={key} uid={key} {...items[key]}/>
                        })
            }
        </div>
    );
}
    ;

    export default RealtimeDBComponent;