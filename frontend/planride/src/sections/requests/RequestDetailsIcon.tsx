import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Avatar,
} from "@mui/material";
import { TransportationRequestViewModel } from "../../backend";

interface IRequestDetailsProps {
    requestId: string;
}

const RequestDetailsIcon: React.FC<IRequestDetailsProps> = ({ requestId }) => {
    //   const { isLoading, request } = useRequestDetails(requestId);
    //   const { t } = useTranslation();

    //   if (isLoading || !request) {
    //     return <React.Fragment />;
    //   }

    const [request, setRequest] = useState<TransportationRequestViewModel>();

    useEffect(() => {
        let fakeData: TransportationRequestViewModel[] = [
            {
                id: "123",
                departureCountryCode: "pol",
                departureCityId: 111,
                departureCityName: "city",
                numberOfPeople: 2,
                havePets: true,
                departureDate: new Date(),
                dateCreated: new Date(),
            },
            {
                id: "124",
                departureCountryCode: "pol",
                departureCityId: 123,
                departureCityName: "city",
                numberOfPeople: 2,
                havePets: true,
                departureDate: new Date(),
                dateCreated: new Date(),
            },
            {
                id: "125",
                departureCountryCode: "pol",
                departureCityId: 122,
                departureCityName: "city",
                numberOfPeople: 2,
                havePets: true,
                departureDate: new Date(),
                dateCreated: new Date(),
            },
        ];

        setRequest(
            fakeData.filter((d) => {
                return d.id === requestId;
            })[0]
        );
    }, [requestId]);

    return (
        <div>
            <Card >
                <CardContent>
                    <div style={{display: "flex"}}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                        <Typography gutterBottom variant="h5" component="div" style={{margin: "0.3em 1em"}}>
                            User: {request?.id}
                        </Typography>
                    </div>
                    <div style={{marginTop: "1em"}}>
                           People: {request?.numberOfPeople}    
                    </div>
                    <div style={{marginTop: "1em"}}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Desired period of stay</strong>
                        <br />
                        2 weeks <br />
                        <strong>Period</strong>
                        <br />
                        1/3-2022-1/5-2022 <br />
                    </Typography>
                    {
                        <Divider
                        style={{ marginTop: "1em", marginBottom: "1em" }}
                        />
                    }
                    <Typography variant="body2" color="text.secondary">
                        <strong>Message for you</strong>
                        <br />
                        2blaaaa <br />
                    </Typography>
                    </div>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                    <Button
                        style={{ width: "100%" }}
                        size="medium"
                        variant="outlined"
                        color="secondary"
                    >
                        Reject
                    </Button>
                    <Button
                        style={{ width: "100%" }}
                        size="medium"
                        variant="contained"
                        color="secondary"
                    >
                        Accept
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default RequestDetailsIcon;
