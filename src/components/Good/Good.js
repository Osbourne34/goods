import { Card, CardMedia, CardContent, Typography, Box, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Good = ({ title, description, price, thumbnail, id, onRemove, isDisabled }) => {

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={thumbnail}
                alt={title}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions
                    sx={{
                        pr: 1,
                        pb: 1,
                        pl: 2,
                        pt: 0,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography>
                        {`${price}$`}
                    </Typography>
                    <Box >
                        <IconButton
                            color="primary"
                            sx={{p: 0}}
                        >
                            <Link
                                to={`/good/${id}`}
                                style={{padding: '20px'}}
                            >
                            </Link>
                            <EditIcon sx={{position: 'absolute', pointerEvents: 'none'}} />
                        </IconButton>

                        <IconButton
                            color="error"
                            onClick={onRemove}
                            disabled={isDisabled}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardActions>
            </Box>
        </Card>
    )
}

export default Good;