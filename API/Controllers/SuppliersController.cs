using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SuppliersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetCustomers()
        {
            var customers = await _unitOfWork.SuppliersRepository.GetCustomers();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetCustomer(int id)
        {
            var customer = await _unitOfWork.SuppliersRepository.GetCustomer(id);

            return Ok(customer);
        }

        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetProducts()
        {
            var products = await _unitOfWork.SuppliersRepository.GetProducts(User.GetUserId());

            return Ok(products);
        }

        [HttpGet("products/{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetProduct(int id)
        {
            var product = await _unitOfWork.SuppliersRepository.GetProduct(id);

            return Ok(product);
        }

        [HttpDelete("products/{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var response = await _unitOfWork.SuppliersRepository.DeleteProduct(id);

            if (response == true) return NoContent();

            return NotFound("Product does not exist.");
        }

        [HttpGet("sales")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            var sales = await _unitOfWork.SuppliersRepository.GetSales(User.GetUserId());

            return Ok(sales);
        }

        [HttpGet("sales/{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _unitOfWork.SuppliersRepository.GetSale(id);

            if (sale == null) return NoContent();

            return Ok(sale);
        }

        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetOrders()
        {
            return Ok();
        }
    }
}
