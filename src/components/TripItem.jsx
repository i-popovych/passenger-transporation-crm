import React from 'react';

const TripItem = ({uidKey, data}) => {
    return (
        <div>
            {
                Object.values(data).map(trip => {
                    return <div>{
                        Object.entries(trip).map(([key, value]) => {
                            return `${key}: ${value}`
                    })
                    }</div>
                })
            }
        </div>
    );
};

export default TripItem;