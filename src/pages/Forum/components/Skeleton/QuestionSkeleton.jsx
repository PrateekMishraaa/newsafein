import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Divider } from '@mui/material';

const Image = styled('img')({
    width: '100%',
});

export default function QuestionSkeleton() {

    return (
        <div className='border rounded-4 mb-4 p-5'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ margin: 1 }}>
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Skeleton width="100%">
                        <Typography>.</Typography>
                    </Skeleton>
                </Box>
            </Box>
            <div>
                <Typography component="div" key={'h1'} variant={'h1'}>
                    <Skeleton />
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ margin: 1 }}>
                        <Skeleton variant="sqaure">
                            <Avatar />
                        </Skeleton>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Box>
            </div>
            {/* <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton> */}
        </div>
    );
}


// export default function SkeletonChildren() {
//   return (
//     <Grid container spacing={8}>
//       <Grid item xs>
//         <QuestionSkeleton loading />
//       </Grid>
//       <Grid item xs>
//         <QuestionSkeleton />
//       </Grid>
//     </Grid>
//   );
// }