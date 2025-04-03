export interface adhanTimesInt {
    fajr: string;
    dhuhr: string;
    shafiAsr: string;
    hanafiAsr: string;
    maghrib: string;
    isha: string;
};

export interface iqamahTimesInt {
    fajr: string,
    dhuhr: string,
    dhuhr2?: string, // TODO mark optional?
    shafiAsr: string,
    hanafiAsr: string,
    maghrib: string,
    isha: string
};

export interface adhanApiInt {
    timings: {
        Fajr: string,
        Dhuhr: string,
        Asr: string,
        Maghrib: string,
        Isha: string,
    },
    date: {
        gregorian: {
            date: string,
        }
    }
}

export interface adhanDbInt {
    fajr: string,
    dhuhr: string,
    shafiAsr: string,
    hanafiAsr: string,
    maghrib: string,
    isha: string,
}