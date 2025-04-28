import api  from "../utils/axiosInstance";

export const fetchProducts = async () => {
    const res = await api.get("products/");
    if (res.status !== 200) {
        throw new Error("Failed to fetch products");
    }
    // console.log(res.data);
    return res.data;
};
