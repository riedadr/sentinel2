import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
    return useContext(InfoContext);
}

export function InfoProvider({ children }) {


    const [ipAddr, setIpAddr] = useState("8.8.8.8");


    const value = {
        ipAddr,
    };

    return (
        <div>
            <InfoContext.Provider value={value}>
                {children}
            </InfoContext.Provider>
        </div>
    );
}
