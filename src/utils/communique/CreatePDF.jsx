import { pdfjs } from "react-pdf";
import y20logo from "./asset/y20.png"
import g20logo from "./asset/g20.png"
import mg20logo from "./asset/mg20.png"
import yuva from "./asset/yuva.png"
import { Document, Page, Text, Image, Font, ReactPDF, PDFViewer, View } from "@react-pdf/renderer";
import moment from "moment";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const styles = {
    body: {
        paddingTop: 25,
        paddingBottom: 45,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12,
        fontFamily: 'Oswald'
    },
    participant: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
        fontFamily: 'Oswald'
    },
    text: {
        marginVertical: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
};
const CreatePDF = ({ data }) => {
    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    })
    return (
        <PDFViewer style={{ width: "100%", height: "calc(100vh - 50px)" }}>
            <Document>
                <Page style={styles.body}>
                    <View fixed style={{ display: "flex", alignItems: "start", justifyContent: "space-between", flexDirection: "row", marginBottom: 30 }}>
                        <View style={{ display: "flex", alignItems: "start", justifyContent: "flex-start", flexDirection: "row" }}>
                            <Image
                                style={{ height: 50, objectFit: "contain", marginRight: 10 }}
                                src={y20logo}
                            />
                            <Image
                                style={{ height: 50, objectFit: "contain" }}
                                src={g20logo}
                            />
                        </View>
                        <View style={{ display: "flex", alignItems: "start", justifyContent: "flex-end", flexDirection: "row" }}>
                            <Image
                                style={{ height: 50, objectFit: "contain", marginRight: 10 }}
                                src={yuva}
                            />
                            <Image
                                style={{ height: 50, objectFit: "contain" }}
                                src={mg20logo}
                            />
                        </View>
                    </View>
                    <Text style={styles.title}>{data?.institute?.institute}</Text>
                    <Text style={styles.title}>COMMUNIQUÉ</Text>
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                        {data.tracks.map((track, index) => {
                            return String(track?.track_name) + " | "
                        })}
                    </Text>
                    <View style={{ display: "flex", alignItems: "start", justifyContent: "space-between", flexDirection: "row", marginTop: 10 }}>
                        <View style={{ display: "flex", alignItems: "start", justifyContent: "flex-start", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, textAlign: 'left', fontWeight: 700 }}>
                                VENUE&nbsp;:&nbsp;
                            </Text>
                            <Text style={{ fontSize: 12, textAlign: 'left', maxWidth: "50%" }}>
                                {data?.institute?.institute},{"\n"}
                                {data?.institute?.address}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, textAlign: 'left' }}>DATE : {moment().format('MMMM Do YYYY')}</Text>
                    </View>
                    {
                        data.tracks.map((track, index) => {
                            return (
                                <View key={index}>
                                    {/* Track Details  */}
                                    <Text style={styles.subtitle}>
                                        {track?.track_name}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', marginBottom: 5 }}>Top {track?.points?.length} Items</Text>
                                    {
                                        track?.points?.map((point, i) => {
                                            return (
                                                <Text key={i} style={{ fontSize: 14, marginTop: 7 }}>
                                                    {point}
                                                </Text>
                                            )
                                        })
                                    }

                                </View>
                            )
                        })
                    }
                    {/* Participants List  */}
                    <Text style={styles.participant}>
                        LIST OF ALL PARTICIPANTS
                    </Text>
                    {data.participants.map((participant, index) => {
                        return (
                            <View style={{ borderTop: "1px solid whitesmoke", paddingVertical: 10 }}>
                                <Text style={{ fontSize: 14 }}>{participant?.first_name} {" "}{participant?.last_name}</Text>
                                <Text style={{ fontSize: 13 }}>{participant?.track}</Text>
                                <Text style={{ fontSize: 13 }}>{participant?.country} | {participant?.designation}</Text>
                            </View>
                        )
                    })
                    }
                    <View style={{ marginTop: 25, paddingTop: 20, borderTop: "1px solid whitesmoke" }}>
                        <Text style={{ fontSize: 14, marginTop: 5 }}>
                            Admin Name : {data?.institute?.name}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 5 }}>
                            Phone Number : {String(data?.institute?.phone)}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 5 }}>
                            Email Address: {data?.institute?.email}
                        </Text>
                    </View>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
            </Document>
        </PDFViewer >
    )

}
export default CreatePDF