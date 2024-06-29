import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";


export default function Layout({children}: {children: ReactNode}) {
    const { user } = useSelector((state: RootState) => state.authState))
    return <>{children}</>;
}
