using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using woym.Data;
public record AuthenticationOptions
{
    public const string ISSUER = AuthenticationData.Issuer; // издатель токена
    public const string AUDIENCE = AuthenticationData.Audience; // потребитель токена
    public const string KEY = AuthenticationData.Key;   // ключ для шифрования
    public static TokenValidationParameters TokenValidationParameters = new()
    {
        ValidateIssuer = true,
        ValidIssuer = ISSUER,
        ValidateAudience = true,
        ValidAudience = AUDIENCE,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = GetSymmetricSecurityKey(),
    };
    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}