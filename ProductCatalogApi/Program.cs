using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Data; // Para acceder al contexto ProductContext


var builder = WebApplication.CreateBuilder(args);

// CORS: permitir React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // El frontend
                  .AllowAnyMethod()         // GET, POST, PUT, DELETE
                  .AllowAnyHeader();        // Permite cualquier cabecera
        });
});

builder.Services.AddDbContext<ProductContext>(options =>
    options.UseInMemoryDatabase("ProductDB"));

builder.Services.AddControllers(); // Uso de controladores
builder.Services.AddEndpointsApiExplorer(); // Soporte para exploración de endpoints
builder.Services.AddSwaggerGen(); // LA documentación Swagger para probar ,a API

var app = builder.Build();

app.UseCors("AllowFrontend");
// Habilita Swagger
app.UseSwagger();
app.UseSwaggerUI(); // Interfaz de Swagger
// Redirige automáticamente a HTTPS
app.UseHttpsRedirection();
// Maneja la autorización
app.UseAuthorization();
// Mapea todos los controladores a rutas
app.MapControllers();
app.Run();