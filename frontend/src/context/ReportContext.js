import { createContext } from "react";

const ReportContext = createContext({
    publicFiles: [],
    peopleFiles: [],
    externalFiles: [],
    riskScore: {
        score: 0,
        level: 'MINIMAL',
        color: 'bg-green-400'
    },
    loading: false
});

export default ReportContext;