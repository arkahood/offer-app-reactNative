import React from "react";
import { View , Text } from "react-native";

import { Card } from "@rneui/themed";

const EachResturentCard = ({name , address, coupon_code, discount , url}:any) : JSX.Element => {
    return(
        <Card>
            <Card.Title>
                {name}
            </Card.Title>
            <Card.Divider />
            <Card.Image
                style={{ padding: 0 }}
                source={{
                uri: url
                }} 
            />
            <Card.Divider />
            <Text>Address : {address}</Text>
        </Card>
    )
}

export default EachResturentCard;