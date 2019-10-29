import React from "react";
import Home from '../components/Home'
import ListComments from '../components/ListComments'

import Title from "antd/lib/typography/Title";
const style = { textAlign: "center", marginTop: "20px" };

export const routes = [
    {
        path: "/comments",
        displayContent: () => <ListComments/>,
        exact: true,
        displayTitle: () => <Title style={style}>Comments</Title>
    },
    {
        path: "/",
        displayContent: () => <Home/>,
        exact: true,
        displayTitle: () => <Title style={style}>Home</Title>
    }
]