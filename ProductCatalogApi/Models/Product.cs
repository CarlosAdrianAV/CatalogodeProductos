using System;

namespace ProductCatalogApi.Models
{
    // Modelo que representa un producto dentro del catálogo    
    public class Product
    {
        // Identificador único del producto
        public int Id { get; set; }
        // Nombre del producto-requerido
        public required string Name { get; set; }
        // Descripción opcional
        public string? Description { get; set; }
        // Precio del producto >0
        public decimal Price { get; set; }
        // Categoría-requerido
        public required string Category { get; set; }
        // Fecha y hora en la que se creó el producto
        public DateTime CreatedAt { get; set; }
    }
}
