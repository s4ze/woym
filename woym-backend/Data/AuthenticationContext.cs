using woym.Models;

namespace woym.Data {
    public class AuthenticationContext {
        public List<User> Users { get; set; }
        public AuthenticationContext() {
            Users = new List<User>(){
                new("alex@mail.ru", "alexey", "pass"),
                new("olegn@gmail.com", "oleg", "pass")
            };
        }
    }
}