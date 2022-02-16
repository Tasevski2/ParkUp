import { sessionStatus } from '../../../../config/enums';

import { RoundWrapper, FuncText, HelperText, PayButton } from './styles';

const RoundButton = ({ text, bgColor, onClick }) => (
    <RoundWrapper style={{ backgroundColor: bgColor }} onClick={onClick}>
        <FuncText>{text}</FuncText>
        <HelperText>Double-Tap</HelperText>
    </RoundWrapper>
);

const Buttons = ({ status, handlePayButton, onClick }) => {
    switch (status) {
        case null:
            return (
                <RoundButton
                    text='Започни'
                    bgColor='#01a66f'
                    onClick={onClick}
                />
            );
        case sessionStatus.idle:
        case sessionStatus.active:
            return (
                <RoundButton
                    text='Заврши'
                    bgColor='#d51e00'
                    onClick={onClick}
                />
            );
        case sessionStatus.over:
            return <PayButton onClick={handlePayButton}>Плати</PayButton>;
        default:
            return null;
    }
};

export default Buttons;
