/*const errors = [
    { code: "auth/email-already-in-use",    message: "The email address is already in use" },
    { code: "auth/invalid-email",           message: "The email address is not valid" },
    { code: "auth/operation-not-allowed",   message: "Operation not allowed" },
    { code: "auth/weak-password",           message: "The password is too weak" },
    { code: "auth/invalid-password",        message: "The password is not valid" },
    // { code: "auth/", message: "" },
    // { code: "auth/", message: "" },
    // { code: "auth/", message: "" },
    // { code: "auth/", message: "" },
];

export default errors
*/


export function authCodeToMessage(authCode: string) {
    switch (authCode) {
        case "auth/email-already-in-use":
            return "The email address is already in use";
        case "auth/invalid-email":
            return "The email address is not valid";
        case "auth/operation-not-allowed":
            return "Operation not allowed";
        case "auth/weak-password":
            return "The password is too weak";
        case "auth/invalid-password":
            return "The password is not valid";
        default:
            return "";
    }
}