export function checkIfAdmin(user) {
    let isAdmin = false;

    if (user.email === "simonaognanova05@gmail.com") {
        isAdmin = true;
    } else {
        isAdmin = false;
    };

    return isAdmin;
}