import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import RiskReportView from "../view/RiskReportView.jsx";
import ReportContext from '../context/ReportContext.js';
import Config from "../Config.js";

export default function RiskReportController() {

    const navigate = useNavigate();

    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(true);

    // Dynamic Risk Calculation Algorithm
    const calculateRiskScore = (data) => {
        if (!data || Object.keys(data).length === 0) {
            return { score: 0, level: 'MINIMAL', color: 'bg-green-400' };
        }

        const publicFiles = data.publicFiles?.length || 0;
        const peopleFiles = data.peopleFiles?.length || 0;
        const externalFiles = data.externalFiles?.length || 0;

        // Calculate total files that have any sharing permissions
        const totalSharedFiles = publicFiles + externalFiles;

        // Risk Scoring Algorithm (0-100 scale)
        let riskScore = 0;

        // Public Files Risk (Highest Priority - up to 60 points)
        // Each public file adds significant risk as it's accessible to anyone
        if (publicFiles > 0) {
            riskScore += Math.min(60, publicFiles * 15 + 20); // 20 base + 15 per file, max 60
        }

        // External Sharing Risk (Medium Priority - up to 25 points)
        // Files shared with specific people outside organization
        if (externalFiles > 0) {
            riskScore += Math.min(25, Math.sqrt(externalFiles) * 8); // Logarithmic scale
        }

        // People Access Risk (Lower Priority - up to 15 points)
        // More people having access increases risk
        if (peopleFiles > 0) {
            riskScore += Math.min(15, Math.log(peopleFiles + 1) * 5); // Logarithmic growth
        }

        // Total shared files amplifier (bonus risk for high volume)
        if (totalSharedFiles > 10) {
            riskScore += Math.min(10, (totalSharedFiles - 10) * 0.5);
        }

        // Cap the score at 100
        riskScore = Math.min(100, Math.round(riskScore));

        // Determine risk level and color
        let level, color;
        if (riskScore >= 70) {
            level = 'HIGH';
            color = 'bg-red-400';
        } else if (riskScore >= 40) {
            level = 'MEDIUM';
            color = 'bg-orange-400';
        } else if (riskScore >= 20) {
            level = 'LOW';
            color = 'bg-yellow-400';
        } else {
            level = 'MINIMAL';
            color = 'bg-green-400';
        }

        return { score: riskScore, level, color };
    };

    useEffect(() => {

        async function runUseEffect(){
            setLoading(true);
            let userEmail = sessionStorage.getItem('user');
    
            if(!userEmail){
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                if(code){
                    userEmail = await getUser(code);
                }
                else {
                    navigate('/');
                    return;
                }
            }

            await getReport(userEmail);
            setLoading(false);
        }

        runUseEffect();
        
    }, [])

    async function getUser(code){
        try {
            const response = await axios({
                method: 'post',
                url: `${Config.serverUrl}/getToken`,
                data: { code: code }
            })

            sessionStorage.setItem('user', response.data.email);

            window.history.replaceState({}, document.title, "/report");

            return response.data.email;
            
        } catch (error) {
            console.log("error ", error);
            setLoading(false);
            return null;
        }
    }

    async function getReport(userEmail){
        setLoading(true);
        if(!userEmail) userEmail = sessionStorage.getItem('user');

        try {
            const response = await axios({
                method: 'get',
                url: `${Config.serverUrl}/getReport?email=${userEmail}`,
                data: {}
            })

            // Calculate risk score and add it to the report data
            const rawData = response.data;
            const riskData = calculateRiskScore(rawData);
            
            const enrichedReportData = {
                ...rawData,
                riskScore: riskData
            };

            setReportData(enrichedReportData);
            setLoading(false);
            
        } catch (error) {
            console.log("error", error);
            // If we get an auth error, we need to re-authenticate
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                sessionStorage.removeItem('user');
                navigate('/');
            }
            setLoading(false);
        }
    }

    async function revokeAccess(){
        try {
            const email = sessionStorage.getItem('user');
            await axios({
                method: 'post',
                url: `${Config.serverUrl}/revokeaccess?email=${email}`
            });

            sessionStorage.removeItem('user');
            navigate('/');

        } catch (error) {
          console.log("error", error);
        }
      }
    
    // Enhanced context value with loading state
    const contextValue = {
        ...reportData,
        loading: loading
    };

    return (
        <ReportContext.Provider value={contextValue}>
            <RiskReportView 
                revokeAccess={revokeAccess}
            />
        </ReportContext.Provider>
    )
}
