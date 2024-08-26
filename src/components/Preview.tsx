import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getPostById, postComById } from '../helpers/api';
import { useEffect, useState } from 'react';
import { IComment, IPost, IUser } from '../helpers/types';
import { BASE } from '../helpers/default';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'flex-start',
};

interface IProps {
    isOpen: boolean
    close: () => void
    post: number
}


export function Preview({ isOpen, close, post }: IProps) {
    const [likes, setLikes] = useState<IUser[]>([])
    const [comments, setComments] = useState<IComment[]>([])
    const [comment, setComment] = useState<string>('')
    const [photo, setPhoto] = useState<string>('')

    useEffect(() => {
        getPostById(post).then(res => {
            setLikes((res.payload as IPost).likes)
            setPhoto((res.payload as IPost).picture)
            setComments((res.payload as IPost).comments)
        })
    }, [post])

    const handleCommentSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && comment.trim() !== '') {

            postComById(post, { text: comment })
                .then(res => {
                    const newComment: IComment = {
                        id: (res.payload as IComment).id,
                        content: comment, 
                        user: (res.payload as IComment).user,
                    }
                    setComments([newComment, ...comments])
                    setComment('')
                })

        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    component="img"
                    sx={{
                        width: '400px',
                        height: '400px',
                        objectFit: 'cover',
                    }}
                    src={BASE + photo}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        ml: 2,
                        flex: 1,
                        maxWidth: '40%',
                        height: '100%',
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {likes.length} likes, {comments.length} comments
                        </Typography>
                        <Typography variant="body1">
                            Likes:
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {likes.map(like => (
                                <Box
                                    key={like.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            mr: 2,
                                        }}
                                        src={BASE + like.picture}
                                    />
                                    <Typography>
                                        <Link to={'/profile/' + like.id} onClick={close}>{like.name} {like.surname}</Link>
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Typography>
                            Comments
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {comments.map((com) => (
                                <Typography key={com.id}>
                                    <strong>{com.user.name} says</strong>:<br /> {com.content} {/* Updated to 'text' */}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField
                            label="What do you think?"
                            variant="standard"
                            sx={{ width: '100%' }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyPress={handleCommentSubmit}
                        />
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
