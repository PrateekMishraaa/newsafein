import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ content, postProgress }) => {
    const [updatedVideoId, setUpdatedVideoId] = useState("");

    // Function to extract YouTube ID
    function extractYouTubeID(input) {
        // Check if input is already a valid video ID (11 characters)
        const regexVideoID = /^[a-zA-Z0-9_-]{11}$/;

        // Clean URL by removing query parameters
        const cleanedInput = input.split(/[?&#]/)[0];

        if (regexVideoID.test(cleanedInput)) {
            return cleanedInput; // Return cleaned input if it's a valid ID
        }

        // Regex for standard and short YouTube URL formats
        const regexStandard =
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/[^\s\/]+\/videos\/|watch\/videos\/|shorts\/)?([^"&?\/\s]{11})/;
        const regexShort = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^"&?\/\s]{11})/;

        if (regexStandard.test(input)) {
            return input.match(regexStandard)[1]; // Extract ID from standard URL
        } else if (regexShort.test(input)) {
            return input.match(regexShort)[1]; // Extract ID from short URL
        } else {
            console.log("Invalid YouTube URL or ID");
            return null; // Return null for invalid input
        }
    }

    // Update video ID when content.path changes
    useEffect(() => {
        if (content?.path) {
            const videoId = extractYouTubeID(content?.path);
            console.log("Extracted video ID:", videoId); // Debugging log
            setUpdatedVideoId(videoId);
        }
    }, [content?.path]);

    // Event handler for when the video ends
    const onEndHandler = () => {
        postProgress(content?.id);
    };

    // Options for YouTube player
    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: true, // Set autoplay to false for testing
        },
    };

    // Adding scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            console.log("Scroll event detected");
        };

        // Add passive scroll event listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            {updatedVideoId ? (
                <Box
                    className="theatre"
                    sx={{
                        "& .video-container": {
                            height: "70vh",
                            width: "100%",
                        },
                    }}
                >
                    <YouTube
                        videoId={updatedVideoId}
                        opts={opts}
                        className="video-container"
                        onEnd={onEndHandler}
                    />
                </Box>
            ) : (
                <p>Loading video...</p>
            )}
            {/* </div> */}
        </>
    );
};

export default VideoPlayer;