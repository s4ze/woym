using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using woym.Contracts;
using woym.Data;
using woym.Interfaces;
using woym.Models;

namespace woym.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAuthenticationService _authenticationService;
        public PostsController(DataContext context, IAuthenticationService authenticationService)
        {
            _context = context;
            _authenticationService = authenticationService;
        }
        [HttpGet]
        [Route("get")]
        public IResult Get(string userId)
        {
            if (_authenticationService.CheckForExistingUserById(userId))
            {
                var result = new
                {
                    posts = _context.Posts
                        .Where(p => p.User.UserId.ToString() == userId)
                        .Select(p => new
                        {
                            p.PostId,
                            p.Description,
                            p.CreatedAt,
                            p.User.UserId,
                            p.Media
                        })
                        .ToList()
                };
                return Results.Ok(result);
            }
            return Results.Unauthorized();
        }
        [HttpPost]
        [Route("add")]
        public IResult Add([FromBody] NewPostRequest req)
        {
            if (_authenticationService.CheckForExistingUserById(req.UserId))
            {
                var post = new Post()
                {
                    PostId = Guid.NewGuid(),
                    Description = req.Description,
                    CreatedAt = DateTime.Now.ToString("dd-MM-yyyy HH:mmK"),
                    User = _authenticationService.GetUserById(req.UserId),
                };
                _context.Posts.Add(post);
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpPut]
        [Route("edit")]
        public IResult Edit(string postId, [FromBody] EditPostRequest req)
        {
            var post = GetPostById(postId);
            if (post != null)
            {
                post.Description = req.Description;
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpDelete]
        [Route("remove")]
        public IResult Remove(string postId)
        {
            var post = GetPostById(postId);
            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        [HttpDelete]
        [Route("removeall")]
        public IResult RemoveAll(string userId)
        {
            var posts = _context.Posts.Where(p => p.User.UserId.ToString() == userId);
            if (posts != null)
            {
                _context.Posts.RemoveRange(posts);
                _context.SaveChanges();
                return Results.Ok();
            }
            return Results.Unauthorized();
        }
        private Post GetPostById(string postId)
        {
            return _context.Posts.First(p => p.PostId.ToString() == postId);
        }
    }
}
