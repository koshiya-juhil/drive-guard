import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import RiskReportView from "../view/RiskReportView.jsx";
import ReportContext from '../context/ReportContext.js';
import Config from "../Config.js";

export default function RiskReportController() {

    const navigate = useNavigate();

    const [reportData, setReportData] = useState({});

    useEffect(() => {

        async function runUseEffect(){
            let userEmail = sessionStorage.getItem('user');
    
            if(!userEmail){
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                if(code){
                    userEmail = await getUser(code);
                }
                else {
                    navigate('/');
                }
            }

            getReport(userEmail);
            
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
        }
    }

    async function getReport(userEmail){

        if(!userEmail) userEmail = sessionStorage.getItem('user');

        try {
            const response = await axios({
                method: 'get',
                url: `${Config.serverUrl}/getReport?email=${userEmail}`,
                data: {}
            })

            setReportData(response.data);
            
        } catch (error) {
            console.log("error", error)
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
    
    

    return (
        <ReportContext.Provider value={reportData}>
            <RiskReportView 
                revokeAccess={revokeAccess}
            />
        </ReportContext.Provider>
    )
}
