import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import { useGetWarehouse } from "../Api/warehouseController";
import CustomTable from "../Components/Table";
import { WarehouseToolBar } from "../Components/TableToolBars/WarehouseBar";
import { InfinitySpin } from "react-loader-spinner";

const StyledContact = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnimatedStyledContact = animated(StyledContact);

export default function Warehouse() {
    const animationProps = useSpring(springOptions);
    const { data, isLoading } = useGetWarehouse();
    const warehouse = true;
    console.log(data);

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledContact style={animationProps}>
            <CustomTable
                data={data}
                CustomToolbar={<WarehouseToolBar />}
                warehouse={warehouse}
            />
        </AnimatedStyledContact>
    );
}
