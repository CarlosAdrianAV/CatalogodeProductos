using Microsoft.AspNetCore.Mvc; // Para usar controladores y ApiController
using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Data; // Accede al contexto de base de datos ProductContext
using ProductCatalogApi.Models; // Importa el modelo Product


namespace ProductCatalogApi.Controllers
{
    //Controlador de API REST
    [ApiController]
    // Ruta /api/products
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductContext _context;
        // Constructor del controlador
        public ProductsController(ProductContext context)
        {
            _context = context;
        }

        // GET: /api/products
        // Lista completa de productos almacenados en la base de datos
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: /api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }

        // POST: /api/products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            // Validaciones
            if (string.IsNullOrWhiteSpace(product.Name))
                return BadRequest("Nombre es requerido.");

            if (string.IsNullOrWhiteSpace(product.Category))
                return BadRequest("Categoría es requerido");

            if (product.Price <= 0)
                return BadRequest("Precio debe ser mayor a 0.");

            product.CreatedAt = DateTime.UtcNow;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
    }
}
