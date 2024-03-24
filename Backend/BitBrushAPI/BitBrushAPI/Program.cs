using BitBrushAPI.Data;
using BitBrushAPI.Service;
using Microsoft.EntityFrameworkCore;

namespace BitBrushAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Database
            builder.Services.AddDbContext<MyDBContext>(option =>
            {
                option.UseSqlServer(builder.Configuration.GetConnectionString("MyDB"));
            });

            // Dependency Injection
            builder.Services.AddScoped<ICollectionRepo, CollectionRepo>();
            builder.Services.AddScoped<IUserRepo, UserRepo>();
            builder.Services.AddScoped<IProductRepo, ProductRepo>();
            builder.Services.AddScoped<IUserAccountRepo, UserAccountRepo>();
            builder.Services.AddScoped<ITransactionRepo, TransactionRepo>();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //app.UseSwagger();
                //app.UseSwaggerUI();
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowAll"); // Apply the CORS policy globally

            app.MapControllers();

            app.Run();

        }
    }
}