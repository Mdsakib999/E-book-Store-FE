export const getMonthlyCounts = (items, dateKey = "createdAt") => {
    const monthlyCounts = Array(12).fill(0);
    items.forEach((item) => {
        const date = new Date(item[dateKey]);
        const month = date.getMonth();
        monthlyCounts[month]++;
    });
    return monthlyCounts;
};

export const getMonthlySums = (items, valueKey, dateKey = "createdAt") => {
    const monthlySums = Array(12).fill(0);
    items.forEach((item) => {
        const date = new Date(item[dateKey]);
        const month = date.getMonth();
        monthlySums[month] += item[valueKey] || 0;
    });
    return monthlySums;
};

export const getCategoryCounts = (orders, itemKey = "items", categoryKey = "category", quantityKey = "quantity") => {
    const map = new Map();
    orders.forEach((order) => {
        if (Array.isArray(order[itemKey])) {
            order[itemKey].forEach((item) => {
                const category = item[categoryKey];
                const quantity = item[quantityKey] || 1;
                map.set(category, (map.get(category) || 0) + quantity);
            });
        }
    });
    return {
        labels: Array.from(map.keys()),
        data: Array.from(map.values()),
    };
};
