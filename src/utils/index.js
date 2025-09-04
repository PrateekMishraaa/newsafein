import { apiJson } from "api";

export function textLimit(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + "...";
    }
    return text;
}

export const checkUnique = async (email) => {
    try {
        const checkUniqueNess = await apiJson.post("/api/v2/auth/account-check", { email });
        console.log("checkUniqueNesscheckUniqueNess",checkUniqueNess)
        if (checkUniqueNess?.data?.result) {
            console.log("Unique Email");
            return true;
        } else {
            console.log("Not Unique Email");
            return false;
        }
    } catch (error) {
        return false;
    }
};




// import { apiJson } from "api";

// export function textLimit(text, limit) {
//     if (text && text.length > limit) {
//         return text.substring(0, limit) + "...";
//     }
//     return text || "";
// }

// export const checkUnique = async (email) => {
//     try {
//         // Fixed API endpoint - removed duplicate '/api/' since it should be handled by apiJson base configuration
//         const checkUniqueNess = await apiJson.post("v2/auth/account-check", { email });
//         console.log("checkUniqueNess response:", checkUniqueNess);
        
//         if (checkUniqueNess?.data?.result) {
//             console.log("Unique Email");
//             return true;
//         } else {
//             console.log("Not Unique Email");
//             return false;
//         }
//     } catch (error) {
//         console.error("Error checking email uniqueness:", error);
//         return false;
//     }
// };