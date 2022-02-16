import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide'

const SlideTransition = props => (
    <Slide {...props} direction="down" />
);

const Alert = ({ isOpen, setIsOpen, type, msg }) => {
    return <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        TransitionComponent={SlideTransition}
    >
        <MuiAlert
            onClose={() => setIsOpen(false)}
            severity={type}
            sx={{ width: '100%' }}
            variant="filled"
        >
            {msg}
        </MuiAlert>
    </Snackbar>
};

export default Alert;