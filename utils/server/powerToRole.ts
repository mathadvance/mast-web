export function powerToRole(power: number) {
    switch (power) {
        case 0:
            return "UNVERIFIED";
        case 1:
            return "USER";
        case 2:
            return "APPLICANT";
        case 3:
            return "STUDENT"
        case 4:
            return "STAFF";
        case 5:
            return "ADMIN";
        case 6:
            return "SUPERADMIN";
        default:
            console.log("Something very wrong is going on; the power of this user is not an integer between 0 and 4.")
            return;
    }
}