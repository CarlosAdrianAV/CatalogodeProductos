using Microsoft.EntityFrameworkCore; // Importa Entity Framework Core
using ProductCatalogApi.Models;// Importa el modelo Product

namespace ProductCatalogApi.Data
{
    // Hereda de DbContext, que es la clase base de EF Core
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options) // Llama al constructor base de DbContext 
        {
        }
        // Representa la tabla de productos en la base de datos
        public DbSet<Product> Products => Set<Product>();
    }
}
