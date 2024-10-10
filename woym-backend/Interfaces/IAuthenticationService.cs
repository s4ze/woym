namespace woym.Interfaces;
public interface IAuthenticationService
{
    IResult Register(string email, string name, string password);
    IResult Login(string email, string password);
    public bool CheckForExistingUserByEmail(string email);
}