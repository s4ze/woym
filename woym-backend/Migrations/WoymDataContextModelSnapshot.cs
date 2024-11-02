﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using woym.Data;

#nullable disable

namespace woym_backend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class WoymDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseSerialColumns(modelBuilder);

            modelBuilder.Entity("woym.Models.Media", b =>
                {
                    b.Property<Guid>("MediaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("PostId")
                        .HasColumnType("uuid");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("VARCHAR(256)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("MediaID");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("woym.Models.Post", b =>
                {
                    b.Property<Guid>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("VARCHAR(25)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("VARCHAR(1024)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("woym.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Admin")
                        .HasColumnType("boolean");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("VARCHAR(2048)");

                    b.Property<string>("BackgroundUrl")
                        .HasColumnType("VARCHAR(2048)");

                    b.Property<DateOnly?>("BirthDate")
                        .HasColumnType("date");

                    b.Property<string>("City")
                        .HasColumnType("VARCHAR(256)");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("VARCHAR(25)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("VARCHAR(256)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("VARCHAR(256)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("VARCHAR(256)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("woym.Models.Media", b =>
                {
                    b.HasOne("woym.Models.Post", "Post")
                        .WithMany("Media")
                        .HasForeignKey("PostId");

                    b.HasOne("woym.Models.User", "User")
                        .WithMany("Media")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("woym.Models.Post", b =>
                {
                    b.HasOne("woym.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("woym.Models.Post", b =>
                {
                    b.Navigation("Media");
                });

            modelBuilder.Entity("woym.Models.User", b =>
                {
                    b.Navigation("Media");

                    b.Navigation("Posts");
                });
#pragma warning restore 612, 618
        }
    }
}
