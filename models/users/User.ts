import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
    private username: String = '';
    private password: String = '';
    private firstName: String | null = null;
    private lastName: String | null = null;
    private email: String = '';
    private profilePhoto: String | null = null;
    private headerImage: String | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: String | null = null;
    private dateOfBirth: Date | null = null;
    private joined = new Date();
    private location: Location | null = null;
}