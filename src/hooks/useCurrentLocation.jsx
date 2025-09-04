import { apiJson } from "api";
import { pop2 } from "utils/Popup";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

const useCurrentLocation = () => {
  // Fetch Current Location
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  let [liveState, setLiveState] = useState(null);
  let [liveDistrict, setLiveDistrict] = useState(null);
  let [liveCountry, setLiveCountry] = useState(null);
  let [livePostalCode, setLivePostalcode] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [findingLocation, setFindingLocation] = useState(false);
  const [coords, setCoords] = useState(null);

  //Fetch Coordinates
  const fetchCoordinates = () => {
    window?.navigator?.geolocation?.getCurrentPosition((geolocation) => {
      const coordinates = geolocation?.coords;
      setCoords(coordinates);
    });
  };
  // Fetch Address
  const fetchAddress = (coordinates) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("IN");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    if (coordinates) {
      Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
        (response) => {
          let address = response.results[0].formatted_address;
          response.results[0].address_components.forEach((values, index) => {
            if (values.types[0].toLowerCase() === "postal_code") {
              address = address.replace(values.long_name, "");
              setLivePostalcode(values.long_name);
            }
            if (values.types[0].toLowerCase() === "country") {
              address = address.replace(values.long_name, "");
              setLiveCountry(values.long_name);
            }
            if (values.types[0].toLowerCase() === "administrative_area_level_3") {
              address = address.replace(values.long_name, "");
              setLiveDistrict(values.long_name);
            }
            if (values.types[0].toLowerCase() === "administrative_area_level_1") {
              address = address.replace(values.long_name, "");
              setLiveState(values.long_name);
            }
            address = address.replace(",  ,", "").trim();
          });
          setCurrentAddress(address);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      setFindingLocation(false);
    }
  };
  //Fetch States List
  const fetchStates = async () => {
    try {
      const res = await apiJson.get("/public/stateanddistrict");
      if (res.status === 200) {
        setStates(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
      pop2.warning({ title: "Registeration is not available right now. Please try again" });
    }
  };
  useEffect(() => {
    fetchStates();
    fetchCoordinates();
  }, []);
  useEffect(() => {
    fetchAddress(coords);
  }, [coords]);
  // End Current Location
  return { findingLocation, liveState, liveDistrict, liveCountry, livePostalCode, currentAddress, states };
};

export default useCurrentLocation;
