﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace woym.Models;

public class User
{
    public User() { }
    [Required] public Guid UserId { get; set; }
    [Column(TypeName = "VARCHAR(256)")] public string Email { get; set; }
    [Column(TypeName = "VARCHAR(256)")] public string Name { get; set; }
    [Column(TypeName = "VARCHAR(256)")] public string Password { get; set; }
    public bool Admin { get; set; } = false;
    [Column(TypeName = "VARCHAR(25)")] public string CreatedAt { get; set; }
    // public DateTime CreatedAt { get; set; }
    [Column(TypeName = "VARCHAR(2048)")] public string? AvatarUrl { get; set; }
    [Column(TypeName = "VARCHAR(2048)")] public string? BackgroundUrl { get; set; }
    [Column(TypeName = "VARCHAR(256)")] public string? City { get; set; }
    public DateOnly? BirthDate { get; set; }
    public ICollection<Media>? Media { get; set; }
    public ICollection<Post>? Posts { get; set; }
}
