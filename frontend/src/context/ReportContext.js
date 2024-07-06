import { createContext } from "react";

const ReportContext = createContext({
    publicFiles: [],
    peopleFiles: [],
    externalFiles: [],
});

export default ReportContext;