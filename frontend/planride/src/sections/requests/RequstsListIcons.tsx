import React from "react";
import {
    List,
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRequestsList } from "./RequestsList.hooks";
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import { TransportationRequestViewModel } from "../../backend";


const RequestsListIcons: React.FC = () => {
    const { isLoading, requests } = useRequestsList();
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (isLoading) {
        return <React.Fragment />;
    }
    /*
      id: string;
      departureCountryCode: string;
      departureCityId: number;
      departureCityName: string;
      numberOfPeople: number;
      havePets: boolean;
      departureDate: Date;
      dateCreated: Date;
    */

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

    const handleClick = (request: TransportationRequestViewModel) => {
        navigate(`/requests/${request.id}`);
    }

    return (
        <React.Fragment>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                {fakeData.map((request) => (
                    <div key={request.id}>
                        <ListItem
                            alignItems="flex-start"
                            onClick={() => handleClick(request)}
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`id: ${request.id} | Need ride from ${request.departureCountryCode}`}
                                    secondary={
                                        <React.Fragment >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            <PeopleIcon />
                                            <span>{request.numberOfPeople}</span>
                                        </div> 
                                        I'll be needing transportation to Denmark or similar...
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </React.Fragment>
    );
};

export default RequestsListIcons;
