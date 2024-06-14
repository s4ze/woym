using System.Text;
public record AuthOptions
{
    public const string ISSUER = AuthData.Issuer; // издатель токена
    public const string AUDIENCE = AuthData.Audience; // потребитель токена
    public const string KEY = AuthData.Key;   // ключ для шифрации
    public static SymmetricSecurityKey GetSymmetricSecurityKey() => 
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}