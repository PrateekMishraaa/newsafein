import React, { useEffect, useRef, useState } from "react";
const PosterDownload = ({ image, qrcodeimg, name, addline1, addline2, link, event_date, setShow }) => {
    const canvasRef = useRef(null);
    const canvasCoverRef = useRef(null);
    const [certHeight, setCertHeight] = useState(1000);
    const [certWidth, setCertWidth] = useState(707);
    let texts = [];
    let links = [];
    const generateCertificate = () => {
        let mainString = addline1 + addline2;
        if (mainString.length > 60) {
            let splitString = mainString.slice(60);
            let splitIndex = 60 + splitString?.indexOf(" ");
            console.log({ mainString, splitString, splitIndex, })
            let string1 = mainString.slice(0, splitIndex);
            let string2 = mainString.slice(splitIndex);
            texts[0] = string1;
            texts[1] = string2;
            console.log({ texts })
        } else {
            texts[0] = mainString;
        }
        if (link.length > 80) {
            let splitString = link.slice(80);
            let splitIndex = 80 + splitString?.indexOf("-");
            console.log({ mainString, splitString, splitIndex, })
            let string1 = link.slice(0, splitIndex);
            let string2 = link.slice(splitIndex);
            links[0] = string1;
            links[1] = string2;
            console.log({ length: link.length });
        } else {
            links[0] = link;
        }
        const img = new Image();
        const img2 = new Image();
        img.src = image;
        img2.src = qrcodeimg;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const { height, width } = context.canvas;
        img.onload = () => {
            context.drawImage(img, 0, 0, width, height);
            context.drawImage(img2, 205, 146, 300, 300);
            context.font = "700 25px sans-serif";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(name, canvas.width / 2, canvas.height - 245);
            context.font = "700 20px sans-serif";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(event_date, canvas.width / 2, canvas.height - 160);
            context.font = "500 19px Arial";
            context.fillStyle = "whitesmoke";
            {
                texts.map((text, i) => {
                    const increase = i * 23;
                    return context.fillText(text, canvas.width / 2, canvas.height - (220 - increase));
                })
            }
            // context.fillText(addline2, canvas.width / 2, canvas.height - 200);
            context.font = "400 15px Arial";
            context.fillStyle = "whitesmoke";
            {
                links.map((linktext, i) => {
                    const increase = i * 19;
                    return context.fillText(linktext, canvas.width / 2, canvas.height - (45 - increase));
                })
            }
        }
        img2.onload = () => {
            context.drawImage(img, 0, 0, width, height);
            context.drawImage(img2, 205, 146, 300, 300);
            context.font = "700 25px sans-serif";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(name, canvas.width / 2, canvas.height - 245);
            context.font = "700 20px sans-serif";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(event_date, canvas.width / 2, canvas.height - 160);
            context.font = "500 19px Arial";
            context.fillStyle = "whitesmoke";
            {
                texts.map((text, i) => {
                    const increase = i * 23;
                    return context.fillText(text, canvas.width / 2, canvas.height - (220 - increase));
                })
            }
            // context.fillText(addline2, canvas.width / 2, canvas.height - 200);
            context.font = "400 15px Arial";
            context.fillStyle = "whitesmoke";
            {
                links.map((linktext, i) => {
                    const increase = i * 19;
                    return context.fillText(linktext, canvas.width / 2, canvas.height - (45 - increase));
                })
            }
        }
    };
    React.useLayoutEffect(() => {
        generateCertificate();
    }, []);

    const downloadCert = () => {
        generateCertificate();
        let dataImage = canvasRef.current
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        var tmpLink = document.createElement("a");
        tmpLink.download = "image.png"; // set the name of the download file
        tmpLink.href = dataImage;
        // temporarily add link to body and initiate the download
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
        setShow();
    };


    return (
        <div>
            <button onClick={downloadCert}>Download Poster</button>
            <div ref={canvasCoverRef}>
                <canvas
                    ref={canvasRef}
                    height={certHeight}
                    width={certWidth}
                />
            </div>
        </div>
    );
};
export default PosterDownload;
