import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import {
    DeleteEmployeeTypes,
    Employee,
    EmployeeData,
    UpdateEmployeeTypes,
} from "../Interfaces/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import i18n from "../i18n";
import { addNotification } from "./notificationController";

//: Get All Employees
const getEmployees = async (userId: string | undefined) => {
    const querySnapShot = await getDocs(
        collection(db, `users/${userId}/employees`)
    );

    const employees: Employee[] = [];
    querySnapShot.forEach(doc => {
        const employeeData = doc.data() as Employee;
        employees.push({
            ...employeeData,
            id: doc.id,
        });
    });

    return employees;
};

//: Get All Employees Query
export function useGetEmployees() {
    const { data, isLoading } = useQuery({
        queryKey: ["employees", auth?.currentUser?.uid],
        queryFn: () => getEmployees(auth?.currentUser?.uid),
    });
    return { data, isLoading };
}

//: Add new employee
const addEmployee = async function (
    employee: EmployeeData,
    userId: string | undefined
) {
    await addDoc(collection(db, `users/${userId}/employees`), employee);
    return employee;
};

//: Add new employee Query
export const useAddEmployee = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (employee: EmployeeData) =>
            addEmployee(employee, auth?.currentUser?.uid),
        onSuccess: data => {
            addNotification(
                {
                    contentObj: data,
                    event: "Add Employee",
                },
                auth.currentUser?.uid
            );
            toast.success(i18n.t("New Employee added successfully"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("There was an error adding the employee"));
        },
    });
    return { mutateAsync, isPending };
};

//: Update Employee
const updateEmployee = async function ({
    employee,
    id,
    userId,
}: UpdateEmployeeTypes) {
    const ref = doc(db, `users/${userId}/employees`, id);
    const updatedEmployee = { ...employee };
    await updateDoc(ref, updatedEmployee);
};

//: Update Employee Query
export const useUpdateEmployee = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: UpdateEmployeeTypes) => {
            await updateEmployee(variables);
            return variables;
        },
        onSuccess: data => {
            addNotification(
                {
                    contentObj: data.employee,
                    event: "Update Employee",
                },
                data.userId
            );
            toast.success(i18n.t("Employee successfully edited"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(i18n.t("An error occurred while editing the employee"));
        },
    });
    return { mutateAsync, isPending };
};

//: Delete Employee
const deleteEmployee = async function ({
    id,
    userId,
    row,
}: DeleteEmployeeTypes) {
    const ref = doc(db, `users/${userId}/employees`, id);
    try {
        await deleteDoc(ref);
        return row;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//: Delete employee query
export const useDeleteEmployee = function () {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: DeleteEmployeeTypes) => {
            await deleteEmployee(variables);
            return variables;
        },
        onSuccess: data => {
            addNotification(
                {
                    contentObj: data.row,
                    event: "Delete Employee",
                },
                auth.currentUser?.uid
            );
            toast.success(i18n.t("Employee successfully deleted"));
            queryClient.invalidateQueries();
        },
        onError: err => {
            console.log(err);
            toast.error(
                i18n.t("An error occurred while deleting the employee")
            );
        },
    });
    return { mutateAsync, isPending };
};
