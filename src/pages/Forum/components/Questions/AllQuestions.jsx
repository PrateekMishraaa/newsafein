import React from 'react';
import QuestionSkeleton from '../Skeleton/QuestionSkeleton';
import { Badge, Box, Button, ButtonGroup, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { FilterAltTwoTone } from '@mui/icons-material';
import QuestionCard from './QuestionCard';
import { LoadingButton } from '@mui/lab';
import { apiForum } from 'api';
import ReportContent from '../Modals/ReportContent';
import { Link, useOutletContext } from 'react-router-dom';

const AllQuestions = () => {
    const [search, {
        loading,
        questions,
        pageHeading,
        stats,
        setSort,
        filterCount,
        handleShowFilterBox,
        showFilterBox,
        sortAndFilter,
        setSortAndFilter,
        setFilter,
        setShowFilterBox,
        setPage,
        setPageHeading,
        getQuestions,
        showLoadBtn,
        setLoadMore,
        sort,
        filter,
        page,
        limit,
        offset,
        setQuestions,
        loadMore,
        handleClickOpen,
        setShowLoadBtn

    }] = useOutletContext();
    // let arr = {
    //     questions, setQuestions, 
    //     loading, setLoading,
    //     open, setOpen,
    //     showFilterBox, setShowFilterBox,
    //     pageHeading, setPageHeading,
    //     sort, setSort,
    //     filter, setFilter,
    //     page, setPage,
    //     limit, setLimit,
    //     page, setPage,

    // };

    // let state = {
    //     loading,
    //     questions,
    //     pageHeading,
    //     stats,
    //     setSort,
    //     filterCount,
    //     handleShowFilterBox,
    //     showFilterBox,
    //     sortAndFilter,
    //     setSortAndFilter,
    //     setFilter,
    //     setShowFilterBox,
    //     setPage,
    //     setPageHeading,
    //     getQuestions,
    //     showLoadBtn,
    //     setLoadMore,
    //     sort,
    //     filter,
    //     page,
    //     limit,
    //     offset,
    //     setQuestions,
    //     loadMore,
    //     handleClickOpen,


    // };

    // const [questions, setQuestions] = useState();
    // const [loading, setLoading] = useState(true);
    // const [open, setOpen] = useState(false);
    // const [showFilterBox, setShowFilterBox] = useState(false);
    // const [pageHeading, setPageHeading] = useState('Recent Questions');
    // const [sort, setSort] = useState('');
    // const [filter, setFilter] = useState('');
    // const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState(10);
    // const [offset, setOffset] = useState();
    // const [loadMore, setLoadMore] = useState(false);
    // const [showLoadBtn, setShowLoadBtn] = useState(true);
    // const [sortAndFilter, setSortAndFilter] = useState({});
    const [openReport, setOpenReport] = React.useState(false);
    // const [filterCount, setFilterCount] = useState(0);
    // const [stats, setStats] = useState();


    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const getQuestionsByQuery = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await apiForum.get(`/v1/api/query?sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
    //         if (res.status === 200) {
    //             setQuestions(res?.data?.results);
    //             if (sort) {
    //                 setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
    //             }
    //             // console.log("Sorted & Filtered Data: ", res);
    //             setLoading(false);
    //             getStats();
    //         }
    //     } catch (error) {
    //         // console.log(error?.response?.data?.error);

    //     }
    // }

    // const getQuestions = async () => {
    //     setLoading(true);
    //     pop2.loading();
    //     try {
    //         // const res = await apiForum.get(`/v1/api/questions`);
    //         const res = await apiForum.get(`/v1/api/query?sort=&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
    //         if (res.status === 200) {
    //             setQuestions(res?.data?.results);
    //             setPageHeading(`Recent Questions`);
    //             // console.log("Question Data: ", res);
    //             setLoading(false);
    //             getStats();
    //         }
    //     } catch (error) {
    //         // console.log(error.response.data.error);
    //     }
    // }

    // const handleShowFilterBox = () => {
    //     if (showFilterBox) {
    //         setShowFilterBox(false);
    //     } else {
    //         setShowFilterBox(true);
    //     }
    // }

    // const getStats = async () => {
    //     try {
    //         const res = await apiForum.get(`/v1/api/question-stats`);
    //         if (res?.status === 200) {
    //             console.log("Stats: ", res)
    //             setStats(res?.data?.results);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     console.log("All Questions Components");
    //     if (sort && filter) {
    //         setFilterCount(2);
    //     } else if (filter || sort) {
    //         setFilterCount(1);
    //     } else {
    //         setFilterCount(0);
    //     }
    //     getQuestionsByQuery();
    // }, [sort, filter]);

    // useEffect(() => {
    //     setQuestions(search?.questions);
    //     setPageHeading(search?.pageHeading);
    //     setLoading(search?.loading);
    // }, [search]);

    return (
        <>
            {
                loading ?
                    <>
                        {/* {
                            showWelcome ? 
                            <WelcomeForum /> 
                            : null
                          } */}
                        <QuestionSkeleton />
                        <QuestionSkeleton />
                        <QuestionSkeleton />
                    </>
                    :
                    questions?.length ?
                        <>
                            <div>
                                {/* <p className='fs-6'>1200 asked today, 34000 asked overall, 432 questions still need answers</p> */}

                            </div>
                            <div className="mb-3">
                                <div className="row align-items-center ">
                                    <div className="col">
                                        <h4>{pageHeading}</h4>
                                        <span className='fst-italic' style={{ fontSize: '12px' }}>Today: {stats?.today} | Total: {stats?.total} | Unanswered: {stats?.unanswered}</span>
                                    </div>
                                    <div className="col ">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: "wrap",
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'end',
                                                '& > *': {
                                                    m: 1,
                                                },
                                            }}

                                        >
                                            <ButtonGroup size="small" aria-label="small button group">
                                                <Button key="one" className='text-capitalize' onClick={() => {
                                                    setSort('newest');
                                                }}>Newest</Button>
                                                <Button key="two" className='text-capitalize' onClick={() => {
                                                    setSort('unanswered');
                                                }}>Unanswered</Button>
                                                <Button key="three" className='text-capitalize' onClick={() => {
                                                    setSort('popular');
                                                }}>Popular</Button>
                                            </ButtonGroup>
                                            <Badge badgeContent={filterCount} color="primary">
                                                <Button size="small" className='text-capitalize' variant="outlined" onClick={handleShowFilterBox}
                                                    startIcon={<FilterAltTwoTone />}>
                                                    Filter
                                                </Button>
                                            </Badge>
                                        </Box>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className={`row border rounded-3 p-3 ${showFilterBox ? '' : 'd-none'}`}>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h6>Filter by</h6>
                                                <FormControl>
                                                    {/* <FormLabel id="demo-radio-buttons-group-label">Filter by</FormLabel> */}
                                                    <RadioGroup
                                                        aria-labelledby="filters-radio-label"
                                                        name="filters-radio"
                                                        defaultValue={sortAndFilter?.filter}
                                                        onChange={e => {
                                                            setSortAndFilter({ ...sortAndFilter, filter: e.target.value })
                                                        }}
                                                    >
                                                        <FormControlLabel value="unanswered" control={<Radio />} label="Unanswered" />
                                                        <FormControlLabel value="answered" control={<Radio />} label="Answered" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="col-lg-4">
                                                <h6>Sorted by</h6>
                                                <FormControl>
                                                    {/* <FormLabel id="demo-radio-buttons-group-label">Filter by</FormLabel> */}
                                                    <RadioGroup
                                                        aria-labelledby="sorting-radio-label"
                                                        name="sorting-radio"
                                                        defaultValue={sortAndFilter?.sort}
                                                        onChange={e => {
                                                            setSortAndFilter({ ...sortAndFilter, sort: e.target.value })
                                                        }}
                                                    >
                                                        <FormControlLabel value="newest" control={<Radio />} label="Newest" />
                                                        <FormControlLabel value="recent-activity" control={<Radio />} label="Recent activity" />
                                                        <FormControlLabel value="highest-votes" control={<Radio />} label="Highest votes" />
                                                        <FormControlLabel value="most-frequent" control={<Radio />} label="Most frequent" />
                                                        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="col-lg-4">

                                                <div className='mb-5'>
                                                    <h5>Still Confused?</h5>
                                                    <h6>Don't worry! Our topic experts are waiting for you.
                                                        Try EkSathi Now!
                                                    </h6>
                                                    <Link to="https://www.eksathi.com" target='_blank'>
                                                        <Button className='rounded-3 text-capitalize' variant='outlined' color='info' >Connect to Expert</Button>
                                                    </Link>
                                                </div>
                                                <Typography varient="subtitle2" gutterBottom color='grey'>Powered By <Link to='https://www.eksathi.com' target="_blank" className='text-info'>EkSathi</Link></Typography>
                                            </div>
                                        </div>
                                        <Divider className='my-3' />
                                        <div className="row">
                                            <div className="col">
                                                <Button variant='outlined' color="success" className='text-capitalize rounded-3' onClick={() => {
                                                    console.log(sortAndFilter);
                                                    if (sortAndFilter?.sort) {
                                                        setSort(sortAndFilter?.sort);
                                                    }
                                                    if (sortAndFilter?.filter) {
                                                        setFilter(sortAndFilter?.filter);
                                                    }
                                                    setShowFilterBox(false);
                                                }}>Apply</Button></div>
                                            <div className="col d-flex justify-content-start justify-content-lg-end mt-2 mt-lg-0">
                                                <Button variant='outlined' className='text-capitalize mx-3 rounded-3' onClick={() => {
                                                    setSortAndFilter({ ...sortAndFilter, sort: "", filter: "" });
                                                    setSort('');
                                                    setFilter('');
                                                    setPage(1);
                                                    setShowFilterBox(false);
                                                    setPageHeading("Recent Questions");
                                                }}>Clear Filters</Button>
                                                <Button variant='outlined' className='text-capitalize rounded-3' color='error' onClick={() => setShowFilterBox(false)}>Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {questions?.map((question, key) => (
                                <><QuestionCard question={question} key={key} getQuestions={getQuestions} /></>
                            ))}
                            <div className={`d-flex justify-content-center mb-3 ${showLoadBtn ? '' : 'd-none'}`}>
                                <LoadingButton
                                    // size="small"
                                    onClick={async () => {

                                        setLoadMore(true);
                                        try {
                                            const res = await apiForum.get(`/v1/api/query?sort=${sort}&filter=${filter}&page=${page + 1}&limit=${limit}&offset=${offset}`);
                                            if (res.status === 200) {
                                                if (res?.data?.results?.length) {

                                                    let data = res?.data?.results;
                                                    setQuestions(questions.concat(data));

                                                    console.log("Loaded More Questions: ", questions);
                                                    setLoadMore(false);
                                                    setPage(page + 1);
                                                } else {
                                                    setLoadMore(false);
                                                    setShowLoadBtn(false);
                                                    setPage(1);
                                                }
                                            }
                                        } catch (error) {
                                            console.log(error?.response?.data?.error);
                                        }
                                    }}
                                    // endIcon={<SendIcon />}
                                    loading={loadMore}
                                    loadingIndicator="Loading…"
                                    // loadingPosition="end"
                                    variant="outlined"
                                    className='text-capitalize fw-bold'
                                >
                                    <span>Load More</span>
                                </LoadingButton>
                            </div>
                        </> :
                        <>
                            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                                <img src="/images/questionnotfound.jpg" alt="" className='w-100' style={{ maxWidth: "400px", objectFit: "contain" }} />
                                <h3>No Questions Found</h3>
                                <p>It seems like nobody asked yet, but you can ask now!</p>
                                <Button varient="outlined" className="border text-capitalize fs-5 px-4 rounded-3" size="large" color="success" onClick={handleClickOpen}>Ask Question Now</Button>
                            </div>
                        </>
            }
            <ReportContent open={openReport} setOpen={setOpenReport} />
        </>
    )
}

export default AllQuestions;