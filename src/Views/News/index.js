import React, { useEffect } from "react";

export default function News(props) {
    useEffect(() => {
        document.title = props.title;
    })

    return (
        <>
            News and events
        </>
    )
}