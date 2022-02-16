import { Loader, Container } from './styles';

const AbsoluteLoader = ({ containerStyle }) => {
    return (
        <Container style={containerStyle}>
            <Loader />
        </Container>
    );
};

export default AbsoluteLoader;
