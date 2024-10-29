using woym.Models;

namespace woym.Interfaces;
public interface IAuthenticationService
{
    public bool Register(string email, string name, string password);
    public bool Login(string email, string password);
    public bool CheckForExistingUserById(string userId);
    public bool CheckForExistingUserByEmail(string email);
    public bool IsAdmin(string userId);
    public User GetUserById(string userId);
    public User GetUserByEmail(string email);

}