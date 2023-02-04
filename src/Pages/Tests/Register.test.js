function testEmail(mail) {
    const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(mail);
}

function testPassword(password) {;
    if (password.length >= 8) {
        return true;
    } else if (password.length < 8) {
        return false;
    }
}

describe("test inscription", () => {

    test("erreur regEx lors de l'inscription", () => {
        const text = "test/@test.com";
        expect(testEmail(text)).toBe(false);
    });

    test("validation regEx lors de l'inscription", () => {
        const text = "test@test.com";
        expect(testEmail(text)).toBe(true);
    });

    test("erreur mot de passe lors de l'inscription", () => {
        const password = "1234567";
        expect(testPassword(password)).toBe(false);
    });

    test("validation mot de passe lors de l'inscription", () => {
        const password = "123456789";
        expect(testPassword(password)).toBe(true);
    });
    
});