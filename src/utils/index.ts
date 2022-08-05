import dayjs from 'dayjs';
import { generateFromString } from 'generate-avatar';
import { KeyboardEvent } from 'react';

export const formatDate = (ts) => {
    const date = new Date(ts);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1')}-${String(
        date.getDate(),
    ).replace(/^(\d{1})$/, '0$1')}`;
};

export function allSettled(promises) {
    return Promise.allSettled(promises).then((results) =>
        results.filter((result) => result.status === 'fulfilled').map((result: any) => result.value),
    );
}

export const formatTimestamp = (timestamp: number | string) => {
    return dayjs(timestamp).format('YYYY/MM/DD');
};

export const formatAddress = (address: string, left: number = 6, right: number = -7) => {
    return address && `${address.slice(0, left)}...${address.slice(right)}`;
};

// ✅ Promise check
export function isPromise(p) {
    if (typeof p === 'object' && typeof p.then === 'function') {
        return true;
    }

    return false;
}

// ✅ Check if return value is promise
export function returnsPromise(f) {
    if (f.constructor.name === 'AsyncFunction' || (typeof f === 'function' && isPromise(f()))) {
        console.log('✅ Function returns promise');
        return true;
    }

    console.log('⛔️ Function does NOT return promise');
    return false;
}

export const genAvatar = (id: string) => {
    return id ? `data:image/svg+xml;utf8,${generateFromString(String(id))}` : '';
};

export const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), ms);
    });
};

export const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }
};

export const getPropDeep = (obj: any, path: string) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, obj || self);
};

export const formatNumber = (num: number, digits: number) => {
    const si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

type ILabelType = {
    content: string;
    name: string;
    source: string;
};
type IRankType = {
    type: string;
    content: string;
    top: number;
};
const NFT_Balance_Ranks = [
    {
        type: 'WHALE',
        content: 'Whale',
        top: 100,
    },
    {
        type: 'LEGENDARY_NFT_COLLECTOR',
        content: 'Legendary Collector',
        top: 0.001,
    },
    {
        type: 'EPIC_NFT_COLLECTOR',
        content: 'Epic Collector',
        top: 0.01,
    },
    {
        type: 'RARE_NFT_COLLECTOR',
        content: 'Rare Collector',
        top: 0.025,
    },
    {
        type: 'UNCOMMON_NFT_COLLECTOR',
        content: 'Uncommon Collector',
        top: 0.1,
    },
];
const NFT_Volume_Ranks = [
    { type: 'TOP', content: 'Top', top: 100 },
    { type: 'LEGENDARY_NFT_TRADER', content: 'Legendary', top: 0.001 },
    { type: 'EPIC_NFT_TRADER', content: 'Epic', top: 0.01 },
    { type: 'RARE_NFT_TRADER', content: 'Rare', top: 0.025 },
    { type: 'UNCOMMON_NFT_TRADER', content: 'Uncommon', top: 0.1 },
    // { type: "ELITE_NFT_TRADER", content: "Elite", top: 0.01 }, //activity and volume both top 0.01
];

const Token_Volume_Ranks = [
    { type: 'LEGENDARY', content: 'Legendary', top: 0.001 },
    { type: 'ELITE', content: 'Elite', top: 0.01 },
    { type: 'HEAVY', content: 'Heavy', top: 0.025 },
    { type: 'MEDIUM', content: 'Medium', top: 0.1 },
];
export const filterOverlappingLabels = (labels: ILabelType[]) => {
    for (let i = 0; i < NFT_Balance_Ranks.length; i++) {
        const item = NFT_Balance_Ranks[i];
        const label = labels.find((l) => l.name.indexOf(`NFT_BALANCE_${item.type}`) > -1);
        if (label) {
            const typeReg = label.name.substr(0, label.name.indexOf(item.type));
            removeLowerRankLabels(labels, NFT_Balance_Ranks, typeReg, i + 1);
            break;
        }
    }
    for (let i = 0; i < NFT_Volume_Ranks.length; i++) {
        const item = NFT_Volume_Ranks[i];
        const label = labels.find((l) => l.name.indexOf(`NFT_VOLUME_${item.type}`) > -1);
        if (label) {
            const typeReg = label.name.substr(0, label.name.indexOf(item.type));
            removeLowerRankLabels(labels, NFT_Volume_Ranks, typeReg, i + 1);
            break;
        }
    }
    for (let i = 0; i < Token_Volume_Ranks.length; i++) {
        const item = Token_Volume_Ranks[i];
        const label = labels.find((l) => l.name.indexOf(`VOLUME_${item.type}`) > -1);
        if (label) {
            const typeReg = label.name.substr(0, label.name.indexOf(item.type));
            removeLowerRankLabels(labels, Token_Volume_Ranks, typeReg, i + 1);
            break;
        }
    }
};

const removeLowerRankLabels = (labels: ILabelType[], ranks: IRankType[], rankType: string, startIndex: number) => {
    for (let i = startIndex; i < ranks.length; i++) {
        const item = ranks[i];
        const index = labels.findIndex((l) => l.name.indexOf(`${rankType}${item.type}`) > -1);
        if (index > -1) {
            labels.splice(index, 1);
        }
    }
};

export const preloadAssets = (assets: any[]) => {
    for (const asset of assets) {
        const image = new Image();
        image.src = asset;
    }
};

export const isValidHttpUrl = (message: string) => {
    let url;

    try {
        url = new URL(message);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};

export const sortStrings = (str: string[]) => {
    if (str && str.sort) {
        return str.sort((a, b) => {
            const _a = a.toUpperCase();
            const _b = b.toUpperCase();
            if (_a < _b) {
                return -1;
            }
            if (_a > _b) {
                return 1;
            }
            return 0;
        });
    }
    return str;
};

export function wrapperKeypressEnter<T extends HTMLInputElement>(callback: Function) {
    return (e: KeyboardEvent<T>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
            callback(e);
        }
        return e;
    };
}

export function toHex(source: string) {
    return `0x${source
        .split('')
        .map((v) => v.charCodeAt(0).toString(16))
        .join('')}`;
}

export const watchIntersectionRatio = (selector: string, callback: Function, intersectionRatio: number | number[]) => {
    const elm = document.querySelector<HTMLElement>(selector);
    if (elm) {
        const observer = new IntersectionObserver(([e]) => callback(e), { threshold: intersectionRatio });
        observer.observe(elm);
    }
};
