export const unwrapApiData = (responseData) => {
    if (!responseData || typeof responseData !== "object") {
        return responseData;
    }

    if ("data" in responseData) {
        return responseData.data;
    }

    return responseData;
};