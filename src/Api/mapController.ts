import { useQuery } from "@tanstack/react-query";

//: Get Cities
async function getCities() {
    try {
        const cities = await fetch(
            `https://turkiyeapi.herokuapp.com/api/v1/provinces`
        );
        const data = await cities.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

//: Get Cities Query
export function useGetCities() {
    const { data, isLoading } = useQuery({
        queryFn: getCities,
        queryKey: ["cities"],
    });
    return { data, isLoading };
}

//: Get Neighbourhoods
async function getNeighbourhoods() {
    try {
        const neighbourhoods = await fetch(
            `https://turkiyeapi.herokuapp.com/api/v1/neighborhoods`
        );
        const data = await neighbourhoods.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

//: Get Neighbourhoods Query
export function useGetNeighbourhoods() {
    const { data, isLoading } = useQuery({
        queryFn: getNeighbourhoods,
        queryKey: ["neighbourhoods"],
    });
    return { data, isLoading };
}
