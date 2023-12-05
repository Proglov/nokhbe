"use client"
import { useState, createContext } from 'react';

const useAdminHooks = () => {
    const [staticProps, setStaticProps] = useState({
        newsCount: 0,
        negativeStatusNewsCount: 0,
        announcementsCount: 0,
        negativeStatusAnnouncementsCount: 0,
        eventsCount: 0,
        negativeStatusEventsCount: 0,
        loadingNews: false,
        isErrorNews: false,
        errorNews: false,
        loadingAnnouncements: false,
        isErrorAnnouncements: false,
        errorAnnouncements: false,
        loadingEvents: false,
        loadingEvents: false,
        isErrorEvents: false,
        errorEvents: false,
    });

    const [addSegmentsPage, setAddSegmentsPage] = useState(0);

    const [controlPanelsPage, setControlPanelsPage] = useState(0);

    const [infoItems, setInfoItems] = useState([]);
    const [currentInfoPage, setCurrentInfoPage] = useState(1);
    const [lastInfoTablePageNumber, setLastInfoTablePageNumber] = useState(1);
    const infoItemsPerPage = 20;

    return {
        staticProps,
        setStaticProps,
        addSegmentsPage,
        setAddSegmentsPage,
        controlPanelsPage,
        setControlPanelsPage,
        infoItems,
        setInfoItems,
        currentInfoPage,
        setCurrentInfoPage,
        lastInfoTablePageNumber,
        setLastInfoTablePageNumber,
        infoItemsPerPage,
    };
};

export const useAdminContext = createContext();

export default useAdminHooks;