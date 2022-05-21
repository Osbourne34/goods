import {Snackbar, Alert} from '@mui/material';

const Snack = ({isOpen, handleClose, children}) => {
    return (
        <Snackbar
            open={isOpen}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            {children}
        </Snackbar>
    )
}

export default Snack;