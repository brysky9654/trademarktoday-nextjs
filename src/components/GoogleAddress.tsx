import Autocomplete from "react-google-autocomplete";
const GOOGLE_API_KEY = 'AIzaSyCEUYa_jJGDsoq3hugOAL_3nzn0lolNGBk';
const GoogleAddress = () => {
    return (
        <>
            <Autocomplete
                apiKey={GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                    console.log(place);
                }}
            />
        </>
    )
}
export default GoogleAddress;