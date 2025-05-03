import api  from "../utils/axiosInstance";

export const fetchProducts = async () => {
    const res = await api.get("products/");
    if (res.status !== 200) {
        throw new Error("Failed to fetch products");
    }
    // console.log(res.data);
    return res.data;
};


export const fetchOrders = async (page) => {
    const res = await api.get(`sales/orders?page=${page}`);
    if (res.status !== 200) {
        throw new Error("Failed to fetch orders");
    }
    // console.log(res.data);
    return res.data;
}


export const fetchBuyerList = async () => {
    const res = await api.get("sales/buyers");
    if (res.status !== 200) {
        throw new Error("Failed to fetch orders");
    }
    // console.log(res.data);
    return res.data;
}

export const fetchOrderDetails = async (orderId) => {
    const res = await api.get(`sales/order/${orderId}`);
    if (res.status !== 200) {
        throw new Error("Failed to fetch orders");
    }
    // console.log(res.data);
    return res.data;
}


export const fetchBuyerOrders = async (buyerId) => {
    const res = await api.get(`sales/order/buyer/${buyerId}`);
    if (res.status !== 200) {
        throw new Error("Failed to fetch orders");
    }
    console.log(res.data);
    return res.data;
}
