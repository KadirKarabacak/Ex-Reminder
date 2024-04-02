import { useQuery } from "@tanstack/react-query";

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

export function useGetCities() {
    const { data, isLoading } = useQuery({
        queryFn: getCities,
        queryKey: ["cities"],
    });
    return { data, isLoading };
}
