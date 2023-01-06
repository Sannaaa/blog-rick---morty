import Cookie from "js-cookie";

const SetCookie = (cookiename, data) => {
    Cookie.set(cookiename, data, {
        expires:1,
        secure:true,
        sameSite:"strict",
        path:"/"
    });
};

export default SetCookie;