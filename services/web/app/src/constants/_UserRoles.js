export const ADMIN = 0;
export const MANGAGER = 1;
export const USER = 2;
export const USER_GROUP = [
    MANGAGER,
    USER
];
export const ADMIN_GROUP = [
    ADMIN
]
export const getRoleName = (role) => {
    switch (role) {
        case ADMIN:
            return "Admin";
        case MANGAGER:
            return "Manager";
        case USER:
            return "User";
    }
}