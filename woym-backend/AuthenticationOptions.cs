using System.Text;
using Microsoft.IdentityModel.Tokens;
public record AuthenticationOptions
{
    public const string ISSUER = AuthenticationData.Issuer; // издатель токена
    public const string AUDIENCE = AuthenticationData.Audience; // потребитель токена
    public const string KEY = AuthenticationData.Key;   // ключ для шифрации
    public static SymmetricSecurityKey GetSymmetricSecurityKey() => 
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}