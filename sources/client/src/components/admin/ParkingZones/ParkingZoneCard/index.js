import { useHistory } from 'react-router-dom';

import {
    ParkingZoneWrapper,
    Container,
    ZoneName,
    InfoWrapper,
    Label,
    Value,
    ProgressBar,
    ProgressBarLabel,
} from './styles';

import DropdownViewer from '../../../DropdownViewer';

const ParkingZoneCard = ({ info }) => {
    let history = useHistory();
    const takenDividedByTotal = info.takenSpaces / info.capacity;

    return (
        <ParkingZoneWrapper item xs={11} sm={6} md={3}>
            <Container onClick={() => history.push(`/zone/${info.id}`)}>
                <ZoneName>{info.pzName}</ZoneName>
                <InfoWrapper>
                    <Label>Одговорни лица:</Label>
                    <DropdownViewer data={info?.responsibleWorkers ?? [] } />
                </InfoWrapper>
                <InfoWrapper style={{ marginTop: '30px' }}>
                    <Label>Број на паркинг места:</Label>
                    <Value>{info.capacity}</Value>
                </InfoWrapper>
                <ProgressBar
                    percent={Math.floor(
                        (isNaN(takenDividedByTotal) ? 0 : takenDividedByTotal) *
                            100
                    )}
                    label={() => (
                        <ProgressBarLabel>
                            {info.takenSpaces}/{info.capacity}
                        </ProgressBarLabel>
                    )}
                />
            </Container>
        </ParkingZoneWrapper>
    );
};

export default ParkingZoneCard;
