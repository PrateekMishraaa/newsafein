import { Link, Typography } from '@mui/joy';
import React from 'react'

const ReplyList = ({reply}) => {
    return (
        <>
            <Typography fontSize="sm">
                <Link
                    component="button"
                    color="neutral"
                    fontWeight="lg"
                    textColor="text.primary"
                >
                    {reply?.auther?.name}
                </Link>{' '}
                {reply?.reply}
            </Typography>
            {/* <Link
                component="button"
                underline="none"
                fontSize="sm"
                startDecorator="…"
                sx={{ color: 'text.tertiary' }}
            >
                more
            </Link> */}
        </>
    )
}

export default ReplyList;