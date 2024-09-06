// 预定义域名列表
const predefinedDomains = [
    "cas.swust.edu.cn",
    "myo.swust.edu.cn",
    "xsc.swust.edu.cn",
    "sjjx.swust.edu.cn",
    "proj.swust.edu.cn",
    "uap.swust.edu.cn"
];

// 初始化规则
getStorageSyncData(["switch-status", "http-list"]).then(items => {
    if (items["switch-status"] === undefined) {
        chrome.storage.sync.set({'switch-status': true});
    }
    if (items["switch-status"] === undefined || items["switch-status"]) {
        // 合并用户配置和内置配置
        const userDomains = items["http-list"] || "";
        const allDomains = mergeDomains(userDomains);
        addRules(allDomains);
    }
});

function mergeDomains(userDomains) {
    // 确保 userDomains 是字符串，避免 undefined 或非字符串的情况
    if (typeof userDomains !== 'string') {
        userDomains = "";
    }
    const userDomainArray = userDomains.split(/[\s\n;]/).filter(Boolean); // 用户配置
    const mergedDomains = [...new Set([...userDomainArray, ...predefinedDomains])]; // 合并并去重
    return mergedDomains.join(";"); // 返回合并后的字符串形式
}

function getStorageSyncData(keys) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(keys, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

// 监听存储变化
chrome.storage.onChanged.addListener(function(obj) {
    for (let k in obj) {
        if (k === 'switch-status') {
            if (obj[k].newValue) {
                getStorageSyncData(["http-list"]).then(val => {
                    const allDomains = mergeDomains(val);
                    addRules(allDomains);
                });
            } else {
                removeRules();
            }
        } else if (k === 'http-list') {
            removeRules().then(() => {
                const allDomains = mergeDomains(obj[k].newValue);
                addRules(allDomains);
            });
        }
    }
});

function addRules(rules) {
    if (!rules) return;

    const parses = rules.split(/[\s\n;]/).filter(Boolean); // 过滤空值
    let addRules = [];
    let removeRuleIds = [];

    parses.forEach((domain, index) => {
        if (!domain) return;

        const id = hashDomain(domain); // 使用哈希函数生成 ID
        removeRuleIds.push(id);

        addRules.push({
            "id": id,
            "priority": 1,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": { "scheme": "http" }
                }
            },
            "condition": {
                "urlFilter": "https://" + domain,
                "resourceTypes": ["main_frame"]
            }
        });
    });

    chrome.declarativeNetRequest.updateDynamicRules({ addRules, removeRuleIds }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error adding rules:", chrome.runtime.lastError);
        }
    });
}

// 移除所有规则
function removeRules() {
    return new Promise((resolve, reject) => {
        chrome.declarativeNetRequest.getDynamicRules((items) => {
            const ids = items.map(item => item.id);
            chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ids }, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(ids);
            });
        });
    });
}

// 哈希函数，用于生成唯一的规则 ID
function hashDomain(domain) {
    let hash = 0;
    for (let i = 0; i < domain.length; i++) {
        hash = ((hash << 5) - hash) + domain.charCodeAt(i);
        hash |= 0; // 转为32位整数
    }
    return Math.abs(hash);
}
