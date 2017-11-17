import ChromePromise from 'chrome-promise';
import STORAGE_KEYS from './config';

const chromep = new ChromePromise();

export function getJourneys() {
    return chromep.storage.local.get(STORAGE_KEYS.JOURNEYS);
}

export function storeJourney(journey) {
    return getJourneys().then((res) => {
        if (!res[STORAGE_KEYS.JOURNEYS]) res[STORAGE_KEYS.JOURNEYS] = {
            all: {},
            recent: [],
        };
        const id = journey.id;
        res[STORAGE_KEYS.JOURNEYS].all[id] = journey;

        const index = res[STORAGE_KEYS.JOURNEYS].recent.indexOf(id);
        if (index > -1) res[STORAGE_KEYS.JOURNEYS].recent.splice(index, 1);
        res[STORAGE_KEYS.JOURNEYS].recent.unshift(id);
        res[STORAGE_KEYS.JOURNEYS].recent.splice(5,1);
        
        return chromep.storage.local.set(res)
    });
}

export function getRecentJourneys() {
    return getJourneys().then((res) => {
        const recentJourneyIds = (res[STORAGE_KEYS.JOURNEYS] && res[STORAGE_KEYS.JOURNEYS].recent) || [];
        return recentJourneyIds.map((id) => res[STORAGE_KEYS.JOURNEYS].all[id]);
    })
}

export function getCurrentTabId(){
    return chromep.tabs.query({ 
        active: true, 
        currentWindow: true }
    ).then((tabs) => {
        return tabs[0].id;
    });
} 

export function takeScreenshot(){
    return chromep.tabs.captureVisibleTab();
}
