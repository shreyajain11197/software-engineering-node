/**
 * @file Declares AccountType data type representing the type of account the user has
 * AccountType is represented as an ENUM with three values
 * Personal,Academic and professional representing the types of accounts that can be created
 */
enum AccountType {
   Personal = 'PERSONAL',
   Academic = 'ACADEMIC',
   Professional = 'PROFESSIONAL'
}
export default AccountType;
